#!/bin/bash

# =============================================================
# full-audit.sh — QA & Güvenlik Denetimi Komut Dosyası
# Kullanım: ./full-audit.sh [--fix] [--report]
# =============================================================

set -e

TIMESTAMP=$(date '+%Y-%m-%d_%H-%M-%S')
REPORT_DIR=".claude/audit-reports"
REPORT_FILE="$REPORT_DIR/audit-$TIMESTAMP.md"
FIX_MODE=false
REPORT_MODE=false

# Argümanları işle
for arg in "$@"; do
  case $arg in
    --fix) FIX_MODE=true ;;
    --report) REPORT_MODE=true ;;
  esac
done

# Renk kodları
RED='\033[0;31m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # Renksiz

echo ""
echo "╔══════════════════════════════════════════════════════════╗"
echo "║         🛡️  FULL AUDIT — QA & GÜVENLİK DENETİMİ         ║"
echo "╚══════════════════════════════════════════════════════════╝"
echo ""
echo "📅 Tarih: $(date '+%d/%m/%Y %H:%M')"
echo "📁 Proje: $(pwd)"
echo ""

mkdir -p "$REPORT_DIR"

# ----------------------------
# ADIM 1: GİZLİ VERİ TARAMASI
# ----------------------------
echo -e "${BLUE}━━━ 🔐 ADIM 1/5: Gizli Veri Taraması ━━━${NC}"

SECRETS_FOUND=0

# Yaygın sır pattern'larını tara (node_modules hariç)
SECRET_PATTERNS=(
  "sk-[a-zA-Z0-9]{48}"          # OpenAI
  "ghp_[a-zA-Z0-9]{36}"         # GitHub PAT
  "xoxb-[0-9]+"                 # Slack
  "AIza[0-9A-Za-z\\-_]{35}"     # Google API
  "AKIA[0-9A-Z]{16}"            # AWS
  "password\s*=\s*['\"][^'\"]{4}" # Hardcoded passwords
  "api_key\s*=\s*['\"][^'\"]{10}" # Generic API keys
)

for pattern in "${SECRET_PATTERNS[@]}"; do
  matches=$(grep -rn --include="*.ts" --include="*.js" --include="*.py" \
    --include="*.env*" --exclude-dir=node_modules --exclude-dir=.next \
    --exclude-dir=dist --exclude-dir=.git \
    -E "$pattern" . 2>/dev/null | grep -v ".example" | wc -l)
  
  if [ "$matches" -gt "0" ]; then
    echo -e "  ${RED}⚠️  Potansiyel sır bulundu ($matches eşleşme): $pattern${NC}"
    grep -rn --include="*.ts" --include="*.js" --include="*.py" \
      --exclude-dir=node_modules --exclude-dir=.next --exclude-dir=dist \
      -E "$pattern" . 2>/dev/null | grep -v ".example" | head -5
    SECRETS_FOUND=$((SECRETS_FOUND + matches))
  fi
done

if [ "$SECRETS_FOUND" -eq "0" ]; then
  echo -e "  ${GREEN}✅ Açıkta kalan sır bulunamadı${NC}"
fi

# .env gitignore kontrolü
if [ -f ".gitignore" ] && grep -q "^\.env$" .gitignore; then
  echo -e "  ${GREEN}✅ .env gitignore'da tanımlı${NC}"
else
  echo -e "  ${YELLOW}⚠️  .env gitignore'a eklenmemiş!${NC}"
fi

echo ""

# ----------------------------
# ADIM 2: NPM AUDIT
# ----------------------------
echo -e "${BLUE}━━━ 📦 ADIM 2/5: Bağımlılık Güvenlik Taraması ━━━${NC}"

