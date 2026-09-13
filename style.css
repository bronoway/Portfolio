:root{
  --bg-notorris:#0A0A0A;
  --bg-nyx:#070707;
  --bg:var(--bg-notorris);
  --fg:#FFFFFF;
  --fg-dim:rgba(255,255,255,0.62);
  --fg-faint:rgba(255,255,255,0.32);
  --glow:rgba(255,255,255,0.75);
  --border:rgba(255,255,255,0.12);

  --font-serif:'Instrument Serif', Georgia, serif;
  --font-sans:'Montserrat', -apple-system, sans-serif;

  --ease-out:cubic-bezier(0.16, 1, 0.3, 1);
}

*{ margin:0; padding:0; box-sizing:border-box; }
html{ scroll-behavior:smooth; }
body{
  background:var(--bg);
  color:var(--fg);
  font-family:var(--font-sans);
  font-weight:400;
  overflow-x:hidden;
}
a{ color:inherit; text-decoration:none; }
ul{ list-style:none; }

/* ---------- NAV ---------- */
.site-nav{
  position:fixed; top:18px; left:50%; z-index:120;
  display:flex; align-items:center; justify-content:space-between;
  width:min(1120px, calc(100% - 28px));
  padding:18px 24px 18px 28px;
  transform:translateX(-50%);
  border:1px solid rgba(255,255,255,0.08);
  border-radius:999px;
  background:linear-gradient(135deg, rgba(8,8,10,0.88), rgba(16,16,19,0.72) 42%, rgba(5,5,7,0.84));
  backdrop-filter:blur(16px) saturate(0.9);
  -webkit-backdrop-filter:blur(16px) saturate(0.9);
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,0.08),
    inset 0 -14px 18px rgba(255,255,255,0.02),
    0 12px 34px rgba(0,0,0,0.11),
    0 0 0 1px rgba(255,255,255,0.02);
  overflow:hidden;
}
.site-nav::before{
  content:"";
  position:absolute; inset:-18% -10%;
  background:
    radial-gradient(circle at 20% 28%, rgba(255,255,255,0.06), transparent 22%),
    radial-gradient(circle at 62% 18%, rgba(255,255,255,0.035), transparent 24%),
    radial-gradient(circle at 78% 70%, rgba(255,255,255,0.03), transparent 26%),
    linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0));
  animation:glassShimmer 14s ease-in-out infinite alternate;
  pointer-events:none;
}

@keyframes glassShimmer {
  0% {
    transform: translate3d(-2%, 0%, 0) scale(1.02);
    filter: blur(0px);
  }
  25% {
    transform: translate3d(3%, -1%, 0) scale(1.04);
  }
  50% {
    transform: translate3d(-1%, 2%, 0) scale(1.03);
  }
  75% {
    transform: translate3d(4%, 1%, 0) scale(1.05);
  }
  100% {
    transform: translate3d(-3%, -1%, 0) scale(1.02);
  }
}
.nav-mark{
  position:relative; z-index:1;
  font-family:var(--font-serif); font-style:italic;
  font-size:1.15rem; color:var(--fg);
  text-shadow:0 0 18px rgba(255,255,255,0.15);
}
.nav-links{ position:relative; z-index:1; display:flex; gap:28px; }
.nav-links a{
  position:relative;
  font-size:0.92rem; font-weight:500; letter-spacing:0.01em;
  color:rgba(255,255,255,0.82);
  opacity:0.8;
  transition:opacity .3s var(--ease-out), color .3s var(--ease-out), transform .3s var(--ease-out);
}
.nav-links a:hover{ opacity:1; color:var(--fg); }
.nav-links a.is-active{ font-size:1rem; }
.nav-links a.is-active::after{
  content:"";
  position:absolute; left:0; bottom:-7px;
  width:4px; height:2px;
  border-radius:999px;
  background:currentColor;
  transform:scaleX(1);
}
.nav-links a.underline-from-left::after{
  transform-origin:left;
  animation:navUnderlineFromLeft .45s var(--ease-out) both;
}
.nav-links a.underline-from-right::after{
  left:auto; right:0;
  transform-origin:right;
  animation:navUnderlineFromRight .45s var(--ease-out) both;
}
@keyframes navUnderlineFromLeft{
  from{ width:4px; }
  to{ width:100%; }
}
@keyframes navUnderlineFromRight{
  from{ width:4px; }
  to{ width:100%; }
}
.nav-links a:hover{ opacity:1; }

