// js/supabase-client.js
const { createClient } = supabase

const SUPABASE_URL = 'https://ifvoqnouicytzmdwoxnj.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlmdm9xbm91aWN5dHptZHdveG5qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3NjM4MTIsImV4cCI6MjA5NDMzOTgxMn0.h_TLJwHNXxFDTx9k44vymrQsgI7-Phvd9Oku83Q2owE';


const db = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
