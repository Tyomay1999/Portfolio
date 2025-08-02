# 🌐 Artyom Bordulanyuk – Personal Portfolio

Welcome to the source code of my personal portfolio — a high-performance, animated, and multilingual web experience built with the modern web stack.

This project reflects not only my developer skills, but also my design philosophy: clarity, minimalism, and performance.

---

## ✨ Features

- ⚡ **Framework**: Built with [Next.js 15](https://nextjs.org/), the latest version with enhanced routing and performance
- 💡 **TypeScript**: Strongly typed and scalable architecture
- 🎨 **Tailwind CSS**: Fully responsive and utility-first styling
- 🌗 **Dark/Light Mode**: Smooth toggle between themes using `next-themes`
- 🌍 **Internationalization (i18n)**: Powered by `next-intl` with dynamic locale routing
- 🎬 **Storytelling Scroll**: Layered section-based navigation with scroll animations
- 🧩 **Modular Sections**: Each section (About Me, Projects, Tech Stack, Contact) is isolated and reusable
- 🚀 **SEO Ready**: Dynamic metadata, Open Graph tags, and clean URLs
- 🛠️ **ESLint + Prettier**: Code quality and formatting enforced

---

## 📁 Folder Structure

root/
├── components/
│ ├── sections/ # Modular UI blocks like About, Projects, TechStack
│ ├── ui/ # Reusable UI components (Buttons, Switches, etc.)
│ └── navigation/ # Scroll detection, locale switch, etc.
├── HOC/ # Section wrappers for scroll-based rendering
├── messages/ # JSON translation files for each locale
├── public/ # Static assets (icons, images, fonts)
├── styles/ # Global styles and Tailwind config
├── app/ # Next.js 15 app directory (routing, layout, etc.)
├── lib/ # Environment setup, config, and utils
├── i18n/ # i18n settings and middleware
└── .env.local # Environment variables

---

## 🧪 Getting Started

1. **Clone the repo:**

```bash
git clone https://github.com/Tyomay1999/Portfolio.git
cd portfolio

Install dependencies:

npm install

Set up environment variables:

Create a .env.local file:


NEXT_PUBLIC_SITE_NAME=Any text here
NEXT_PUBLIC_DEFAULT_LOCALE=en
NEXT_PUBLIC_TOTAL_SECTIONS=7
# Contact links:
NEXT_PUBLIC_CONTACT_GITHUB=https://github.com/your-handle
NEXT_PUBLIC_CONTACT_LINKEDIN=https://linkedin.com/in/your-profile
...

Run locally:

npm run dev


🔧 Scripts
Command	Description
npm run dev	Start development server
npm run lint	Run ESLint
npm run format	Run Prettier formatter
npm run build	Build project for production

📦 Built With
Next.js

Tailwind CSS

next-intl

TypeScript

Framer Motion (optional for animation)

ESLint

Prettier


🤝 Contact
If you're interested in collaborating or just want to say hi:

GitHub: https://github.com/Tyomay1999

LinkedIn: https://www.linkedin.com/in/artyom-bordulanyuk-a266071b6/

Email: abordulanyuk@gmail.com

📄 License
This project is open-source and free to use for learning or inspiration.
```
