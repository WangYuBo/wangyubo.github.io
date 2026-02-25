/**
 * Modern Theme JavaScript
 * Handles dark mode toggle, reading progress, and smooth scrolling
 */

(function() {
  'use strict';

  // ==========================================
  // Dark Mode Toggle
  // ==========================================

  const THEME_KEY = 'theme-preference';

  function getPreferredTheme() {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored) {
      return stored;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    setTheme(next);
  }

  // Initialize theme before page render (prevents flash)
  const preferredTheme = getPreferredTheme();
  setTheme(preferredTheme);

  // Wait for DOM to be ready
  function initThemeToggle() {
    const toggleButton = document.querySelector('.theme-toggle');
    if (toggleButton) {
      toggleButton.addEventListener('click', toggleTheme);
    }
  }

  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem(THEME_KEY)) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });

  // ==========================================
  // Reading Progress Indicator
  // ==========================================

  function initReadingProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 0;
      height: 3px;
      background: var(--color-primary);
      z-index: 9999;
      transition: width 150ms ease;
    `;
    document.body.appendChild(progressBar);

    function updateProgress() {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
      progressBar.style.width = Math.min(scrollPercent, 100) + '%';
    }

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  // ==========================================
  // Smooth Scroll for Anchors
  // ==========================================

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const navHeight = document.querySelector('.navbar-custom')?.offsetHeight || 64;
          const targetPosition = target.offsetTop - navHeight - 20;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // ==========================================
  // Enhanced Table of Contents
  // ==========================================

  function initTableOfContents() {
    const catalogBody = document.querySelector('.catalog-body');
    if (!catalogBody) return;

    const headings = document.querySelectorAll('.post-container h2, .post-container h3');
    const catalogLinks = catalogBody.querySelectorAll('a');

    if (headings.length === 0 || catalogLinks.length === 0) return;

    const observerOptions = {
      rootMargin: '-80px 0px -80% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          catalogLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + id) {
              link.classList.add('active');
            }
          });
        }
      });
    }, observerOptions);

    headings.forEach(heading => {
      if (heading.id) {
        observer.observe(heading);
      }
    });
  }

  // ==========================================
  // Navbar Scroll Effect
  // ==========================================

  function initNavbarScroll() {
    const navbar = document.querySelector('.navbar-custom');
    if (!navbar) return;

    let lastScrollTop = 0;
    const scrollThreshold = 100;

    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > scrollThreshold) {
        navbar.classList.add('is-fixed');
      } else {
        navbar.classList.remove('is-fixed');
      }

      lastScrollTop = scrollTop;
    }, { passive: true });
  }

  // ==========================================
  // Enhanced Post Card Hover
  // ==========================================

  function initPostCardEffects() {
    const postPreviews = document.querySelectorAll('.post-preview');

    postPreviews.forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-4px)';
      });

      card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
      });
    });
  }

  // ==========================================
  // Copy Code Button
  // ==========================================

  function initCopyCodeButtons() {
    const codeBlocks = document.querySelectorAll('pre code');

    codeBlocks.forEach((codeBlock) => {
      const pre = codeBlock.parentElement;
      const button = document.createElement('button');
      button.className = 'copy-code-button';
      button.textContent = '复制';
      button.style.cssText = `
        position: absolute;
        top: 8px;
        right: 8px;
        padding: 4px 12px;
        background: var(--color-primary);
        color: white;
        border: none;
        border-radius: var(--radius-sm);
        font-size: var(--text-xs);
        cursor: pointer;
        opacity: 0;
        transition: opacity var(--transition-fast);
      `;

      pre.style.position = 'relative';
      pre.appendChild(button);

      pre.addEventListener('mouseenter', () => {
        button.style.opacity = '1';
      });

      pre.addEventListener('mouseleave', () => {
        button.style.opacity = '0';
      });

      button.addEventListener('click', async () => {
        const code = codeBlock.textContent;
        try {
          await navigator.clipboard.writeText(code);
          button.textContent = '已复制!';
          setTimeout(() => {
            button.textContent = '复制';
          }, 2000);
        } catch (err) {
          console.error('Failed to copy:', err);
        }
      });
    });
  }

  // ==========================================
  // External Link Icon
  // ==========================================

  function initExternalLinks() {
    const postLinks = document.querySelectorAll('.post-container a');

    postLinks.forEach(link => {
      if (link.hostname !== window.location.hostname && !link.classList.contains('no-external-icon')) {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
        link.innerHTML += ' <svg style="width: 12px; height: 12px; display: inline-block; margin-left: 2px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>';
      }
    });
  }

  // ==========================================
  // Lazy Load Images
  // ==========================================

  function initLazyLoad() {
    if ('IntersectionObserver' in window) {
      const images = document.querySelectorAll('img[data-src]');

      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        });
      });

      images.forEach(img => imageObserver.observe(img));
    }
  }

  // ==========================================
  // Initialize Everything
  // ==========================================

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    initThemeToggle();
    initReadingProgress();
    initSmoothScroll();
    initTableOfContents();
    initNavbarScroll();
    initPostCardEffects();
    initCopyCodeButtons();
    initExternalLinks();
    initLazyLoad();

    console.log('🎨 Modern theme initialized');
  }

})();
