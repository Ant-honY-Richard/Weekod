const fs = require('fs');
const https = require('https');
const path = require('path');

const logos = [
  {
    name: 'react.svg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg'
  },
  {
    name: 'wordpress.svg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/9/98/WordPress_blue_logo.svg'
  },
  {
    name: 'javascript.svg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png'
  },
  {
    name: 'html5-css3.svg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg'
  },
  {
    name: 'nodejs.svg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg'
  },
  {
    name: 'php.svg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/2/27/PHP-logo.svg'
  },
  {
    name: 'mysql.svg',
    url: 'https://upload.wikimedia.org/wikipedia/en/d/dd/MySQL_logo.svg'
  },
  {
    name: 'figma.svg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg'
  },
  {
    name: 'shopify.svg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Shopify_logo_2018.svg'
  },
  {
    name: 'typescript.svg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg'
  },
  {
    name: 'react-native.svg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg'
  },
  {
    name: 'aws.svg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg'
  }
];

const downloadLogo = (logo) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(path.join(__dirname, logo.name));
    https.get(logo.url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded ${logo.name}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(logo.name);
      console.error(`Error downloading ${logo.name}:`, err.message);
      reject(err);
    });
  });
};

const downloadAllLogos = async () => {
  try {
    for (const logo of logos) {
      await downloadLogo(logo);
    }
    console.log('All logos downloaded successfully!');
  } catch (error) {
    console.error('Error downloading logos:', error);
  }
};

downloadAllLogos(); 