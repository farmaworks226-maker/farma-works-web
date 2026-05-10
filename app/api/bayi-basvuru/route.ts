// app/api/bayi-basvuru/route.ts

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

    const { firmaAdi, yetkiliAdiSoyadi, telefon, email, adres, vergiDairesi, vergiNo, mesaj } = formData

    if (!firmaAdi?.trim() || firmaAdi.trim().length > 200) {
      return NextResponse.json({ success: false, message: 'Firma adı geçersiz.' }, { status: 400 })
    }
    if (!yetkiliAdiSoyadi?.trim() || yetkiliAdiSoyadi.trim().length > 100) {
      return NextResponse.json({ success: false, message: 'Yetkili adı soyadı geçersiz.' }, { status: 400 })
    }
    if (!telefon?.trim() || telefon.trim().length > 20) {
      return NextResponse.json({ success: false, message: 'Telefon geçersiz.' }, { status: 400 })
    }
    if (!email?.trim() || !EMAIL_REGEX.test(email) || email.length > 254) {
      return NextResponse.json({ success: false, message: 'E-posta geçersiz.' }, { status: 400 })
    }
    if (!adres?.trim() || adres.trim().length > 500) {
      return NextResponse.json({ success: false, message: 'Adres geçersiz.' }, { status: 400 })
    }
    if (!vergiDairesi?.trim() || vergiDairesi.trim().length > 100) {
      return NextResponse.json({ success: false, message: 'Vergi dairesi geçersiz.' }, { status: 400 })
    }
    if (!vergiNo?.trim() || vergiNo.trim().length > 20) {
      return NextResponse.json({ success: false, message: 'Vergi no geçersiz.' }, { status: 400 })
    }
    if (mesaj && mesaj.length > 2000) {
      return NextResponse.json({ success: false, message: 'Mesaj çok uzun (max 2000 karakter).' }, { status: 400 })
    }
    if (!consents.bayiAydinlatma) {
      return NextResponse.json({ success: false, message: 'Bayi aydınlatma metni onayı zorunludur.' }, { status: 400 })
    }

    const userAgent = request.headers.get('user-agent') || 'unknown'
    const cihazTipu = getCihazTipu(userAgent)
    const tarihSaat = new Date()

    // 1. Bayi başvurusunu oluştur
    const bayiBasvuru = await prisma.bayiBasvuru.create({
      data: {
        firmaAdi: firmaAdi.trim(),
        yetkiliAdiSoyadi: yetkiliAdiSoyadi.trim(),
        telefon: telefon.trim(),
        email: email.trim().toLowerCase(),
        adres: adres.trim(),
        vergiDairesi: vergiDairesi.trim(),
        vergiNo: vergiNo.trim(),
        mesaj: mesaj?.trim() || null,
        status: 'pending'
      }
    })

    // 2. Tüm onayları kaydet
    const onayKayitlari = []

    // Zorunlu onay - Bayi Aydınlatma
    if (consents.bayiAydinlatma) {
      onayKayitlari.push({
        onayTipi: 'bayi_aydinlatma',
        onayDurumu: true,
        tarihSaat,
        ipAdresi,
        userAgent,
        cihazTipu,
        bayiBasvuruId: bayiBasvuru.id
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
        bayiBasvuruId: bayiBasvuru.id
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
        bayiBasvuruId: bayiBasvuru.id
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
        bayiBasvuruId: bayiBasvuru.id
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
        bayiBasvuruId: bayiBasvuru.id
      })
    }

    // Onayları toplu olarak kaydet
    if (onayKayitlari.length > 0) {
      await prisma.onayKayit.createMany({
        data: onayKayitlari
      })
    }

    // 3. E-posta bildirimi gönder (opsiyonel)
    // await sendEmailNotification(bayiBasvuru)

    return NextResponse.json({
      success: true,
      message: 'Başvurunuz başarıyla alındı',
      data: {
        id: bayiBasvuru.id,
        onayKayitSayisi: onayKayitlari.length
      }
    }, { status: 201 })

  } catch (error) {
    console.error('Bayi başvuru hatası:', error)
    return NextResponse.json({
      success: false,
      message: 'Başvuru kaydedilirken bir hata oluştu'
    }, { status: 500 })
  }
}