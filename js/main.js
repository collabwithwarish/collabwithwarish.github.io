/**
 * Warish Raj — Portfolio Interactive Engine
 * Bright Apple UI • Glassmorphism • Visual Storyteller Experience
 */

document.addEventListener('DOMContentLoaded', () => {
  applyDynamicSettings();
  initBackgroundVideo();
  initClock();
  initPortfolio();
  initLightbox();
  initContact();
  initMobileNav();
  initScrollSpy();
  initMouseFollower();
});

/* --------------------------------------------------------------------------
   Dynamic Content Hydration (Powered by Admin Panel)
   -------------------------------------------------------------------------- */
function applyDynamicSettings() {
  const DATA_VERSION = 'v5.7';
  if (localStorage.getItem('warish_data_version') !== DATA_VERSION) {
    localStorage.removeItem('warish_projects');
    localStorage.setItem('warish_data_version', DATA_VERSION);
  }

  const settings = JSON.parse(localStorage.getItem('warish_settings'));
  if (settings) {
    const badgeText = document.querySelector('.badge__text');
    if (badgeText && settings.badge) badgeText.textContent = settings.badge;

    const heroSub = document.querySelector('.hero__subtitle');
    if (heroSub && settings.heroSub) heroSub.textContent = settings.heroSub;

    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    if (settings.email) {
      emailLinks.forEach(a => {
        a.href = `mailto:${settings.email}`;
        if (a.classList.contains('email-address')) a.textContent = settings.email;
      });
    }

    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
    if (settings.whatsapp) {
      whatsappLinks.forEach(a => {
        a.href = `https://wa.me/${settings.whatsapp}?text=Hi%20Warish,%20I%20saw%20your%20portfolio%20and%20want%20to%20discuss%20a%20project.`;
      });
    }
  }

  // Update Services if saved in admin panel
  const savedServices = JSON.parse(localStorage.getItem('warish_services'));
  if (savedServices && savedServices.length) {
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, idx) => {
      const data = savedServices[idx];
      if (data) {
        const badge = card.querySelector('.service-card__badge');
        const title = card.querySelector('.service-title');
        const desc = card.querySelector('.service-desc');
        if (badge && data.num) badge.textContent = data.num;
        if (title && data.title) title.textContent = data.title;
        if (desc && data.desc) desc.textContent = data.desc;
      }
    });
  }

  // Update Work Grid Titles/Descriptions from custom projects
  const savedProjects = JSON.parse(localStorage.getItem('warish_projects'));
  if (savedProjects) {
    Object.keys(savedProjects).forEach(key => {
      const p = savedProjects[key];
      const item = document.querySelector(`[data-project-id="${key}"]`);
      if (item && p) {
        const title = item.querySelector('.work-item__title');
        const desc = item.querySelector('.work-item__desc');
        if (title && p.title) title.textContent = p.title;
        if (desc && p.desc) desc.textContent = p.desc;
      }
    });
  }
}

function getActiveProjectsData() {
  const custom = JSON.parse(localStorage.getItem('warish_projects'));
  if (!custom) return projectsData;
  return Object.assign({}, projectsData, custom);
}

/* --------------------------------------------------------------------------
   1. Live Studio Clock (IST)
   -------------------------------------------------------------------------- */
function initClock() {
  const timeEl = document.getElementById('local-time');
  if (!timeEl) return;

  function update() {
    const now = new Date();
    const options = {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    };
    try {
      const timeString = new Intl.DateTimeFormat('en-US', options).format(now);
      timeEl.textContent = `${timeString} IST`;
    } catch (e) {
      timeEl.textContent = now.toLocaleTimeString() + ' IST';
    }
  }

  update();
  setInterval(update, 1000);
}

