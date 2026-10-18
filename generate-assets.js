const fs = require('fs');
const path = require('path');

function writeSvg(relPath, svgContent) {
  const fullPath = path.join(__dirname, relPath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, svgContent.trim());
  console.log(`Created: ${relPath}`);
}

// 1. Brand Logos — Pristine Light Theme & Apple Minimalist Slate
writeSvg('assets/brands/icici.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 40" fill="none">
  <path d="M12 8 L24 20 L12 32 M20 8 L32 20 L20 32" stroke="#b45309" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="44" y="26" fill="#0f172a" font-family="-apple-system, 'SF Pro Display', sans-serif" font-weight="700" font-size="18" letter-spacing="1">ICICI</text>
</svg>`);

writeSvg('assets/brands/invesco.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 40" fill="none">
  <polygon points="12,30 24,10 36,30 28,30 24,20 20,30" fill="#2563eb"/>
  <text x="46" y="26" fill="#0f172a" font-family="-apple-system, 'SF Pro Display', sans-serif" font-weight="600" font-size="17" letter-spacing="0.5">Invesco</text>
</svg>`);

writeSvg('assets/brands/motilal-oswal.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 40" fill="none">
  <circle cx="20" cy="20" r="12" stroke="#d97706" stroke-width="2.5"/>
  <path d="M16 16 L20 24 L24 16" stroke="#d97706" stroke-width="2.5" stroke-linecap="round"/>
  <text x="42" y="25" fill="#0f172a" font-family="-apple-system, 'SF Pro Display', sans-serif" font-weight="700" font-size="14" letter-spacing="0.8">MOTILAL OSWAL</text>
</svg>`);

writeSvg('assets/brands/shivohaam.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 40" fill="none">
  <path d="M10 28 L20 12 L30 28 M16 22 L24 22" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round"/>
  <text x="40" y="25" fill="#0f172a" font-family="-apple-system, 'SF Pro Display', sans-serif" font-weight="700" font-size="15" letter-spacing="1.2">SHIVOHAAM</text>
  <text x="40" y="34" fill="#64748b" font-family="-apple-system, 'SF Pro Text', sans-serif" font-weight="500" font-size="8" letter-spacing="1.5">COACH & CONSULTANT</text>
</svg>`);

writeSvg('assets/brands/vrindaa.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 40" fill="none">
  <circle cx="20" cy="20" r="10" stroke="#0284c7" stroke-width="1.8" stroke-dasharray="2 3"/>
  <circle cx="20" cy="20" r="4" fill="#0284c7"/>
  <text x="40" y="25" fill="#0f172a" font-family="-apple-system, 'SF Pro Display', sans-serif" font-weight="600" font-size="16" letter-spacing="2">VRINDAA</text>
</svg>`);

writeSvg('assets/brands/postverse.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 190 40" fill="none">
  <rect x="10" y="10" width="20" height="20" rx="6" fill="#2563eb"/>
  <polygon points="18,15 26,20 18,25" fill="#ffffff"/>
  <text x="40" y="25" fill="#0f172a" font-family="-apple-system, 'SF Pro Display', sans-serif" font-weight="700" font-size="15" letter-spacing="0.5">POSTVERSE</text>
</svg>`);

// 2. High-End Apple UI / Bright Glassmorphic Project Thumbnails
// Emphasizing Storytelling, Narrative Architecture, Pacing & Visual Clarity

