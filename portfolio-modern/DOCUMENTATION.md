# Portfolio Modernization Project Documentation

## Project Overview

### Original Site
- **URL**: tommelloul.com
- **Technology**: Legacy HTML4 Transitional with jQuery
- **Features**: Full-page scrolling, 3D logo animation, project galleries, video backgrounds
- **Dependencies**: fullPage.js, Fancybox, Three.js, MediaElement.js

### Modernization Goal
Transform the legacy portfolio into a modern Next.js 15 application while maintaining **100% visual and functional parity** with the original site.

### Current Status
- **Phase**: Layout & Styling Restoration (Phase 3)
- **Progress**: Foundation complete, visual restoration in progress
- **Branch**: `feature/foundation-modernization-with-visual-testing`
- **Last Commit**: `0b7a979` - "feat: establish modernization foundation with visual comparison testing"

## Tech Stack & Rationale

### Core Framework
- **Next.js 15** (App Router) - Modern React framework with excellent performance
- **TypeScript** - Type safety and better developer experience
- **React 19** - Latest React with concurrent features

### Styling & UI
- **Tailwind CSS** - Utility-first CSS framework for rapid development
- **Framer Motion** - Smooth animations (replaces jQuery animations)
- **Custom CSS** - For complex layouts that need precise control

### 3D & Media
- **React Three Fiber** - 3D logo animation (replaces Three.js)
- **PhotoSwipe** - Modern gallery lightbox (replaces Fancybox)
- **Embla Carousel** - Responsive carousel component

### Testing & Quality
- **Playwright** - Visual comparison testing against live site
- **ESLint** - Code linting and quality enforcement
- **Prettier** - Code formatting consistency

### Build & Deployment
- **Next.js Static Export** - For GitHub Pages deployment
- **next-sitemap** - SEO optimization
- **@next/bundle-analyzer** - Performance monitoring

## Architecture Decisions

### 1. Custom FullPage Implementation
**Decision**: Replace fullPage.js with custom FullPage/Section components
**Rationale**: 
- Better control over scroll behavior
- No external dependencies
- Easier to customize for specific needs
- Better TypeScript integration

**Implementation**:
```typescript
// FullPage.tsx - Manages section navigation and scroll control
// Section.tsx - Wrapper component with ref forwarding for scroll detection
```

### 2. Modular Component Structure
**Decision**: Break down monolithic HTML into reusable React components
**Rationale**:
- Better maintainability
- Reusable patterns
- Easier testing
- Type safety

**Components**:
- `FullPage` - Section navigation and scroll control
- `Section` - Wrapper with ref forwarding
- `ProjectSection` - Individual project display with video
- `Gallery` - PhotoSwipe integration
- `AboutSection` - Profile video + accordions
- `Menu` - Hamburger navigation
- `Logo3D` - Three.js animation

### 3. Centralized Data Management
**Decision**: Move hardcoded HTML content to structured TypeScript data
**Rationale**:
- Type safety
- Easier content management
- Reusable data structure
- Better maintainability

**Implementation**:
```typescript
// src/lib/data.ts - Centralized project data with TypeScript interfaces
export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  year: string;
  location: string;
  type: string;
  images: {
    main: string;
    gallery: string[];
    thumbnails: string[];
  };
  videos: {
    main?: string;
    gallery: string[];
  };
  text: {
    academic: string;
    practical: string;
    details: string;
  };
}
```

### 4. Video Autoplay System
**Decision**: Implement scroll-triggered video autoplay with useInView
**Rationale**:
- Better performance (videos only play when visible)
- Matches original behavior
- Modern React patterns

**Implementation**:
```typescript
// ProjectSection.tsx
const isInView = useInView(ref, { amount: 0.3 });
useEffect(() => {
  if (isInView && project.videos?.main && videoRef.current) {
    videoRef.current.play().catch(console.error);
  } else if (videoRef.current) {
    videoRef.current.pause();
  }
}, [isInView, project.videos?.main]);
```

### 5. Visual Comparison Testing
**Decision**: Implement comprehensive visual regression testing
**Rationale**:
- Ensure 100% visual parity
- Catch regressions early
- Automated quality assurance
- Reference against live site