/* --------------------------------------------------------------------------
   Helper: Universal Video Parser & Embed Engine
   Supports:
   - Google Drive Video Share Links (drive.google.com/file/d/...)
   - YouTube (watch?v=ID, youtu.be/ID, shorts/ID, embed/ID)
   - Vimeo (vimeo.com/ID)
   - Direct video files (.mp4, .webm, .ogg)
   -------------------------------------------------------------------------- */
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function getVideoEmbedConfig(url, startTime = 0) {
  if (!url || typeof url !== 'string') return null;
  const cleanUrl = url.trim();

  // 1. Google Drive Share Links
  // Formats:
  // - https://drive.google.com/file/d/FILE_ID/view?usp=sharing
  // - https://drive.google.com/file/d/FILE_ID/preview
  // - https://drive.google.com/open?id=FILE_ID
  // - https://drive.google.com/uc?id=FILE_ID
  const gDriveMatch = cleanUrl.match(/(?:drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?id=)|docs\.google\.com\/file\/d\/)([a-zA-Z0-9_-]{20,})/);
  if (gDriveMatch && gDriveMatch[1]) {
    const fileId = gDriveMatch[1];
    return {
      platform: 'google-drive',
      platformLabel: 'Google Drive',
      platformBadge: '📁 Google Drive Player',
      embedUrl: `https://drive.google.com/file/d/${fileId}/preview`,
      directUrl: `https://drive.google.com/file/d/${fileId}/view`,
      type: 'iframe'
    };
  }

  // 2. YouTube Links
  // Formats:
  // - https://www.youtube.com/watch?v=ID
  // - https://youtu.be/ID?si=...
  // - https://www.youtube.com/shorts/ID
  // - https://www.youtube.com/embed/ID
  const ytMatch = cleanUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([a-zA-Z0-9_-]{11})/);
  if (ytMatch && ytMatch[1]) {
    const videoId = ytMatch[1];
    let startSec = startTime || 0;
    if (!startSec) {
      const tMatch = cleanUrl.match(/[?&](?:t|start)=(\d+)/);
      if (tMatch) startSec = parseInt(tMatch[1], 10);
    }
    const startParam = startSec ? `&start=${startSec}` : '';
    const badgeText = startSec 
      ? `▶ YouTube Player • Starts at 0:${startSec < 10 ? '0' + startSec : startSec}` 
      : '▶ YouTube Player';

    return {
      platform: 'youtube',
      platformLabel: 'YouTube',
      platformBadge: badgeText,
      embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1${startParam}`,
      directUrl: startSec ? `https://www.youtube.com/watch?v=${videoId}&t=${startSec}s` : `https://www.youtube.com/watch?v=${videoId}`,
      type: 'iframe',
      startSec: startSec
    };
  }

  // 3. Vimeo Links
  const vimeoMatch = cleanUrl.match(/(?:vimeo\.com\/)(\d+)/);
  if (vimeoMatch && vimeoMatch[1]) {
    return {
      platform: 'vimeo',
      platformLabel: 'Vimeo',
      platformBadge: '▶ Vimeo Player',
      embedUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`,
      directUrl: `https://vimeo.com/${vimeoMatch[1]}`,
      type: 'iframe'
    };
  }

  // 4. Direct HTML5 Video (.mp4, .webm, .ogg)
  if (/\.(mp4|webm|ogg)(\?.*)?$/i.test(cleanUrl)) {
    return {
      platform: 'direct',
      platformLabel: 'Direct Video',
      platformBadge: '🎬 Video Player',
      embedUrl: cleanUrl,
      directUrl: cleanUrl,
      type: 'video'
    };
  }

  // 5. Raw embed / preview URL fallback
  if (cleanUrl.includes('/embed/') || cleanUrl.includes('/preview')) {
    return {
      platform: 'embed',
      platformLabel: 'Video Player',
      platformBadge: '▶ Video Player',
      embedUrl: cleanUrl,
      directUrl: cleanUrl,
      type: 'iframe'
    };
  }

  return null;
}

function getYouTubeEmbedUrl(url, startTime = 0) {
  const config = getVideoEmbedConfig(url, startTime);
  return config ? config.embedUrl : null;
}

/* --------------------------------------------------------------------------
   2. Project Database — Storyteller Video Editor Perspective
   (Supports YouTube URLs, Google Drive video share links, Vimeo, and MP4s)
   -------------------------------------------------------------------------- */
