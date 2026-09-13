// ---------------------------------------------------------
// 1. Hero logo — split into letters, staggered fade+grow+glow
// ---------------------------------------------------------
const heroLogo = document.getElementById('heroLogo');
const text = heroLogo.textContent;
heroLogo.textContent = '';

[...text].forEach((ch, i) => {
  const span = document.createElement('span');
  span.className = 'char' + (ch === ' ' ? ' space' : '');
  span.textContent = ch === ' ' ? '\u00A0' : ch;
  span.style.animationDelay = `${i * 45}ms`;
  heroLogo.appendChild(span);
});

// Trigger the letter-in animation shortly after load (left to right, via animationDelay above)
requestAnimationFrame(() => {
  setTimeout(() => {
    heroLogo.querySelectorAll('.char').forEach(c => c.classList.add('animate'));
  }, 150);
});

setTimeout(() => {
  scrollCue.classList.add('is-ready');
  updateHero();
}, 1200);

// ---------------------------------------------------------
// 2. Hero fade-out + slide-up as you scroll, reversible
//    (purely a function of scrollY, so scrolling back up
//    naturally reverses it — no extra state needed)
// ---------------------------------------------------------
const heroSection = document.getElementById('home');
const siteNav = document.getElementById('siteNav');
const scrollCue = document.querySelector('.scroll-cue');
const heroTaglineFrame = document.querySelector('.hero-tagline-frame');
const heroTagline = document.querySelector('.hero-tagline');
const HERO_LOGO_FADE_DISTANCE = 260;
const HERO_LOGO_REMAINING_AT_TAGLINE = 0.85;
const HERO_TAGLINE_UNDERLINE_DISTANCE = 120;
const HERO_TAGLINE_FADE_DISTANCE = 180;
const HERO_BOTTOM_BUFFER = 48;

function updateHero() {
  const y = window.scrollY;
  const taglineStart = HERO_LOGO_FADE_DISTANCE * (1 - Math.sqrt(HERO_LOGO_REMAINING_AT_TAGLINE));
  const taglineFadeEnd = HERO_LOGO_FADE_DISTANCE + HERO_TAGLINE_UNDERLINE_DISTANCE + HERO_TAGLINE_FADE_DISTANCE;
  heroSection.style.minHeight = `${taglineFadeEnd + HERO_BOTTOM_BUFFER + window.innerHeight / 2}px`;
  const logoProgress = Math.min(y / HERO_LOGO_FADE_DISTANCE, 1);
  const logoEased = 1 - Math.pow(1 - logoProgress, 2);
  const taglineProgress = logoEased;
  const underlineProgress = Math.min(Math.max((y - HERO_LOGO_FADE_DISTANCE) / HERO_TAGLINE_UNDERLINE_DISTANCE, 0), 1);
  const fadeStart = HERO_LOGO_FADE_DISTANCE + HERO_TAGLINE_UNDERLINE_DISTANCE;
  const taglineFadeProgress = Math.min(Math.max((y - fadeStart) / HERO_TAGLINE_FADE_DISTANCE, 0), 1);
  const motionDistance = Math.max(y - fadeStart, 0);
  const easedMotionDistance = motionDistance <= HERO_TAGLINE_FADE_DISTANCE
    ? motionDistance * motionDistance / (2 * HERO_TAGLINE_FADE_DISTANCE)
    : motionDistance - HERO_TAGLINE_FADE_DISTANCE / 2;
  const heroMotion = -easedMotionDistance;

  heroLogo.style.setProperty('--logo-fade-progress', String(logoEased));
  heroLogo.style.transform = `translateY(calc(-50% + ${heroMotion}px))`;
  heroTaglineFrame.style.top = `calc(50% + ${heroMotion}px)`;
  heroTaglineFrame.style.opacity = taglineProgress > 0 ? String(1 - taglineFadeProgress) : '0';
  heroTaglineFrame.style.visibility = taglineProgress > 0 && taglineFadeProgress < 1 ? 'visible' : 'hidden';
  heroTagline.style.setProperty('--tagline-wipe-progress', String(taglineProgress));
  heroTagline.querySelector('.hero-tagline-serif').style.setProperty('--alive-underline-progress', String(underlineProgress));
  heroTagline.querySelector('.hero-tagline-serif').style.setProperty('--alive-underline-opacity', underlineProgress > 0 ? '1' : '0');
  heroTagline.style.setProperty('--tagline-wipe-clearance', `${(1 - taglineProgress) * 28}px`);
  const cueProgress = Math.min(y / taglineStart, 1);
  const cueOpacity = 1 - cueProgress;
  scrollCue.style.opacity = scrollCue.classList.contains('is-ready') ? String(cueOpacity) : '0';
}
updateHero();

// ---------------------------------------------------------
// 3. Scroll-triggered reveal for About / Work / Contact
//    Fires at ~50% visibility, and un-fires if you scroll
//    back above that point — so it reverses like the hero.
// ---------------------------------------------------------
const revealTargets = document.querySelectorAll('[data-reveal]');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    entry.target.classList.toggle('is-visible', entry.isIntersecting);
  });
}, { threshold: 0.65 });

revealTargets.forEach(el => revealObserver.observe(el));

