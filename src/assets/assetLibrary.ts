/**
 * Offline Asset Library
 * Color Theme: Saffron Orange, Emerald Green, and Cream White
 * Guaranteed 100% offline availability with zero external network requests.
 */

// Controllerate of Quality Assurance Systems Official Insignia (Orange, Green, Gold & Cream White)
export const CQAS_LOGO_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
  <defs>
    <linearGradient id="saffronGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FF781F" />
      <stop offset="50%" stop-color="#EA580C" />
      <stop offset="100%" stop-color="#C2410C" />
    </linearGradient>
    <linearGradient id="greenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#10B981" />
      <stop offset="50%" stop-color="#059669" />
      <stop offset="100%" stop-color="#047857" />
    </linearGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FDE047" />
      <stop offset="50%" stop-color="#EAB308" />
      <stop offset="100%" stop-color="#CA8A04" />
    </linearGradient>
    <linearGradient id="creamGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFDF9" />
      <stop offset="100%" stop-color="#FAF4E6" />
    </linearGradient>
    <filter id="shadowAura" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#EA580C" flood-opacity="0.25"/>
    </filter>
  </defs>

  <!-- Outer Ring with Precision Teeth (Deep Forest Green and Saffron Edge) -->
  <circle cx="250" cy="250" r="236" fill="url(#greenGrad)" stroke="url(#goldGrad)" stroke-width="8" filter="url(#shadowAura)" />
  <circle cx="250" cy="250" r="218" fill="none" stroke="url(#saffronGrad)" stroke-width="3" stroke-dasharray="6,4" />

  <!-- Inner Warm Cream Circular Field -->
  <circle cx="250" cy="250" r="172" fill="url(#creamGrad)" stroke="url(#goldGrad)" stroke-width="4.5" />

  <!-- Circular Text Path Arc Top (Dark Forest Green on Cream) -->
  <path id="textArcTop" d="M 68,250 A 182,182 0 1,1 432,250" fill="none" />
  <text fill="#064E3B" font-family="'Times New Roman', serif" font-weight="800" font-size="19" letter-spacing="3.8">
    <textPath href="#textArcTop" startOffset="50%" text-anchor="middle">
      CONTROLLERATE QUALITY ASSURANCE
    </textPath>
  </text>

  <!-- Circular Text Path Arc Bottom (Saffron Orange on Cream) -->
  <path id="textArcBottom" d="M 432,250 A 182,182 0 0,1 68,250" fill="none" />
  <text fill="#C2410C" font-family="'Times New Roman', serif" font-weight="800" font-size="18" letter-spacing="4">
    <textPath href="#textArcBottom" startOffset="50%" text-anchor="middle">
      ★ SYSTEMS • SECUNDERABAD ★
    </textPath>
  </text>

  <!-- Central Quality Shield & Emblem -->
  <g transform="translate(150, 140)">
    <!-- Heraldic Shield: Rich Saffron Orange -->
    <path d="M 100,10 L 175,35 C 175,120 100,175 100,195 C 100,175 25,120 25,35 Z" 
          fill="url(#saffronGrad)" stroke="url(#goldGrad)" stroke-width="4.5" />
    
    <!-- 24-spoke Ashoka / QA Precision Gear inside Shield (Emerald & Gold) -->
    <circle cx="100" cy="95" r="50" fill="none" stroke="#FFFFFF" stroke-width="3" />
    <circle cx="100" cy="95" r="16" fill="url(#greenGrad)" stroke="#FFFFFF" stroke-width="2" />
    <!-- Gear Spokes -->
    <g stroke="#FFFDF9" stroke-width="2.5">
      <line x1="100" y1="45" x2="100" y2="145" />
      <line x1="50" y1="95" x2="150" y2="95" />
      <line x1="65" y1="60" x2="135" y2="130" />
      <line x1="65" y1="130" x2="135" y2="60" />
    </g>
    <!-- Laurel Wreath surrounding Shield Base (Emerald Green) -->
    <path d="M 15,145 Q 60,185 100,195 Q 140,185 185,145" fill="none" stroke="url(#goldGrad)" stroke-width="4" stroke-linecap="round" />
  </g>

  <!-- National Tricolor Base Ribbon: Saffron, White, Green -->
  <rect x="205" y="360" width="90" height="4" fill="#FF781F" rx="2" />
  <rect x="205" y="366" width="90" height="4" fill="#FFFFFF" rx="2" stroke="#E2E8F0" stroke-width="0.5" />
  <rect x="205" y="372" width="90" height="4" fill="#059669" rx="2" />

  <!-- Hindi Slogan at Lower Base in Bold Green -->
  <text x="250" y="410" text-anchor="middle" fill="#047857" font-family="'Nirmala UI', 'Mangal', sans-serif" font-weight="800" font-size="22" letter-spacing="1.5">
    गुणवत्ता से विश्वास
  </text>