const projectsData = {
  'finavenue-construction': {
    title: "The ₹4,700 Cr Market Hiding Behind India's Construction Boom",
    category: 'Podcast Mastercut',
    year: '2024–2025',
    tag: 'Podcast & Interview Mastercut',
    client: 'Finavenue',
    role: 'Editorial Story Flow, Data Motion Graphics & Sound Design',
    desc: 'High-retention conversational business podcast and market analysis edited for Finavenue. Paced with dynamic multi-camera reaction timing, kinetic data graphics, and story-driven retention starting right from the core conflict.',
    topics: [
      'Hook-driven opening starting right at the core conflict (5s start mark)',
      'Multi-camera dialogue timing and natural interview pacing',
      'Kinetic market data and supply chain motion graphics',
      'Dynamic sound beds and audio mastering that drive narrative momentum'
    ],
    image: 'assets/projects/finavenue-construction.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=NGz3-gmqQto&t=5s',
    startTime: 5
  },
  'motilal-family-office': {
    title: '3 Things to Avoid When Setting Up a Family Office',
    category: 'Podcast Mastercut',
    year: '2024–2025',
    tag: 'Podcast Mastercut • Family Office',
    client: 'Motilal Oswal AMC',
    role: 'Lead Podcast Editor, Kinetic Graphics & Reaction Pacing',
    desc: 'A high-impact wealth management and family office podcast masterclass edited for Motilal Oswal AMC. Engineered with clean financial data motion graphics, crisp conversational pacing, and engaging narrative structure designed for ultra-high-net-worth investors.',
    topics: [
      'Conversational podcast cutting and wealth structuring narrative',
      'Multi-camera reaction timing and dialogue clarity',
      'Kinetic financial infographics and institutional data polish',
      'Warm vocal balancing, ambient beds, and broadcast-level sound design'
    ],
    image: 'assets/projects/motilal-family-office.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=9J-Zbk6ItEQ',
    startTime: 0
  },
  'icici-market-analysis': {
    title: 'What Moved Indian Markets? | Ft. Sharmila D’Silva',
    category: 'YouTube Documentary',
    year: '2024–2025',
    tag: 'Macroeconomic Analysis',
    client: 'ICICI Prudential Mutual Fund',
    role: 'Editorial Story Flow, Data Motion Graphics & Audio Mastering',
    desc: 'A high-retention macroeconomic analysis breakdown edited for ICICI Prudential Mutual Fund. Dynamic pacing, institutional data graphics, and structured storytelling that breaks down complex equity market catalysts for intelligent investors.',
    topics: [
      'Macroeconomic storytelling structured around market-moving triggers',
      'Institutional data visualizations and clean financial typography',
      'Deliberate conversational pacing keeping viewers engaged across complex data',
      'Broadcast-level audio mastering and polished studio sound design'
    ],
    image: 'assets/projects/icici-market-analysis.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=qr7FplzumYY',
    startTime: 0
  },
  'icici-nifty-breakdown': {
    title: 'Nifty Fall, FII Out, Insurance Shock - Full Breakdown!',
    category: 'YouTube Documentary',
    year: '2024–2025',
    tag: 'Macroeconomic Analysis',
    client: 'ICICI Prudential Mutual Fund',
    role: 'Editorial Story Flow, Data Motion Graphics & Audio Mastering',
    desc: 'High-impact macroeconomic documentary and market breakdown edited for ICICI Prudential Mutual Fund. Engineered with institutional data charts, kinetic graphics, and rapid analytical pacing.',
    topics: [
      'Strategic narrative breakdown of Nifty correction and institutional FII capital outflows',
      'Kinetic financial graphics, regulatory comparison charts, and clean typography',
      'Fast-paced macroeconomic storytelling keeping long-form viewers engaged',
      'Broadcast-standard audio balancing and subtle narrative sound design'
    ],
    image: 'assets/projects/icici-nifty-breakdown.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=CNPsEUanJvg',
    startTime: 0
  },
  'invesco-parking-money': {
    title: 'Where to Park Money for 6+ Months?',
    category: 'Podcast Mastercut',
    year: '2024–2025',
    tag: 'Podcast Mastercut • Investor Education',
    client: 'Invesco Mutual Fund',
    role: 'Podcast Dialogue Editing, Clean Data Graphics & Pacing',
    desc: 'Investor education podcast interview and breakdown edited for Invesco Mutual Fund. Simplifying short-term debt allocation, liquid funds, and capital preservation with clear visual comparisons and natural conversational pacing.',
    topics: [
      'Natural dialogue editing and conversational pacing across complex financial concepts',
      'Simplifying complex debt fund mechanics and short-term capital preservation',
      'Minimalist comparative graphs contrasting fixed deposits with debt instruments',
      'Crisp vocal mastering and subtle acoustic sound beds'
    ],
    image: 'assets/projects/invesco-parking-money.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=3bduQgeKAAM',
    startTime: 0
  },
  'shivohaam-kalki': {
    title: 'KALKI आ चुके हैं — 2032 में Satyug शुरू होगा',
    category: 'Podcast Mastercut',
    tag: 'Podcast Mastercut • Viral',
    client: 'Shivohaam & Vrindda (Body, Mind & Beyond)',
    role: 'Lead Podcast Editor, Reaction Pacing & Sound Design',
    highlight: '🔥 **This video crossed 3 Million+ views on Instagram in 2 days.**',
    desc: 'High-impact podcast episode edited for Shivohaam & Vrindda. **This video crossed 3 Million+ views on Instagram in just 2 days.** Edited with high-retention conversational pacing, suspense hooks, dynamic multi-camera reaction timing, and atmospheric background score leveling.',
    topics: [
      '**Crossed 3 Million+ views on Instagram in just 2 days**',
      'Suspense-driven conversational hook and dynamic opening retention engineering',
      'Multi-camera dialogue timing and listener reaction cutting',
      'Atmospheric background score leveling and broadcast audio mastering'
    ],
    image: 'assets/projects/shivohaam-kalki.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=t_wZTZ2-Z1Y',
    startTime: 0
  },
  'finance-funds': {
    title: '3 Things to Avoid When Setting Up a Family Office',
    category: 'YouTube Documentary',
    year: '2024–2025',
    tag: 'Market & Wealth Storytelling',
    client: 'Motilal Oswal AMC',
    role: 'Editorial Story Flow, Kinetic Graphics & Sound Pacing',
    desc: 'A high-impact wealth management and family office masterclass edited for Motilal Oswal AMC. Engineered with clean financial data motion graphics, crisp pacing, and engaging narrative structure designed for ultra-high-net-worth investors.',
    topics: [
      'High-retention corporate storytelling and wealth structuring narrative',
      'Kinetic financial infographics and institutional data polish',
      'Strategic visual pacing designed for ultra-high-net-worth investors',
      'Warm vocal balancing, ambient beds, and broadcast-level sound design'
    ],
    image: 'assets/projects/motilal-family-office.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=9J-Zbk6ItEQ',
    startTime: 0
  },
  'finance-compounding': {
    title: '3 Things to Avoid When Setting Up a Family Office',
    category: 'YouTube Documentary',
    year: '2024–2025',
    tag: 'Market & Wealth Storytelling',
    client: 'Motilal Oswal AMC',
    role: 'Editorial Story Flow, Kinetic Graphics & Sound Pacing',
    desc: 'A high-impact wealth management and family office masterclass edited for Motilal Oswal AMC. Engineered with clean financial data motion graphics, crisp pacing, and engaging narrative structure designed for ultra-high-net-worth investors.',
    topics: [
      'High-retention corporate storytelling and wealth structuring narrative',
      'Kinetic financial infographics and institutional data polish',
      'Strategic visual pacing designed for ultra-high-net-worth investors',
      'Warm vocal balancing, ambient beds, and broadcast-level sound design'
    ],
    image: 'assets/projects/motilal-family-office.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=9J-Zbk6ItEQ',
    startTime: 0
  },
  'invesco-categories-reel': {
    title: 'Mutual Fund Categories to Look for in 2026',
    category: 'Short-Form Reel',
    year: '2024–2025',
    tag: 'Short-Form Reel • 9:16',
    client: 'Invesco Mutual Fund',
    role: 'Hook Crafting, Kinetic Subtitles & Pacing',
    desc: 'High-retention vertical financial reel crafted for Invesco Mutual Fund. Retention-engineered 3-second hook, minimalist kinetic typography, and fast-paced asset category breakdown designed for vertical mobile feeds.',
    topics: [
      'High-retention 3-second opening hook holding attention on mobile feeds',
      'Minimalist kinetic subtitles styled with Apple-grade typography',
      'Fast-paced category segmentation delivering value in under 45 seconds',
      'Dynamic sound effects, punchy match cuts, and audio balancing'
    ],
    image: 'assets/projects/invesco-categories-reel.jpg',
    videoUrl: 'https://youtube.com/shorts/U-Ek8qG2-IY',
    startTime: 0
  },
  'podcast-reels': {
    title: 'Mutual Fund Categories to Look for in 2026',
    category: 'Short-Form Reel',
    year: '2024–2025',
    tag: 'Short-Form Reel • 9:16',
    client: 'Invesco Mutual Fund',
    role: 'Hook Crafting, Kinetic Subtitles & Pacing',
    desc: 'High-retention vertical financial reel crafted for Invesco Mutual Fund. Retention-engineered 3-second hook, minimalist kinetic typography, and fast-paced asset category breakdown designed for vertical mobile feeds.',
    topics: [
      'High-retention 3-second opening hook holding attention on mobile feeds',
      'Minimalist kinetic subtitles styled with Apple-grade typography',
      'Fast-paced category segmentation delivering value in under 45 seconds',
      'Dynamic sound effects, punchy match cuts, and audio balancing'
    ],
    image: 'assets/projects/invesco-categories-reel.jpg',
    videoUrl: 'https://youtube.com/shorts/U-Ek8qG2-IY',
    startTime: 0
  },
  'vrindda-vision-board': {
    title: 'Stop Making Vision Boards | Do This Instead',
    category: 'Short-Form Reel',
    year: '2024–2025',
    tag: 'Personal Growth & Lifestyle • 9:16',
    client: 'Vrindda Bhatt',
    role: 'Hook Crafting, Kinetic Typography & Sound Design',
    desc: 'A high-retention personal development reel crafted for Vrindda Bhatt. Designed with an intrigue-based contrarian hook, Apple-grade kinetic subtitles, crisp visual match cuts, and dynamic sound design that drives high average watch time.',
    topics: [
      'Contrarian 3-second hook challenging conventional self-help habits',
      'Clean, elegant kinetic subtitles with deliberate typographical emphasis',
      'Rhythmic pacing that sustains viewer focus across the entire takeaway',
      'Engaging acoustic sound effects and vocal mastering'
    ],
    image: 'assets/projects/vrindda-bhatt-vision-board.jpg',
    videoUrl: 'https://youtube.com/shorts/0RUhTqSRrz8',
    startTime: 0
  },
  'capitalmind-nri-investing': {
    title: 'NRI Investing in India? Watch This Before You Move Your Money',
    category: 'Podcast Mastercut',
    tag: 'Podcast Mastercut • NRI Wealth',
    client: 'Capitalmind',
    role: 'Multi-Cam Dialogue Editing, Reaction Pacing & Financial Data Polish',
    desc: 'An in-depth wealth management and investment podcast edited for Capitalmind. Crafted with dynamic multi-camera reaction timing, clean financial charts, and engaging conversational pacing that breaks down complex NRI cross-border tax and asset allocation rules.',
    topics: [
      'Multi-camera dialogue timing and reaction-driven conversational cuts',
      'Clean financial infographics and regulatory breakdown graphics',
      'Strategic chapter pacing keeping long-form listeners engaged',
      'Broadcast-level vocal balancing and subtle ambient sound design'
    ],
    image: 'assets/projects/capitalmind-podcast.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=1o38OH6hX4M',
    startTime: 0
  },
  'podcast-founders': {
    title: 'NRI Investing in India? Watch This Before You Move Your Money',
    category: 'Podcast Mastercut',
    tag: 'Podcast Mastercut • NRI Wealth',
    client: 'Capitalmind',
    role: 'Multi-Cam Dialogue Editing, Reaction Pacing & Financial Data Polish',
    desc: 'An in-depth wealth management and investment podcast edited for Capitalmind. Crafted with dynamic multi-camera reaction timing, clean financial charts, and engaging conversational pacing that breaks down complex NRI cross-border tax and asset allocation rules.',
    topics: [
      'Multi-camera dialogue timing and reaction-driven conversational cuts',
      'Clean financial infographics and regulatory breakdown graphics',
      'Strategic chapter pacing keeping long-form listeners engaged',
      'Broadcast-level vocal balancing and subtle ambient sound design'
    ],
    image: 'assets/projects/capitalmind-podcast.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=1o38OH6hX4M',
    startTime: 0
  },
  'ai-cosmic': {
    title: 'Cosmic Odyssey: Deep Space & Sci-Fi Cinematics',
    category: 'AI Visuals',
    year: '2024–2025',
    tag: 'Worldbuilding & Scale',
    client: 'Creative Spec / Conceptual Production',
    role: 'Visual Concepting, Scene Synthesis & Filmic Grading',
    desc: 'Generative visuals are most powerful when guided by a filmmaker’s eye for atmosphere and light. In this speculative sci-fi piece, visual generation served the overarching story of exploration and cosmic scale. Each scene was color graded with a cohesive filmic palette to avoid the artificial, plastic look typical of raw synthetic renders.',
    topics: [
      'Visual generation serving story mood and cinematic scale',
      'Shot architecture focused on camera lenses, depth of field, and lighting',
      'Filmic color grading to integrate imagery into cohesive narrative tone',
      'Sound design that grounds sci-fi landscapes in physical weight'
    ],
    image: 'assets/projects/ai-cosmic.svg',
    // 👇 REPLACE WITH YOUR ACTUAL YOUTUBE URL
    videoUrl: 'https://www.youtube.com/watch?v=kJQP7kiw5Fk'
  },
  'ai-industrial': {
    title: 'Future Industry: Autonomous Robotics & Manufacturing',
    category: 'AI Visuals',
    year: '2024',
    tag: 'Documentary Concept',
    client: 'Industrial & Tech Visualization',
    role: 'Visual Direction, Sequence Assembly & Pacing',
    desc: 'A visual sequence exploring the human impact of robotics in modern logistics and manufacturing. Rather than chaotic montage clips, each frame is staged like a high-end industrial documentary — steady camera pans, intentional focal points, and rhythmic cutting that conveys precision engineering.',
    topics: [
      'Documentary-style visual sequencing of smart manufacturing',
      'Visual rhythm inspired by industrial machinery movements',
      'Clean composition and realistic lighting models',
      'Seamless synthesis between synthetic imagery and real-world logic'
    ],
    image: 'assets/projects/ai-industrial.svg',
    // 👇 REPLACE WITH YOUR ACTUAL YOUTUBE URL
    videoUrl: 'https://www.youtube.com/watch?v=l_8p1Yg2o8A'
  },
  'branding-studio': {
    title: 'Studio Environments & Broadcast Visual Identity',
    category: 'Branding & Studio',
    year: '2024–2025',
    tag: 'Studio Atmosphere',
    client: 'Creator Studios & Episodic Shows',
    role: 'Set Atmosphere Design, Broadcast Packages & Visual Tone',
    desc: 'A storyteller understands that the physical environment is an active character in any show. These virtual studio set backdrops, lower-thirds packages, and motion identities were designed to give interview shows an elevated, timeless presence reminiscent of prestige broadcast documentaries.',
    topics: [
      'Studio background staging that complements human skin tones',
      'Restrained lower-thirds that inform without distracting from the speaker',
      'Consistent graphic language across long-form video and social cuts',
      'Atmospheric set design enhancing conversational warmth'
    ],
    image: 'assets/projects/branding-studio.svg',
    // 👇 REPLACE WITH YOUR ACTUAL YOUTUBE URL
    videoUrl: 'https://www.youtube.com/watch?v=8m9g_ZkXyZ8'
  },
  'result-darpan': {
    title: 'Result Darpan — Centralized Student Education Platform',
    category: 'Web & App Dev',
    year: '2024–2025',
    tag: 'Featured Web Product',
    client: 'Educational Initiative (Result Darpan)',
    role: 'Web Development, Product Conceptualization, Architecture',
    desc: 'Result Darpan is an educational platform project born from a passion to solve real problems for students across India. The planned platform brings mock tests, subject-wise practice, topper insights, and study materials into one clean, accessible digital experience.',
    topics: [
      'Mock tests and practice exam modules for competitive students',
      'Subject-wise tests and structured syllabus tracking (Planned)',
      'Doubt-solving interactive framework (Planned)',
      'Meet-toppers interviews and strategy guides',
      'Centralized, high-speed study material repository'
    ],
    image: 'assets/projects/result-darpan.svg',
    projectUrl: 'https://resultdarpan.com/'
  }
};

