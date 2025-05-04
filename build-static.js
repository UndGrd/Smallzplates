const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Creating a purely static site without Next.js build...');

// Create out directory if it doesn't exist
if (!fs.existsSync('out')) {
  fs.mkdirSync('out', { recursive: true });
}

// Create static directories
console.log('Creating static directories...');
fs.mkdirSync('out/images', { recursive: true });
fs.mkdirSync('out/_next/static/css', { recursive: true });
fs.mkdirSync('out/_next/static/chunks', { recursive: true });

// Create basic CSS file
const basicCss = `
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
.nav {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
}
.nav a {
  color: #fff;
  text-decoration: none;
  font-size: 1.1rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.nav a:hover {
  color: #d4af37;
}
.footer {
  margin-top: 4rem;
  text-align: center;
  padding: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}
`;

fs.writeFileSync('out/_next/static/css/main.css', basicCss);

// Create an index.html file with client-side only rendering
console.log('Creating static HTML files...');
const indexHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Smallz Plates | Custom Plates and Craft Cocktails</title>
    <meta name="description" content="Experience custom plates and craft cocktails at Smallz Plates.">
    <link rel="icon" href="/favicon.ico" sizes="any">
    <link rel="stylesheet" href="/_next/static/css/main.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cormorant:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  </head>
  <body>
    <header>
      <div class="container">
        <img src="/images/logo.png" alt="Smallz Plates Logo" class="logo">
        <nav class="nav">
          <a href="/">Home</a>
          <a href="/menu.html">Menu</a>
          <a href="/gallery.html">Gallery</a>
          <a href="/contact.html">Contact</a>
        </nav>
      </div>
    </header>
    
    <main>
      <div class="container">
        <h1>Custom Plates & Craft Cocktails</h1>
        <p>Experience culinary artistry and handcrafted cocktails in an unforgettable atmosphere. Our passion for quality ingredients and innovative techniques creates a dining experience like no other.</p>
        <a href="/contact.html" class="btn">Reserve a Table</a>
      </div>
    </main>
    
    <footer class="footer">
      <div class="container">
        <p>&copy; 2025 Smallz Plates. All rights reserved.</p>
      </div>
    </footer>
  </body>
</html>`;

// Create other pages
const menuHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Menu | Smallz Plates</title>
    <meta name="description" content="Explore our seasonal menu of custom plates and craft cocktails.">
    <link rel="icon" href="/favicon.ico" sizes="any">
    <link rel="stylesheet" href="/_next/static/css/main.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cormorant:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  </head>
  <body>
    <header>
      <div class="container">
        <img src="/images/logo.png" alt="Smallz Plates Logo" class="logo">
        <nav class="nav">
          <a href="/">Home</a>
          <a href="/menu.html">Menu</a>
          <a href="/gallery.html">Gallery</a>
          <a href="/contact.html">Contact</a>
        </nav>
      </div>
    </header>
    
    <main>
      <div class="container">
        <h1>Our Menu</h1>
        <p>Seasonal ingredients, innovative techniques, unforgettable flavors.</p>
      </div>
    </main>
    
    <footer class="footer">
      <div class="container">
        <p>&copy; 2025 Smallz Plates. All rights reserved.</p>
      </div>
    </footer>
  </body>
</html>`;

const galleryHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Gallery | Smallz Plates</title>
    <meta name="description" content="See our restaurant, dishes, and craft cocktails.">
    <link rel="icon" href="/favicon.ico" sizes="any">
    <link rel="stylesheet" href="/_next/static/css/main.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cormorant:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  </head>
  <body>
    <header>
      <div class="container">
        <img src="/images/logo.png" alt="Smallz Plates Logo" class="logo">
        <nav class="nav">
          <a href="/">Home</a>
          <a href="/menu.html">Menu</a>
          <a href="/gallery.html">Gallery</a>
          <a href="/contact.html">Contact</a>
        </nav>
      </div>
    </header>
    
    <main>
      <div class="container">
        <h1>Gallery</h1>
        <p>Take a visual journey through our restaurant and cuisine.</p>
      </div>
    </main>
    
    <footer class="footer">
      <div class="container">
        <p>&copy; 2025 Smallz Plates. All rights reserved.</p>
      </div>
    </footer>
  </body>
