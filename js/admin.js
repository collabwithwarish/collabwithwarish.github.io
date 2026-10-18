/**
 * Warish Raj — Portfolio Admin Panel Engine
 * Real-time content editing, YouTube video URL updater, and local storage persistence.
 */

document.addEventListener('DOMContentLoaded', () => {
  initSecurity();
  initTabs();
  loadDataAndRender();
  initActions();
});

const DEFAULT_PASS = 'admin123';

const DEFAULT_PROJECTS = {
  'finavenue-construction': {
    title: "The ₹4,700 Cr Market Hiding Behind India's Construction Boom",
    category: 'YouTube Documentary',
    year: '2024–2025',
    tag: 'Documentary Explainer',
    client: 'Finavenue',
    role: 'Editorial Story Flow, Data Motion Graphics & Sound Design',
    desc: 'An industry documentary exploring India’s massive construction and infrastructure supply chain. Engineered with high-retention narrative hooks, kinetic data visualizations, and cinematic pacing that demystifies a multi-billion dollar market without cognitive overload.',
    videoUrl: 'https://www.youtube.com/watch?v=NGz3-gmqQto&t=5s'
  },
  'motilal-family-office': {
    title: '3 Things to Avoid When Setting Up a Family Office',
    category: 'YouTube Documentary',
    year: '2024–2025',
    tag: 'Market & Wealth Storytelling',
    client: 'Motilal Oswal AMC',
    role: 'Editorial Story Flow, Kinetic Graphics & Sound Pacing',
    desc: 'A high-impact wealth management and family office masterclass edited for Motilal Oswal AMC. Engineered with clean financial data motion graphics, crisp pacing, and engaging narrative structure designed for ultra-high-net-worth investors.',
    videoUrl: 'https://www.youtube.com/watch?v=9J-Zbk6ItEQ'
  },
  'icici-market-analysis': {
    title: 'What Moved Indian Markets? | Ft. Sharmila D’Silva',
    category: 'YouTube Documentary',
    year: '2024–2025',
    tag: 'Macroeconomic Analysis',
    client: 'ICICI Prudential Mutual Fund',
    role: 'Editorial Story Flow, Data Motion Graphics & Audio Mastering',
    desc: 'A high-retention macroeconomic analysis breakdown edited for ICICI Prudential Mutual Fund. Dynamic pacing, institutional data graphics, and structured storytelling that breaks down complex equity market catalysts for intelligent investors.',
    videoUrl: 'https://www.youtube.com/watch?v=qr7FplzumYY'
  },
  'invesco-parking-money': {
    title: 'Where Should You Park Money for 6 Months or More?',
    category: 'YouTube Documentary',
    year: '2024–2025',
    tag: 'Investor Education & Debt',
    client: 'Invesco Mutual Fund',
    role: 'Editorial Story Flow, Clean Data Graphics & Pacing',
    desc: 'An educational investment guide edited for Invesco Mutual Fund. Simplifying short-term debt allocation, liquid funds, and capital preservation with clear visual comparisons and conversational pacing.',
    videoUrl: 'https://www.youtube.com/watch?v=3bduQgeKAAM'
  },
  'shivohaam-kalki': {
    title: 'KALKI आ चुके हैं — 2032 में Satyug शुरू होगा',
    category: 'Podcast Mastercut',
    tag: 'Podcast Mastercut • Viral',
    client: 'Shivohaam & Vrindda (Body, Mind & Beyond)',
    role: 'Lead Podcast Editor, Reaction Pacing & Sound Design',
    desc: 'High-impact podcast episode edited for Shivohaam & Vrindda. **This video crossed 3 Million+ views on Instagram in just 2 days.** Edited with high-retention conversational pacing, suspense hooks, dynamic multi-camera reaction timing, and atmospheric background score leveling.',
    videoUrl: 'https://www.youtube.com/watch?v=t_wZTZ2-Z1Y'
  },
  'finance-funds': {
    title: '3 Things to Avoid When Setting Up a Family Office',
    category: 'YouTube Documentary',
    year: '2024–2025',
    tag: 'Market & Wealth Storytelling',
    client: 'Motilal Oswal AMC',
    role: 'Editorial Story Flow, Kinetic Graphics & Sound Pacing',
    desc: 'A high-impact wealth management and family office masterclass edited for Motilal Oswal AMC. Engineered with clean financial data motion graphics, crisp pacing, and engaging narrative structure designed for ultra-high-net-worth investors.',
    videoUrl: 'https://www.youtube.com/watch?v=9J-Zbk6ItEQ'
  },
  'finance-compounding': {
    title: '3 Things to Avoid When Setting Up a Family Office',
    category: 'YouTube Documentary',
    year: '2024–2025',
    tag: 'Market & Wealth Storytelling',
    client: 'Motilal Oswal AMC',
    role: 'Editorial Story Flow, Kinetic Graphics & Sound Pacing',
    desc: 'A high-impact wealth management and family office masterclass edited for Motilal Oswal AMC. Engineered with clean financial data motion graphics, crisp pacing, and engaging narrative structure designed for ultra-high-net-worth investors.',
    videoUrl: 'https://www.youtube.com/watch?v=9J-Zbk6ItEQ'
  },
  'invesco-categories-reel': {
    title: 'Mutual Fund Categories to Look for in 2026',
    category: 'Short-Form Reel',
    year: '2024–2025',
    tag: 'Short-Form Reel • 9:16',
    client: 'Invesco Mutual Fund',
    role: 'Hook Crafting, Kinetic Subtitles & Pacing',
    desc: 'High-retention vertical financial reel crafted for Invesco Mutual Fund. Retention-engineered 3-second hook, minimalist kinetic typography, and fast-paced asset category breakdown designed for vertical mobile feeds.',
    videoUrl: 'https://youtube.com/shorts/U-Ek8qG2-IY'
  },
  'podcast-reels': {
    title: 'Mutual Fund Categories to Look for in 2026',
    category: 'Short-Form Reel',
    year: '2024–2025',
    tag: 'Short-Form Reel • 9:16',
    client: 'Invesco Mutual Fund',
    role: 'Hook Crafting, Kinetic Subtitles & Pacing',
    desc: 'High-retention vertical financial reel crafted for Invesco Mutual Fund. Retention-engineered 3-second hook, minimalist kinetic typography, and fast-paced asset category breakdown designed for vertical mobile feeds.',
    videoUrl: 'https://youtube.com/shorts/U-Ek8qG2-IY'
  },
  'vrindda-vision-board': {
    title: 'Stop Making Vision Boards | Do This Instead',
    category: 'Short-Form Reel',
    year: '2024–2025',
    tag: 'Personal Growth & Lifestyle • 9:16',
    client: 'Vrindda Bhatt',
    role: 'Hook Crafting, Kinetic Typography & Sound Design',
    desc: 'A high-retention personal development reel crafted for Vrindda Bhatt. Designed with an intrigue-based contrarian hook, Apple-grade kinetic subtitles, crisp visual match cuts, and dynamic sound design that drives high average watch time.',
    videoUrl: 'https://youtube.com/shorts/0RUhTqSRrz8'
  },
  'podcast-founders': {
    title: 'The Founder & Creator Journey: Multi-Cam Mastercut',
    category: 'Podcast & Reels',
    year: '2024–2025',
    tag: 'Conversational Storytelling',
    client: 'High-Profile Entrepreneurial Show',
    role: 'Multi-Cam Narrative Editing, Reaction Cutting & Sound Pacing',
    desc: 'Pacing dialogue around authentic human reactions. Holds on silent listening moments and delicate conversational shifts to build emotional intimacy and sustained engagement.',
    videoUrl: 'https://www.youtube.com/watch?v=b4_G15F0oRw'
  },
  'ai-cosmic': {
    title: 'Cosmic Odyssey: Deep Space & Sci-Fi Cinematics',
    category: 'AI Visuals',
    year: '2024–2025',
    tag: 'AI Serving Story',
    client: 'Creative Spec / Conceptual Production',
    role: 'Visual Concepting, Scene Synthesis & Filmic Grading',
    desc: 'Atmospheric visual sequencing exploring scale, cosmic stillness, and deep-space discovery, refined with cinematic color grading to strip away synthetic artifacts.',
    videoUrl: 'https://www.youtube.com/watch?v=kJQP7kiw5Fk'
  },
  'ai-industrial': {
    title: 'Future Industry: Autonomous Robotics & Engineering',
    category: 'AI Visuals',
    year: '2024',
    tag: 'Documentary Concept',
    client: 'Industrial & Tech Visualization',
    role: 'Visual Direction, Sequence Assembly & Pacing',
    desc: 'Documentary-paced visual sequencing depicting next-generation industrial manufacturing with crisp compositional balance and tactile audio soundscapes.',
    videoUrl: 'https://www.youtube.com/watch?v=l_8p1Yg2o8A'
  },
  'branding-studio': {
    title: 'Studio Environments & Broadcast Visual Identity',
    category: 'Branding & Studio',
    year: '2024–2025',
    tag: 'Studio Atmosphere',
    client: 'Creator Studios & Episodic Shows',
    role: 'Set Atmosphere Design, Broadcast Packages & Visual Tone',
    desc: 'Virtual podcast sets, lower-thirds toolkits, and broadcast branding designed to elevate interview conversations into premium episodic productions.',
    videoUrl: 'https://www.youtube.com/watch?v=8m9g_ZkXyZ8'
  }
};

