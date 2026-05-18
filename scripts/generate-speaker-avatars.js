const fs = require('fs');
const path = require('path');

// Speaker data with attractive color schemes
const speakers = [
  {
    name: "Dr. Sarah Ahmed",
    role: "Google Developer Expert",
    company: "Google Cloud",
    expertise: "AI/ML & Cloud",
    color: "from-purple-500 to-pink-600",
    initials: "SA",
    avatar: "👩‍💻"
  },
  {
    name: "Ahmed Hassan",
    role: "Senior AI Engineer",
    company: "TechCorp Pakistan",
    expertise: "Machine Learning",
    color: "from-blue-500 to-cyan-600",
    initials: "AH",
    avatar: "👨‍💻"
  },
  {
    name: "Fatima Khan",
    role: "Startup Mentor",
    company: "Innovation Hub",
    expertise: "Entrepreneurship",
    color: "from-green-500 to-emerald-600",
    initials: "FK",
    avatar: "👩‍💼"
  },
  {
    name: "Usman Ali",
    role: "Google Developer Expert",
    company: "GDG Lahore",
    expertise: "Flutter & AI",
    color: "from-orange-500 to-red-600",
    initials: "UA",
    avatar: "👨‍💻"
  },
  {
    name: "Ayesha Malik",
    role: "AI Research Lead",
    company: "AI Research Lab",
    expertise: "Deep Learning",
    color: "from-indigo-500 to-purple-600",
    initials: "AM",
    avatar: "👩‍🔬"
  },
  {
    name: "Zain Rizvi",
    role: "Tech Community Leader",
    company: "GDG Cloud Lahore",
    expertise: "Cloud & DevOps",
    color: "from-teal-500 to-blue-600",
    initials: "ZR",
    avatar: "👨‍🚀"
  },
  {
    name: "Sana Javed",
    role: "AI Product Manager",
    company: "Microsoft",
    expertise: "Product Strategy",
    color: "from-pink-500 to-rose-600",
    initials: "SJ",
    avatar: "👩‍💼"
  },
  {
    name: "Omar Farooq",
    role: "Data Science Lead",
    company: "Netflix",
    expertise: "Data Science",
    color: "from-violet-500 to-purple-600",
    initials: "OF",
    avatar: "👨‍💼"
  },
  {
    name: "Layla Hassan",
    role: "AI Ethics Researcher",
    company: "Stanford AI Lab",
    expertise: "AI Ethics",
    color: "from-amber-500 to-orange-600",
    initials: "LH",
    avatar: "👩‍🔬"
  }
];

// Color gradient definitions
const gradients = {
  "from-purple-500 to-pink-600": "url(#purple-pink)",
  "from-blue-500 to-cyan-600": "url(#blue-cyan)",
  "from-green-500 to-emerald-600": "url(#green-emerald)",
  "from-orange-500 to-red-600": "url(#orange-red)",
  "from-indigo-500 to-purple-600": "url(#indigo-purple)",
  "from-teal-500 to-blue-600": "url(#teal-blue)",
  "from-pink-500 to-rose-600": "url(#pink-rose)",
  "from-violet-500 to-purple-600": "url(#violet-purple)",
  "from-amber-500 to-orange-600": "url(#amber-orange)"
};

// Gradient definitions
const gradientDefs = `
  <defs>
    <linearGradient id="purple-pink" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#8b5cf6;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#e11d48;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="blue-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#0891b2;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="green-emerald" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#10b981;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#059669;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="orange-red" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#f97316;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#dc2626;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="indigo-purple" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#6366f1;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="teal-blue" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#14b8a6;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#3b82f6;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="pink-rose" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#ec4899;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#e11d48;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="violet-purple" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#8b5cf6;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="amber-orange" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#f59e0b;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#f97316;stop-opacity:1" />
    </linearGradient>
  </defs>
`;

