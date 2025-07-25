# Modern Portfolio Website

A beautiful, responsive portfolio website built with modern web technologies.

## 🚀 Tech Stack

- **SvelteKit** - Fast, lightweight framework
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **shadcn-svelte** - Beautiful UI components
- **Vite** - Lightning-fast development

## ✨ Features

- **Responsive Design** - Works perfectly on all devices
- **Modern UI** - Beautiful components with shadcn-svelte
- **Fast Performance** - Optimized with SvelteKit and Vite
- **Type Safety** - Full TypeScript support
- **Dark Mode Ready** - CSS variables for theming

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

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 📁 Project Structure

```
src/
├── lib/
│   ├── components/     # Reusable Svelte components
│   │   ├── ui/        # shadcn-svelte UI components
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
- Update personal information in component files
- Replace placeholder images in the `public/` directory
- Modify project data in `ProjectsSection.svelte`

## 🚢 Deployment

### Build for Production
```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

### Deployment Options
- **Vercel** - Perfect for SvelteKit projects
- **Netlify** - Easy drag-and-drop deployment
- **GitHub Pages** - Free hosting for open source projects

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ using SvelteKit and shadcn-svelte