/* ---------- SECTION SHELL ---------- */
.section{
  position:relative; min-height:100vh; padding:0 56px;
  background:var(--section-bg, var(--bg-notorris));
}
.section:nth-of-type(even){ --section-bg:var(--bg-nyx); }
.section:nth-of-type(odd){ --section-bg:var(--bg-notorris); }
.section-inner{ max-width:1080px; margin:0 auto; padding:180px 0 160px; }

.eyebrow-serif{
  font-family:var(--font-serif); font-style:italic; font-size:1.6rem;
  color:var(--fg-dim); margin-bottom:56px;
}

/* ---------- HERO ---------- */
.hero{
  display:flex; align-items:center; justify-content:center;
  min-height:140vh;
  text-align:center;
  padding:0 24px;
}
.hero-logo{
  position:fixed;
  top:50%; left:0; right:0; z-index:2;
  font-family:var(--font-serif);
  font-style:italic;
  font-weight:400;
  font-size:clamp(2.6rem, 7vw, 5.6rem);
  letter-spacing:0.005em;
  white-space:normal;
  will-change:transform, clip-path;
  clip-path:inset(0 0 calc(var(--logo-fade-progress, 0) * 100%) 0);
}
.hero-tagline-frame{
  position:fixed;
  top:50%; left:50%;
  width:calc(100vw - 48px); height:2.1em;
  transform:translate(-50%, -50%);
  overflow:hidden;
  z-index:2;
  pointer-events:none;
  text-align:center;
  font-size:clamp(2.6rem, 7vw, 5.6rem);
  white-space:nowrap;
  opacity:0;
  visibility:hidden;
  will-change:opacity;
}
.hero-tagline{
  font-family:var(--font-sans); font-style:normal; font-weight:400;
  font-size:clamp(2.6rem, 7vw, 5.6rem);
  line-height:1.05; letter-spacing:0.005em;
  clip-path:inset(calc((1 - var(--tagline-wipe-progress, 0)) * 100% + var(--tagline-wipe-clearance, 0px)) 0 0 0);
  will-change:clip-path;
}
.hero-tagline-serif{
  position:relative;
  display:inline-block;
  font-family:var(--font-serif);
  font-style:italic;
}
.hero-tagline-serif-period{
  font-family:var(--font-serif);
  font-style:italic;
}
.hero-tagline-serif::after{
  content:"";
  position:absolute;
  left:0; bottom:0.02em;
  width:max(4px, calc(var(--alive-underline-progress, 0) * 100%));
  height:2px;
  border-radius:999px;
  background:currentColor;
  opacity:var(--alive-underline-opacity, 0);
  transform-origin:left center;
}
.hero-logo .char{
  display:inline-block;
  opacity:0;
  transform:scale(0.55) translateY(6px);
  filter:blur(2px);
  text-shadow:0 0 0 rgba(255,255,255,0);
}
.hero-logo .char.space{ width:0.28em; }

@keyframes letterIn{
  0%{ opacity:0; transform:scale(0.55) translateY(6px); filter:blur(3px); text-shadow:0 0 0 rgba(255,255,255,0); }
  55%{ opacity:1; transform:scale(1.06) translateY(0); filter:blur(0); text-shadow:0 0 28px rgba(255,255,255,0.5), 0 0 64px rgba(255,255,255,0.18); }
  62%{ opacity:1; transform:scale(1.03) translateY(0); filter:blur(0); text-shadow:0 0 18px rgba(255,255,255,0.32), 0 0 46px rgba(255,255,255,0.12); }
  100%{ opacity:1; transform:scale(1) translateY(0); filter:blur(0); text-shadow:0 0 10px rgba(255,255,255,0.12); }
}
.hero-logo .char.animate{
  animation:letterIn 900ms var(--ease-out) forwards;
}

