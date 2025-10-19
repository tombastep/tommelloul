# Portfolio Modernization Implementation Plan

## Project Overview

**Goal**: Modernize Tom Melloul's portfolio site from legacy HTML4/jQuery to Next.js 15 while maintaining 100% visual and functional parity with tommelloul.com

**Current Phase**: Layout & Styling Restoration (Phase 3)
**Progress**: Foundation complete, visual restoration in progress
**Branch**: `feature/foundation-modernization-with-visual-testing`
**Last Commit**: `0b7a979` - "feat: establish modernization foundation with visual comparison testing"

## Success Criteria

- [ ] Visual comparison tests show <0.5% pixel difference
- [ ] All assets load without 404 errors
- [ ] Scroll behavior matches original exactly
- [ ] All interactions work identically to original
- [ ] Responsive layout matches original at all breakpoints
- [ ] Logo animation matches original behavior
- [ ] Gallery lightbox works identically to Fancybox
- [ ] About accordions expand/collapse correctly
- [ ] Video autoplay works on all project sections
- [ ] Menu animation matches original hamburger animation

## Completed Tasks

### ✅ Phase 1: Visual Comparison Setup (Oct 18, 2025 - commit 0b7a979)

**Duration**: 2 hours
**Status**: Complete

- [x] Set up Playwright visual comparison testing infrastructure
- [x] Create baseline capture script (`scripts/capture-baseline.js`)
- [x] Capture baseline screenshots from tommelloul.com for all viewports (375px, 768px, 1920px)
- [x] Generate HTML diff reports showing all visual differences
- [x] Implement visual regression testing suite (`tests/visual-comparison.spec.ts`)
- [x] Add interactive state testing (menu open, gallery lightbox, accordions)

**Files Created/Modified**:
- `scripts/capture-baseline.js`
- `tests/visual-comparison.spec.ts`
- `tests/baseline/` (33 baseline screenshots)

### ✅ Phase 2: Asset Fixes & Video System (Oct 18, 2025 - commit 0b7a979)

**Duration**: 3 hours
**Status**: Complete

- [x] Copy all missing assets from original site
  - [x] UMAGUTI images (21 images + thumbnails)
  - [x] WENDY images (3 images)
  - [x] All favicon files (16x16, 32x32, dark variants)
  - [x] about.mp4 video file
- [x] Fix file path issues with spaces in filenames
- [x] Add main background videos to all 9 projects
  - [x] ANIMISM: `/works/ANIMISM/Video/Video.webm`
  - [x] WENDY: `/works/WENDY/Video/Video.webm`
  - [x] EVO: `/works/EVO/Video/Video.webm`
  - [x] EAAA: `/works/EAAA/video/Video.webm`
  - [x] MIST: `/works/MIST/Video/Video.webm`
  - [x] UMAGUTI: `/works/UMAGUTI/Video/Video.webm`
  - [x] CLEAR STUDIO: `/works/CLEAR_STUDIO/Video/Video.webm`
  - [x] HS BUILDING: `/works/HS_BUILDING/Video/Video.webm`
  - [x] NEOT SHAMIR: `/works/NEOT_SHAMIR/Video/Video.webm`
- [x] Implement video autoplay system with useInView detection
- [x] Add video ref forwarding through Section component
- [x] Implement proper video control (play/pause based on scroll position)
- [x] Add debugging logs and error handling for video playback

**Files Created/Modified**:
- `src/lib/data.ts` (updated video paths and added main videos)
- `src/components/ProjectSection.tsx` (video autoplay implementation)
- `src/components/Section.tsx` (ref forwarding)
- `public/works/` (all missing assets copied)

### ✅ Phase 2.5: Foundation Modernization (Oct 18, 2025 - commit 0b7a979)

**Duration**: 4 hours
**Status**: Complete

- [x] Migrate from legacy HTML4/jQuery to Next.js 15 with App Router
- [x] Implement TypeScript throughout with strict typing
- [x] Replace fullPage.js with custom FullPage/Section components
- [x] Add Framer Motion for smooth animations and transitions
- [x] Integrate React Three Fiber for 3D logo animation
- [x] Replace Fancybox with PhotoSwipe for gallery lightbox
- [x] Add Embla Carousel for responsive galleries
- [x] Build modular React component architecture
- [x] Create centralized data structure in `src/lib/data.ts`
- [x] Set up comprehensive Playwright testing suite
- [x] Add ESLint, Prettier, and TypeScript configuration
- [x] Implement bundle analysis with @next/bundle-analyzer
- [x] Add next-sitemap for SEO optimization

**Files Created/Modified**:
- `src/app/` (Next.js App Router structure)
- `src/components/` (all React components)
- `src/lib/data.ts` (project data structure)
- `package.json` (dependencies and scripts)
- `playwright.config.ts` (testing configuration)
- `.eslintrc.json`, `.prettierrc` (code quality)