const DEFAULT_SERVICES = [
  {
    num: '01 // YOUTUBE EXPLAINERS',
    title: 'YouTube Documentaries & Explainers',
    desc: 'Long-form video essays, educational breakdowns, and story-driven documentaries. Paced with precision to keep viewers engaged and sustain high average view duration.'
  },
  {
    num: '02 // SHORTS & REELS',
    title: 'Viral Reels, Shorts & TikToks',
    desc: 'Retention-engineered vertical content. Powerful 3-second storytelling hooks, clean typography, dynamic sound design, and seamless cuts tailored to maximize algorithm reach.'
  },
  {
    num: '03 // MOTION GRAPHICS',
    title: 'Motion Graphics & Visual Polish',
    desc: 'Clean animated graphics, kinetic callouts, data visualizations, and minimalist lower-thirds designed to clarify complex ideas without overwhelming the viewer.'
  },
  {
    num: '04 // PODCASTS & INTERVIEWS',
    title: 'Podcasts & Interview Mastercuts',
    desc: 'Multi-camera cutting, reaction pacing, and audio balancing for interview shows and creator discussions. Natural conversational cadence and immersive sound design.'
  },
  {
    num: '05 // AI CREATIVE',
    title: 'AI Visuals & Creative Worldbuilding',
    desc: 'Generative cinematic visual backdrops and conceptual imagery to illustrate big abstract concepts, futuristic themes, and high-impact visual sequences.'
  }
];

