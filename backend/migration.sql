-- Migration script for existing yoga_registrations table
-- Current structure: (id, name, phone UNIQUE, user_id, whatsapp_joined, app_installed, created_at)
-- Target structure: (id, name, email UNIQUE, created_at)

-- Step 1: Add email column
ALTER TABLE yoga_registrations 
ADD COLUMN IF NOT EXISTS email TEXT;

-- Step 2: Remove phone constraint and add email constraint
-- (First, you need to add email addresses to existing records manually)

-- Step 3: After adding emails to existing records, make email unique
ALTER TABLE yoga_registrations 
ADD CONSTRAINT unique_email UNIQUE (email);

-- Step 4: Remove unnecessary columns
ALTER TABLE yoga_registrations 
DROP COLUMN IF EXISTS phone;

ALTER TABLE yoga_registrations 
DROP COLUMN IF EXISTS user_id;

ALTER TABLE yoga_registrations 
DROP COLUMN IF EXISTS whatsapp_joined;

ALTER TABLE yoga_registrations 
DROP COLUMN IF EXISTS app_installed;

-- Step 5: Make email NOT NULL (after ensuring all records have email)
ALTER TABLE yoga_registrations 
ALTER COLUMN email SET NOT NULL;

-- Step 6: Update indexes
DROP INDEX IF EXISTS idx_yoga_registrations_phone;
CREATE INDEX IF NOT EXISTS idx_yoga_registrations_email ON yoga_registrations(email);

-- Final structure will be:
-- yoga_registrations (
--   id UUID PRIMARY KEY,
--   name TEXT NOT NULL,
--   email TEXT NOT NULL UNIQUE,
--   created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
-- )