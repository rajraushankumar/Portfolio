# Rajraushan Kumar — Portfolio

A premium, dark-themed personal portfolio website built with pure HTML, CSS, and JavaScript — no frameworks, no libraries. Features a glassmorphism design, smooth scroll-spy navigation, animated stats, a certificate gallery with lightbox, and a fully responsive layout (desktop sidebar, tablet stacked layout, mobile bottom navigation).

**Live Demo:** _add your deployed link here (e.g. GitHub Pages / Netlify / Vercel)_

---

## ✨ Features

- **Sticky glass sidebar** — profile photo, name, role tags, theme toggle, contact info, resume download, and social links
- **Sticky top navigation** with a sliding active indicator that scroll-spies the current section
- **Sections:**
  - **About** — bio and animated stat counters
  - **Project** — filterable project cards (All / AI & ML / Applications / Web development / Others) with tech badges, View Code and Live Demo buttons
  - **Connect** — quick links to resume, LinkedIn, and GitHub
  - **Skill** — tech stack badges
  - **Certificate** — certificate gallery with click-to-enlarge lightbox
  - **Education** — timeline cards for college, higher secondary, and secondary education
  - **Contact** — working contact form UI, social links, and an embedded Google Map
- **Light / Dark mode toggle** with preference saved in `localStorage`
- **Fully responsive** — sidebar collapses to a top bar on tablet, and a fixed bottom navigation bar appears on mobile
- **Smooth animations** — fade-in/slide-up on scroll, card hover lift, image zoom, button ripple effect
- **Custom scrollbar** and smooth scrolling throughout

## 🛠️ Tech Stack

- **HTML5** — semantic markup
- **CSS3** — custom properties (CSS variables), Flexbox, Grid, animations, media queries
- **Vanilla JavaScript** — IntersectionObserver (scroll-spy & reveal animations), event delegation, no dependencies

No build tools, no frameworks — just open `index.html` in a browser.

## 📁 Project Structure

```
Portfolio/
├── index.html              # Main HTML structure
├── style.css                # All styling (theme variables, layout, animations)
├── script.js                 # Interactivity (nav, filters, lightbox, form, theme)
├── profile.jpeg               # Profile photo
├── Rajraushan Resume.pdf       # Downloadable resume
├── projects.png / Vacancy.png   # Project screenshots
└── images/                       # Certificate images
    ├── gnsu.png
    ├── Frontend.png
    ├── Predict.png
    └── ... (more certificates)
```

## 🚀 Getting Started

1. Clone or download this repository
2. Open `index.html` directly in any modern browser — no server or build step required

```bash
git clone https://github.com/rajraushankumar/Portfolio.git
cd Portfolio
open index.html   # or just double-click the file
```

Optionally, serve it locally for a better dev experience:

```bash
python3 -m http.server 8080
# then visit http://localhost:8080
```

## 🎨 Customization

All colors, spacing, and radii are controlled through CSS variables at the top of `style.css`:

```css
:root{
  --bg: #121212;
  --card: #1E1E1E;
  --accent: #F6C453;
  --radius: 20px;
  --transition: 300ms;
}
```

Change a value once here and it updates across the entire site.

## 📬 Contact

- **Email:** rajraushankumar360@gmail.com
- **LinkedIn:** [linkedin.com/in/rajraushankumar](https://www.linkedin.com/in/rajraushankumar)
- **GitHub:** [github.com/rajraushankumar](https://github.com/rajraushankumar)
- **YouTube:** [@rajraushanofficial](https://youtube.com/@rajraushanofficial)

---

*Built with ❤️ by Rajraushan Kumar*