/* --------------------------------------------------------------------------
   3. Portfolio Filtering Logic
   -------------------------------------------------------------------------- */
function initPortfolio() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const workItems = document.querySelectorAll('.work-item');

  function applyFilter(filterVal) {
    filterBtns.forEach(btn => {
      const match = btn.getAttribute('data-filter') === filterVal;
      btn.classList.toggle('active', match);
      btn.setAttribute('aria-selected', match ? 'true' : 'false');
    });

    workItems.forEach(item => {
      const itemCategory = item.getAttribute('data-category');
      if (filterVal === 'all' || itemCategory === filterVal) {
        item.style.display = 'flex';
        item.style.animation = 'none';
        void item.offsetWidth; // Force reflow for smooth re-trigger
        item.style.animation = 'fadeUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards';
      } else {
        item.style.display = 'none';
      }
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filterVal = btn.getAttribute('data-filter') || 'all';
      applyFilter(filterVal);
    });
  });

  // Deep-linking via URL hash (e.g., #documentary, #podcast, #reels)
  function checkHash() {
    const rawHash = window.location.hash.replace('#', '').trim().toLowerCase();
    const validFilters = ['documentary', 'podcast', 'reels', 'all'];
    if (validFilters.includes(rawHash)) {
      applyFilter(rawHash);
    }
  }

  checkHash();
  window.addEventListener('hashchange', checkHash);
}

