-- Remove phone number requirement from yoga_registrations table
-- Run this in Supabase SQL Editor

-- Step 1: Remove NOT NULL constraint from phone column
ALTER TABLE yoga_registrations 
ALTER COLUMN phone DROP NOT NULL;

-- Step 2: Remove UNIQUE constraint from phone column
ALTER TABLE yoga_registrations 
DROP CONSTRAINT IF EXISTS yoga_registrations_phone_key;

-- Step 3: Verify the changes
SELECT column_name, is_nullable, data_type 
FROM information_schema.columns 
WHERE table_name = 'yoga_registrations' 
ORDER BY ordinal_position;