// A. Finance 1: The Story of Compounding
writeSvg('assets/projects/finance-compounding.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="100%" height="100%">
  <defs>
    <linearGradient id="bg-f1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="50%" stop-color="#f8fafc"/>
      <stop offset="100%" stop-color="#eef2ff"/>
    </linearGradient>
    <linearGradient id="curve-f1" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#3b82f6"/>
      <stop offset="100%" stop-color="#2563eb"/>
    </linearGradient>
    <filter id="glass-shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="12" stdDeviation="24" flood-color="#0f172a" flood-opacity="0.06"/>
    </filter>
  </defs>
  <rect width="1280" height="720" fill="url(#bg-f1)"/>
  
  <!-- Subtle Grid Backdrop -->
  <g stroke="#cbd5e1" stroke-opacity="0.4" stroke-width="1" stroke-dasharray="4 6">
    <line x1="160" y1="0" x2="160" y2="720"/>
    <line x1="480" y1="0" x2="480" y2="720"/>
    <line x1="800" y1="0" x2="800" y2="720"/>
    <line x1="1120" y1="0" x2="1120" y2="720"/>
    <line x1="0" y1="200" x2="1280" y2="200"/>
    <line x1="0" y1="440" x2="1280" y2="440"/>
  </g>

  <!-- Narrative Timeline Arc -->
  <path d="M 160 520 C 440 500, 680 440, 920 280 S 1120 160, 1120 160 L 1120 580 L 160 580 Z" fill="#3b82f6" fill-opacity="0.07"/>
  <path d="M 160 520 C 440 500, 680 440, 920 280 S 1120 160, 1120 160" fill="none" stroke="url(#curve-f1)" stroke-width="4.5" stroke-linecap="round"/>

  <!-- Story Beat Markers -->
  <circle cx="440" cy="490" r="6" fill="#3b82f6"/>
  <circle cx="700" cy="420" r="7" fill="#2563eb"/>
  <circle cx="920" cy="280" r="9" fill="#1d4ed8"/>
  <circle cx="920" cy="280" r="18" stroke="#3b82f6" stroke-width="2" stroke-opacity="0.3"/>

  <!-- Apple Frosted Glass Card -->
  <g filter="url(#glass-shadow)">
    <rect x="180" y="140" width="380" height="130" rx="20" fill="#ffffff" fill-opacity="0.85" stroke="#ffffff" stroke-width="2"/>
    <text x="210" y="180" fill="#2563eb" font-family="-apple-system, sans-serif" font-size="12" font-weight="700" letter-spacing="1.5">NARRATIVE FINANCE EXPLAINER</text>
    <text x="210" y="215" fill="#0f172a" font-family="-apple-system, sans-serif" font-size="24" font-weight="700">The Human Story of Wealth</text>
    <text x="210" y="244" fill="#64748b" font-family="-apple-system, sans-serif" font-size="14">Clarifying complex SIP concepts through deliberate narrative pacing</text>
  </g>

  <!-- Story Beats Floating Pill -->
  <g filter="url(#glass-shadow)">
    <rect x="760" y="140" width="320" height="64" rx="32" fill="#ffffff" fill-opacity="0.9" stroke="#e2e8f0"/>
    <circle cx="792" cy="172" r="12" fill="#dbeafe"/>
    <polygon points="789,166 798,172 789,178" fill="#2563eb"/>
    <text x="816" y="177" fill="#0f172a" font-family="-apple-system, sans-serif" font-size="14" font-weight="600">Story Rhythm: Hook to Revelation</text>
  </g>

  <!-- Bottom Title Bar -->
  <text x="160" y="640" fill="#0f172a" font-family="-apple-system, sans-serif" font-size="34" font-weight="700">Systematic Investing & The Compounding Journey</text>
  <text x="160" y="675" fill="#64748b" font-family="-apple-system, sans-serif" font-size="16">Editorial pacing, emotional clarity, and clean financial narrative for ICICI & Invesco audiences</text>
</svg>`);

// A. Finance 2: Mid-Cap vs Small-Cap Funds
writeSvg('assets/projects/finance-funds.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="100%" height="100%">
  <defs>
    <linearGradient id="bg-f2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#f1f5f9"/>
    </linearGradient>
    <filter id="glass-shadow-f2" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="12" stdDeviation="24" flood-color="#0f172a" flood-opacity="0.06"/>
    </filter>
  </defs>
  <rect width="1280" height="720" fill="url(#bg-f2)"/>

  <!-- Editorial Pillars -->
  <g opacity="0.9">
    <rect x="260" y="340" width="60" height="220" rx="14" fill="#e2e8f0"/>
    <rect x="380" y="270" width="60" height="290" rx="14" fill="#bfdbfe"/>
    <rect x="500" y="200" width="60" height="360" rx="14" fill="#3b82f6"/>
    <rect x="620" y="310" width="60" height="250" rx="14" fill="#e2e8f0"/>
    <rect x="740" y="160" width="60" height="400" rx="14" fill="#2563eb"/>
    <rect x="860" y="240" width="60" height="320" rx="14" fill="#93c5fd"/>
    <rect x="980" y="120" width="60" height="440" rx="14" fill="#1d4ed8"/>
  </g>

  <!-- Glass Callout -->
  <g filter="url(#glass-shadow-f2)">
    <rect x="180" y="90" width="460" height="110" rx="20" fill="#ffffff" fill-opacity="0.9" stroke="#ffffff" stroke-width="2"/>
    <text x="210" y="130" fill="#0284c7" font-family="-apple-system, sans-serif" font-size="12" font-weight="700" letter-spacing="1.5">MARKET STORYTELLING</text>
    <text x="210" y="165" fill="#0f172a" font-family="-apple-system, sans-serif" font-size="22" font-weight="700">Translating Numbers into Narrative</text>
  </g>

  <text x="180" y="635" fill="#0f172a" font-family="-apple-system, sans-serif" font-size="34" font-weight="700">Mid-Cap vs Small-Cap Funds: Risk & Alpha Decoded</text>
  <text x="180" y="670" fill="#64748b" font-family="-apple-system, sans-serif" font-size="16">Framing market volatility as a compelling educational story rather than boring charts</text>
</svg>`);