const DEFAULT_SETTINGS = {
  badge: 'Available for projects',
  heroAccent: 'scale',
  heroSub: 'Explainer videos, high-retention reels, YouTube documentaries, and podcast mastercuts.',
  email: 'collabwithwarish@gmail.com',
  whatsapp: '919905657907',
  aboutLead: 'I am a video editor and visual storyteller. I specialize in high-retention video production for YouTube creators, documentary explainers, podcasts, and social media.',
  aboutRole: 'Full-time Video Editor at Postverse Media',
  aboutPhilosophy: 'Digital video content often gets lost in two extremes: either dry, unengaging recordings or chaotic, over-edited meme montages that distract the viewer. My editorial philosophy focuses on what truly matters: audience comprehension, emotional pacing, and Apple-grade visual polish.'
};

/* --------------------------------------------------------------------------
   1. Security & Authentication
   -------------------------------------------------------------------------- */
function initSecurity() {
  const overlay = document.getElementById('login-overlay');
  const form = document.getElementById('admin-login-form');
  const lockBtn = document.getElementById('admin-lock-btn');

  const savedPass = localStorage.getItem('warish_admin_pass') || DEFAULT_PASS;
  const isUnlocked = sessionStorage.getItem('warish_admin_auth') === 'true';

  if (isUnlocked && overlay) {
    overlay.style.display = 'none';
  }

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const entered = document.getElementById('admin-passcode').value.trim();
    if (entered === savedPass) {
      sessionStorage.setItem('warish_admin_auth', 'true');
      overlay.style.display = 'none';
      showToast('✓ Welcome back, Warish!');
    } else {
      alert('Incorrect passcode. Please try again.');
    }
  });

  lockBtn?.addEventListener('click', () => {
    sessionStorage.removeItem('warish_admin_auth');
    if (overlay) overlay.style.display = 'flex';
  });
}

