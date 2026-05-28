// js/supabase.js
// Powers dynamic content on index.html

;(async function() {

  // ── Supabase client ───────────────────────
  const SUPABASE_URL = 'https://ifvoqnouicytzmdwoxnj.supabase.co'
  const SUPABASE_ANON_KEY = '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'
  const { createClient } = supabase
  const db = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

  // ── Load domains by category ──────────────
  async function loadDomains() {
    const grid = document.getElementById('categories-grid')
    if (!grid) return

    const { data: domains, error } = await db
      .from('domains')
      .select('*')
      .order('category', { ascending: true })
      .order('sort_order', { ascending: true })

    if (error || !domains?.length) {
      grid.innerHTML = '<p class="text-muted">Could not load domains.</p>'
      return
    }

    // Group by category
    const grouped = {}
    domains.forEach(d => {
      if (!grouped[d.category]) grouped[d.category] = []
      grouped[d.category].push(d)
    })

    const categoryIcons = {
      'Technology': '💻',
      'Business': '📊',
      'Leadership': '🎯'
    }

    let html = ''

    Object.entries(grouped).forEach(([category, items]) => {
      // Category header
      html += `
        <div class="col-12 mb-2 mt-4">
          <div class="d-flex align-items-center gap-2">
            <span class="fs-5">${categoryIcons[category] || '📁'}</span>
            <h3 class="mb-0" style="font-size: 1rem; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; opacity: 0.5;">${category}</h3>
            <div style="flex:1; height:1px; background: currentColor; opacity: 0.1; margin-left: 8px;"></div>
          </div>
        </div>
      `

      // Domain cards
      items.forEach(domain => {
        const isActive = domain.is_active
        const tags = (domain.tags || []).slice(0, 2).map(t =>
          `<span class="badge bg-light text-dark me-1" style="font-size:10px;">${t}</span>`
        ).join('')

        html += `
          <div class="col-lg-4 col-md-6 mb-3">
            <div class="class-card h-100 ${!isActive ? 'opacity-50' : ''}" style="position:relative;">
              ${!isActive ? '<div class="badge bg-secondary" style="position:absolute;top:12px;right:12px;font-size:10px;">Coming Soon</div>' : ''}
              <div style="font-size: 2rem; margin-bottom: 8px;">${domain.icon}</div>
              <h4 style="font-size: 1rem; font-weight: 700; margin-bottom: 6px;">${domain.name}</h4>
              <p style="font-size: 0.8rem; opacity: 0.6; margin-bottom: 10px; line-height: 1.4;">${domain.description}</p>
              <div class="mb-3">${tags}</div>
              ${isActive
                ? `<a href="assessment.html" class="btn btn-sm btn-primary">Take Assessment →</a>`
                : `<span class="text-muted" style="font-size:0.8rem;">Notify me when ready</span>`
              }
            </div>
          </div>
        `
      })
    })

    // Remove skeleton placeholders
    document.querySelectorAll('.categories-skeleton').forEach(el => el.remove())
    grid.innerHTML = html
  }

  // ── Load featured scenarios ───────────────
  async function loadScenarios() {
    const grid = document.getElementById('lessons-grid')
    if (!grid) return

    const { data: scenarios, error } = await db
      .from('scenarios')
      .select('id, title, domain, situation, difficulty')
      .eq('is_active', true)
      .order('sort_order', { ascending: true })
      .limit(4)

    if (error || !scenarios?.length) {
      document.querySelectorAll('.lessons-skeleton').forEach(el => el.remove())
      return
    }

    const domainColors = {
      'Data Safety': '#6366f1',
      'UX Judgment': '#ec4899',
      'Cybersecurity': '#10b981',
      'AI Readiness': '#6366f1',
      'Output Verification': '#f59e0b',
      'Security Judgment': '#10b981',
    }

    const domainBg = {
      'AI Readiness': '#1e1b4b',
      'UX Judgment': '#4a044e',
      'Cybersecurity': '#052e16',
    }

    let html = ''
    scenarios.forEach(s => {
      const excerpt = s.situation
        ? s.situation.slice(0, 90) + '...'
        : 'A realistic workplace scenario testing professional judgment.'
      const bg = domainBg[s.domain] || '#1e293b'
      const difficulty = s.difficulty || 'medium'
      const diffBadge = difficulty === 'hard' ? '🔴 Hard'
        : difficulty === 'easy' ? '🟢 Easy' : '🟡 Medium'

      html += `
        <div class="col-lg-3 col-md-6">
          <a href="assessment.html" class="article-card text-decoration-none">
            <div class="article-card__bg" style="background: ${bg}; display:flex; align-items:center; justify-content:center; padding: 20px;">
              <div style="text-align:center; color:white;">
                <div style="font-size:2rem; margin-bottom:8px;">${s.domain === 'UX Judgment' ? '🎨' : s.domain === 'Cybersecurity' ? '🔒' : '🤖'}</div>
                <div style="font-size:0.7rem; opacity:0.7; text-transform:uppercase; letter-spacing:0.05em;">${s.domain}</div>
              </div>
            </div>
            <div class="article-card__info">
              <div class="d-flex justify-content-between align-items-start mb-2">
                <span style="font-size:0.7rem; opacity:0.5;">${diffBadge}</span>
              </div>
              <h3 style="font-size: 0.95rem; font-weight: 700; margin-bottom: 6px; color: inherit;">${s.title}</h3>
              <p style="font-size: 0.8rem; opacity: 0.6; line-height: 1.4; margin: 0;">${excerpt}</p>
            </div>
          </a>
        </div>
      `
    })

    document.querySelectorAll('.lessons-skeleton').forEach(el => el.remove())
    grid.innerHTML = html
  }

  // ── Run both ──────────────────────────────
  await Promise.all([loadDomains(), loadScenarios()])

})()