// B. Podcast 1: The Founder's Journey
writeSvg('assets/projects/podcast-founders.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="100%" height="100%">
  <defs>
    <linearGradient id="bg-pod" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="50%" stop-color="#fdf4ff"/>
      <stop offset="100%" stop-color="#f5f3ff"/>
    </linearGradient>
    <filter id="glass-shadow-p1" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="12" stdDeviation="24" flood-color="#0f172a" flood-opacity="0.06"/>
    </filter>
  </defs>
  <rect width="1280" height="720" fill="url(#bg-pod)"/>

  <!-- Audio Waveform with Narrative Peaks -->
  <g stroke="#8b5cf6" stroke-width="5" stroke-linecap="round" opacity="0.75">
    <line x1="320" y1="360" x2="320" y2="400"/>
    <line x1="360" y1="330" x2="360" y2="430"/>
    <line x1="400" y1="280" x2="400" y2="480"/>
    <line x1="440" y1="220" x2="440" y2="540"/>
    <line x1="480" y1="290" x2="480" y2="470"/>
    <line x1="520" y1="180" x2="520" y2="580"/>
    <line x1="560" y1="160" x2="560" y2="600"/>
    <line x1="600" y1="210" x2="600" y2="550"/>
    <line x1="640" y1="270" x2="640" y2="490"/>
    <line x1="680" y1="200" x2="680" y2="560"/>
    <line x1="720" y1="240" x2="720" y2="520"/>
    <line x1="760" y1="310" x2="760" y2="450"/>
    <line x1="800" y1="350" x2="800" y2="410"/>
  </g>

  <!-- Apple Glass Card -->
  <g filter="url(#glass-shadow-p1)">
    <rect x="180" y="120" width="460" height="110" rx="20" fill="#ffffff" fill-opacity="0.9" stroke="#ffffff" stroke-width="2"/>
    <text x="210" y="160" fill="#7c3aed" font-family="-apple-system, sans-serif" font-size="12" font-weight="700" letter-spacing="1.5">CONVERSATIONAL STORYTELLING</text>
    <text x="210" y="195" fill="#0f172a" font-family="-apple-system, sans-serif" font-size="22" font-weight="700">Giving Dialogue Room to Breathe</text>
  </g>

  <text x="180" y="640" fill="#0f172a" font-family="-apple-system, sans-serif" font-size="34" font-weight="700">The Founder’s Journey: Multi-Cam Podcast Mastercut</text>
  <text x="180" y="675" fill="#64748b" font-family="-apple-system, sans-serif" font-size="16">Multi-cam editing centered on emotional listening, reaction timing, and natural conversational cadence</text>
</svg>`);

// B. Podcast 2: High-Retention Story Reels
writeSvg('assets/projects/podcast-reels.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="100%" height="100%">
  <defs>
    <linearGradient id="bg-reel" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#f0fdf4"/>
    </linearGradient>
    <filter id="glass-shadow-reel" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="12" stdDeviation="24" flood-color="#0f172a" flood-opacity="0.06"/>
    </filter>
  </defs>
  <rect width="1280" height="720" fill="url(#bg-reel)"/>

  <!-- Clean iPhone Mockup Frame -->
  <rect x="540" y="80" width="220" height="440" rx="36" fill="#ffffff" stroke="#e2e8f0" stroke-width="3" filter="url(#glass-shadow-reel)"/>
  <rect x="556" y="104" width="188" height="392" rx="22" fill="#f8fafc"/>
  
  <!-- Subtle Subtitle Card -->
  <rect x="572" y="420" width="156" height="36" rx="10" fill="#0f172a" fill-opacity="0.9"/>
  <text x="650" y="443" text-anchor="middle" fill="#ffffff" font-family="-apple-system, sans-serif" font-size="12" font-weight="600">The Power of Stillness</text>

  <circle cx="650" cy="280" r="28" fill="#16a34a"/>
  <polygon points="646,270 658,280 646,290" fill="#ffffff"/>

  <!-- Glass Callout -->
  <g filter="url(#glass-shadow-reel)">
    <rect x="140" y="120" width="360" height="110" rx="20" fill="#ffffff" fill-opacity="0.9" stroke="#ffffff" stroke-width="2"/>
    <text x="170" y="160" fill="#16a34a" font-family="-apple-system, sans-serif" font-size="12" font-weight="700" letter-spacing="1.5">SHORT-FORM PACING</text>
    <text x="170" y="195" fill="#0f172a" font-family="-apple-system, sans-serif" font-size="22" font-weight="700">Substance Over Chaos</text>
  </g>

  <text x="140" y="640" fill="#0f172a" font-family="-apple-system, sans-serif" font-size="34" font-weight="700">Story-Driven Vertical Reels & Creator Shorts</text>
  <text x="140" y="675" fill="#64748b" font-family="-apple-system, sans-serif" font-size="16">Hook retention achieved through clear narrative progression rather than dizzying sound effects</text>
</svg>`);

