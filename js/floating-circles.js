/* ============================================
   FLOATING CIRCLES - DECORATIVE ANIMATIONS
   ============================================ */

import { FLOATING_CIRCLES_CONFIG, DOM_SELECTORS, SCROLL_SETTINGS } from './constants.js';

class FloatingCircles {
  constructor() {
    this.container = document.querySelector(DOM_SELECTORS.floatingCircles);
    this.circles = [];
    this.isScrolling = false;
    this.scrollTimeout = null;
    this.longPressTimer = null;
    this.longPressActive = false;

    this.init();
  }

  init() {
    this.createCircles();
    this.setupEventListeners();
  }

  createCircles() {
    for (let i = 0; i < FLOATING_CIRCLES_CONFIG.totalCircles; i++) {
      const circle = this.generateCircle();
      this.container.appendChild(circle);
      this.circles.push(circle);
    }
  }

  generateCircle() {
    const size = this.randomBetween(
      FLOATING_CIRCLES_CONFIG.minSize,
      FLOATING_CIRCLES_CONFIG.maxSize
    );

    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;

    const circle = document.createElement('div');
    circle.classList.add('circle');

    // 30% chance for white circle
    if (Math.random() > 0.7) {
      circle.classList.add('white');
    }

    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;
    circle.style.animationDuration = `${this.randomBetween(6, 12)}s`;
    circle.style.animationDelay = `${Math.random() * 2}s`;

    return circle;
  }

  setupEventListeners() {
    // Scroll event - shake circles
    window.addEventListener('scroll', () => this.handleScroll(), { passive: true });

    // Long press - disperse circles
    document.addEventListener('mousedown', (e) => this.startLongPress(e));
    document.addEventListener('mouseup', () => this.endLongPress());
    document.addEventListener('touchstart', (e) => this.startLongPress(e));
    document.addEventListener('touchend', () => this.endLongPress());
    document.addEventListener('mouseleave', () => this.endLongPress());

    // Window resize - regenerate circles
    window.addEventListener('resize', () => this.regenerateCircles());
  }

  handleScroll() {
    if (this.isScrolling) return;

    this.isScrolling = true;

    // Add shake animation to all circles
    this.circles.forEach((circle) => {
      circle.classList.remove('shake');
      void circle.offsetWidth;
      circle.classList.add('shake');
    });

    // Throttle scroll handler
    clearTimeout(this.scrollTimeout);
    this.scrollTimeout = setTimeout(() => {
      this.isScrolling = false;
    }, SCROLL_SETTINGS.throttleDelay);
  }

  startLongPress(e) {
    if (e.target.classList.contains('menu-button') || e.target.closest('.menu-button')) {
      return;
    }

    this.longPressTimer = setTimeout(() => {
      this.longPressActive = true;
      this.disperseCircles();
    }, 500);
  }

  endLongPress() {
    clearTimeout(this.longPressTimer);
    this.longPressActive = false;
  }

  disperseCircles() {
    this.circles.forEach((circle) => {
      const angle = Math.random() * Math.PI * 2;
      const distance = FLOATING_CIRCLES_CONFIG.disperseDistance;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance;

      circle.style.setProperty('--tx', `${tx}px`);
      circle.style.setProperty('--ty', `${ty}px`);
      circle.classList.remove('disperse');
      void circle.offsetWidth;
      circle.classList.add('disperse');

      setTimeout(() => {
        if (this.longPressActive) {
          const newCircle = this.generateCircle();
          circle.replaceWith(newCircle);
          this.circles[this.circles.indexOf(circle)] = newCircle;
        }
      }, FLOATING_CIRCLES_CONFIG.disperseDuration);
    });
  }

  regenerateCircles() {
    this.circles.forEach((circle) => circle.remove());
    this.circles = [];
    this.createCircles();
  }

  randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  destroy() {
    window.removeEventListener('scroll', () => this.handleScroll());
    document.removeEventListener('mousedown', (e) => this.startLongPress(e));
    document.removeEventListener('mouseup', () => this.endLongPress());
  }
}

export default FloatingCircles;