if [ -f "package.json" ]; then
  AUDIT_OUTPUT=$(npm audit --json 2>/dev/null || echo '{"metadata":{"vulnerabilities":{}}}')
  
  CRITICAL=$(echo "$AUDIT_OUTPUT" | node -e "
    const d=require('fs').readFileSync('/dev/stdin','utf8');
    try { const j=JSON.parse(d); console.log(j.metadata?.vulnerabilities?.critical || 0); }
    catch(e) { console.log(0); }
  " 2>/dev/null || echo "0")
  
  HIGH=$(echo "$AUDIT_OUTPUT" | node -e "
    const d=require('fs').readFileSync('/dev/stdin','utf8');
    try { const j=JSON.parse(d); console.log(j.metadata?.vulnerabilities?.high || 0); }
    catch(e) { console.log(0); }
  " 2>/dev/null || echo "0")
  
  MODERATE=$(echo "$AUDIT_OUTPUT" | node -e "
    const d=require('fs').readFileSync('/dev/stdin','utf8');
    try { const j=JSON.parse(d); console.log(j.metadata?.vulnerabilities?.moderate || 0); }
    catch(e) { console.log(0); }
  " 2>/dev/null || echo "0")

  [ "$CRITICAL" -gt "0" ] && echo -e "  ${RED}🚨 KRİTİK: $CRITICAL açık${NC}" || echo -e "  ${GREEN}✅ Kritik açık yok${NC}"
  [ "$HIGH" -gt "0" ] && echo -e "  ${YELLOW}⚠️  YÜKSEK: $HIGH açık${NC}" || echo -e "  ${GREEN}✅ Yüksek açık yok${NC}"
  [ "$MODERATE" -gt "0" ] && echo -e "  ℹ️  ORTA: $MODERATE açık${NC}"
  
  if [ "$FIX_MODE" = true ] && [ "$((CRITICAL + HIGH))" -gt "0" ]; then
    echo -e "  ${YELLOW}🔧 --fix modu: npm audit fix çalıştırılıyor...${NC}"
    npm audit fix --force
  fi
else
  echo "  ℹ️  package.json bulunamadı, atlanıyor"
fi

echo ""

# ----------------------------
# ADIM 3: ESLINT
# ----------------------------
echo -e "${BLUE}━━━ 🎨 ADIM 3/5: ESLint Kod Kalitesi ━━━${NC}"

if command -v npx &> /dev/null && [ -f "package.json" ]; then
  # ESLint çalıştır - çıkış kodu != 0 olsa bile devam et
  ESLINT_OUTPUT=$(npx eslint . --ext .ts,.tsx,.js,.jsx \
    --ignore-pattern "node_modules" \
    --ignore-pattern ".next" \
    --ignore-pattern "dist" \
    --format compact 2>&1 || true)
  
  ERROR_COUNT=$(echo "$ESLINT_OUTPUT" | grep -c ": error " || echo "0")
  WARN_COUNT=$(echo "$ESLINT_OUTPUT" | grep -c ": warning " || echo "0")
  
  [ "$ERROR_COUNT" -gt "0" ] && \
    echo -e "  ${RED}❌ ESLint Hataları: $ERROR_COUNT${NC}" || \
    echo -e "  ${GREEN}✅ ESLint hatası yok${NC}"
  
  [ "$WARN_COUNT" -gt "0" ] && \
    echo -e "  ${YELLOW}⚠️  ESLint Uyarıları: $WARN_COUNT${NC}" || \
    echo -e "  ${GREEN}✅ ESLint uyarısı yok${NC}"

  if [ "$ERROR_COUNT" -gt "0" ]; then
    echo ""
    echo "  En kritik 5 hata:"
    echo "$ESLINT_OUTPUT" | grep ": error " | head -5 | sed 's/^/    /'
  fi

  if [ "$FIX_MODE" = true ]; then
    echo -e "  ${YELLOW}🔧 --fix modu: ESLint otomatik düzeltme...${NC}"
    npx eslint . --ext .ts,.tsx,.js,.jsx --fix --ignore-pattern "node_modules" || true
  fi
else
  echo "  ℹ️  ESLint bulunamadı, atlanıyor"
fi

echo ""

# ----------------------------
# ADIM 4: TEST ÇALIŞTIRMA
# ----------------------------
echo -e "${BLUE}━━━ 🧪 ADIM 4/5: Test Suite ━━━${NC}"

if [ -f "package.json" ]; then
  # Jest mi, Vitest mi?
  if grep -q '"vitest"' package.json 2>/dev/null; then
    echo "  Vitest çalıştırılıyor..."
    TEST_OUTPUT=$(npx vitest run --reporter=verbose 2>&1 || true)
    RUNNER="Vitest"
  elif grep -q '"jest"' package.json 2>/dev/null; then
    echo "  Jest çalıştırılıyor..."
    TEST_OUTPUT=$(npx jest --passWithNoTests 2>&1 || true)
    RUNNER="Jest"
  else
    TEST_OUTPUT=""
    RUNNER="Bulunamadı"
  fi

  if [ -n "$TEST_OUTPUT" ]; then
    PASS=$(echo "$TEST_OUTPUT" | grep -oP '\d+ passed' | head -1 || echo "?")
    FAIL=$(echo "$TEST_OUTPUT" | grep -oP '\d+ failed' | head -1 || echo "0")
    
    echo -e "  Test runner: $RUNNER"
    echo -e "  ${GREEN}✅ Geçen: $PASS${NC}"
    [ "$FAIL" != "0 failed" ] && [ -n "$FAIL" ] && \
      echo -e "  ${RED}❌ Başarısız: $FAIL${NC}"
  else
    echo -e "  ${YELLOW}⚠️  Test dosyası bulunamadı veya test runner kurulu değil${NC}"
  fi
elif [ -f "pytest.ini" ] || [ -f "pyproject.toml" ]; then
  echo "  Pytest çalıştırılıyor..."
  pytest --tb=short -q 2>&1 | tail -10 || true
fi

echo ""

# ----------------------------
# ADIM 5: KOD MEtrikleri
# ----------------------------
echo -e "${BLUE}━━━ 📊 ADIM 5/5: Kod Metrikleri ━━━${NC}"

# console.log taraması
CONSOLE_LOGS=$(grep -rn "console\.log" --include="*.ts" --include="*.tsx" --include="*.js" \
  --exclude-dir=node_modules --exclude-dir=.next --exclude-dir=dist . 2>/dev/null | \
  grep -v "// console" | grep -v "__tests__" | grep -v ".test." | wc -l || echo "0")

# TypeScript any kullanımı
ANY_USAGE=$(grep -rn ": any" --include="*.ts" --include="*.tsx" \
  --exclude-dir=node_modules --exclude-dir=.next . 2>/dev/null | wc -l || echo "0")

# 300+ satır dosyalar
LONG_FILES=$(find . -name "*.ts" -o -name "*.tsx" -o -name "*.js" 2>/dev/null | \
  grep -v node_modules | grep -v .next | grep -v dist | \
  xargs wc -l 2>/dev/null | awk '$1 > 300 {print $2}' | grep -v "total" || true)

echo -e "  console.log kalıntıları: ${YELLOW}$CONSOLE_LOGS adet${NC}"
echo -e "  TypeScript 'any' kullanımı: ${YELLOW}$ANY_USAGE adet${NC}"

if [ -n "$LONG_FILES" ]; then
  echo -e "  ${YELLOW}300+ satır dosyalar (modüle bölünmeli):${NC}"
  echo "$LONG_FILES" | sed 's/^/    /'
else
  echo -e "  ${GREEN}✅ Tüm dosyalar 300 satır altında${NC}"
fi

echo ""
echo "╔══════════════════════════════════════════════════════════╗"
echo "║                   ✅ AUDİT TAMAMLANDI                   ║"
echo "╚══════════════════════════════════════════════════════════╝"
echo ""
echo "Sonraki adım için Claude Code'a şunu söyle:"
echo "  'Audit raporunu incele ve kritik bulguları düzelt'"
echo ""

# Rapor dosyasına yaz
if [ "$REPORT_MODE" = true ]; then
  cat > "$REPORT_FILE" << EOF
# Audit Raporu — $(date '+%d/%m/%Y %H:%M')

## Özet
- Açıkta kalan sır: $SECRETS_FOUND
- npm kritik açık: ${CRITICAL:-0}
- npm yüksek açık: ${HIGH:-0}  
- ESLint hatası: ${ERROR_COUNT:-0}
- ESLint uyarısı: ${WARN_COUNT:-0}
- console.log sayısı: $CONSOLE_LOGS
- TypeScript any: $ANY_USAGE

## Sonraki Adımlar
1. Kritik güvenlik açıklarını kapat
2. ESLint hatalarını düzelt
3. console.log'ları temizle
4. 300+ satır dosyaları böl
EOF
  echo -e "${GREEN}📄 Rapor kaydedildi: $REPORT_FILE${NC}"
fi
