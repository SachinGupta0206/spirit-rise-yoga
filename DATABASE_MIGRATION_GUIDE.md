# Database Migration Guide

## If you already have `yoga_registrations` table in Supabase

### Current Situation

Your existing table probably looks like this:

```sql
yoga_registrations (
  id UUID,
  name TEXT,
  phone TEXT UNIQUE,  -- This needs to be changed
  email TEXT,         -- This needs to be made mandatory
  created_at TIMESTAMP
)
```

### New Required Structure

```sql
yoga_registrations (
  id UUID,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,  -- Email is now the unique identifier
  created_at TIMESTAMP
)
```

## Migration Options

### Option 1: Keep Existing Data (Recommended)

If you have important registrations and want to keep them:

1. **Add email addresses to existing records** (manually or via script)
2. **Run migration.sql** to update table structure
3. **Update application** to use new API

```sql
-- Step 1: Add email to existing records (example)
UPDATE yoga_registrations
SET email = 'user1@example.com'
WHERE phone = '+911234567890';

-- Step 2: Run migration.sql
-- (See migration.sql file)
```

### Option 2: Fresh Start (Easiest)

If you don't have important data or want to start fresh:

1. **Backup existing data** (if needed)
2. **Drop old table**
3. **Run database-schema.sql** to create new table

```sql
-- Backup (optional)
CREATE TABLE yoga_registrations_backup AS
SELECT * FROM yoga_registrations;

-- Drop old table
DROP TABLE yoga_registrations;

-- Run database-schema.sql to create new table
```

### Option 3: Rename and Create New

Keep old table as backup:

```sql
-- Rename old table
ALTER TABLE yoga_registrations
RENAME TO yoga_registrations_old;

-- Run database-schema.sql to create new table
```

## After Migration

1. **Test the API** with new structure
2. **Update any existing integrations**
3. **Verify email validation** is working
4. **Test duplicate email detection**

## Files to Run

1. **For existing table:** `migration.sql`
2. **For fresh setup:** `database-schema.sql`

Choose the option that best fits your situation!