</html>`;

const contactHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Contact | Smallz Plates</title>
    <meta name="description" content="Contact us for reservations or inquiries.">
    <link rel="icon" href="/favicon.ico" sizes="any">
    <link rel="stylesheet" href="/_next/static/css/main.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cormorant:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  </head>
  <body>
    <header>
      <div class="container">
        <img src="/images/logo.png" alt="Smallz Plates Logo" class="logo">
        <nav class="nav">
          <a href="/">Home</a>
          <a href="/menu.html">Menu</a>
          <a href="/gallery.html">Gallery</a>
          <a href="/contact.html">Contact</a>
        </nav>
      </div>
    </header>
    
    <main>
      <div class="container">
        <h1>Contact Us</h1>
        <p>For reservations or inquiries, please reach out to us.</p>
        <div style="margin-top: 2rem; text-align: center;">
          <p>Phone: (555) 123-4567</p>
          <p>Email: info@smallzplates.com</p>
          <p>Address: 30100 Telegraph Road, Bingham Farms, MI 48025</p>
        </div>
      </div>
    </main>
    
    <footer class="footer">
      <div class="container">
        <p>&copy; 2025 Smallz Plates. All rights reserved.</p>
      </div>
    </footer>
  </body>
</html>`;

// Create a 404.html file as a fallback
const notFoundHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Page Not Found | Smallz Plates</title>
    <meta name="description" content="Page not found.">
    <link rel="icon" href="/favicon.ico" sizes="any">
    <link rel="stylesheet" href="/_next/static/css/main.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cormorant:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  </head>
  <body>
    <header>
      <div class="container">
        <img src="/images/logo.png" alt="Smallz Plates Logo" class="logo">
        <nav class="nav">
          <a href="/">Home</a>
          <a href="/menu.html">Menu</a>
          <a href="/gallery.html">Gallery</a>
          <a href="/contact.html">Contact</a>
        </nav>
      </div>
    </header>
    
    <main>
      <div class="container">
        <h1>Page Not Found</h1>
        <p>Sorry, the page you're looking for doesn't exist.</p>
        <a href="/" class="btn">Return Home</a>
      </div>
    </main>
    
    <footer class="footer">
      <div class="container">
        <p>&copy; 2025 Smallz Plates. All rights reserved.</p>
      </div>
    </footer>
  </body>
</html>`;

fs.writeFileSync('out/index.html', indexHtml);
fs.writeFileSync('out/menu.html', menuHtml);
fs.writeFileSync('out/gallery.html', galleryHtml);
fs.writeFileSync('out/contact.html', contactHtml);
fs.writeFileSync('out/404.html', notFoundHtml);

// Create a placeholder logo if needed
console.log('Creating placeholder images if needed...');
const placeholderLogo = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="100" viewBox="0 0 200 100">
  <rect width="200" height="100" fill="#000"/>
  <text x="50%" y="50%" font-family="sans-serif" font-size="24" fill="#d4af37" text-anchor="middle" dominant-baseline="middle">Smallz Plates</text>
</svg>`;

if (!fs.existsSync('out/images/logo.png')) {
  fs.writeFileSync('out/images/logo.svg', placeholderLogo);
}

// Try to copy any existing public assets
console.log('Copying public directory if it exists...');
try {
  if (fs.existsSync('public')) {
    // Copy favicon
    if (fs.existsSync('public/favicon.ico')) {
      fs.copyFileSync('public/favicon.ico', 'out/favicon.ico');
    }
    
    // Copy public/images directory if it exists
    if (fs.existsSync('public/images')) {
      fs.mkdirSync('out/images', { recursive: true });
      const imageFiles = fs.readdirSync('public/images');
      imageFiles.forEach(file => {
        try {
          fs.copyFileSync(`public/images/${file}`, `out/images/${file}`);
        } catch (error) {
          console.error(`Error copying image ${file}`, error);
        }
      });
    }
  }
} catch (error) {
  console.error('Error copying public directory, but continuing...', error);
}

// Create a .nojekyll file to prevent GitHub Pages processing
fs.writeFileSync('out/.nojekyll', '');

console.log('Static build completed!'); 