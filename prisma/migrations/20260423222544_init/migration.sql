-- CreateTable
CREATE TABLE "BayiBasvuru" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "firmaAdi" TEXT NOT NULL,
    "yetkiliAdiSoyadi" TEXT NOT NULL,
    "telefon" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "adres" TEXT NOT NULL,
    "vergiDairesi" TEXT NOT NULL,
    "vergiNo" TEXT NOT NULL,
    "mesaj" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',

    CONSTRAINT "BayiBasvuru_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IletisimFormu" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "adSoyad" TEXT NOT NULL,
    "telefon" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "konu" TEXT NOT NULL,
    "mesaj" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',

    CONSTRAINT "IletisimFormu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OnayKayit" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "onayTipi" TEXT NOT NULL,
    "onayDurumu" BOOLEAN NOT NULL,
    "tarihSaat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ipAdresi" TEXT,
    "userAgent" TEXT,
    "cihazTipu" TEXT,
    "bayiBasvuruId" TEXT,
    "iletisimFormuId" TEXT,
    "ekBilgi" TEXT,

    CONSTRAINT "OnayKayit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "BayiBasvuru_email_idx" ON "BayiBasvuru"("email");

-- CreateIndex
CREATE INDEX "BayiBasvuru_createdAt_idx" ON "BayiBasvuru"("createdAt");

-- CreateIndex
CREATE INDEX "IletisimFormu_email_idx" ON "IletisimFormu"("email");

-- CreateIndex
CREATE INDEX "IletisimFormu_createdAt_idx" ON "IletisimFormu"("createdAt");

-- CreateIndex
CREATE INDEX "OnayKayit_onayTipi_idx" ON "OnayKayit"("onayTipi");

-- CreateIndex
CREATE INDEX "OnayKayit_tarihSaat_idx" ON "OnayKayit"("tarihSaat");

-- CreateIndex
CREATE INDEX "OnayKayit_bayiBasvuruId_idx" ON "OnayKayit"("bayiBasvuruId");

-- CreateIndex
CREATE INDEX "OnayKayit_iletisimFormuId_idx" ON "OnayKayit"("iletisimFormuId");

-- AddForeignKey
ALTER TABLE "OnayKayit" ADD CONSTRAINT "OnayKayit_bayiBasvuruId_fkey" FOREIGN KEY ("bayiBasvuruId") REFERENCES "BayiBasvuru"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OnayKayit" ADD CONSTRAINT "OnayKayit_iletisimFormuId_fkey" FOREIGN KEY ("iletisimFormuId") REFERENCES "IletisimFormu"("id") ON DELETE CASCADE ON UPDATE CASCADE;
