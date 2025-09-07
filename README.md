# Portfolio Website by Ben Probst

A beautiful portfolio website built with modern web technologies, showcasing DevOps methodologies and skills.

## 🚀 Tech Stack

- **Svelte** - Intuitive, lightweight framework
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Clean utility-first styling
- **Vite** - Fast development and hot reload

## ✨ Features

- **Strava API** - Live data and recent workouts pull directly from Strava
- **Grafana Dashboards** - Display real time metrics from a production server

## 🛠️ Development

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```

3. **Open your browser**
   Navigate to `http://localhost:5174`

4. **To test Strava functions**
   Create a .env file using .env.example and update the Strava API tokens

   You can use the Netlify CLI:

```bash
npm install -g netlify-cli
netlify dev
```
   This will run the functions locally at `/.netlify/functions/strava-stats`.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 📁 Project Structure

```
src/
├── lib/
│   ├── components/     # Reusable Svelte components
│   │   ├── ui/        # UI components
│   │   ├── HeroSection.svelte
│   │   ├── AboutSection.svelte
│   │   ├── ProjectsSection.svelte
│   │   └── ContactSection.svelte
│   └── utils.ts       # Utility functions
├── app.css           # Global styles with Tailwind
└── App.svelte        # Main application component
```

## 🎨 Customization

### Styling
- Modify `src/app.css` for global styles
- Use Tailwind classes for component styling
- Customize the color scheme in CSS variables

### Content
- Personal information in component files
   - About, Experience and Contact
- Images and Resume in the `public/` directory
- Project data in `ProjectsSection.svelte`

## 🚢 Deployment

### Build for Production
```bash
npm run build
```

Deployed via Netlify at [www.benprobst.biz](https://www.benprobst.biz/)
[![Netlify Status](https://api.netlify.com/api/v1/badges/e90df316-e7c7-48d9-b2d4-e80a79ae5cba/deploy-status)](https://app.netlify.com/projects/benprobst/deploys)
---