// js/auth.js
// Requires `db` (Supabase client) to be defined globally — see db.js.

async function getSession() {
  const { data: { session } } = await db.auth.getSession();
  return session;
}

async function getProfile() {
  const session = await getSession();
  if (!session) return null;
  const { data, error } = await db
    .from('profiles')
    .select('*')
    .eq('id', session.user.id)
    .single();
  if (error) return null;
  return data;
}

// No redirect — just returns session or null
async function requireAuth() {
  const session = await getSession();
  return session;
}

async function redirectIfAuth() {
  const session = await getSession();
  if (session) {
    window.location.href = 'dashboard.html';
  }
}

async function signOut() {
  await db.auth.signOut();
  window.location.href = 'login.html';
}