const workGrids = document.querySelectorAll('.work-grid');
workGrids.forEach(grid => {
  let settleTimer;
  let isGridVisible = false;

  const showCueAfterSettling = () => {
    clearTimeout(settleTimer);
    grid.classList.remove('is-settled');
    if (!isGridVisible) return;
    settleTimer = setTimeout(() => {
      grid.classList.add('is-settled');
    }, 500);
  };

  const updateWorkScrollCue = () => {
    grid.classList.toggle('has-horizontal-scroll', grid.scrollLeft > 8);
  };

  grid.addEventListener('scroll', () => {
    updateWorkScrollCue();
    showCueAfterSettling();
  }, { passive: true });
  updateWorkScrollCue();

  const workGridObserver = new IntersectionObserver(([entry]) => {
    isGridVisible = entry.isIntersecting;
    if (isGridVisible) {
      showCueAfterSettling();
    } else {
      clearTimeout(settleTimer);
      grid.classList.remove('is-settled');
    }
  }, { threshold: 0.8 });
  workGridObserver.observe(grid);
});

// Only the actual media elements (photo / thumbnails) get the feathered
// nav wipe. If we also wiped their [data-reveal] parent card, both the
// card and the image inside it would compute their own (slightly
// different) progress off their own bounding boxes and fight each
// other — that mismatch is what read as "flickering". So a card that
// contains a .nav-fade-element is left alone; only the leaf media
// element is wiped, and the card keeps its normal float-in fade.
const navFadeTargets = [...document.querySelectorAll('.nav-fade-element')];
navFadeTargets.forEach(target => target.classList.add('nav-fade-target'));

function updateNavFade() {
  navFadeTargets.forEach(target => {
    target.style.setProperty('--nav-fade-opacity', '1');
    target.style.opacity = '1';
  });
}

// ---------------------------------------------------------
// Single rAF-batched scroll loop driving both the hero motion
// and the nav wipe, so each only ever recalculates once per
// painted frame instead of once per raw scroll event (which on
// a trackpad can fire many times faster than the screen repaints
// and was the main cause of the janky/flickery motion).
// ---------------------------------------------------------
let scrollTicking = false;
function onScroll() {
  if (scrollTicking) return;
  scrollTicking = true;
  requestAnimationFrame(() => {
    updateHero();
    updateNavFade();
    scrollTicking = false;
  });
}
window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', updateNavFade);
updateNavFade();

// Video project preview — show a still frame at rest, play muted on hover,
// and open playback in a 720x1280 modal when the preview is clicked.
const videoModal = document.querySelector('[data-video-modal]');
const videoModalPlayer = videoModal.querySelector('[data-video-modal-player]');
const videoModalClose = videoModal.querySelector('[data-video-modal-close]');

function closeVideoModal() {
  videoModalPlayer.pause();
  videoModalPlayer.currentTime = 0;
  videoModalPlayer.muted = true;
  videoModal.classList.remove('is-open');
  videoModal.setAttribute('aria-hidden', 'true');
}

document.querySelectorAll('[data-video-preview]').forEach(preview => {
  const canvas = preview.querySelector('.video-poster');
  const video = preview.querySelector('.video-preview-player');
  const context = canvas instanceof HTMLCanvasElement ? canvas.getContext('2d') : null;

  function drawPoster() {
    if (!context || !video.videoWidth || !video.videoHeight) return;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
  }

  video.addEventListener('loadeddata', drawPoster, { once: true });
  video.addEventListener('seeked', drawPoster, { once: true });
  preview.addEventListener('mouseenter', () => {
    video.load();
    video.play().catch(() => {});
  });
  preview.addEventListener('mouseleave', () => {
    video.pause();
    video.currentTime = 0;
  });
  preview.addEventListener('click', async () => {
    video.pause();
    video.currentTime = 0;
    videoModalPlayer.src = video.dataset.fullSrc;
    videoModalPlayer.load();
    videoModalPlayer.muted = false;
    videoModal.classList.add('is-open');
    videoModal.setAttribute('aria-hidden', 'false');
    await videoModalPlayer.play().catch(() => {});
  });
});

videoModalClose.addEventListener('click', closeVideoModal);
videoModal.addEventListener('click', (event) => {
  if (event.target === videoModal) closeVideoModal();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && videoModal.classList.contains('is-open')) closeVideoModal();
});

// ---------------------------------------------------------
// 4. Nav — smooth scroll is handled by CSS (scroll-behavior),
//    this just highlights the active section link.
// ---------------------------------------------------------
const navLinks = document.querySelectorAll('[data-nav]');
const sections = document.querySelectorAll('.section');
let activeNavIndex = -1;

function setActiveNav(id) {
  const nextActiveIndex = [...navLinks].findIndex(link => link.getAttribute('href') === `#${id}`);
  if (nextActiveIndex === -1) return;

  const direction = activeNavIndex === -1 || nextActiveIndex >= activeNavIndex ? 'from-left' : 'from-right';
  activeNavIndex = nextActiveIndex;

  navLinks.forEach((link, index) => {
    const isActive = index === nextActiveIndex;
    link.style.opacity = isActive ? '1' : '0.75';
    link.classList.toggle('is-active', isActive);
    link.classList.remove('underline-from-left', 'underline-from-right');
    void link.offsetWidth;
    if (isActive) link.classList.add(direction === 'from-left' ? 'underline-from-left' : 'underline-from-right');
  });
}

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      setActiveNav(id);
    }
  });
}, { rootMargin: '-45% 0px -45% 0px' });

sections.forEach(s => navObserver.observe(s));
