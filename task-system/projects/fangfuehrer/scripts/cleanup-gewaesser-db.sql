-- ============================================
-- FangFührer Gewässer-DB Cleanup Script
-- Date: 2026-02-07
-- Author: Cleanup Subagent (Task-003 Feedback Loop)
-- ============================================
-- PRE: 10.118 Gewässer (479 curated + 9.639 OSM junk)
-- POST: 7.523 Gewässer (0 duplicates, no junk)
-- ============================================

BEGIN;

-- ============================================
-- STEP 1: Remove duplicates (Name + State)
-- Keep lowest ID (= oldest/curated)
-- Removed: 2.483
-- ============================================
DELETE FROM waterbodies WHERE id NOT IN (
  SELECT MIN(id) FROM waterbodies GROUP BY name, state
);

-- ============================================
-- STEP 2a: Remove generic 1-word names
-- Removed: 20
-- ============================================
DELETE FROM waterbodies WHERE name IN ('Teich', 'See', 'Weiher', 'Tümpel', 'Pfuhl', 'Bach', 'Graben');

-- ============================================
-- STEP 2b: Remove junk patterns (infrastructure, not fishing)
-- Removed: 14
-- ============================================
DELETE FROM waterbodies WHERE LOWER(name) LIKE '%löschweiher%'
  OR LOWER(name) LIKE '%klärteich%'
  OR LOWER(name) LIKE '%feuerlösch%'
  OR LOWER(name) LIKE '%zierteich%'
  OR LOWER(name) LIKE '%fontäne%'
  OR LOWER(name) LIKE '%springbrunnen%'
  OR LOWER(name) LIKE '%planschbecken%'
  OR LOWER(name) LIKE '%regenrückhalt%';

-- ============================================
-- STEP 2c: Zoo/Park water features
-- Removed: 8
-- ============================================
DELETE FROM waterbodies WHERE LOWER(name) LIKE '%flamingo%'
  OR LOWER(name) LIKE '%alpinum%weiher%'
  OR LOWER(name) LIKE '%bambusweiher%'
  OR LOWER(name) LIKE 'kleines wasserbecken'
  OR LOWER(name) LIKE '%mediapark see%';

-- ============================================
-- STEP 2d: Amphibian conservation ponds
-- Removed: 9
-- ============================================
DELETE FROM waterbodies WHERE LOWER(name) LIKE '%amphibien%';

-- ============================================
-- STEP 2e: Numbered generic weiher ("1. Weiher" etc.)
-- Removed: 6
-- ============================================
DELETE FROM waterbodies WHERE name ~ '^\d+\. Weiher$';

-- ============================================
-- STEP 2f: Infrastructure/wastewater patterns
-- Removed: 55
-- ============================================
DELETE FROM waterbodies WHERE LOWER(name) LIKE '%vogelweiher%'
  OR LOWER(name) LIKE '%vogelteich%'
  OR LOWER(name) LIKE '%biotop%'
  OR LOWER(name) LIKE '%klärbecken%'
  OR LOWER(name) LIKE '%kläranlage%'
  OR LOWER(name) LIKE '%retentionsbecken%'
  OR LOWER(name) LIKE '%regenüberlauf%'
  OR LOWER(name) LIKE '%sickerbecken%'
  OR LOWER(name) LIKE '%absetzbecken%'
  OR LOWER(name) LIKE '%absetzteich%';

-- ============================================
-- STEP 3: Fix river type classifications
-- Updated: 2 (were incorrectly tagged as Kanal)
-- ============================================
UPDATE waterbodies SET type = 'Fluss' WHERE name IN (
  'Spree', 'Havel', 'Saale', 'Elbe', 'Weser', 'Donau', 'Rhein', 'Main',
  'Neckar', 'Mosel', 'Isar', 'Inn', 'Ems', 'Ruhr', 'Lippe', 'Werra',
  'Fulda', 'Aller', 'Leine', 'Oker', 'Oder', 'Neiße', 'Mulde',
  'Weiße Elster', 'Unstrut', 'Ilm', 'Pleße'
) AND type != 'Fluss';

COMMIT;
