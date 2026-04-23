// app/api/iletisim/route.ts

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
    const {
      formData,
      consents
    } = body

    // IP ve User Agent bilgilerini al
    const ipAdresi = getClientIp(request)
    const userAgent = request.headers.get('user-agent') || 'unknown'
    const cihazTipu = getCihazTipu(userAgent)
    const tarihSaat = new Date()

    // 1. İletişim formunu oluştur
    const iletisimFormu = await prisma.iletisimFormu.create({
      data: {
        adSoyad: formData.adSoyad,
        telefon: formData.telefon,
        email: formData.email,
        konu: formData.konu,
        mesaj: formData.mesaj,
        status: 'pending'
      }
    })

    // 2. Tüm onayları kaydet
    const onayKayitlari = []

    // Zorunlu onay - Genel Aydınlatma
    if (consents.aydinlatmaMetni) {
      onayKayitlari.push({
        onayTipi: 'iletisim_aydinlatma',
        onayDurumu: true,
        tarihSaat,
        ipAdresi,
        userAgent,
        cihazTipu,
        iletisimFormuId: iletisimFormu.id
      })
    }

    // İsteğe bağlı onaylar
    if (consents.ticariSMS) {
      onayKayitlari.push({
        onayTipi: 'ticari_sms',
        onayDurumu: true,
        tarihSaat,
        ipAdresi,
        userAgent,
        cihazTipu,
        iletisimFormuId: iletisimFormu.id
      })
    }

    if (consents.sosyalMedya) {
      onayKayitlari.push({
        onayTipi: 'sosyal_medya',
        onayDurumu: true,
        tarihSaat,
        ipAdresi,
        userAgent,
        cihazTipu,
        iletisimFormuId: iletisimFormu.id
      })
    }

    if (consents.email) {
      onayKayitlari.push({
        onayTipi: 'email_iletisim',
        onayDurumu: true,
        tarihSaat,
        ipAdresi,
        userAgent,
        cihazTipu,
        iletisimFormuId: iletisimFormu.id
      })
    }

    if (consents.telefon) {
      onayKayitlari.push({
        onayTipi: 'telefon_iletisim',
        onayDurumu: true,
        tarihSaat,
        ipAdresi,
        userAgent,
        cihazTipu,
        iletisimFormuId: iletisimFormu.id
      })
    }

    // Onayları toplu olarak kaydet
    if (onayKayitlari.length > 0) {
      await prisma.onayKayit.createMany({
        data: onayKayitlari
      })
    }

    return NextResponse.json({
      success: true,
      message: 'Mesajınız başarıyla alındı',
      data: {
        id: iletisimFormu.id,
        onayKayitSayisi: onayKayitlari.length
      }
    }, { status: 201 })

  } catch (error) {
    console.error('İletişim formu hatası:', error)
    return NextResponse.json({
      success: false,
      message: 'Mesaj kaydedilirken bir hata oluştu'
    }, { status: 500 })
  }
}