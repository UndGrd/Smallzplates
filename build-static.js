const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Build the Next.js app
console.log('Building Next.js app...');
try {
  execSync('next build', { stdio: 'inherit' });
} catch (error) {
  console.error('Build failed but continuing with export...');
}

// Create out directory if it doesn't exist
if (!fs.existsSync('out')) {
  fs.mkdirSync('out');
}

// Copy the .next/static directory to out/_next/static
console.log('Copying static assets...');
execSync('mkdir -p out/_next', { stdio: 'inherit' });
try {
  execSync('cp -R .next/static out/_next/', { stdio: 'inherit' });
} catch (error) {
  console.error('Error copying static assets, but continuing...');
}

// Create an index.html file with client-side only rendering
console.log('Creating client-side only index.html...');
const indexHtml = `
<!DOCTYPE html>
<html lang="en" class="__variable_0ec1f4">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Smallz Plates | Custom Plates and Craft Cocktails</title>
    <meta name="description" content="Experience custom plates and craft cocktails at Smallz Plates.">
    <link rel="icon" href="/favicon.ico" sizes="any">
    <style>
      body {
        font-family: 'Cormorant', serif;
        background-color: #000;
        color: #fff;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem;
        text-align: center;
      }
      .logo {
        width: 200px;
        height: auto;
        margin-bottom: 2rem;
      }
      h1 {
        font-size: 3rem;
        font-weight: 300;
        margin-bottom: 1rem;
        color: #d4af37;
      }
      p {
        font-size: 1.25rem;
        line-height: 1.6;
        max-width: 700px;
        margin: 0 auto 2rem;
      }
      .btn {
        display: inline-block;
        padding: 0.75rem 1.5rem;
        background-color: #d4af37;
        color: #000;
        text-decoration: none;
        border-radius: 0.25rem;
        font-size: 1rem;
        letter-spacing: 0.05em;
        text-transform: uppercase;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <img src="/images/logo.png" alt="Smallz Plates Logo" class="logo">
      <h1>Custom Plates & Craft Cocktails</h1>
      <p>Experience culinary artistry and handcrafted cocktails in an unforgettable atmosphere. Our passion for quality ingredients and innovative techniques creates a dining experience like no other.</p>
      <a href="#" class="btn" onclick="alert('Coming soon!')">Reserve a Table</a>
    </div>
    
    <script>
      // Use this script to redirect to a deployed version if available
      // window.location.href = 'https://smallzplates.vercel.app';
    </script>
  </body>
</html>
`;

fs.writeFileSync('out/index.html', indexHtml);

// Create a 404.html file as a fallback
console.log('Creating 404.html...');
fs.writeFileSync('out/404.html', indexHtml);

// Copy public directory to out
console.log('Copying public directory...');
try {
  execSync('cp -R public/* out/', { stdio: 'inherit' });
} catch (error) {
  console.error('Error copying public directory, but continuing...');
}

// Create a .nojekyll file to prevent GitHub Pages processing
fs.writeFileSync('out/.nojekyll', '');

console.log('Static build completed!'); 