/* --------------------------------------------------------------------------
   2. Tab Switching
   -------------------------------------------------------------------------- */
function initTabs() {
  const tabs = document.querySelectorAll('.admin-tab');
  const panes = document.querySelectorAll('.tab-pane');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      panes.forEach(p => p.style.display = 'none');

      tab.classList.add('active');
      const targetId = tab.getAttribute('data-tab');
      const targetPane = document.getElementById(targetId);
      if (targetPane) targetPane.style.display = 'block';
    });
  });
}

/* --------------------------------------------------------------------------
   3. Load and Render Data
   -------------------------------------------------------------------------- */
function loadDataAndRender() {
  const storedProjects = JSON.parse(localStorage.getItem('warish_projects')) || DEFAULT_PROJECTS;
  const storedServices = JSON.parse(localStorage.getItem('warish_services')) || DEFAULT_SERVICES;
  const storedSettings = JSON.parse(localStorage.getItem('warish_settings')) || DEFAULT_SETTINGS;

  // Render Projects
  const projectsList = document.getElementById('projects-editor-list');
  if (projectsList) {
    projectsList.innerHTML = '';
    Object.keys(storedProjects).forEach(key => {
      const p = storedProjects[key];
      const card = document.createElement('div');
      card.className = 'project-editor-card';
      card.innerHTML = `
        <div class="project-header-bar">
          <span class="project-key">ID: ${key}</span>
          <span style="font-size: 13px; font-weight: 700; color: #2f6df3;">${p.category || 'General'}</span>
        </div>
        <div class="form-row">
          <div class="form-field" style="grid-column: span 2;">
            <label>Project Title</label>
            <input type="text" class="proj-input" data-key="${key}" data-prop="title" value="${escapeHtml(p.title || '')}">
          </div>
        </div>
        <div class="form-row">
          <div class="form-field" style="grid-column: span 2;">
            <label>Video Link (YouTube URL or Google Drive Share Link)</label>
            <input type="url" class="proj-input" data-key="${key}" data-prop="videoUrl" value="${escapeHtml(p.videoUrl || '')}" placeholder="https://www.youtube.com/... or https://drive.google.com/file/d/...">
          </div>
        </div>
        <div class="form-row">
          <div class="form-field">
            <label>Tag / Badge</label>
            <input type="text" class="proj-input" data-key="${key}" data-prop="tag" value="${escapeHtml(p.tag || '')}">
          </div>
          <div class="form-field">
            <label>Client / Series</label>
            <input type="text" class="proj-input" data-key="${key}" data-prop="client" value="${escapeHtml(p.client || '')}">
          </div>
        </div>
        <div class="form-field">
          <label>Project Description</label>
          <textarea class="proj-input" data-key="${key}" data-prop="desc" rows="3">${escapeHtml(p.desc || '')}</textarea>
        </div>
      `;
      projectsList.appendChild(card);
    });
  }

  // Render Services
  const servicesList = document.getElementById('services-editor-list');
  if (servicesList) {
    servicesList.innerHTML = '';
    storedServices.forEach((s, idx) => {
      const card = document.createElement('div');
      card.className = 'project-editor-card';
      card.innerHTML = `
        <div class="project-header-bar">
          <span class="project-key">Service #${idx + 1}</span>
          <input type="text" class="service-input" data-idx="${idx}" data-prop="num" value="${escapeHtml(s.num)}" style="font-size: 12px; font-weight: 700; width: 200px;">
        </div>
        <div class="form-field" style="margin-bottom: 12px;">
          <label>Service Title</label>
          <input type="text" class="service-input" data-idx="${idx}" data-prop="title" value="${escapeHtml(s.title)}">
        </div>
        <div class="form-field">
          <label>Service Description</label>
          <textarea class="service-input" data-idx="${idx}" data-prop="desc" rows="3">${escapeHtml(s.desc)}</textarea>
        </div>
      `;
      servicesList.appendChild(card);
    });
  }

  // Settings
  setVal('setting-badge', storedSettings.badge);
  setVal('setting-hero-accent', storedSettings.heroAccent);
  setVal('setting-hero-sub', storedSettings.heroSub);
  setVal('setting-email', storedSettings.email);
  setVal('setting-whatsapp', storedSettings.whatsapp);
  setVal('setting-about-lead', storedSettings.aboutLead);
  setVal('setting-about-role', storedSettings.aboutRole);
  setVal('setting-about-philosophy', storedSettings.aboutPhilosophy);
}