**Implementation**:
- Baseline screenshots from tommelloul.com
- Playwright visual comparison tests
- Multiple viewport testing (375px, 768px, 1920px)
- Interactive state testing

## Project Structure

```
portfolio-modern/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── globals.css         # Global styles
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Home page
│   │   └── viewport.ts         # Viewport configuration
│   ├── components/             # React components
│   │   ├── FullPage.tsx        # Section navigation
│   │   ├── Section.tsx         # Section wrapper
│   │   ├── ProjectSection.tsx  # Project display
│   │   ├── Gallery.tsx         # PhotoSwipe gallery
│   │   ├── AboutSection.tsx    # About page
│   │   ├── Menu.tsx            # Navigation menu
│   │   ├── Header.tsx          # Site header
│   │   └── Logo3D.tsx          # 3D logo animation
│   └── lib/
│       └── data.ts             # Project data and types
├── public/                     # Static assets
│   ├── works/                  # Project images and videos
│   ├── images/                 # Site images
│   ├── models/                 # 3D models
│   └── about/                  # About page assets
├── tests/                      # Playwright tests
│   ├── baseline/               # Reference screenshots
│   ├── visual-comparison.spec.ts
│   ├── homepage.spec.ts
│   ├── navigation.spec.ts
│   └── gallery.spec.ts
├── scripts/                    # Build scripts
│   └── capture-baseline.js     # Baseline screenshot script
├── .cursorrules                # Cursor AI rules
├── DOCUMENTATION.md            # This file
├── IMPLEMENTATION_PLAN.md      # Task tracking
└── package.json               # Dependencies and scripts
```

## Component Architecture

### FullPage Component
**Purpose**: Manages section navigation and scroll behavior
**Key Features**:
- Smooth scrolling between sections
- Keyboard navigation (arrow keys, page up/down, home/end)
- URL hash management
- Scroll event handling

```typescript
interface FullPageProps {
  children: React.ReactNode;
}

const FullPage: React.FC<FullPageProps> = ({ children }) => {
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  
  // Scroll management logic
  const scrollToSection = useCallback((index: number) => {
    // Implementation
  }, []);
  
  // Keyboard and wheel event handlers
  // ...
};
```

### Section Component
**Purpose**: Wrapper for individual sections with ref forwarding
**Key Features**:
- Ref forwarding for scroll detection
- Consistent section styling
- Animation support

```typescript
interface SectionProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  background?: string;
}

const Section = forwardRef<HTMLElement, SectionProps>(
  ({ id, children, className = '', background }, ref) => {
    return (
      <motion.section
        ref={ref}
        id={id}
        className={`section h-screen flex items-center justify-center relative ${className}`}
        // Animation props
      >
        {children}
      </motion.section>
    );
  }
);
```

### ProjectSection Component
**Purpose**: Displays individual project with background video and content
**Key Features**:
- Background video with autoplay
- Project information display
- Navigation arrows
- Gallery integration

```typescript
interface ProjectSectionProps {
  project: Project;
  index: number;
}

export default function ProjectSection({ project, index }: ProjectSectionProps) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(ref, { amount: 0.3 });
  
  // Video autoplay logic
  // Navigation logic
  // Gallery integration
}
```

### Gallery Component
**Purpose**: PhotoSwipe integration for project galleries
**Key Features**:
- Image preloading
- Lightbox functionality
- Navigation between images
- Responsive design

### AboutSection Component
**Purpose**: About page with profile video and expandable content
**Key Features**:
- Profile video display
- Expandable accordion sections
- Contact information
- Responsive layout

## Data Flow

### Data Structure
All project data is centralized in `src/lib/data.ts`:

```typescript
export const projects: Project[] = [
  {
    id: 'animism',
    title: 'ANIMISM',
    subtitle: 'Algorithmic Architecture',
    description: 'A computational approach to architectural design...',
    year: '2023',
    location: 'Tel Aviv, Israel',
    type: 'Academic Research',
    images: {
      main: '/works/ANIMISM/Render.jpg',
      gallery: [...],
      thumbnails: [...]
    },
    videos: {
      main: '/works/ANIMISM/Video/Video.webm',
      gallery: [...]
    },
    text: {
      academic: '...',
      practical: '...',
      details: '...'
    }
  },
  // ... more projects
];
```

