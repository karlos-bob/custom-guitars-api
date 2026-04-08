-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "currency" TEXT NOT NULL,
    "estimatedTotalCost" INTEGER NOT NULL,
    "selections" JSONB NOT NULL,
    "comments" JSONB NOT NULL,
    "bodyDesignId" TEXT,
    "modelKey" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "products_slug_key" ON "products"("slug");

-- CreateIndex
CREATE INDEX "products_published_sortOrder_idx" ON "products"("published", "sortOrder");

-- Seed (demo catalog)
INSERT INTO "products" (
    "id",
    "name",
    "slug",
    "description",
    "currency",
    "estimatedTotalCost",
    "selections",
    "comments",
    "bodyDesignId",
    "modelKey",
    "published",
    "sortOrder",
    "createdAt",
    "updatedAt"
) VALUES (
    'a0000000-0000-4000-8000-000000000001',
    'Orion Arcadia',
    'orion-arcadia',
    'Balanced double-cut, versatile modern build.',
    'AUD',
    6500,
    '{"instrumentType":"electric-guitar","orientation":"right-handed","stringNumber":"6","scaleType":"standard","scaleLength":"25-5","numberOfFrets":"24","buildConstruction":"bolt-on","neckProfile":"modern-c","headstockType":"inline-6","fretboardRadius":"12","bodyChambering":"solid","topContouring":"flat","trussRodAccess":"headstock","recessedJackAccessRoute":"side-jack","bodyMaterial":"swamp-ash","topMaterial":"flamed-maple","finish":"satin"}'::jsonb,
    '{"bodyMaterialComments":"Lightweight blank preferred"}'::jsonb,
    'body-shape-orion',
    'arcadia',
    true,
    0,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
),
(
    'a0000000-0000-4000-8000-000000000002',
    'Vela Revenant',
    'vela-revenant',
    'Offset silhouette with a slightly more aggressive upper horn.',
    'AUD',
    7200,
    '{"instrumentType":"electric-guitar","orientation":"right-handed","stringNumber":"6","scaleType":"multi-scale","scaleLength":"25-5","numberOfFrets":"24","buildConstruction":"set-neck","neckProfile":"thin-d","headstockType":"3x3","fretboardRadius":"compound","bodyChambering":"light-relief","topContouring":"carved","trussRodAccess":"spoke-wheel","recessedJackAccessRoute":"side-jack","bodyMaterial":"mahogany","topMaterial":"quilted-maple","finish":"gloss"}'::jsonb,
    '{}'::jsonb,
    'body-shape-vela',
    'revenant',
    true,
    1,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
);