function generateAvatar(speaker) {
  const gradientId = gradients[speaker.color];
  const initials = speaker.initials;
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  ${gradientDefs}
  
  <!-- Background circle with gradient -->
  <circle cx="100" cy="100" r="90" fill="${gradientId}" stroke="white" stroke-width="4"/>
  
  <!-- Glow effect -->
  <circle cx="100" cy="100" r="85" fill="none" stroke="white" stroke-width="2" opacity="0.3"/>
  
  <!-- Inner circle for text -->
  <circle cx="100" cy="100" r="70" fill="white" opacity="0.95"/>
  
  <!-- Speaker initials -->
  <text x="100" y="110" font-family="Arial, sans-serif" font-size="32" font-weight="bold" text-anchor="middle" fill="#1f2937">
    ${initials}
  </text>
  
  <!-- Decorative elements -->
  <circle cx="70" cy="70" r="3" fill="white" opacity="0.6"/>
  <circle cx="130" cy="130" r="2" fill="white" opacity="0.4"/>
  <circle cx="80" cy="140" r="2" fill="white" opacity="0.5"/>
  
  <!-- Animated glow effect (CSS animation will be applied) -->
  <circle cx="100" cy="100" r="95" fill="none" stroke="white" stroke-width="1" opacity="0.2">
    <animate attributeName="opacity" values="0.2;0.6;0.2" dur="3s" repeatCount="indefinite"/>
  </circle>
</svg>`;
}

function generateReactComponent(speaker) {
  const gradientId = gradients[speaker.color];
  const initials = speaker.initials;
  
  return `import React from 'react';

export function ${speaker.name.replace(/\s+/g, '')}Avatar() {
  return (
    <div className="relative w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 mx-auto sm:mx-0 group">
      <div className="absolute inset-0 bg-gradient-to-r ${speaker.color} rounded-full blur-sm opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
      <div className="relative rounded-full border-4 border-white shadow-lg w-full h-full bg-gradient-to-r ${speaker.color} flex items-center justify-center text-white font-bold text-2xl sm:text-3xl group-hover:scale-110 transition-transform duration-300">
        ${initials}
      </div>
      <div className="absolute inset-0 rounded-full border-2 border-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
}`;
}

// Create output directory
const outputDir = path.join(__dirname, '../public/speaker-avatars');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Generate SVG files and React components
speakers.forEach(speaker => {
  const svgContent = generateAvatar(speaker);
  const fileName = speaker.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  
  // Save SVG file
  fs.writeFileSync(path.join(outputDir, `${fileName}.svg`), svgContent);
  
  // Save React component
  const reactComponent = generateReactComponent(speaker);
  fs.writeFileSync(path.join(outputDir, `${fileName}-component.tsx`), reactComponent);
  
  console.log(`✅ Generated avatar for ${speaker.name}`);
});

// Generate index file for easy imports
const indexContent = speakers.map(speaker => {
  const fileName = speaker.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  return `export { ${speaker.name.replace(/\s+/g, '')}Avatar } from './${fileName}-component';`;
}).join('\n');

fs.writeFileSync(path.join(outputDir, 'index.ts'), indexContent);

// Generate a comprehensive avatar component
const comprehensiveComponent = `import React from 'react';

interface SpeakerAvatarProps {
  name: string;
  role: string;
  company: string;
  expertise: string;
  color: string;
  initials: string;
  isKeynote?: boolean;
  className?: string;
}

export function SpeakerAvatar({ 
  name, 
  role, 
  company, 
  expertise, 
  color, 
  initials, 
  isKeynote = false,
  className = ""
}: SpeakerAvatarProps) {
  return (
    <div className={\`relative group \${className}\`}>
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/50 overflow-hidden group-hover:scale-105">
        <div className="p-6">
          <div className="text-center mb-6">
            <div className="relative w-24 h-24 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <div className={\`absolute inset-0 bg-gradient-to-r \${color} rounded-full blur-sm opacity-50\`}></div>
              <div className={\`relative rounded-full border-4 border-white shadow-lg w-full h-full bg-gradient-to-r \${color} flex items-center justify-center text-white font-bold text-2xl\`}>
                {initials}
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors duration-300">
              {name}
            </h3>
            <p className="text-purple-600 font-semibold text-sm mb-1">
              {role}
            </p>
            <p className="text-gray-500 text-sm mb-3">
              {company}
            </p>
            <div className={\`inline-flex items-center bg-gradient-to-r \${color} text-white px-3 py-1 rounded-full text-xs font-semibold\`}>
              {expertise}
            </div>
            {isKeynote && (
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-500 to-orange-600 text-white px-3 py-1 rounded-full text-xs font-bold mt-2">
                <span>⭐ KEYNOTE SPEAKER</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export const speakerData = ${JSON.stringify(speakers, null, 2)};
`;

fs.writeFileSync(path.join(outputDir, 'speaker-avatar.tsx'), comprehensiveComponent);

console.log('\n🎉 All speaker avatars generated successfully!');
console.log(`📁 Files saved to: ${outputDir}`);
console.log('\n📋 Usage:');
console.log('1. Import the comprehensive component: import { SpeakerAvatar } from "./public/speaker-avatars/speaker-avatar"');
console.log('2. Use individual components: import { AhmedHassanAvatar } from "./public/speaker-avatars"');
console.log('3. SVG files are available for direct use in img tags'); 