.scroll-cue{
  position:absolute; bottom:44px; left:50%; transform:translateX(-50%);
  display:flex; flex-direction:column; align-items:center; gap:10px;
  font-size:0.78rem; color:var(--fg-faint); letter-spacing:0.04em;
  opacity:0;
  transition:opacity 1.4s var(--ease-out);
}
.scroll-cue.is-ready{ opacity:1; }
.scroll-line{
  width:1px; height:38px;
  background:linear-gradient(to bottom, rgba(255,255,255,0.55), transparent);
  animation:pulseLine 2.4s ease-in-out infinite;
}
@keyframes pulseLine{ 0%,100%{ opacity:0.25; } 50%{ opacity:1; } }

/* ---------- SCROLL REVEAL (About / Work / Contact) ---------- */
[data-reveal]{
  opacity:0;
  transform:translateY(46px);
  transition:opacity 1.1s var(--ease-out), transform 1.1s var(--ease-out);
}
[data-reveal].is-visible{
  opacity:1;
  transform:translateY(0);
}
/* The feathered wipe is done with mask-image alone — a single soft
   cutoff line that travels with --nav-wipe-progress. Earlier this was
   layered on top of a second, separately-computed full-element opacity
   fade; the two never quite agreed on timing (each read its own
   bounding box) and the visible seam between them was the flicker. */
.nav-fade-target{
  opacity:var(--nav-fade-opacity, 1);
  will-change:opacity, transform;
}
.nav-fade-element.nav-fade-target{
  transform:none !important;
}
.about-photo-placeholder[data-reveal]{
  transform:translateY(84px);
  transition:opacity 4.6s var(--ease-out), transform 4.6s var(--ease-out);
  will-change:opacity, transform;
}
.about-photo-placeholder[data-reveal].is-visible{
  transform:translateY(0);
}
.about-text[data-reveal]{
  transform:translateY(72px);
  transition:opacity 1.8s var(--ease-out), transform 1.8s var(--ease-out);
  will-change:opacity, transform;
}
.about-text[data-reveal].is-visible{
  transform:translateY(0);
}
/* slight stagger for grouped reveals */
.about-layout [data-reveal]:nth-child(2){ transition-delay:0.08s; }
.work-grid .work-card:nth-child(2){ transition-delay:0.06s; }
.work-grid .work-card:nth-child(3){ transition-delay:0.12s; }
.work-grid .work-card:nth-child(4){ transition-delay:0.18s; }
.social-links[data-reveal]{ transition-delay:0.1s; }
.contact-line[data-reveal]{ transition-delay:0.05s; }

/* ---------- ABOUT ---------- */
.about-layout{
  display:grid; grid-template-columns:0.85fr 1.15fr; gap:72px; align-items:center;
}
.about-photo-placeholder{
  aspect-ratio:4/5; border:1px solid var(--border); border-radius:24px;
  overflow:hidden;
  color:var(--fg-faint); font-size:0.85rem;
}
.about-photo-placeholder img{
  display:block; width:100%; height:100%;
  object-fit:cover; object-position:50% 58%;
  transform:scale(1.08); transform-origin:50% 58%;
  transition:transform 2.8s var(--ease-out);
}
.about-photo-placeholder.is-visible img{
  transform:scale(1);
}
.about-text h2{
  font-family:var(--font-sans); font-style:normal; font-weight:400;
  font-size:clamp(1.8rem, 3vw, 2.6rem);
  margin-bottom:22px; line-height:1.15;
}
.about-heading-name{
  font-family:var(--font-serif); font-style:italic;
}
.about-text p{
  font-size:1.02rem; line-height:1.7; color:var(--fg-dim); max-width:52ch; font-weight:300;
  text-align:justify;
}

