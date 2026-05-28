// js/db.js
// Single source of truth for the Supabase client.
// Exposes it globally as `window.db` so every other script can reuse it.
//
// LOAD ORDER (on every page that touches Supabase):
//   1. <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
//   2. <script src="js/db.js"></script>      <-- this file
//   3. <script src="js/auth.js"></script>    <-- auth helpers (use window.db)
//   4. <script src="js/supabase.js"></script> (only on index.html)
//   5. page-specific logic

const SUPABASE_URL = 'https://ifvoqnouicytzmdwoxnj.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlmdm9xbm91aWN5dHptZHdveG5qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3NjM4MTIsImV4cCI6MjA5NDMzOTgxMn0.h_TLJwHNXxFDTx9k44vymrQsgI7-Phvd9Oku83Q2owE';

// supabase-js@2 exposes a global `supabase` object with createClient.
window.db = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
