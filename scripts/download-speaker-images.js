const https = require('https');
const fs = require('fs');
const path = require('path');

// Create speakers directory if it doesn't exist
const speakersDir = path.join(__dirname, '../public/speakers');
if (!fs.existsSync(speakersDir)) {
  fs.mkdirSync(speakersDir, { recursive: true });
}

// Professional speaker images from Unsplash
const speakers = [
  {
    name: 'sarah-ahmed',
    url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face'
  },
  {
    name: 'ahmed-hassan',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face'
  },
  {
    name: 'fatima-khan',
    url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face'
  },
  {
    name: 'usman-ali',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face'
  },
  {
    name: 'ayesha-malik',
    url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face'
  },
  {
    name: 'zain-rizvi',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face'
  },
  {
    name: 'sana-javed',
    url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face'
  },
  {
    name: 'omar-farooq',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face'
  },
  {
    name: 'layla-hassan',
    url: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=face'
  }
];

function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const filepath = path.join(speakersDir, `${filename}.jpg`);
    
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        const fileStream = fs.createWriteStream(filepath);
        response.pipe(fileStream);
        
        fileStream.on('finish', () => {
          fileStream.close();
          console.log(`✅ Downloaded: ${filename}.jpg`);
          resolve();
        });
        
        fileStream.on('error', (err) => {
          fs.unlink(filepath, () => {}); // Delete the file if there was an error
          reject(err);
        });
      } else {
        reject(new Error(`Failed to download ${filename}: ${response.statusCode}`));
      }
    }).on('error', reject);
  });
}

async function downloadAllImages() {
  console.log('📥 Downloading speaker images...');
  
  for (const speaker of speakers) {
    try {
      await downloadImage(speaker.url, speaker.name);
    } catch (error) {
      console.error(`❌ Error downloading ${speaker.name}:`, error.message);
    }
  }
  
  console.log('🎉 All speaker images downloaded!');
}

downloadAllImages(); 