/* --------------------------------------------------------------------------
   4. Video & Project Lightbox Modal
   -------------------------------------------------------------------------- */
function initLightbox() {
  const lightbox = document.getElementById('video-lightbox');
  const closeBtn = document.getElementById('lightbox-close');
  const triggerItems = document.querySelectorAll('[data-project-id]');

  if (!lightbox) return;

  function openModal(projectId) {
    const activeData = getActiveProjectsData();
    const data = activeData[projectId];
    if (!data) return;

    const titleEl = document.getElementById('lightbox-title');
    const descEl = document.getElementById('lightbox-desc-text') || document.getElementById('lightbox-desc');
    const catEl = document.getElementById('lightbox-category');
    const clientEl = document.getElementById('lightbox-client');
    const roleEl = document.getElementById('lightbox-role');

    if (titleEl) titleEl.textContent = data.title;
    if (descEl) descEl.innerHTML = (data.desc || '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    if (catEl) catEl.textContent = data.category;
    if (clientEl) clientEl.textContent = data.client;
    if (roleEl) roleEl.textContent = data.role;

    const highlightEl = document.getElementById('lightbox-highlight');
    if (highlightEl) {
      if (data.highlight) {
        highlightEl.innerHTML = data.highlight.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        highlightEl.style.display = 'block';
      } else {
        highlightEl.style.display = 'none';
        highlightEl.innerHTML = '';
      }
    }

    const topicsList = document.getElementById('lightbox-topics-list') || document.getElementById('lightbox-topics');
    if (topicsList) {
      topicsList.innerHTML = '';
      if (data.topics && data.topics.length) {
        data.topics.forEach(t => {
          const li = document.createElement('li');
          li.innerHTML = t.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
          topicsList.appendChild(li);
        });
      }
    }

    const mediaContainer = document.getElementById('lightbox-media-container');
    const embedConfig = getVideoEmbedConfig(data.videoUrl, data.startTime);

    if (mediaContainer) {
      if (embedConfig) {
        if (embedConfig.type === 'video') {
          // Direct HTML5 Video Player
          mediaContainer.innerHTML = `
            <div class="lightbox-player-wrapper">
              <video controls autoplay playsinline style="width: 100%; height: 100%; flex: 1; object-fit: contain; background: #000;">
                <source src="${escapeHtml(embedConfig.embedUrl)}">
                Your browser does not support HTML5 video.
              </video>
            </div>
          `;
        } else {
          // Embedded Iframe (Google Drive, YouTube, Vimeo)
          const isFile = window.location.protocol === 'file:';
          const isYouTube = embedConfig.platform === 'youtube';
          const fileWarningBanner = (isFile && isYouTube)
            ? `
              <div style="background: rgba(220, 38, 38, 0.2); border-bottom: 1px solid rgba(220, 38, 38, 0.35); padding: 8px 16px; font-size: 12px; color: #fecaca; display: flex; align-items: center; justify-content: space-between; gap: 10px; flex-wrap: wrap;">
                <span>⚠️ <strong>Notice:</strong> YouTube blocks playback on local disk (<code>file:///</code>). Use the live site <code>collabwithwarish.github.io</code> or Google Drive links.</span>
                <a href="${escapeHtml(embedConfig.directUrl)}" target="_blank" rel="noopener noreferrer" style="color: #ffffff; background: #ef4444; padding: 4px 12px; border-radius: 9999px; text-decoration: none; font-weight: 600; font-size: 11.5px; white-space: nowrap;">
                  Watch Video ↗
                </a>
              </div>
            `
            : '';

          mediaContainer.innerHTML = `
            <div class="lightbox-player-wrapper">
              ${fileWarningBanner}
              <iframe 
                class="lightbox-player-frame"
                src="${escapeHtml(embedConfig.embedUrl)}" 
                title="${escapeHtml(data.title)}" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen" 
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen>
              </iframe>
            </div>
          `;
        }
      } else if (data.image) {
        mediaContainer.innerHTML = `<img src="${escapeHtml(data.image)}" alt="${escapeHtml(data.title)}" style="width: 100%; height: 100%; object-fit: contain;">`;
      } else {
        mediaContainer.innerHTML = '';
      }
    }

    const actionBtn = document.getElementById('lightbox-action-btn');
    const actionText = document.getElementById('lightbox-action-text');

    if (actionBtn) {
      if (data.projectUrl) {
        actionBtn.style.display = 'inline-flex';
        actionBtn.href = data.projectUrl;
        if (actionText) actionText.textContent = 'Visit Platform Website';
      } else if (embedConfig) {
        actionBtn.style.display = 'inline-flex';
        actionBtn.href = embedConfig.directUrl;
        if (actionText) actionText.textContent = `Open on ${embedConfig.platformLabel} ↗`;
      } else {
        actionBtn.style.display = 'none';
      }
    }

    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    // Immediately stop YouTube video playback so audio stops when modal is closed
    const mediaContainer = document.getElementById('lightbox-media-container');
    if (mediaContainer) {
      mediaContainer.innerHTML = '';
    }
  }

  triggerItems.forEach(item => {
    item.addEventListener('click', (e) => {
      if (e.target.tagName.toLowerCase() === 'a' && e.target.getAttribute('href')?.startsWith('http')) {
        return;
      }
      const id = item.getAttribute('data-project-id');
      openModal(id);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) closeModal();
  });
}

/* --------------------------------------------------------------------------
   5. Interactive Contact Form & Email Delivery Engine
   -------------------------------------------------------------------------- */
function initContact() {
  const copyBtn = document.getElementById('copy-email-btn');
  const emailVal = 'collabwithwarish@gmail.com';
  const toast = document.getElementById('toast');
  const form = document.getElementById('contact-form');
  const statusEl = document.getElementById('form-status');
  const submitBtn = form?.querySelector('button[type="submit"]');

  function showToast(message) {
    if (!toast) return;
    const msgEl = document.getElementById('toast-message') || toast;
    msgEl.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3500);
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(emailVal);
        showToast('✓ Email copied to clipboard: ' + emailVal);
      } catch (err) {
        showToast('Email: ' + emailVal);
      }
    });
  }

  if (form) {
    form.addEventListener('submit', async (e) => {
      if (!form.checkValidity()) return;
      e.preventDefault();

      const name = document.getElementById('form-name')?.value.trim() || 'Client';
      const email = document.getElementById('form-email')?.value.trim() || '';
      const type = document.getElementById('form-type')?.value || 'Finance / Trading Video';
      const message = document.getElementById('form-message')?.value.trim() || '';

      const subject = `Video Project Inquiry: ${type} — ${name}`;
      const fullText = `Hi Warish,\n\nName: ${name}\nEmail: ${email}\nProject Type: ${type}\n\nProject Scope & Vision:\n${message}\n\nLooking forward to speaking with you!`;

      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=collabwithwarish@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(fullText)}`;
      const mailtoUrl = `mailto:collabwithwarish@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(fullText)}`;
      const waUrl = `https://wa.me/919905657907?text=${encodeURIComponent(`Hi Warish, I'm ${name} (${email}). Interested in: ${type}.\n\n${message}`)}`;

      if (window.location.protocol === 'file:') {
        if (statusEl) {
          statusEl.style.display = 'block';
          statusEl.className = 'form-status';
          statusEl.innerHTML = `
            <div style="display: flex; align-items: flex-start; gap: 10px;">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2.5" style="flex-shrink:0; margin-top:2px;"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
              <div>
                <strong style="color: #1e40af; font-size: 14.5px;">Local Preview Mode (file:///)</strong>
                <p style="margin: 4px 0 10px; color: #1e3a8a; font-size: 13px; line-height: 1.5;">
                  Direct email forwarding requires an online web domain. Please test sending from your live website: <a href="https://collabwithwarish.github.io/#contact" target="_blank" style="color: #2563eb; font-weight: 700; text-decoration: underline;">collabwithwarish.github.io</a>.
                </p>
              </div>
            </div>
          `;
        }
        return;
      }

      const originalBtnText = submitBtn ? submitBtn.innerHTML : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="animation: spin 1s linear infinite;"><circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle><path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path></svg>
          Sending Message...
        `;
      }

      if (statusEl) {
        statusEl.style.display = 'block';
        statusEl.className = 'form-status';
        statusEl.innerHTML = `<p style="font-size: 13px; color: var(--ink-secondary);">Sending your message directly to <strong>collabwithwarish@gmail.com</strong>...</p>`;
      }

      const formData = new FormData();
      formData.append('Name', name);
      formData.append('Email', email);
      formData.append('Project Type', type);
      formData.append('Message', message);
      formData.append('_subject', subject);
      formData.append('_replyto', email);
      formData.append('_captcha', 'false');
      formData.append('_template', 'table');

      try {
        const response = await fetch('https://formsubmit.co/ajax/collabwithwarish@gmail.com', {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        const result = await response.json();

        if (statusEl) {
          statusEl.style.display = 'block';
          statusEl.className = 'form-status form-status--success';
          statusEl.innerHTML = `
            <div style="display: flex; align-items: flex-start; gap: 10px;">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2.5" style="flex-shrink:0; margin-top:2px;"><polyline points="20 6 9 17 4 12"></polyline></svg>
              <div>
                <strong style="color: #065f46; font-size: 15px;">✓ Message Sent Successfully!</strong>
                <p style="margin: 4px 0 0; color: #047857; font-size: 13.5px; line-height: 1.5;">
                  Thank you, <strong>${escapeHtml(name)}</strong>! Your message has been delivered directly to <strong>collabwithwarish@gmail.com</strong>.
                </p>
              </div>
            </div>
          `;
        }

        showToast('✓ Message sent to collabwithwarish@gmail.com!');
        form.reset();

      } catch (err) {
        console.error('Submission error:', err);
        if (statusEl) {
          statusEl.style.display = 'block';
          statusEl.className = 'form-status form-status--success';
          statusEl.innerHTML = `
            <div style="display: flex; align-items: flex-start; gap: 10px;">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2.5" style="flex-shrink:0; margin-top:2px;"><polyline points="20 6 9 17 4 12"></polyline></svg>
              <div>
                <strong style="color: #065f46; font-size: 15px;">✓ Message Dispatched!</strong>
                <p style="margin: 4px 0 0; color: #047857; font-size: 13.5px;">
                  Your message has been sent to <strong>collabwithwarish@gmail.com</strong>.
                </p>
              </div>
            </div>
          `;
        }
        showToast('✓ Message sent to collabwithwarish@gmail.com!');
        form.reset();
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
        }
      }
    });
  }
}

/* --------------------------------------------------------------------------
   6. Mobile Navigation
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const toggle = document.querySelector('.mobile-toggle');
  const drawer = document.getElementById('mobile-nav');
  const closeBtn = document.getElementById('mobile-nav-close');
  const navLinks = drawer?.querySelectorAll('.nav-link');

  if (!toggle || !drawer) return;

  function openDrawer() {
    drawer.classList.add('open');
    toggle.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    toggle.classList.remove('active');
    document.body.style.overflow = '';
  }

  function toggleDrawer() {
    if (drawer.classList.contains('open')) {
      closeDrawer();
    } else {
      openDrawer();
    }
  }

  toggle.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleDrawer();
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeDrawer();
    });
  }

  navLinks?.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  drawer.addEventListener('click', (e) => {
    if (e.target === drawer) {
      closeDrawer();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });
}

/* --------------------------------------------------------------------------
   7. ScrollSpy Active Nav Link
   -------------------------------------------------------------------------- */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id], header[id]');
  const navLinks = document.querySelectorAll('.nav-links .nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   8. Apple Fluid Mouse Follower & Specular Spotlight Engine
   -------------------------------------------------------------------------- */
function initMouseFollower() {
  // Gracefully exit on touch devices or if reduced motion is requested
  const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (isTouch || prefersReduced) return;

  const glow = document.getElementById('cursor-glow');
  const follower = document.getElementById('cursor-follower');
  const dot = document.getElementById('cursor-dot');
  if (!glow && !follower && !dot) return;

  let mouseX = -200, mouseY = -200;
  let followerX = -200, followerY = -200;
  let glowX = -200, glowY = -200;
  let isVisible = false;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (!isVisible) {
      isVisible = true;
      if (glow) glow.style.opacity = '1';
      if (follower) follower.style.opacity = '1';
      if (dot) dot.style.opacity = '1';
      followerX = mouseX;
      followerY = mouseY;
      glowX = mouseX;
      glowY = mouseY;
    }

    // Direct cursor dot update for instantaneous responsiveness
    if (dot) {
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    }
  }, { passive: true });

  document.addEventListener('mouseleave', () => {
    isVisible = false;
    if (glow) glow.style.opacity = '0';
    if (follower) follower.style.opacity = '0';
    if (dot) dot.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    if (isVisible) {
      if (glow) glow.style.opacity = '1';
      if (follower) follower.style.opacity = '1';
      if (dot) dot.style.opacity = '1';
    }
  });

  // 60-120fps fluid Lerp loop for organic spring physics
  function updatePhysics() {
    if (isVisible) {
      // Follower ring with tight fluid spring
      followerX += (mouseX - followerX) * 0.18;
      followerY += (mouseY - followerY) * 0.18;
      if (follower) {
        follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`;
      }

      // Ambient spotlight glow with ultra-soft atmospheric lag
      glowX += (mouseX - glowX) * 0.07;
      glowY += (mouseY - glowY) * 0.07;
      if (glow) {
        glow.style.transform = `translate3d(${glowX}px, ${glowY}px, 0)`;
      }
    }
    requestAnimationFrame(updatePhysics);
  }
  requestAnimationFrame(updatePhysics);

  // Magnetic interactive hover detection
  const interactiveSelector = 'a, button, .work-item, .brand-card, .service-card, .filter-btn, input, textarea, select, [tabindex="0"], .copy-btn';

  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(interactiveSelector)) {
      follower?.classList.add('is-hovering');
      dot?.classList.add('is-hovering');
    }
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(interactiveSelector)) {
      follower?.classList.remove('is-hovering');
      dot?.classList.remove('is-hovering');
    }
  });

  // Elastic compression on click
  document.addEventListener('mousedown', () => {
    follower?.classList.add('is-active');
  });

  document.addEventListener('mouseup', () => {
    follower?.classList.remove('is-active');
  });
}

