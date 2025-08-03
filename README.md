# National Lottery Application

A modern, responsive lottery application built with React, TypeScript, and Tailwind CSS. This application provides a complete lottery experience with game management, ticket purchasing, result checking, and user authentication.

## 🎯 Project Overview

This is a full-featured lottery platform that includes:
- **Game Showcase**: Interactive displays for various lottery games (Lotto, EuroMillions, Set For Life, Thunderball, etc.)
- **Ticket Management**: Buy tickets, check numbers, and view results
- **User Authentication**: Registration and sign-in functionality
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Real-time Countdowns**: Live countdown timers for upcoming draws

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Node.js** (version 16.0 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** - [Download here](https://git-scm.com/)

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <YOUR_GIT_URL>
   cd <YOUR_PROJECT_NAME>
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or if you prefer yarn
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the project for production
- `npm run build:dev` - Build in development mode
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality
- `npm run build:css` - Watch and build Tailwind CSS (if needed)

## 🛠 Technology Stack

- **Frontend Framework**: React 18.3.1
- **Build Tool**: Vite 5.4.1
- **Language**: TypeScript 5.5.3
- **Styling**: Tailwind CSS 3.4.1
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Routing**: React Router DOM 6.30.1
- **State Management**: React Query (TanStack Query)
- **Form Handling**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Date Handling**: date-fns

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── Header.tsx      # Main navigation header
│   ├── Footer.tsx      # Site footer
│   ├── GameCard.tsx    # Individual game display cards
│   └── ...
├── pages/              # Page components
│   ├── Index.tsx       # Home page
│   ├── GamesPage.tsx   # Games listing page
│   ├── SignInPage.tsx  # User authentication
│   └── ...
├── data/               # Static data and configurations
├── lib/                # Utility functions and configurations
└── styles/             # Global styles and Tailwind config
```

## 🎮 Key Features

### Game Management
- **Live Game Showcase**: Dynamic display of current lottery games
- **Countdown Timers**: Real-time countdown to draw dates
- **Interactive Game Cards**: Hover effects and animations
- **Responsive Carousels**: Auto-sliding game carousels on mobile

### User Experience
- **Mega Menus**: Rich navigation with game previews
- **Mobile-First Design**: Optimized for all screen sizes
- **Smooth Animations**: Tailwind CSS animations and transitions
- **Loading States**: Interactive feedback for user actions

### Pages & Functionality
- **Home Page**: Hero section with featured games
- **Games Page**: Comprehensive game listings and comparisons
- **Buy Tickets**: Ticket purchasing interface
- **Check Numbers**: Number verification system
- **Results**: Latest draw results display
- **Authentication**: User registration and sign-in

## 🎨 Styling & Design

The application uses a modern design system with:
- **Gradient Backgrounds**: Eye-catching gradient color schemes
- **Card-based Layout**: Clean, organized content presentation
- **Hover Effects**: Interactive elements with smooth transitions
- **Responsive Typography**: Scalable text for all devices
- **Custom Animations**: Tailwind CSS and custom keyframe animations

## 🔧 Development Guidelines

### Code Style
- Use TypeScript for all new components
- Follow React functional component patterns with hooks
- Implement proper error boundaries and loading states
- Use Tailwind CSS utility classes for styling

### Component Structure
```typescript
// Example component structure
import React, { useState } from 'react';
import { ComponentProps } from './types';

const ComponentName: React.FC<ComponentProps> = ({ prop1, prop2 }) => {
  const [state, setState] = useState();
  
  return (
    <div className="tailwind-classes">
      {/* Component content */}
    </div>
  );
};

export default ComponentName;
```

### Adding New Pages
1. Create component in `src/pages/`
2. Add route to main router configuration
3. Update navigation links in `Header.tsx`
4. Add any required data to `src/data/`

## 🚢 Deployment

### Lovable Platform (Recommended)
1. Visit the [Lovable Project](https://lovable.dev/projects/90551817-668b-450a-8dc7-03078a929ec7)
2. Click Share → Publish
3. Your application will be automatically deployed

### Custom Domain
To connect a custom domain:
1. Navigate to Project → Settings → Domains
2. Click "Connect Domain"
3. Follow the setup instructions

### Manual Deployment
For other platforms:
```bash
npm run build
# Deploy the contents of the 'dist' folder to your hosting provider
```

## 🤝 Contributing

### Making Changes
1. **Via Lovable**: Visit the project URL and start prompting
2. **Local Development**: Clone, make changes, and push to this repo
3. **Direct GitHub**: Edit files directly in the GitHub interface
4. **GitHub Codespaces**: Use the cloud development environment

### Pull Request Process
1. Create a feature branch from `main`
2. Make your changes and test thoroughly
3. Ensure all linting passes: `npm run lint`
4. Submit a pull request with a clear description

## 🐛 Troubleshooting

### Common Issues

**Port already in use**
```bash
# Kill process on port 5173
npx kill-port 5173
# Or use a different port
npm run dev -- --port 3000
```

**Node modules issues**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Build errors**
```bash
# Check TypeScript errors
npx tsc --noEmit
# Clear Vite cache
rm -rf node_modules/.vite
```

### Environment Variables
If you need environment variables, create a `.env.local` file:
```env
VITE_API_URL=your_api_url_here
VITE_APP_TITLE=National Lottery
```

## 📄 License

This project is private and confidential. All rights reserved.

---

**Happy Coding! 🎰**

Make sure to read through this README completely before starting development. If you encounter any issues or have questions, don't hesitate to reach out to the team.