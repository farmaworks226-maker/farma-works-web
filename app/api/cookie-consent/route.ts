// app/api/cookie-consent/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Cihaz tipini belirle
function getCihazTipu(userAgent: string): string {
  const ua = userAgent.toLowerCase()
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'tablet'
  }
  if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
    return 'mobile'
  }
  return 'desktop'
}

// IP adresini al
function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIp = request.headers.get('x-real-ip')
  
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  if (realIp) {
    return realIp
  }
  return 'unknown'
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { consent } = body

    // IP ve User Agent bilgilerini al
    const ipAdresi = getClientIp(request)
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