// C. AI Visual 1: Cosmic Odyssey & Worldbuilding
writeSvg('assets/projects/ai-cosmic.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="100%" height="100%">
  <defs>
    <linearGradient id="bg-ai-cosmic" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="50%" stop-color="#eff6ff"/>
      <stop offset="100%" stop-color="#dbeafe"/>
    </linearGradient>
    <radialGradient id="sun-glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
    <filter id="glass-shadow-ai" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="12" stdDeviation="24" flood-color="#0f172a" flood-opacity="0.06"/>
    </filter>
  </defs>
  <rect width="1280" height="720" fill="url(#bg-ai-cosmic)"/>
  <circle cx="720" cy="320" r="280" fill="url(#sun-glow)"/>

  <!-- Celestial Rings -->
  <ellipse cx="720" cy="340" rx="300" ry="50" fill="none" stroke="#2563eb" stroke-width="2.5" stroke-opacity="0.4" transform="rotate(-12 720 340)"/>
  <circle cx="720" cy="340" r="130" fill="#1e40af"/>

  <!-- Floating Glass Spec -->
  <g filter="url(#glass-shadow-ai)">
    <rect x="180" y="120" width="460" height="110" rx="20" fill="#ffffff" fill-opacity="0.9" stroke="#ffffff" stroke-width="2"/>
    <text x="210" y="160" fill="#2563eb" font-family="-apple-system, sans-serif" font-size="12" font-weight="700" letter-spacing="1.5">AI SERVING STORY</text>
    <text x="210" y="195" fill="#0f172a" font-family="-apple-system, sans-serif" font-size="22" font-weight="700">Cinematic Worldbuilding Concepts</text>
  </g>

  <text x="180" y="640" fill="#0f172a" font-family="-apple-system, sans-serif" font-size="34" font-weight="700">Cosmic Odyssey: Deep Space & Sci-Fi Cinematics</text>
  <text x="180" y="675" fill="#64748b" font-family="-apple-system, sans-serif" font-size="16">Harnessing Higgsfield & Google Flow for atmosphere and visual scale, grounded in filmic color grading</text>
</svg>`);

// C. AI Visual 2: Industrial Robotics
writeSvg('assets/projects/ai-industrial.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="100%" height="100%">
  <defs>
    <linearGradient id="bg-ai-ind" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#f8fafc"/>
    </linearGradient>
    <filter id="glass-shadow-ind" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="12" stdDeviation="24" flood-color="#0f172a" flood-opacity="0.06"/>
    </filter>
  </defs>
  <rect width="1280" height="720" fill="url(#bg-ai-ind)"/>

  <!-- Minimalist Precision Lines -->
  <path d="M 320 480 L 500 320 L 740 320 L 900 200" fill="none" stroke="#0284c7" stroke-width="4" stroke-linecap="round"/>
  <circle cx="500" cy="320" r="14" fill="#ffffff" stroke="#0284c7" stroke-width="3"/>
  <circle cx="740" cy="320" r="14" fill="#ffffff" stroke="#0284c7" stroke-width="3"/>
  <circle cx="900" cy="200" r="22" fill="#e0f2fe" stroke="#0284c7" stroke-width="3"/>

  <g filter="url(#glass-shadow-ind)">
    <rect x="180" y="100" width="460" height="110" rx="20" fill="#ffffff" fill-opacity="0.9" stroke="#ffffff" stroke-width="2"/>
    <text x="210" y="140" fill="#0284c7" font-family="-apple-system, sans-serif" font-size="12" font-weight="700" letter-spacing="1.5">CONCEPTUAL DIRECTION</text>
    <text x="210" y="175" fill="#0f172a" font-family="-apple-system, sans-serif" font-size="22" font-weight="700">Autonomous Manufacturing Staging</text>
  </g>

  <text x="180" y="640" fill="#0f172a" font-family="-apple-system, sans-serif" font-size="34" font-weight="700">Future Industry: Autonomous Robotics & Engineering</text>
  <text x="180" y="675" fill="#64748b" font-family="-apple-system, sans-serif" font-size="16">AI-assisted visual sequences crafted to make industrial innovation tangible and inspiring</text>
</svg>`);