## In Progress Tasks

### 🔄 Phase 3: Layout & Styling Restoration

**Duration**: 4-6 hours
**Status**: In Progress
**Priority**: High

#### 3.1 Logo Positioning & Animation
- [ ] Port `relocateLogo()` function from original JavaScript
- [ ] Fix logo positioning to match original absolute positioning
- [ ] Implement proper logo animation timing and easing
- [ ] Ensure logo appears correctly on all sections
- [ ] Test logo behavior during scroll transitions

**Reference Files**:
- Original: `assets/js/main.js` (relocateLogo function)
- Original: `assets/css/main.css` (logo positioning styles)
- Target: `src/components/Logo3D.tsx`

#### 3.2 Header Structure Restoration
- [ ] Restore original header structure with absolute positioning
- [ ] Match exact typography from `main.css` (--tSize variable system)
- [ ] Implement proper header layout and spacing
- [ ] Fix header positioning relative to sections
- [ ] Ensure header remains consistent across all sections

**Reference Files**:
- Original: `index.html` (header structure)
- Original: `assets/css/main.css` (header styles)
- Target: `src/components/Header.tsx`

#### 3.3 Typography System
- [ ] Port exact typography from `main.css`
- [ ] Implement --tSize variable system for responsive text
- [ ] Match font sizes, line heights, and spacing exactly
- [ ] Ensure text scaling works correctly on all viewports
- [ ] Test typography across all sections

**Reference Files**:
- Original: `assets/css/main.css` (typography system)
- Target: `src/app/globals.css`, `tailwind.config.ts`

#### 3.4 Project Section Layouts
- [ ] Restore original project section layout from `gallery.css`
- [ ] Implement proper grid system for project galleries
- [ ] Fix project section spacing and alignment
- [ ] Ensure project information displays correctly
- [ ] Match original project section animations

**Reference Files**:
- Original: `assets/css/gallery.css` (project layouts)
- Original: `index.html` (project section structure)
- Target: `src/components/ProjectSection.tsx`

#### 3.5 About Section Layout
- [ ] Restore About section two-column layout
- [ ] Implement sticky video positioning
- [ ] Fix accordion layout and spacing
- [ ] Ensure proper responsive behavior
- [ ] Match original About section styling

**Reference Files**:
- Original: `assets/css/about.css` (About section styles)
- Original: `index.html` (About section structure)
- Target: `src/components/AboutSection.tsx`

## Pending Tasks

### ⏳ Phase 4: Interactions & Behavior (3-4 hours)

**Priority**: High
**Dependencies**: Phase 3 completion

#### 4.1 Scroll Behavior
- [ ] Implement section snap scroll with easing
- [ ] Match exact scroll timing and behavior from fullPage.js
- [ ] Fix keyboard navigation (arrow keys, page up/down, home/end)
- [ ] Ensure smooth transitions between sections
- [ ] Test scroll behavior on all devices

#### 4.2 Menu Animation
- [ ] Port exact hamburger menu SVG path animation
- [ ] Implement proper menu open/close timing
- [ ] Fix menu positioning and overlay behavior
- [ ] Ensure menu works correctly on all viewports
- [ ] Match original menu animation exactly

#### 4.3 Gallery Lightbox
- [ ] Configure PhotoSwipe to match Fancybox behavior exactly
- [ ] Implement proper gallery navigation
- [ ] Fix gallery image loading and preloading
- [ ] Ensure gallery works on all devices
- [ ] Match original gallery animations and transitions

#### 4.4 Accordion Behavior
- [ ] Port expandable accordion behavior with correct timing
- [ ] Implement proper accordion animations
- [ ] Fix accordion content layout
- [ ] Ensure accordions work on all viewports
- [ ] Match original accordion behavior exactly

### ⏳ Phase 5: Performance & Polish (2-3 hours)

**Priority**: Medium
**Dependencies**: Phase 4 completion

#### 5.1 Performance Optimization
- [ ] Optimize images (WebP/AVIF formats)
- [ ] Implement proper lazy loading
- [ ] Minimize bundle size
- [ ] Optimize animations for 60fps
- [ ] Test performance on mobile devices

#### 5.2 Code Quality
- [ ] Remove unused code and dependencies
- [ ] Optimize component re-renders
- [ ] Add proper error boundaries
- [ ] Improve TypeScript coverage
- [ ] Add performance monitoring

#### 5.3 SEO & Accessibility
- [ ] Optimize meta tags and structured data
- [ ] Improve accessibility compliance
- [ ] Add proper ARIA labels
- [ ] Test with screen readers
- [ ] Optimize for search engines

