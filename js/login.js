// js/login.js

// Redirect if already logged in
redirectIfAuth()

async function handleLogin() {
  const email = document.getElementById('email').value.trim()
  const password = document.getElementById('password').value

  const btn = document.getElementById('login-btn')
  const errorAlert = document.getElementById('error-alert')
  const errorMsg = document.getElementById('error-message')

  // Reset
  errorAlert.classList.add('hidden')

  if (!email || !password) {
    errorMsg.textContent = 'Please fill in all fields.'
    errorAlert.classList.remove('hidden')
    return
  }

  // Loading state
  btn.disabled = true
  btn.innerHTML = '<span class="loading loading-spinner loading-sm"></span> Signing in...'

  const { data, error } = await signIn(email, password)

  if (error) {
    errorMsg.textContent = error.message
    errorAlert.classList.remove('hidden')
    btn.disabled = false
    btn.innerHTML = 'Sign In'
    return
  }

  // Redirect based on role
  const profile = await getProfile()

  if (profile?.role === 'admin') {
    window.location.href = 'org-dashboard.html'
  } else {
    window.location.href = 'dashboard.html'
  }
}

// Allow Enter key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') handleLogin()
})