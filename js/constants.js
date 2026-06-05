/* ============================================
   APP CONSTANTS
   ============================================ */

export const SLIDER_SETTINGS = {
  slideCount: 9,
  autoPlayInterval: 5000,          // 5 seconds
  transitionDuration: 800,          // 800ms
  easing: 'cubic-bezier(0.65, 0, 0.35, 1)',
};

export const FLOATING_CIRCLES_CONFIG = {
  totalCircles: 8,
  minSize: 20,                      // pixels
  maxSize: 150,                     // pixels
  animationDuration: 8000,          // 8 seconds
  shakeIntensity: 5,                // pixels
  disperseDistance: 200,            // pixels
  disperseDuration: 1000,           // 1 second
};

export const ANIMATION_SPEEDS = {
  fast: 200,                        // ms
  normal: 400,                      // ms
  slow: 600,                        // ms
  verySlow: 1000,                   // ms
};

export const BREAKPOINTS = {
  mobile: 480,
  tablet: 768,
  desktop: 1024,
  wide: 1440,
};

export const SCROLL_SETTINGS = {
  throttleDelay: 100,               // ms
  scrollSensitivity: 50,            // pixels
};

export const DOM_SELECTORS = {
  portfolioPage: '.portfolio-page',
  leftPanel: '.left-panel',
  rightPanel: '.right-panel',
  sliderTrack: '.slider-track',
  slides: '.slide',
  pagination: '.pagination',
  paginationLines: '.pagination-line',
  floatingCircles: '.floating-circles',
  circles: '.circle',
  menuButton: '.menu-button',
  topNav: '.top-nav',
  content: '.content',
};

export default {
  SLIDER_SETTINGS,
  FLOATING_CIRCLES_CONFIG,
  ANIMATION_SPEEDS,
  BREAKPOINTS,
  SCROLL_SETTINGS,
  DOM_SELECTORS,
};