/* ---------- WORK ---------- */
.work-category + .work-category{ margin-top:88px; }
.work-category-title{
  font-family:var(--font-serif); font-style:italic; font-weight:400;
  font-size:clamp(1.8rem, 3vw, 2.6rem);
  margin-bottom:32px; line-height:1.15;
}
.work-grid{
  display:flex; gap:48px;
  position:relative;
  overflow-x:auto;
  padding:0 0 18px;
  scroll-snap-type:x mandatory;
  scrollbar-width:none;
  overscroll-behavior-x:contain;
}
.work-grid::-webkit-scrollbar{ display:none; }
.work-card{
  flex:0 0 min(430px, calc(50% - 24px));
  scroll-snap-align:start;
}
.work-scroll-cue{
  position:absolute; right:0; top:50%; z-index:2;
  transform:translateY(-50%);
  display:flex; align-items:center; gap:12px;
  width:max-content; margin:0;
  padding:8px 0 8px 12px;
  background:linear-gradient(to right, transparent, var(--section-bg) 24%);
  color:var(--fg-faint); font-size:0.72rem; letter-spacing:0.04em;
  opacity:0;
  visibility:hidden;
  transition:opacity .45s var(--ease-out), visibility .45s var(--ease-out);
}
.work-grid.is-settled:not(.has-horizontal-scroll) .work-scroll-cue{
  opacity:1;
  visibility:visible;
}
.work-grid.has-horizontal-scroll .work-scroll-cue{
  opacity:0;
  visibility:hidden;
  pointer-events:none;
}
.work-scroll-line{
  width:42px; height:1px;
  background:linear-gradient(to right, rgba(255,255,255,0.55), transparent);
  animation:pulseHorizontalLine 2.4s ease-in-out infinite;
}
@keyframes pulseHorizontalLine{
  0%,100%{ opacity:0.25; transform:scaleX(0.7); transform-origin:left; }
  50%{ opacity:1; transform:scaleX(1); transform-origin:left; }
}
.work-thumb{
  aspect-ratio:16/10; border:1px solid var(--border); border-radius:2px;
  display:flex; align-items:center; justify-content:center;
  color:var(--fg-faint); font-size:0.85rem; margin-bottom:22px;
}
.work-thumb-image{
  position:relative;
  overflow:hidden;
  cursor:pointer;
  aspect-ratio:4/5;
  border-radius:18px;
  transition:transform .45s var(--ease-out), box-shadow .45s var(--ease-out);
}
.work-thumb-image:hover{ transform:translateY(-6px) scale(1.025); box-shadow:0 14px 34px rgba(0,0,0,0.14); }
.work-thumb-image img{
  display:block; width:100%; height:100%;
  object-fit:cover;
  object-position:center;
  pointer-events:none;
}
.image-preview-label{
  position:absolute; right:16px; bottom:14px;
  padding:7px 10px; border:1px solid rgba(255,255,255,0.3); border-radius:999px;
  background:rgba(0,0,0,0.55); color:var(--fg);
  font-size:0.72rem; letter-spacing:0.04em;
  opacity:0; transition:opacity .25s ease, transform .25s ease;
}
.work-thumb-image:hover .image-preview-label{ opacity:1; transform:translateY(-2px); }
.web-preview{
  position:relative;
  overflow:hidden;
  cursor:pointer;
  aspect-ratio:16/9;
  border-radius:18px;
  transition:transform .45s var(--ease-out), box-shadow .45s var(--ease-out);
}
.web-preview:hover{ transform:translateY(-6px) scale(1.025); box-shadow:0 14px 34px rgba(0,0,0,0.14); }
.web-preview img{
  display:block; width:100%; height:100%;
  object-fit:cover;
  object-position:center;
  pointer-events:none;
}
.web-preview-label{
  position:absolute; right:16px; bottom:14px;
  padding:7px 10px; border:1px solid rgba(255,255,255,0.3); border-radius:999px;
  background:rgba(0,0,0,0.55); color:var(--fg);
  font-size:0.72rem; letter-spacing:0.04em;
  opacity:0; transition:opacity .25s ease, transform .25s ease;
}
.web-preview:hover .web-preview-label{ opacity:1; transform:translateY(-2px); }
.video-preview{
  position:relative;
  overflow:hidden;
  cursor:pointer;
  border-radius:18px;
  transition:transform .45s var(--ease-out), box-shadow .45s var(--ease-out);
}
.video-preview:hover{ transform:translateY(-6px) scale(1.025); box-shadow:0 14px 34px rgba(0,0,0,0.14); }
.video-poster,
.video-preview-player{
  display:block; width:100%; height:100%;
  object-fit:cover;
}
.video-poster{ background:#111; }
.video-preview-player{
  position:absolute; inset:0;
  opacity:0;
  transition:opacity .25s ease;
}
.video-preview:hover .video-preview-player{ opacity:1; }
.video-preview-label{
  position:absolute; right:16px; bottom:14px;
  padding:7px 10px; border:1px solid rgba(255,255,255,0.3); border-radius:999px;
  background:rgba(0,0,0,0.45); color:var(--fg);
  font-size:0.72rem; letter-spacing:0.04em;
  opacity:0; transition:opacity .25s ease, transform .25s ease;
}
.video-preview:hover .video-preview-label{ opacity:1; transform:translateY(-2px); }
.video-preview-zoomed .video-poster,
.video-preview-zoomed .video-preview-player{
  transform:scale(1.16);
  transform-origin:center;
}
.video-modal{
  position:fixed; inset:0; z-index:200;
  display:flex; align-items:center; justify-content:center;
  padding:16px;
  background:rgba(0,0,0,0.78);
  opacity:0; visibility:hidden;
  transition:opacity .3s ease, visibility .3s ease;
}
.video-modal.is-open{ opacity:1; visibility:visible; }
.video-modal-card{
  position:relative;
  width:min(720px, calc(100vw - 32px), calc((100vh - 32px) * 0.5625));
  aspect-ratio:9/16;
  background:#050505;
  border:1px solid var(--border);
  box-shadow:0 24px 80px rgba(0,0,0,0.5);
}
.video-modal-player{
  display:block; width:100%; height:100%;
  object-fit:contain;
}
.video-modal-close{
  position:absolute; top:10px; right:10px; z-index:1;
  width:34px; height:34px; padding:0;
  border:1px solid rgba(255,255,255,0.32); border-radius:50%;
  background:rgba(0,0,0,0.58); color:var(--fg);
  font-size:1.35rem; line-height:1; cursor:pointer;
}
.video-modal-close:hover{ background:rgba(255,255,255,0.18); }
.work-card h3{
  font-family:var(--font-serif); font-style:italic; font-weight:400;
  font-size:1.5rem; margin-bottom:8px;
}
.work-card p{ color:var(--fg-dim); font-size:0.95rem; font-weight:300; }

/* ---------- CONTACT ---------- */
.contact-inner{ text-align:left; }
.contact-inner h2{
  font-family:var(--font-serif); font-style:italic; font-weight:400;
  font-size:clamp(2.4rem, 5vw, 4rem); margin-bottom:30px;
}
.contact-line{ font-size:1.3rem; margin-bottom:44px; }
.contact-line a{ border-bottom:1px solid var(--border); padding-bottom:2px; transition:border-color .3s var(--ease-out); }
.contact-line a:hover{ border-color:var(--fg); }
.social-links{ display:flex; gap:32px; }
.social-links a{ font-size:0.92rem; color:var(--fg-dim); transition:color .3s var(--ease-out); }
.social-links a:hover{ color:var(--fg); }

.site-footer{
  text-align:center; padding:40px 0 56px; font-size:0.8rem; color:var(--fg-faint);
}

/* ---------- RESPONSIVE ---------- */
@media (max-width:820px){
  .site-nav{ padding:20px 24px; }
  .nav-links{ gap:22px; }
  .hero-tagline-frame{ height:2.1em; white-space:normal; }
  .section-inner{ padding:140px 0 100px; }
  .about-layout{ grid-template-columns:1fr; gap:36px; }
  .work-grid{ gap:24px; }
  .work-card{ flex-basis:min(360px, 82vw); }
  .section{ padding:0 24px; }
}

@media (prefers-reduced-motion: reduce){
  .hero-logo .char{ animation:none !important; opacity:1; transform:none; filter:none; }
  [data-reveal]{ transition:none; opacity:1; transform:none; }
  .about-photo-placeholder[data-reveal],
  .about-text[data-reveal]{ transition:none; opacity:1; transform:none; }
  .about-photo-placeholder img{ transition:none; transform:scale(1); }
  .scroll-line,
  .work-scroll-line{ animation:none; }
}
