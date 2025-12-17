-- Final Database Schema for Yoga Camp Integration
-- Run this in your Supabase SQL editor
-- Note: profiles table already exists, we only need yoga_registrations

-- 1. Create yoga_registrations table (if not exists)
CREATE TABLE IF NOT EXISTS yoga_registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL UNIQUE,
  email TEXT,
  user_id UUID REFERENCES profiles(id), -- Links to existing Svastha profiles table
  whatsapp_joined BOOLEAN DEFAULT FALSE,
  app_installed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_yoga_registrations_phone ON yoga_registrations(phone);
CREATE INDEX IF NOT EXISTS idx_yoga_registrations_user_id ON yoga_registrations(user_id);

-- 3. Disable Row Level Security for development (enable in production)
ALTER TABLE yoga_registrations DISABLE ROW LEVEL SECURITY;

-- 4. Add trigger for updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_yoga_registrations_updated_at 
    BEFORE UPDATE ON yoga_registrations 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- 5. Test query to verify profiles table structure
-- SELECT id, full_name, phone, email, firebase_uid FROM profiles LIMIT 1;