/* ============================================
   MAIN APP INITIALIZATION
   ============================================ */

import Slider from './slider.js';
import FloatingCircles from './floating-circles.js';
import { DOM_SELECTORS } from './constants.js';

class Portfolio {
  constructor() {
    this.slider = null;
    this.floatingCircles = null;
    this.menuButton = null;
    this.isMenuOpen = false;

    this.init();
  }

  init() {
    console.log('🚀 Initializing Portfolio...');

    // Initialize slider (left panel)
    this.initializeSlider();

    // Initialize floating circles (right panel)
    this.initializeFloatingCircles();

    // Initialize menu
    this.initializeMenu();

    console.log('✅ Portfolio initialized successfully!');
  }

  initializeSlider() {
    try {
      this.slider = new Slider();
      console.log('✅ Slider initialized');
    } catch (error) {
      console.error('❌ Slider initialization failed:', error);
    }
  }

  initializeFloatingCircles() {
    try {
      this.floatingCircles = new FloatingCircles();
      console.log('✅ Floating circles initialized');
    } catch (error) {
      console.error('❌ Floating circles initialization failed:', error);
    }
  }

  initializeMenu() {
    this.menuButton = document.querySelector(DOM_SELECTORS.menuButton);
    if (this.menuButton) {
      this.menuButton.addEventListener('click', () => this.toggleMenu());
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    this.menuButton.classList.toggle('active', this.isMenuOpen);
    console.log('Menu toggled:', this.isMenuOpen);
  }

  destroy() {
    if (this.slider) {
      this.slider.destroy();
    }
    if (this.floatingCircles) {
      this.floatingCircles.destroy();
    }
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.portfolio = new Portfolio();
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  if (window.portfolio) {
    window.portfolio.destroy();
  }
});
