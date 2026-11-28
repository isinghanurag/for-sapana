(function () {
  const S = window.SITE;
  const $ = (id) => document.getElementById(id);
  const el = (tag, cls, text) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  };
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const svgEl = (tag, attrs) => {
    const n = document.createElementNS("http://www.w3.org/2000/svg", tag);
    Object.entries(attrs).forEach(([k, v]) => n.setAttribute(k, v));
    return n;
  };

  // "YYYY-MM-DD" is a local calendar date; full ISO strings (with time/offset) are exact moments
  const parseDate = (s) => {
    if (s.includes("T")) return new Date(s);
    const [y, m, d] = s.split("-").map(Number);
    return new Date(y, m - 1, d);
  };
  const fmt = (s) =>
    parseDate(s).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
  const daysSince = (s) => Math.floor((Date.now() - parseDate(s)) / 86400000);

  // Hero
  $("greeting").textContent = S.greeting;
  const title = $("heroTitle");
  (S.heroTitle || `${S.hisName} & ${S.herName}`).split("&").forEach((part, i) => {
    if (i) title.append(el("span", "amp", "&"));
    title.append(part);
  });
  $("heroNames").textContent = S.heroNames || "";
  $("heroHashtag").textContent = S.hashtag || "";
  $("heroTagline").textContent = S.heroTagline;
  $("heroSubline").textContent = S.heroSubline;
  document.title = `${S.heroTitle || S.hisName + " & " + S.herName} — Our Love Story`;

  // Live counter
  const counter = $("counter");
  const units = ["Days", "Hours", "Minutes", "Seconds"].map((label) => {
    const u = el("div", "unit");
    const b = el("b", null, "0");
    u.append(b, el("small", null, label));
    counter.append(u);
    return b;
  });
  const tick = () => {
    let diff = Math.max(0, Date.now() - parseDate(S.togetherSince));
    [86400000, 3600000, 60000, 1000].forEach((ms, i) => {
      const v = Math.floor(diff / ms);
      diff -= v * ms;
      units[i].textContent = v.toLocaleString("en-IN");
    });
  };
  tick();
  setInterval(tick, 1000);

  // Timeline
  const tl = $("timeline");
  S.specialDates.forEach((d) => {
    const li = el("li", "reveal");
    li.append(el("span", "dot", d.icon));
    const card = el("div", "card");
    card.append(el("span", "date", fmt(d.date)), el("h3", null, d.title), el("p", null, d.story));
    const ago = daysSince(d.date);
    card.append(el("span", "ago", ago >= 0 ? `${ago.toLocaleString("en-IN")} days ago` : "Coming soon"));
    li.append(card);
    tl.append(li);
  });

  // Lightbox
  const lb = $("lightbox");
  function openLightbox(src, cap, isVideo) {
    const lv = $("lightbox-video");
    $("lightbox-img").hidden = !!isVideo;
    lv.hidden = !isVideo;
    if (isVideo) { lv.src = src; lv.play().catch(() => {}); } else { lv.pause(); lv.removeAttribute("src"); $("lightbox-img").src = src; }
    $("lightbox-img").alt = cap || "";
    $("lightbox-cap").textContent = cap || "";
    lb.hidden = false;
  }
  const closeLb = () => { lb.hidden = true; const lv = $("lightbox-video"); lv.pause(); lv.removeAttribute("src"); };
  $("lightbox-close").addEventListener("click", closeLb);
  lb.addEventListener("click", (e) => e.target === lb && closeLb());
  document.addEventListener("keydown", (e) => e.key === "Escape" && closeLb());

  // Moments
  const mg = $("moments-grid");
  const momentIcons = ["🌹", "🏔️", "🌅", "🏕️", "🌙", "🌸"];
  S.happyMoments.forEach((m, i) => {
    const fig = el("figure", "jharokha reveal");
    const frame = el("div", "frame");
    if (m.photo) {
      const img = el("img");
      img.src = m.photo;
      img.alt = m.title;
      img.loading = "lazy";
      img.addEventListener("click", () => openLightbox(m.photo, m.title));
      frame.append(img);
    } else if (m.comingSoon) {
      fig.classList.add("soon");
      const ph = el("div", "placeholder");
      ph.append(el("span", "soon-icon", momentIcons[i % momentIcons.length]), el("span", "soon-badge", "Coming Soon"));
      frame.append(ph);
    } else {
      frame.append(el("div", "placeholder", momentIcons[i % momentIcons.length]));
    }
    const cap = el("figcaption");
    cap.append(el("h3", null, m.title));
    if (m.date) cap.append(el("span", "date", fmt(m.date)));
    if (m.text) cap.append(el("p", null, m.text));
    fig.append(frame, cap);
    mg.append(fig);
  });

  // Shayari (section hidden until at least one is added)
  const shayaris = S.shayaris || [];
  if (!shayaris.length) {
    const sec = $("shayari");
    sec.previousElementSibling?.remove();
    sec.remove();
    $("nav-shayari").remove();
  }
  shayaris.forEach((sh) => {
    const fig = el("figure", "shayari-card reveal");
    const img = el("img");
    img.src = sh.photo;
    img.alt = sh.caption || "Shayari";
    img.loading = "lazy";
    fig.append(img);
    if (sh.caption) fig.append(el("figcaption", null, sh.caption));
    fig.addEventListener("click", () => openLightbox(sh.photo, sh.caption));
    $("shayari-grid").append(fig);
  });

  // Her Cuteness — hanging photo wall
  const wall = $("photo-wall");
  const wallIcons = ["🙈", "😤", "🥰", "😜", "🤭", "😴", "🥺", "😋"];
  (S.cuteWall || []).forEach((c, i) => {
    const hang = el("figure", "hang reveal");
    const wire = svgEl("svg", { class: "wire", viewBox: "0 0 100 66", preserveAspectRatio: "none", "aria-hidden": "true" });
    // circular frames need the wire to meet the curved top edge
    const round = !!c.round;
    if (round) hang.classList.add("round");
    wire.append(svgEl("path", { d: round ? "M50 0 L36 70 M50 0 L64 70" : "M50 0 L12 66 M50 0 L88 66" }));
    hang.append(el("span", "nail"), wire);
    const frame = el("div", "wall-frame");
    const mat = el("div", "mat");
    const pic = el("div", "pic");
    if (c.video) {
      const v = el("video");
      Object.assign(v, { src: c.video, poster: c.poster || "", muted: true, loop: true, playsInline: true, autoplay: true, preload: "metadata" });
      v.setAttribute("muted", ""); v.setAttribute("playsinline", "");
      pic.append(v, el("span", "video-badge", "▶"));
      hang.classList.add("is-video");
      hang.addEventListener("click", () => openLightbox(c.video, c.caption, true));
    } else if (c.photo) {
      const img = el("img");
      img.src = c.photo;
      img.alt = c.caption || "Her cuteness";
      if (c.position) img.style.objectPosition = c.position;
      img.loading = "lazy";
      pic.append(img);
      hang.addEventListener("click", () => openLightbox(c.photo, c.caption));
    } else {
      pic.append(el("div", "placeholder", wallIcons[i % wallIcons.length]));
    }
    mat.append(pic);
    frame.append(mat);
    hang.append(frame);
    if (c.caption) hang.append(el("figcaption", "tag", c.caption));
    wall.append(hang);
  });

  // Fairy lights along the curved string (matches the SVG path in index.html)
  const bulbs = $("bulbs");
  const N = 24;
  for (let i = 1; i < N; i++) {
    const t = i / N;
    const local = t < 0.5 ? t * 2 : (t - 0.5) * 2;
    const [y0, cy, y1] = t < 0.5 ? [5, 60, 15] : [15, 60, 5];
    const y = (1 - local) ** 2 * y0 + 2 * (1 - local) * local * cy + local ** 2 * y1;
    const b = el("span", "bulb");
    b.style.left = `calc(${t * 100}% - 4px)`;
    b.style.top = `${y}px`;
    bulbs.append(b);
  }

  // Letter
  $("letter-heading").textContent = S.letter.heading || "";
  S.letter.body.forEach((p) => $("letter-text").append(el("p", null, p)));
  $("letter-signoff").textContent = S.letter.signOff;
  $("letter-from").textContent = S.letter.from || S.hisName;
  $("seal").addEventListener("click", (e) => {
    e.currentTarget.remove();
    $("letter-body").hidden = false;
    burst(40);
  });

  // Music — audio only: a hidden YouTube player loops just the chosen part (music.start → music.end, in seconds)
  const M = S.music;
  const musicBtn = $("music-btn");
  const player = $("music-player");
  $("music-label").textContent = M ? `${M.title} · ${M.artist}` : "";
  if (!M || !M.youtubeId) $("music").remove();
  const start = (M && M.start) || 0;
  const end = M && M.end;
  let yt = null, ytReady = null, playing = false, loopTimer = null;
  function loadYT() {
    if (ytReady) return ytReady;
    ytReady = new Promise((resolve) => {
      window.onYouTubeIframeAPIReady = resolve;
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.head.append(tag);
    }).then(() => new Promise((resolve) => {
      const host = el("div");
      player.append(host);
      yt = new YT.Player(host, {
        videoId: M.youtubeId,
        playerVars: Object.assign({ autoplay: 1, controls: 0, start, rel: 0, playsinline: 1 }, end ? { end } : {}),
        events: {
          onReady: resolve,
          onStateChange: (e) => { if (e.data === YT.PlayerState.ENDED && playing) yt.seekTo(start, true), yt.playVideo(); },
        },
      });
    }));
    return ytReady;
  }
  function setUi(on) {
    playing = on;
    musicBtn.classList.toggle("playing", on);
    musicBtn.setAttribute("aria-pressed", String(on));
  }
  function playMusic() {
    if (!M || playing) return;
    setUi(true);
    loadYT().then(() => {
      if (!playing) return;
      yt.seekTo(start, true);
      yt.playVideo();
      clearInterval(loopTimer);
      if (end) loopTimer = setInterval(() => {
        if (playing && yt.getCurrentTime && yt.getCurrentTime() >= end - 0.3) yt.seekTo(start, true);
      }, 300);
    });
  }
  function stopMusic() {
    setUi(false);
    clearInterval(loopTimer);
    if (yt && yt.pauseVideo) yt.pauseVideo();
  }
  musicBtn.addEventListener("click", () => (playing ? stopMusic() : playMusic()));
  $("enter-btn").addEventListener("click", playMusic);

  // Curtain intro
  const intro = $("intro");
  if (S.intro) {
    $("intro-line").textContent = S.intro.line;
    $("intro-name").textContent = S.intro.name;
    $("intro-hint").textContent = S.intro.hint;
    $("intro-btn").addEventListener("click", () => {
      intro.classList.add("open");
      document.body.classList.remove("locked");
      playMusic();
      burst(50);
      setTimeout(() => intro.remove(), 1800);
    });
  } else {
    intro.remove();
    document.body.classList.remove("locked");
  }

  // Sparkle trail + tap hearts
  const sparkles = $("sparkles");
  const spawn = (x, y, cls, txt) => {
    const s = el("span", cls, txt);
    s.style.left = x + "px";
    s.style.top = y + "px";
    s.style.setProperty("--dx", Math.random() * 60 - 30 + "px");
    sparkles.append(s);
    s.addEventListener("animationend", () => s.remove());
  };
  let last = 0;
  window.addEventListener("pointermove", (e) => {
    if (reduce || e.pointerType !== "mouse") return;
    const now = performance.now();
    if (now - last < 45) return;
    last = now;
    spawn(e.clientX, e.clientY, "sparkle", "✦");
  });
  window.addEventListener("pointerdown", (e) => {
    if (reduce) return;
    for (let i = 0; i < 5; i++) spawn(e.clientX, e.clientY, "heart", ["♥", "❀", "♡"][i % 3]);
  });

  // Reveal on scroll
  const io = new IntersectionObserver(
    (entries) => entries.forEach((en) => en.isIntersecting && en.target.classList.add("visible")),
    { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal").forEach((n) => io.observe(n));

  // Parallax + nav
  const layers = document.querySelectorAll(".layer");
  const nav = document.querySelector(".nav");
  window.addEventListener(
    "scroll",
    () => {
      const y = window.scrollY;
      if (y < window.innerHeight) {
        layers.forEach((l) => (l.style.transform = `translateY(${y * l.dataset.speed}px)`));
      }
      nav.classList.toggle("scrolled", y > 80);
    },
    { passive: true }
  );

  // Rose petals
  const petals = $("petals");
  function petal() {
    const p = el("span", Math.random() < 0.22 ? "petal blush" : "petal");
    p.style.left = Math.random() * 100 + "vw";
    p.style.setProperty("--drift", Math.random() * 200 - 100 + "px");
    p.style.animationDuration = 6 + Math.random() * 6 + "s";
    p.style.scale = String(0.6 + Math.random() * 0.8);
    petals.append(p);
    p.addEventListener("animationend", () => p.remove());
  }
  function burst(n) {
    if (reduce) return;
    for (let i = 0; i < n; i++) setTimeout(petal, i * 60);
  }
  if (!reduce) setInterval(petal, 420);
})();