### ⏳ Phase 6: Visual Regression Validation (1-2 hours)

**Priority**: High
**Dependencies**: Phase 5 completion

#### 6.1 Visual Testing
- [ ] Re-run visual comparison tests
- [ ] Verify <0.5% pixel difference across all viewports
- [ ] Fix any remaining visual discrepancies
- [ ] Test all interactive states
- [ ] Validate responsive behavior

#### 6.2 Final Validation
- [ ] Test on multiple browsers and devices
- [ ] Verify all functionality works identically
- [ ] Check performance metrics
- [ ] Validate accessibility compliance
- [ ] Prepare for production deployment

## Decision Log

### October 18, 2025

**Custom FullPage vs fullPage.js Library**
- **Decision**: Implement custom FullPage/Section components
- **Rationale**: Better control over scroll behavior, no external dependencies, easier customization, better TypeScript integration
- **Impact**: More development time but better maintainability

**PhotoSwipe vs Fancybox**
- **Decision**: Use PhotoSwipe for gallery lightbox
- **Rationale**: Modern, actively maintained, better performance, TypeScript support
- **Impact**: Need to configure PhotoSwipe to match Fancybox behavior exactly

**Video Autoplay Implementation**
- **Decision**: Use useInView hook with ref forwarding
- **Rationale**: Modern React patterns, better performance, easier to control
- **Impact**: Videos only play when visible, better user experience

**Visual Comparison Testing**
- **Decision**: Implement comprehensive Playwright visual regression testing
- **Rationale**: Ensure 100% visual parity, catch regressions early, automated QA
- **Impact**: More testing setup but better quality assurance

## Known Issues

### Critical Issues (Must Fix)

1. **Logo positioning incorrect**
   - **Issue**: Logo doesn't appear in correct position on sections
   - **Root Cause**: Missing `relocateLogo()` function port
   - **Impact**: High - affects all sections
   - **Solution**: Port relocateLogo() function from original JavaScript

2. **Typography doesn't match original**
   - **Issue**: Text sizes, spacing, and scaling incorrect
   - **Root Cause**: Missing --tSize variable system from main.css
   - **Impact**: High - affects visual parity
   - **Solution**: Port exact typography system from main.css

3. **Project sections layout wrong**
   - **Issue**: Project galleries don't match original layout
   - **Root Cause**: Missing gallery.css port
   - **Impact**: High - affects all project sections
   - **Solution**: Port project section layouts from gallery.css

4. **Header layout different**
   - **Issue**: Header positioning and structure incorrect
   - **Root Cause**: Missing absolute positioning from original
   - **Impact**: High - affects all sections
   - **Solution**: Restore original header structure with absolute positioning

### Medium Issues

5. **About section layout incorrect**
   - **Issue**: Two-column layout not implemented
   - **Root Cause**: Missing about.css port
   - **Impact**: Medium - affects About section only
   - **Solution**: Port About section layout from about.css

6. **Scroll behavior not exact**
   - **Issue**: Scroll timing and easing different from original
   - **Root Cause**: Custom implementation doesn't match fullPage.js exactly
   - **Impact**: Medium - affects user experience
   - **Solution**: Adjust scroll timing and easing to match original

### Low Issues

7. **Menu animation different**
   - **Issue**: Hamburger menu animation not matching original
   - **Root Cause**: Missing SVG path animation port
   - **Impact**: Low - cosmetic issue
   - **Solution**: Port exact hamburger menu animation

8. **Gallery behavior slightly different**
   - **Issue**: PhotoSwipe doesn't behave exactly like Fancybox
   - **Root Cause**: Different library with different defaults
   - **Impact**: Low - functional but different feel
   - **Solution**: Configure PhotoSwipe to match Fancybox behavior

## Time Estimates

### Remaining Work
- **Phase 3 (Layout & Styling)**: 4-6 hours
- **Phase 4 (Interactions)**: 3-4 hours
- **Phase 5 (Performance & Polish)**: 2-3 hours
- **Phase 6 (Validation)**: 1-2 hours
- **Total Estimated Time**: 10-15 hours

### Risk Factors
- **High**: Logo positioning and typography fixes may take longer than estimated
- **Medium**: Gallery lightbox configuration might require significant tweaking
- **Low**: Performance optimization should be straightforward

## Next Steps

1. **Immediate**: Start Phase 3.1 - Logo positioning and animation
2. **This Week**: Complete Phase 3 - Layout & Styling Restoration
3. **Next Week**: Complete Phase 4 - Interactions & Behavior
4. **Final Week**: Complete Phase 5 & 6 - Polish and Validation

---

*This implementation plan is updated regularly as tasks are completed and new issues are identified. Last updated: October 18, 2025*
