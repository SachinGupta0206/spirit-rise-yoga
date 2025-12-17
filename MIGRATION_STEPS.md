# Step-by-Step Migration for Existing Table

## Current Table Structure

```sql
CREATE TABLE yoga_registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL UNIQUE,
  user_id UUID,
  whatsapp_joined BOOLEAN DEFAULT FALSE,
  app_installed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Target Table Structure

```sql
CREATE TABLE yoga_registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Migration Steps

### Step 1: Add Email Column

```sql
ALTER TABLE yoga_registrations
ADD COLUMN IF NOT EXISTS email TEXT;
```

### Step 2: Add Email Addresses to Existing Records

**IMPORTANT:** You need to manually add email addresses to existing records before proceeding.

Example:

```sql
-- Update existing records with email addresses
UPDATE yoga_registrations
SET email = 'user1@example.com'
WHERE id = 'existing-uuid-1';

UPDATE yoga_registrations
SET email = 'user2@example.com'
WHERE id = 'existing-uuid-2';

-- Or if you want to use phone as temporary email:
UPDATE yoga_registrations
SET email = phone || '@temp.com'
WHERE email IS NULL;
```

### Step 3: Make Email Unique and Required

```sql
-- Make email unique
ALTER TABLE yoga_registrations
ADD CONSTRAINT unique_email UNIQUE (email);

-- Make email NOT NULL
ALTER TABLE yoga_registrations
ALTER COLUMN email SET NOT NULL;
```

### Step 4: Remove Unnecessary Columns

```sql
-- Remove old columns
ALTER TABLE yoga_registrations DROP COLUMN IF EXISTS phone;
ALTER TABLE yoga_registrations DROP COLUMN IF EXISTS user_id;
ALTER TABLE yoga_registrations DROP COLUMN IF EXISTS whatsapp_joined;
ALTER TABLE yoga_registrations DROP COLUMN IF EXISTS app_installed;
```

### Step 5: Update Indexes

```sql
-- Remove old index
DROP INDEX IF EXISTS idx_yoga_registrations_phone;

-- Create new index
CREATE INDEX IF NOT EXISTS idx_yoga_registrations_email ON yoga_registrations(email);
```

## Quick Migration (All at Once)

If you want to run everything at once (after adding emails to existing records):

```sql
-- Run migration.sql file
```

## Verification

After migration, verify the structure:

```sql
-- Check table structure
\d yoga_registrations

-- Check data
SELECT * FROM yoga_registrations LIMIT 5;

-- Verify email uniqueness
SELECT email, COUNT(*) FROM yoga_registrations GROUP BY email HAVING COUNT(*) > 1;
```

## Rollback (If Needed)

If something goes wrong, you can restore from backup:

```sql
-- Create backup before migration
CREATE TABLE yoga_registrations_backup AS
SELECT * FROM yoga_registrations;

-- Restore if needed
DROP TABLE yoga_registrations;
ALTER TABLE yoga_registrations_backup RENAME TO yoga_registrations;
```
