# Eliran's GitHub Showcase

A monorepo containing my portfolio projects: technical blog, AI music generator, and Claude automation toolkit.

[![CI](https://github.com/Elirank1/monorepo/actions/workflows/ci.yml/badge.svg)](https://github.com/Elirank1/monorepo/actions/workflows/ci.yml)
[![Deploy Blog](https://github.com/Elirank1/monorepo/actions/workflows/deploy-blog.yml/badge.svg)](https://github.com/Elirank1/monorepo/actions/workflows/deploy-blog.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🚀 Projects

### 📝 [Technical Blog](./packages/blog)

A modern, fast technical blog built with Astro and MDX.

**Features:**
- ⚡ Lightning-fast static site generation
- 🌙 Dark mode with auto-detection
- 📡 RSS feed
- 🏷️ Tag-based filtering
- 📱 Fully responsive

**Tech Stack:** Astro, MDX, TypeScript, CSS

[View Live](https://elirank1.github.io) · [Read More](./packages/blog/README.md)

---

### 🎵 [Suno Music Generator](./packages/suno-music)

AI-powered music generation application inspired by Suno.

**Features:**
- 🎼 Create songs from text prompts
- 🎸 10+ genres (Pop, Rock, Hip Hop, Electronic, etc.)
- 🎭 8 mood options
- 🎹 Instrumental mode
- 📝 Song library

**Tech Stack:** React, TypeScript, Zustand, Vite

[Try Demo](https://elirank1.github.io/suno-music) · [Read More](./packages/suno-music/README.md)

---

### 🤖 [Claude Automation Toolkit](./packages/claude-toolkit)

OpenClaw-inspired automation suite with Claude AI integrations.

**Features:**
- 📅 Meeting reminders via WhatsApp
- 💬 HubSpot CRM integration
- 🔗 Google Meet automation
- 🤖 Claude AI context generation
- 📊 Monthly digest reports
- 🛠️ MCP server for Claude Desktop

**Tech Stack:** Node.js, TypeScript, Claude API, MCP SDK

[Read More](./packages/claude-toolkit/README.md)

---

## 📁 Monorepo Structure

```
/
├── packages/
│   ├── blog/              # Astro technical blog
│   ├── suno-music/        # React music generator
│   └── claude-toolkit/    # Node.js automation toolkit
├── .github/
│   └── workflows/         # GitHub Actions CI/CD
├── package.json           # Monorepo root
└── README.md
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 20+
- npm 10+

### Installation

```bash
# Clone the repository
git clone https://github.com/Elirank1/monorepo.git
cd monorepo

# Install all dependencies
npm install
```

### Development

```bash
# Run all projects in dev mode
npm run dev

# Or run individual projects
npm run blog:dev      # Blog dev server
npm run suno:dev      # Suno app dev server
npm run toolkit:dev   # Claude toolkit dev mode
```

### Building

```bash
# Build all projects
npm run build

# Or build individually
npm run build --workspace=packages/blog
npm run build --workspace=packages/suno-music
npm run build --workspace=packages/claude-toolkit
```

## 🎯 Inspiration

This monorepo was inspired by:

- [steipete's blog](https://github.com/steipete/steipete.me) - Blog structure and style
- [Suno AI](https://suno.com) - Music generation interface
- [Ground UP Ventures' OpenClaw](https://github.com/navotvolkgroundup/groundup-toolkit) - Automation toolkit concept

## 🚀 Deployment

### Blog

The blog automatically deploys to GitHub Pages on every push to `main`:

1. Go to repository Settings → Pages
2. Source: GitHub Actions
3. The blog will be live at `https://elirank1.github.io`

### Suno Music Generator

Can be deployed to:
- Vercel: `vercel --cwd packages/suno-music`
- Netlify: Deploy `packages/suno-music/dist`
- GitHub Pages: Static build

### Claude Toolkit

Can be deployed to:
- Docker container
- Cloud VM (AWS EC2, Google Compute Engine)
- Serverless functions (for workflows)

## 📊 Project Statistics

- **Lines of Code:** ~5,000+
- **Files:** ~50+
- **Technologies:** 15+
- **Time to Build:** 1 session with Claude 🤖

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - see [LICENSE](./LICENSE) for details

## 🙏 Acknowledgments

- **Astro** for the amazing static site generator
- **Anthropic** for Claude AI
- **The open-source community** for inspiration and tools

## 📫 Contact

**Eliran Kadouri**

- GitHub: [@Elirank1](https://github.com/Elirank1)
- Email: elirank512@gmail.com
- Blog: [elirank1.github.io](https://elirank1.github.io)

---

⭐ If you found this interesting, please star the repo!