function setVal(id, val) {
  const el = document.getElementById(id);
  if (el && val !== undefined) el.value = val;
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/* --------------------------------------------------------------------------
   4. Save and Persistence Actions
   -------------------------------------------------------------------------- */
function initActions() {
  const saveBtn = document.getElementById('btn-save-all');
  const resetBtn = document.getElementById('btn-reset-defaults');
  const exportBtn = document.getElementById('btn-export-json');
  const updatePassBtn = document.getElementById('btn-update-pass');

  saveBtn?.addEventListener('click', () => {
    // Collect projects
    const currentProjects = JSON.parse(localStorage.getItem('warish_projects')) || DEFAULT_PROJECTS;
    document.querySelectorAll('.proj-input').forEach(inp => {
      const key = inp.getAttribute('data-key');
      const prop = inp.getAttribute('data-prop');
      if (currentProjects[key]) {
        currentProjects[key][prop] = inp.value.trim();
      }
    });
    localStorage.setItem('warish_projects', JSON.stringify(currentProjects));

    // Collect services
    const currentServices = JSON.parse(localStorage.getItem('warish_services')) || DEFAULT_SERVICES;
    document.querySelectorAll('.service-input').forEach(inp => {
      const idx = parseInt(inp.getAttribute('data-idx'), 10);
      const prop = inp.getAttribute('data-prop');
      if (currentServices[idx]) {
        currentServices[idx][prop] = inp.value.trim();
      }
    });
    localStorage.setItem('warish_services', JSON.stringify(currentServices));

    // Collect settings
    const settings = {
      badge: document.getElementById('setting-badge')?.value.trim() || 'Available for projects',
      heroAccent: document.getElementById('setting-hero-accent')?.value.trim() || 'scale',
      heroSub: document.getElementById('setting-hero-sub')?.value.trim() || '',
      email: document.getElementById('setting-email')?.value.trim() || 'collabwithwarish@gmail.com',
      whatsapp: document.getElementById('setting-whatsapp')?.value.trim() || '919905657907',
      aboutLead: document.getElementById('setting-about-lead')?.value.trim() || '',
      aboutRole: document.getElementById('setting-about-role')?.value.trim() || '',
      aboutPhilosophy: document.getElementById('setting-about-philosophy')?.value.trim() || ''
    };
    localStorage.setItem('warish_settings', JSON.stringify(settings));

    showToast('✓ All changes saved and published to live website!');
  });

  resetBtn?.addEventListener('click', () => {
    if (confirm('Are you sure you want to restore default factory content? Any custom edits will be reset.')) {
      localStorage.removeItem('warish_projects');
      localStorage.removeItem('warish_services');
      localStorage.removeItem('warish_settings');
      loadDataAndRender();
      showToast('✓ Restored factory defaults!');
    }
  });

  exportBtn?.addEventListener('click', () => {
    const backup = {
      projects: JSON.parse(localStorage.getItem('warish_projects')) || DEFAULT_PROJECTS,
      services: JSON.parse(localStorage.getItem('warish_services')) || DEFAULT_SERVICES,
      settings: JSON.parse(localStorage.getItem('warish_settings')) || DEFAULT_SETTINGS
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  });

  updatePassBtn?.addEventListener('click', () => {
    const p1 = document.getElementById('setting-new-pass').value.trim();
    const p2 = document.getElementById('setting-confirm-pass').value.trim();
    if (!p1 || p1.length < 4) {
      alert('Passcode must be at least 4 characters long.');
      return;
    }
    if (p1 !== p2) {
      alert('Passcodes do not match.');
      return;
    }
    localStorage.setItem('warish_admin_pass', p1);
    document.getElementById('setting-new-pass').value = '';
    document.getElementById('setting-confirm-pass').value = '';
    showToast('✓ Admin passcode updated successfully!');
  });
}

function showToast(msg) {
  const toast = document.getElementById('status-toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.style.display = 'block';
  setTimeout(() => {
    toast.style.display = 'none';
  }, 3500);
}