</svg>
`)}`;

// Controller Dr. Rajiv Sharma Dignified Portrait (Orange & Green ceremonial tone)
export const CONTROLLER_PORTRAIT_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 480" width="100%" height="100%">
  <defs>
    <linearGradient id="ctrlBg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FFFDF7"/>
      <stop offset="50%" stop-color="#FDF6E9"/>
      <stop offset="100%" stop-color="#F1EAD9"/>
    </linearGradient>
    <linearGradient id="suitGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1C1917"/>
      <stop offset="100%" stop-color="#064E3B"/>
    </linearGradient>
    <linearGradient id="tieGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#EA580C"/>
      <stop offset="100%" stop-color="#C2410C"/>
    </linearGradient>
  </defs>
  <!-- Cream White Background -->
  <rect width="400" height="480" fill="url(#ctrlBg)"/>
  
  <!-- Subtle Saffron & Emerald Ambience Aura -->
  <circle cx="100" cy="120" r="160" fill="#EA580C" opacity="0.08" filter="blur(30px)"/>
  <circle cx="300" cy="180" r="160" fill="#059669" opacity="0.08" filter="blur(30px)"/>

  <!-- Shoulders & Dark Forest Charcoal Suit Jacket -->
  <path d="M 60,480 C 70,360 120,330 150,320 L 250,320 C 280,330 330,360 340,480 Z" fill="url(#suitGrad)" stroke="#047857" stroke-width="2"/>
  
  <!-- Crisp Cream White Shirt Collar & Lapels -->
  <polygon points="175,320 225,320 240,400 200,430 160,400" fill="#FFFDF9" stroke="#E2E8F0" stroke-width="1"/>
  
  <!-- Regal Saffron Silk Tie -->
  <polygon points="192,340 208,340 216,450 200,475 184,450" fill="url(#tieGrad)"/>
  <polygon points="190,330 210,330 206,345 194,345" fill="#9A3412"/>
  
  <!-- Suit Lapels Overlay -->
  <path d="M 120,480 L 165,340 L 190,440 Z" fill="#1C1917"/>
  <path d="M 280,480 L 235,340 L 210,440 Z" fill="#1C1917"/>
  
  <!-- Controller Gold Lapel Pin with Emerald Dot -->
  <circle cx="145" cy="390" r="8" fill="#FBBF24" stroke="#D97706" stroke-width="1.5"/>
  <circle cx="145" cy="390" r="3" fill="#047857"/>

  <!-- Neck -->
  <rect x="175" y="260" width="50" height="70" rx="10" fill="#EAB308" opacity="0.9"/>
  
  <!-- Head & Facial Contour -->
  <ellipse cx="200" cy="200" rx="68" ry="85" fill="#FBBF24"/>
  
  <!-- Hair: Distinguished salt and pepper corporate cut -->
  <path d="M 132,185 C 130,120 160,110 200,110 C 240,110 270,120 268,185 C 265,160 250,135 200,135 C 150,135 135,160 132,185 Z" fill="#292524"/>
  <path d="M 130,180 Q 140,120 200,118 Q 260,120 270,180" stroke="#78716C" stroke-width="2.5" fill="none" opacity="0.6"/>

  <!-- Spectacles / Eyeglasses: Gold rimmed -->
  <rect x="156" y="185" width="36" height="24" rx="6" fill="none" stroke="#D97706" stroke-width="3"/>
  <rect x="208" y="185" width="36" height="24" rx="6" fill="none" stroke="#D97706" stroke-width="3"/>
  <line x1="192" y1="195" x2="208" y2="195" stroke="#D97706" stroke-width="3"/>

  <!-- Eyes & Expression -->
  <circle cx="174" cy="197" r="4.5" fill="#1C1917"/>
  <circle cx="226" cy="197" r="4.5" fill="#1C1917"/>
  <path d="M 160,178 Q 175,172 190,178" stroke="#292524" stroke-width="2.5" fill="none"/>
  <path d="M 210,178 Q 225,172 240,178" stroke="#292524" stroke-width="2.5" fill="none"/>

  <!-- Nose & Warm smile -->
  <path d="M 200,195 L 197,222 L 203,222" stroke="#B45309" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <path d="M 182,242 Q 200,254 218,242" stroke="#92400E" stroke-width="3" fill="none" stroke-linecap="round"/>
</svg>
`)}`;

