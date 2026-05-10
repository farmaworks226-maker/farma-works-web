import { NextRequest } from 'next/server'

export function getCihazTipu(userAgent: string): string {
  const ua = userAgent.toLowerCase()
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'tablet'
  }
  if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
    return 'mobile'
  }
  return 'desktop'
}

export function getClientIp(request: NextRequest): string {
  // x-forwarded-for spooflanabilir; bu değer sadece kayıt amaçlıdır, doğrulama için kullanılmamalı
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

// Basit in-memory rate limiter (her IP için zaman penceresi)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

const RATE_LIMIT = 5       // Maksimum istek sayısı
const WINDOW_MS = 60_000   // 1 dakika

export function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return true
  }

  if (entry.count >= RATE_LIMIT) {
    return false
  }

  entry.count++
  return true
}
