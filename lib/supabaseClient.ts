// supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yxbuvbgklsrqzvsiouhf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4YnV2YmdrbHNycXp2c2lvdWhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU2MDQzOTksImV4cCI6MjA3MTE4MDM5OX0.822umtX86tWMGZ7Hdo4jwR6XAMBdrUvALov2ESiAK-c';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