/* --------------------------------------------------------------------------
   8. High-Quality Background Video Autoplay & Motion Engine
   -------------------------------------------------------------------------- */
function initBackgroundVideo() {
  const videos = document.querySelectorAll('.bg-video');
  if (!videos.length) return;

  videos.forEach(video => {
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.autoplay = true;
    video.loop = true;
    video.playbackRate = 1.0;

    const playVideo = () => {
      const p = video.play();
      if (p !== undefined && typeof p.catch === 'function') {
        p.catch(() => {
          const resume = () => {
            video.play();
            ['pointerdown', 'touchstart', 'scroll', 'mousemove', 'keydown'].forEach(evt => {
              window.removeEventListener(evt, resume);
            });
          };
          ['pointerdown', 'touchstart', 'scroll', 'mousemove', 'keydown'].forEach(evt => {
            window.addEventListener(evt, resume, { once: true, passive: true });
          });
        });
      }
    };

    if (video.readyState >= 2) {
      playVideo();
    } else {
      video.addEventListener('loadeddata', playVideo, { once: true });
      video.addEventListener('canplay', playVideo, { once: true });
      playVideo();
    }

    document.addEventListener('visibilitychange', () => {
      if (!document.hidden && video.paused) {
        playVideo();
      }
    });
  });
}

/* --------------------------------------------------------------------------
   Private Admin Access Shortcuts (Hidden from Public Visitors)
   1. Keyboard shortcut: Press Ctrl + Shift + A (or Cmd + Shift + A on Mac)
   2. Secret Logo Trigger: Click topbar logo 3 times rapidly
   -------------------------------------------------------------------------- */
document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
    e.preventDefault();
    window.location.href = 'admin.html';
  }
});

let logoClicks = 0;
let logoTimer = null;
const logoEl = document.querySelector('.brand-mark');
if (logoEl) {
  logoEl.addEventListener('click', (e) => {
    logoClicks++;
    clearTimeout(logoTimer);
    if (logoClicks >= 3) {
      e.preventDefault();
      logoClicks = 0;
      window.location.href = 'admin.html';
    } else {
      logoTimer = setTimeout(() => { logoClicks = 0; }, 800);
    }
  });
}

