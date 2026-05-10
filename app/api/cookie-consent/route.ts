// app/api/cookie-consent/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCihazTipu, getClientIp, checkRateLimit } from '@/lib/api-utils'

export async function POST(request: NextRequest) {
  const ipAdresi = getClientIp(request)

  if (!checkRateLimit(ipAdresi)) {
    return NextResponse.json({ success: false, message: 'Çok fazla istek.' }, { status: 429 })
  }

  try {
    const body = await request.json()
    const { consent } = body

    if (typeof consent !== 'boolean') {
      return NextResponse.json({ success: false, message: 'Geçersiz istek.' }, { status: 400 })
    }

    const userAgent = request.headers.get('user-agent') || 'unknown'
    const cihazTipu = getCihazTipu(userAgent)
    const tarihSaat = new Date()

    // Çerez onayını kaydet
    // Not: Bu kayıt herhangi bir form ile ilişkili değil, sadece çerez onayı
    const cerezOnay = await prisma.onayKayit.create({
      data: {
        onayTipi: 'cerez_kullanimi',
        onayDurumu: consent,
        tarihSaat,
        ipAdresi,
        userAgent,
        cihazTipu,
        // Form ilişkisi yok - sadece çerez onayı
        bayiBasvuruId: null,
        iletisimFormuId: null
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Çerez onayı kaydedildi',
      data: {
        id: cerezOnay.id
      }
    }, { status: 201 })

  } catch (error) {
    console.error('Çerez onayı hatası:', error)
    return NextResponse.json({
      success: false,
      message: 'Onay kaydedilirken bir hata oluştu'
    }, { status: 500 })
  }
}