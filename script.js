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
const scrollCue = document.querySelector('.scroll-cue');
const HERO_FADE_DISTANCE = 420; // px of scroll over which the hero fully fades

function updateHero() {
  const y = window.scrollY;
  const progress = Math.min(y / HERO_FADE_DISTANCE, 1);
  const eased = 1 - Math.pow(1 - progress, 2); // ease-out quad, smooth in both directions

  heroLogo.style.opacity = String(1 - eased);
  heroLogo.style.transform = `translateY(${-eased * 60}px)`;
  const cueOpacity = 1 - progress * 1.8 < 0 ? 0 : 1 - progress * 1.8;
  scrollCue.style.opacity = scrollCue.classList.contains('is-ready') ? String(cueOpacity) : '0';
}
window.addEventListener('scroll', updateHero, { passive: true });
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
  const context = canvas.getContext('2d');

  function drawPoster() {
    if (!video.videoWidth || !video.videoHeight) return;
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
