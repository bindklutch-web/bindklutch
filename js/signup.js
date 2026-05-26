// js/signup.js

// Redirect if already logged in
redirectIfAuth()

async function handleSignup() {
  const fullName = document.getElementById('full-name').value.trim()
  const email = document.getElementById('email').value.trim()
  const password = document.getElementById('password').value

  const btn = document.getElementById('signup-btn')
  const errorAlert = document.getElementById('error-alert')
  const errorMsg = document.getElementById('error-message')
  const successAlert = document.getElementById('success-alert')
  const successMsg = document.getElementById('success-message')

  // Reset alerts
  errorAlert.classList.add('hidden')
  successAlert.classList.add('hidden')

  // Basic validation
  if (!fullName || !email || !password) {
    errorMsg.textContent = 'Please fill in all fields.'
    errorAlert.classList.remove('hidden')
    return
  }

  if (password.length < 8) {
    errorMsg.textContent = 'Password must be at least 8 characters.'
    errorAlert.classList.remove('hidden')
    return
  }

  // Loading state
  btn.disabled = true
  btn.innerHTML = '<span class="loading loading-spinner loading-sm"></span> Creating account...'

  const { data, error } = await signUp(email, password, fullName)

  if (error) {
    errorMsg.textContent = error.message
    errorAlert.classList.remove('hidden')
    btn.disabled = false
    btn.innerHTML = 'Create Account'
    return
  }

  // Success
  successMsg.textContent = 'Account created! Check your email to confirm then sign in.'
  successAlert.classList.remove('hidden')
  btn.innerHTML = 'Account Created ✓'

  // Redirect to login after 3 seconds
  setTimeout(() => {
    window.location.href = 'login.html'
  }, 3000)
}

// Allow Enter key to submit
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') handleSignup()
})