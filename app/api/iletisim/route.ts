// app/api/iletisim/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCihazTipu, getClientIp, checkRateLimit } from '@/lib/api-utils'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: NextRequest) {
  const ipAdresi = getClientIp(request)

  if (!checkRateLimit(ipAdresi)) {
    return NextResponse.json({ success: false, message: 'Çok fazla istek. Lütfen bir dakika bekleyin.' }, { status: 429 })
  }

  try {
    const body = await request.json()
    const { formData, consents } = body

    if (!formData || !consents) {
      return NextResponse.json({ success: false, message: 'Geçersiz istek.' }, { status: 400 })
    }

    const { adSoyad, telefon, email, konu, mesaj } = formData

    if (!adSoyad?.trim() || adSoyad.trim().length > 100) {
      return NextResponse.json({ success: false, message: 'Ad soyad geçersiz.' }, { status: 400 })
    }
    if (!telefon?.trim() || telefon.trim().length > 20) {
      return NextResponse.json({ success: false, message: 'Telefon geçersiz.' }, { status: 400 })
    }
    if (!email?.trim() || !EMAIL_REGEX.test(email) || email.length > 254) {
      return NextResponse.json({ success: false, message: 'E-posta geçersiz.' }, { status: 400 })
    }
    if (!konu?.trim() || konu.trim().length > 100) {
      return NextResponse.json({ success: false, message: 'Konu geçersiz.' }, { status: 400 })
    }
    if (!mesaj?.trim() || mesaj.trim().length > 2000) {
      return NextResponse.json({ success: false, message: 'Mesaj geçersiz (max 2000 karakter).' }, { status: 400 })
    }
    if (!consents.aydinlatmaMetni) {
      return NextResponse.json({ success: false, message: 'Aydınlatma metni onayı zorunludur.' }, { status: 400 })
    }

    const userAgent = request.headers.get('user-agent') || 'unknown'
    const cihazTipu = getCihazTipu(userAgent)
    const tarihSaat = new Date()

    // 1. İletişim formunu oluştur
    const iletisimFormu = await prisma.iletisimFormu.create({
      data: {
        adSoyad: adSoyad.trim(),
        telefon: telefon.trim(),
        email: email.trim().toLowerCase(),
        konu: konu.trim(),
        mesaj: mesaj.trim(),
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