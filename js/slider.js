/* ============================================
   SLIDER LOGIC - LEFT PANEL CAROUSEL
   ============================================ */

import { SLIDER_SETTINGS, DOM_SELECTORS, ANIMATION_SPEEDS } from './constants.js';

class Slider {
  constructor() {
    this.track = document.querySelector(DOM_SELECTORS.sliderTrack);
    this.slides = document.querySelectorAll(DOM_SELECTORS.slides);
    this.paginationLines = document.querySelectorAll(DOM_SELECTORS.paginationLines);
    
    this.currentIndex = 0;
    this.totalSlides = SLIDER_SETTINGS.slideCount;
    this.isAnimating = false;
    this.autoPlayTimer = null;

    this.init();
  }

  init() {
    this.setupEventListeners();
    this.startAutoPlay();
  }

  setupEventListeners() {
    // Pagination line clicks
    this.paginationLines.forEach((line, index) => {
      line.addEventListener('click', () => this.goToSlide(index));
    });

    // Track transition end
    this.track.addEventListener('transitionend', () => {
      this.isAnimating = false;
    });

    // Pause on user interaction
    this.track.addEventListener('mousedown', () => this.pauseAutoPlay());
    this.track.addEventListener('touchstart', () => this.pauseAutoPlay());
  }

  goToSlide(index) {
    if (this.isAnimating) return;

    this.currentIndex = index % this.totalSlides;
    this.isAnimating = true;

    // Calculate scroll position
    const scrollPosition = this.currentIndex * 100;

    // Apply transition
    this.track.style.transition = `transform ${SLIDER_SETTINGS.transitionDuration}ms ${SLIDER_SETTINGS.easing}`;
    this.track.style.transform = `translateX(-${scrollPosition}%)`;

    // Update pagination
    this.updatePagination();

    // Reset auto-play
    this.resetAutoPlay();
  }

  nextSlide() {
    this.goToSlide(this.currentIndex + 1);
  }

  updatePagination() {
    this.paginationLines.forEach((line, index) => {
      line.classList.toggle('active', index === this.currentIndex);
    });
  }

  startAutoPlay() {
    this.autoPlayTimer = setInterval(() => {
      this.nextSlide();
    }, SLIDER_SETTINGS.autoPlayInterval);
  }

  pauseAutoPlay() {
    clearInterval(this.autoPlayTimer);
  }

  resetAutoPlay() {
    this.pauseAutoPlay();
    this.startAutoPlay();
  }

  destroy() {
    this.pauseAutoPlay();
    this.paginationLines.forEach((line) => {
      line.removeEventListener('click', () => {});
    });
  }
}

export default Slider;
