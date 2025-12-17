-- Fix table to allow NULL phone since we're not collecting phone numbers
-- Run this in Supabase SQL editor

-- Remove NOT NULL constraint from phone
ALTER TABLE yoga_registrations 
ALTER COLUMN phone DROP NOT NULL;

-- Remove UNIQUE constraint from phone (since we'll have multiple NULL values)
ALTER TABLE yoga_registrations 
DROP CONSTRAINT IF EXISTS yoga_registrations_phone_key;

-- Keep email as NOT NULL UNIQUE (this is what we want)
-- Email constraint should remain as is