### Image/Video Paths
- All assets stored in `/public` directory
- Paths are relative to `/public` in code
- TypeScript ensures path correctness
- Fallback formats supported for videos

### State Management
- Local component state for UI interactions
- No global state management needed
- Props drilling for data flow
- Context API for shared state if needed

## Development Workflow

### Local Development
```bash
# Start development server
npm run dev
# Server runs on http://localhost:3001 (port 3000 often in use)
```

### Testing
```bash
# Run all tests
npm run test

# Run visual comparison tests
npm run test:visual

# Run tests with UI
npm run test:ui

# Debug tests
npm run test:debug
```

### Building
```bash
# Production build
npm run build

# Static export for GitHub Pages
npm run export

# Bundle analysis
npm run analyze
```

### Code Quality
```bash
# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Type checking
npm run type-check
```

## Testing Strategy

### Visual Comparison Testing
**Purpose**: Ensure 100% visual parity with original site
**Implementation**:
- Baseline screenshots captured from tommelloul.com
- Multiple viewport testing (375px, 768px, 1920px)
- Interactive state testing (menu open, gallery lightbox, accordions)
- Automated diff generation

**Test Structure**:
```typescript
// tests/visual-comparison.spec.ts
test.describe('Visual Comparison', () => {
  viewports.forEach(viewport => {
    sections.forEach(section => {
      test(`${section.name} section should match baseline`, async ({ page }) => {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await page.goto(section.url, { waitUntil: 'networkidle' });
        await page.waitForTimeout(2000);
        
        await expect(page).toHaveScreenshot(`${section.name}-${viewport.name}.png`, {
          fullPage: true,
          animations: 'disabled',
          threshold: 0.1,
          maxDiffPixels: 1000
        });
      });
    });
  });
});
```

### E2E Testing
**Purpose**: Test user interactions and functionality
**Coverage**:
- Navigation between sections
- Gallery opening/closing
- Menu interactions
- Accordion expansions
- Video autoplay
- Responsive behavior

### Component Testing
**Purpose**: Test individual component functionality
**Coverage**:
- Component rendering
- Props handling
- Event handlers
- State management
- Error boundaries

## Deployment

### GitHub Pages
**Target**: Static site deployment on GitHub Pages
**Process**:
1. Merge feature branch to `main`
2. GitHub Actions triggers build
3. Static files exported to `/out` directory
4. Deployed to GitHub Pages

### Build Configuration
```javascript
// next.config.js
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
};
```

### SEO Optimization
- `next-sitemap` for automatic sitemap generation
- Meta tags for social sharing
- Structured data for search engines
- Performance optimization

## Performance Considerations

### Image Optimization
- WebP/AVIF formats when possible
- Lazy loading for images
- Responsive image sizing
- Next.js Image component for optimization

### Video Optimization
- WebM format for modern browsers
- MP4 fallback for compatibility
- Lazy loading with intersection observer
- Autoplay only when visible

### Bundle Optimization
- Tree shaking for unused code
- Code splitting by route
- Dynamic imports for heavy components
- Bundle analysis with @next/bundle-analyzer

### Animation Performance
- Framer Motion for 60fps animations
- GPU acceleration for transforms
- Reduced motion support
- Optimized scroll listeners

## Browser Support

### Modern Browsers
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Features
- ES2017+ JavaScript
- CSS Grid and Flexbox
- WebGL for 3D animations
- Intersection Observer API
- CSS Custom Properties

### Fallbacks
- Graceful degradation for older browsers
- Polyfills for critical features
- Progressive enhancement approach

## Security Considerations

### Content Security Policy
- Strict CSP headers
- No inline scripts
- External resource whitelisting

### Dependencies
- Regular security audits
- Minimal external dependencies
- Trusted package sources

### Data Handling
- No sensitive data in client code
- Static site generation
- No server-side processing

## Maintenance

### Regular Updates
- Dependency updates
- Security patches
- Performance monitoring
- Browser compatibility testing

### Monitoring
- Bundle size tracking
- Performance metrics
- Error logging
- User analytics

### Documentation
- Keep documentation updated
- Code comments for complex logic
- README for setup instructions
- Changelog for releases

---

*This documentation is maintained as part of the portfolio modernization project. Last updated: October 18, 2025*