// Generates an elegant SVG portrait for an employee with Saffron/Emerald accents
export function getEmployeeAvatarSvg(name: string, role: string, genderHint: 'F' | 'M' | 'N' = 'M'): string {
  const isFemale = genderHint === 'F' || name.toLowerCase().includes('anita') || name.toLowerCase().includes('sunita') || name.toLowerCase().includes('meera');
  const primaryHue = isFemale ? '#EA580C' : '#047857';
  const secondaryHue = isFemale ? '#F97316' : '#10B981';
  const hairColor = '#1C1917';

  return `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 480" width="100%" height="100%">
  <defs>
    <linearGradient id="empBg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FFFDF7" />
      <stop offset="100%" stop-color="#F5EFE0" />
    </linearGradient>
    <linearGradient id="clothingGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${primaryHue}" />
      <stop offset="100%" stop-color="${secondaryHue}" />
    </linearGradient>
  </defs>
  <rect width="400" height="480" fill="url(#empBg)" />
  <circle cx="200" cy="180" r="140" fill="${primaryHue}" opacity="0.12" filter="blur(20px)" />

  <!-- Shoulders & Professional Attire -->
  <path d="M 70,480 C 80,370 130,340 160,330 L 240,330 C 270,340 320,370 330,480 Z" fill="url(#clothingGrad)" />
  <!-- Collar / Scarf / Tie -->
  ${isFemale ? `
    <path d="M 160,330 Q 200,380 240,330" fill="#FEF08A" opacity="0.9" stroke="#EAB308" stroke-width="1.5" />
    <circle cx="200" cy="385" r="6" fill="#FACC15" />
  ` : `
    <polygon points="180,330 220,330 230,390 200,410 170,390" fill="#FFFDF9" stroke="#CBD5E1" stroke-width="1" />
    <polygon points="194,345 206,345 212,430 200,450 188,430" fill="#EA580C" />
  `}

  <!-- Neck -->
  <rect x="178" y="270" width="44" height="65" rx="8" fill="#FBBF24" />

  <!-- Head -->
  <ellipse cx="200" cy="210" rx="64" ry="78" fill="#FBBF24" />

  <!-- Hair Styling -->
  ${isFemale ? `
    <path d="M 125,230 C 120,130 160,115 200,115 C 240,115 280,130 275,230 C 265,245 255,160 200,150 C 145,160 135,245 125,230 Z" fill="${hairColor}" />
    <path d="M 125,220 Q 115,310 145,350 Q 155,270 145,210" fill="${hairColor}" />
    <path d="M 275,220 Q 285,310 255,350 Q 245,270 255,210" fill="${hairColor}" />
    <!-- Bindi -->
    <circle cx="200" cy="188" r="3.5" fill="#DC2626" />
  ` : `
    <path d="M 135,190 C 132,130 160,120 200,120 C 240,120 268,130 265,190 C 260,170 250,140 200,140 C 150,140 140,170 135,190 Z" fill="${hairColor}" />
  `}

  <!-- Eyes & Eyebrows -->
  <circle cx="178" cy="206" r="4.5" fill="#1C1917" />
  <circle cx="222" cy="206" r="4.5" fill="#1C1917" />
  <path d="M 166,195 Q 178,189 190,195" stroke="#1C1917" stroke-width="2.5" fill="none" />
  <path d="M 210,195 Q 222,189 234,195" stroke="#1C1917" stroke-width="2.5" fill="none" />

  <!-- Nose & Smile -->
  <path d="M 200,205 L 198,228 L 204,228" stroke="#B45309" stroke-width="2" fill="none" stroke-linecap="round" />
  <path d="M 185,248 Q 200,260 215,248" stroke="#92400E" stroke-width="2.5" fill="none" stroke-linecap="round" />

  <!-- Organization Badge Overlay -->
  <rect x="30" y="420" width="340" height="44" rx="10" fill="#FFFDF9" opacity="0.95" stroke="${primaryHue}" stroke-width="2" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.1))" />
  <text x="200" y="448" text-anchor="middle" fill="#047857" font-family="'Segoe UI', system-ui, sans-serif" font-weight="700" font-size="14" letter-spacing="0.5">
    ${name.toUpperCase()}
  </text>
</svg>
`)}`;
}

// Generates festive artwork for festivals in Saffron, Green, and Gold
export function getFestivalArtworkSvg(festivalName: string): string {
  const isDussehra = festivalName.toLowerCase().includes('dussehra') || festivalName.toLowerCase().includes('vijaya');
  const isDiwali = festivalName.toLowerCase().includes('diwali') || festivalName.toLowerCase().includes('deepavali');

  return `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%">
  <defs>
    <radialGradient id="festGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#EA580C" stop-opacity="0.25" />
      <stop offset="60%" stop-color="#059669" stop-opacity="0.1" />
      <stop offset="100%" stop-color="#FFFDF7" stop-opacity="0" />
    </radialGradient>
    <linearGradient id="goldBow" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FBBF24"/>
      <stop offset="50%" stop-color="#EA580C"/>
      <stop offset="100%" stop-color="#047857"/>
    </linearGradient>
  </defs>

  <!-- Warm Cream White Background with Saffron & Green ambient wash -->
  <rect width="600" height="400" fill="#FFFDF7" rx="20"/>
  <circle cx="300" cy="200" r="220" fill="url(#festGlow)"/>

  ${isDussehra ? `
    <!-- Royal Bow and Arrow (Vijayadashami / Triumph of Dharma & Precision) -->
    <path d="M 120,300 Q 220,120 480,100" fill="none" stroke="url(#goldBow)" stroke-width="8" stroke-linecap="round" filter="drop-shadow(0 4px 8px rgba(234, 88, 12, 0.4))" />
    <line x1="120" y1="300" x2="480" y2="100" stroke="#059669" stroke-width="2.5" stroke-dasharray="8,6" opacity="0.8"/>
    <!-- Golden Piercing Arrow -->
    <line x1="180" y1="280" x2="450" y2="130" stroke="#EA580C" stroke-width="6" stroke-linecap="round"/>
    <polygon points="450,130 430,125 435,145" fill="#047857"/>
    <polygon points="180,280 195,290 175,300" fill="#EA580C"/>
    
    <!-- Traditional Marigold Garlands & Sparkles in Saffron and Emerald -->
    <circle cx="150" cy="120" r="16" fill="#F97316"/>
    <circle cx="150" cy="120" r="10" fill="#FEF08A"/>
    <circle cx="450" cy="280" r="16" fill="#059669"/>
    <circle cx="450" cy="280" r="10" fill="#A7F3D0"/>
    <circle cx="300" cy="80" r="8" fill="#EA580C" filter="drop-shadow(0 0 6px #F59E0B)"/>
    <circle cx="380" cy="260" r="6" fill="#047857" filter="drop-shadow(0 0 6px #059669)"/>
  ` : isDiwali ? `
    <!-- Glowing Traditional Brass Diya (Lamp of Knowledge & Victory) -->
    <path d="M 180,260 Q 300,340 420,260 Q 300,280 180,260 Z" fill="url(#goldBow)" filter="drop-shadow(0 6px 14px rgba(234, 88, 12, 0.4))" />
    <ellipse cx="300" cy="260" rx="120" ry="24" fill="#065F46" />
    <!-- Sacred Flame in Radiant Saffron -->
    <path d="M 300,240 Q 330,170 300,110 Q 270,170 300,240 Z" fill="#EA580C" filter="drop-shadow(0 0 16px rgba(234, 88, 12, 0.6))" />
    <path d="M 300,230 Q 318,180 300,130 Q 282,180 300,230 Z" fill="#FBBF24" />
    <circle cx="300" cy="200" r="12" fill="#FFFDF9" />
    <!-- Rangoli Rays -->
    <g stroke="#047857" stroke-width="2" opacity="0.6">
      <line x1="300" y1="90" x2="300" y2="60" />
      <line x1="260" y1="120" x2="235" y2="100" />
      <line x1="340" y1="120" x2="365" y2="100" />
    </g>
  ` : `
    <!-- Indian National Tricolor Pride Motif -->
    <path d="M 150,140 Q 300,100 450,140 L 450,180 Q 300,140 150,180 Z" fill="#FF781F" />
    <path d="M 150,180 Q 300,140 450,180 L 450,220 Q 300,180 150,220 Z" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1" />
    <path d="M 150,220 Q 300,180 450,220 L 450,260 Q 300,220 150,260 Z" fill="#059669" />
    <!-- Central Navy Chakra -->
    <circle cx="300" cy="200" r="18" fill="none" stroke="#000080" stroke-width="2.5" />
  `}
</svg>
`)}`;
}

// Placeholder avatar for unknown employees or family relations
export const PLACEHOLDER_AVATAR_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 360" width="100%" height="100%">
  <rect width="300" height="360" fill="#FFFDF7" stroke="#EA580C" stroke-width="2" rx="16"/>
  <circle cx="150" cy="130" r="54" fill="#047857" opacity="0.8"/>
  <path d="M 60,320 C 70,240 110,210 150,210 C 190,210 230,240 240,320 Z" fill="#EA580C" opacity="0.8"/>
  <circle cx="150" cy="180" r="90" fill="#059669" opacity="0.1" />
</svg>
`)}`;
