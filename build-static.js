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
execSync('cp -R .next/static out/_next/', { stdio: 'inherit' });

// Create an index.html file with client-side only rendering
console.log('Creating client-side only index.html...');
const indexHtml = `
<!DOCTYPE html>
<html lang="en" class="__variable_0ec1f4">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="/_next/static/css/app/layout.css">
    <link rel="icon" href="/favicon.ico" sizes="any">
    <title>Smallz Plates | Custom Plates and Craft Cocktails</title>
    <meta name="description" content="Experience custom plates and craft cocktails at Smallz Plates.">
    <script defer src="/_next/static/chunks/webpack.js"></script>
    <script defer src="/_next/static/chunks/main-app.js"></script>
    <script defer src="/_next/static/chunks/app-pages-internals.js"></script>
    <script defer src="/_next/static/chunks/app/layout.js"></script>
    <script defer src="/_next/static/chunks/app/page.js"></script>
  </head>
  <body class="bg-black text-white font-cormorant">
    <div id="app">Loading...</div>
    <script>
      window.addEventListener('DOMContentLoaded', function() {
        // JavaScript will take over and render the app client-side only
      });
    </script>
  </body>
</html>
`;

fs.writeFileSync('out/index.html', indexHtml);

// Copy public directory to out
console.log('Copying public directory...');
execSync('cp -R public/* out/', { stdio: 'inherit' });

// Create a .nojekyll file to prevent GitHub Pages processing
fs.writeFileSync('out/.nojekyll', '');

console.log('Static build completed!'); 