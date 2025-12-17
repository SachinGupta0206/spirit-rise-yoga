-- Simple yoga_registrations table for Supabase
-- Run this in your Supabase SQL editor

CREATE TABLE IF NOT EXISTS yoga_registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL UNIQUE,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_yoga_registrations_phone ON yoga_registrations(phone);

-- Enable Row Level Security (optional)
ALTER TABLE yoga_registrations ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations
CREATE POLICY "Allow all operations on yoga_registrations" ON yoga_registrations
FOR ALL USING (true);