// D. Branding: Studio Environments & Identity
writeSvg('assets/projects/branding-studio.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="100%" height="100%">
  <defs>
    <linearGradient id="bg-brand-env" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="50%" stop-color="#f8fafc"/>
      <stop offset="100%" stop-color="#e0e7ff"/>
    </linearGradient>
    <filter id="glass-shadow-b1" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="12" stdDeviation="24" flood-color="#0f172a" flood-opacity="0.06"/>
    </filter>
  </defs>
  <rect width="1280" height="720" fill="url(#bg-brand-env)"/>

  <!-- Minimal Studio Frame Mockup -->
  <rect x="360" y="180" width="560" height="280" rx="24" fill="#ffffff" stroke="#cbd5e1" stroke-width="2" filter="url(#glass-shadow-b1)"/>
  <text x="640" y="310" text-anchor="middle" fill="#0f172a" font-family="-apple-system, sans-serif" font-size="36" font-weight="800" letter-spacing="2">POSTVERSE MEDIA</text>
  <text x="640" y="345" text-anchor="middle" fill="#2563eb" font-family="-apple-system, sans-serif" font-size="15" font-weight="600" letter-spacing="4">STUDIO AESTHETICS & SET STAGING</text>

  <g filter="url(#glass-shadow-b1)">
    <rect x="180" y="80" width="380" height="80" rx="20" fill="#ffffff" fill-opacity="0.9" stroke="#ffffff" stroke-width="2"/>
    <text x="210" y="115" fill="#2563eb" font-family="-apple-system, sans-serif" font-size="12" font-weight="700" letter-spacing="1.5">VISUAL ATMOSPHERE</text>
    <text x="210" y="142" fill="#0f172a" font-family="-apple-system, sans-serif" font-size="18" font-weight="700">Studio Backdrops & Brand Identity</text>
  </g>

  <text x="180" y="640" fill="#0f172a" font-family="-apple-system, sans-serif" font-size="34" font-weight="700">Studio Environments & Visual Identity Packages</text>
  <text x="180" y="675" fill="#64748b" font-family="-apple-system, sans-serif" font-size="16">Creating visual consistency across podcast studio backdrops and on-screen graphical assets</text>
</svg>`);

// E. Web & App: Result Darpan (Apple Glass Showcase)
writeSvg('assets/projects/result-darpan.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="100%" height="100%">
  <defs>
    <linearGradient id="bg-apple-rd" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="60%" stop-color="#f8fafc"/>
      <stop offset="100%" stop-color="#eff6ff"/>
    </linearGradient>
    <filter id="apple-card-shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="20" stdDeviation="40" flood-color="#0f172a" flood-opacity="0.08"/>
    </filter>
  </defs>
  <rect width="1280" height="720" fill="url(#bg-apple-rd)"/>

  <!-- Apple Safari Window Mockup -->
  <g filter="url(#apple-card-shadow)">
    <rect x="200" y="80" width="880" height="500" rx="24" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
    <!-- Safari Header Bar -->
    <path d="M 200 104 C 200 90.7 210.7 80 224 80 L 1056 80 C 1069.3 80 1080 90.7 1080 104 L 1080 134 L 200 134 Z" fill="#f8fafc"/>
    <circle cx="230" cy="107" r="6" fill="#ef4444"/>
    <circle cx="250" cy="107" r="6" fill="#eab308"/>
    <circle cx="270" cy="107" r="6" fill="#22c55e"/>

    <!-- URL Capsule -->
    <rect x="360" y="93" width="560" height="28" rx="8" fill="#ffffff" stroke="#e2e8f0"/>
    <text x="640" y="112" text-anchor="middle" fill="#64748b" font-family="-apple-system, sans-serif" font-size="12">https://resultdarpan.com/</text>
  </g>

  <!-- Inside Platform Mockup -->
  <text x="640" y="220" text-anchor="middle" fill="#0f172a" font-family="-apple-system, sans-serif" font-size="36" font-weight="800">Result Darpan</text>
  <text x="640" y="255" text-anchor="middle" fill="#64748b" font-family="-apple-system, sans-serif" font-size="15">Empowering Students Across India with Centralized Education Resources</text>

  <!-- Feature Pills Inside Browser -->
  <g transform="translate(260, 310)">
    <rect x="0" y="0" width="170" height="84" rx="14" fill="#f8fafc" stroke="#e2e8f0"/>
    <text x="20" y="34" fill="#2563eb" font-family="-apple-system, sans-serif" font-size="13" font-weight="700">MOCK TESTS</text>
    <text x="20" y="58" fill="#64748b" font-family="-apple-system, sans-serif" font-size="11">Exam-ready practice sets</text>

    <rect x="195" y="0" width="170" height="84" rx="14" fill="#f8fafc" stroke="#e2e8f0"/>
    <text x="215" y="34" fill="#2563eb" font-family="-apple-system, sans-serif" font-size="13" font-weight="700">DOUBT SOLVING</text>
    <text x="215" y="58" fill="#64748b" font-family="-apple-system, sans-serif" font-size="11">Concept clarification</text>

    <rect x="390" y="0" width="170" height="84" rx="14" fill="#f8fafc" stroke="#e2e8f0"/>
    <text x="410" y="34" fill="#2563eb" font-family="-apple-system, sans-serif" font-size="13" font-weight="700">MEET TOPPERS</text>
    <text x="410" y="58" fill="#64748b" font-family="-apple-system, sans-serif" font-size="11">Strategy & preparation</text>

    <rect x="585" y="0" width="170" height="84" rx="14" fill="#f8fafc" stroke="#e2e8f0"/>
    <text x="605" y="34" fill="#2563eb" font-family="-apple-system, sans-serif" font-size="13" font-weight="700">STUDY MATERIALS</text>
    <text x="605" y="58" fill="#64748b" font-family="-apple-system, sans-serif" font-size="11">Curated resources</text>
  </g>

  <text x="200" y="640" fill="#0f172a" font-family="-apple-system, sans-serif" font-size="34" font-weight="700">Result Darpan — Accessible Education for Every Student</text>
  <text x="200" y="675" fill="#64748b" font-family="-apple-system, sans-serif" font-size="16">Centralized exam prep, mock tests, subject tests & topper insights (https://resultdarpan.com/)</text>
</svg>`);

console.log("All Apple UI Bright Glassmorphic assets updated successfully!");
