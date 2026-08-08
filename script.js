/* ═══════════════════════════════════════════════════════════════
   SILKSTACK — interactions
   All vanilla JS, no dependencies. Degrades gracefully.
   ═══════════════════════════════════════════════════════════════ */

(() => {
  "use strict";

  const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const COARSE = window.matchMedia("(pointer: coarse)").matches;
  const lerp = (a, b, t) => a + (b - a) * t;

  /* ───────── 1. Particle network (hero canvas) ───────── */
  const canvas = document.getElementById("particles");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let particles = [];
    let W, H;
    const mouse = { x: null, y: null };

    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
      const count = Math.min(150, Math.floor((W * H) / 13000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.55,
        vy: (Math.random() - 0.5) * 0.55,
        r: Math.random() * 1.8 + 0.8,
        hue: Math.random() > 0.5 ? 190 : 265, // cyan ~ violet
      }));
    };

    const step = () => {
      if (REDUCED) return;
      ctx.clearRect(0, 0, W, H);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        // gentle drift toward the cursor
        if (mouse.x !== null) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 240 * 240) {
            p.x += dx * 0.001;
            p.y += dy * 0.001;
          }
        }

        // wrap around edges
        if (p.x < -10) p.x = W + 10;
        if (p.x > W + 10) p.x = -10;
        if (p.y < -10) p.y = H + 10;
        if (p.y > H + 10) p.y = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 100%, 68%, 0.75)`;
        ctx.fill();
      }

      // connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 130 * 130) {
            const alpha = 1 - Math.sqrt(d2) / 130;
            ctx.strokeStyle = `hsla(195, 100%, 62%, ${alpha * 0.28})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(step);
    };

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => { mouse.x = null; mouse.y = null; };

    resize();
    window.addEventListener("resize", resize);
    if (!COARSE) {
      canvas.addEventListener("mousemove", onMove);
      canvas.addEventListener("mouseleave", onLeave);
    }
    requestAnimationFrame(step);
  }

  /* ───────── 2. Typing effect ───────── */
  const typedEl = document.getElementById("typed");
  if (typedEl) {
    const words = ["in the zone.", "ahead of schedule.", "free from busywork.", "lightspeed."];
    let wi = 0, ci = 0, deleting = false;

    const tick = () => {
      const word = words[wi];
      ci += deleting ? -1 : 1;
      typedEl.textContent = word.slice(0, ci);
      let delay = deleting ? 38 : 85;
      if (!deleting && ci === word.length) { delay = 1900; deleting = true; }
      else if (deleting && ci === 0) { deleting = false; wi = (wi + 1) % words.length; delay = 420; }
      if (REDUCED) {
        typedEl.textContent = words[0];
        return;
      }
      setTimeout(tick, delay);
    };
    tick();
  }

  /* ───────── 3. Scroll progress bar ───────── */
  const progress = document.getElementById("progress");
  const setProgress = () => {
    if (!progress) return;
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    progress.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + "%";
  };
  window.addEventListener("scroll", setProgress, { passive: true });
  setProgress();

  /* ───────── 4. Nav: scrolled state + active section ───────── */
  const nav = document.getElementById("nav");
  const onScrollNav = () => {
    if (!nav) return;
    nav.classList.toggle("scrolled", window.scrollY > 24);
  };
  window.addEventListener("scroll", onScrollNav, { passive: true });
  onScrollNav();

  const navLinks = document.querySelectorAll(".nav-link");
  const sections = [...document.querySelectorAll("main section[id]")];
  if (sections.length) {
    const spy = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          navLinks.forEach((l) =>
            l.classList.toggle("active", l.getAttribute("href") === `#${entry.target.id}`)
          );
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => spy.observe(s));
  }

  /* ───────── 5. Mobile menu ───────── */
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");
  if (hamburger && mobileMenu) {
    const toggle = (open) => {
      hamburger.classList.toggle("open", open);
      mobileMenu.classList.toggle("open", open);
      hamburger.setAttribute("aria-expanded", String(open));
    };
    hamburger.addEventListener("click", () =>
      toggle(!mobileMenu.classList.contains("open"))
    );
    mobileMenu.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => toggle(false))
    );
  }

  /* ───────── 6. Scroll reveal ───────── */
  const revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length && !REDUCED) {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.14, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("in"));
  }

  /* ───────── 7. Parallax ───────── */
  const parallaxEls = document.querySelectorAll("[data-parallax]");
  if (parallaxEls.length && !REDUCED) {
    let ticking = false;
    const applyParallax = () => {
      const vh = window.innerHeight;
      for (const el of parallaxEls) {
        const rect = el.getBoundingClientRect();
        const factor = parseFloat(el.dataset.parallax) || 0.05;
        const offset = (rect.top + rect.height / 2 - vh / 2) * -factor;
        el.style.setProperty("--par-y", `${offset.toFixed(1)}px`);
      }
      ticking = false;
    };
    window.addEventListener("scroll", () => {
      if (!ticking) { ticking = true; requestAnimationFrame(applyParallax); }
    }, { passive: true });
    applyParallax();
  }

  /* ───────── 8. 3D tilt on cards ───────── */
  const tiltEls = document.querySelectorAll("[data-tilt]");
  if (tiltEls.length && !REDUCED && !COARSE) {
    const MAX = 5;
    for (const el of tiltEls) {
      el.addEventListener("pointermove", (e) => {
        const rect = el.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        el.style.transform = `perspective(1100px) rotateY(${px * MAX}deg) rotateX(${-py * MAX}deg) translateZ(0)`;
      });
      el.addEventListener("pointerleave", () => {
        el.style.transform = "";
      });
    }
  }

  /* ───────── 9. Holo phone mouse tilt ───────── */
  const holo = document.getElementById("holo");
  if (holo && !REDUCED && !COARSE) {
    let targetRX = 0, targetRY = 0, rx = 0, ry = 0, raf = null;
    const onMouse = (e) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      targetRY = nx * 10;
      targetRX = -ny * 7;
      if (raf === null) raf = requestAnimationFrame(frame);
    };
    const frame = () => {
      rx = lerp(rx, targetRX, 0.08);
      ry = lerp(ry, targetRY, 0.08);
      // compose tilt on top of the CSS float animation via custom props
      holo.style.setProperty("--tilt-x", `${rx.toFixed(2)}deg`);
      holo.style.setProperty("--tilt-y", `${ry.toFixed(2)}deg`);
      const settled = Math.abs(rx - targetRX) < 0.05 && Math.abs(ry - targetRY) < 0.05;
      raf = settled ? null : requestAnimationFrame(frame);
    };
    window.addEventListener("mousemove", onMouse, { passive: true });
  }

  /* ───────── 10. Animated counters ───────── */
  const counters = document.querySelectorAll(".stat-num[data-count]");
  if (counters.length && !REDUCED) {
    const animate = (el) => {
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix || "";
      const prefix = el.dataset.prefix || "";
      const dur = 1700;
      const t0 = performance.now();
      const fmt = (v) =>
        `${prefix}${Math.round(v).toLocaleString("en-US")}${suffix}`;
      const tick = (now) => {
        const t = Math.min(1, (now - t0) / dur);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = fmt(target * eased);
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            animate(entry.target);
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.5 }
    );
    counters.forEach((c) => io.observe(c));
  } else {
    counters.forEach((el) => {
      el.textContent = `${el.dataset.prefix || ""}${parseInt(el.dataset.count, 10).toLocaleString("en-US")}${el.dataset.suffix || ""}`;
    });
  }

  /* ───────── 11. FAQ accordion ───────── */
  const faqQs = document.querySelectorAll(".faq-q");
  faqQs.forEach((q) => {
    q.addEventListener("click", () => {
      const item = q.closest(".faq-item");
      const isOpen = item.classList.contains("open");
      // close siblings
      item.parentElement.querySelectorAll(".faq-item.open").forEach((o) => {
        o.classList.remove("open");
        o.querySelector(".faq-q").setAttribute("aria-expanded", "false");
      });
      if (!isOpen) {
        item.classList.add("open");
        q.setAttribute("aria-expanded", "true");
      }
    });
  });

  /* ───────── 12. Contact form (demo) ───────── */
  const form = document.getElementById("contactForm");
  const toast = document.getElementById("toast");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      form.reset();
      if (toast) {
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 3800);
      }
    });
  }

  /* ───────── 13. Cursor glow ───────── */
  const glow = document.querySelector(".cursor-glow");
  if (glow && !COARSE && !REDUCED) {
    let gx = -1000, gy = -1000, tx = gx, ty = gy, running = false;
    const frame = () => {
      gx = lerp(gx, tx, 0.14);
      gy = lerp(gy, ty, 0.14);
      glow.style.transform = `translate3d(${gx}px, ${gy}px, 0)`;
      running = false;
    };
    window.addEventListener("mousemove", (e) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!running) { running = true; requestAnimationFrame(frame); }
    }, { passive: true });
  }

  /* ───────── 14. Magnetic buttons ───────── */
  const magnetBtns = document.querySelectorAll(".magnetic");
  if (magnetBtns.length && !COARSE && !REDUCED) {
    magnetBtns.forEach((btn) => {
      btn.addEventListener("mousemove", (e) => {
        const rect = btn.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        btn.style.transform = `translate(${dx * 0.12}px, ${dy * 0.12}px)`;
      });
      btn.addEventListener("mouseleave", () => {
        btn.style.transform = "";
      });
    });
  }

  /* ───────── 15. Meta theme-color sync (browser chrome) ───────── */
  const themeColorMeta = document.querySelector('meta[name="theme-color"]');
  const schemeMQ = window.matchMedia("(prefers-color-scheme: dark)");
  const syncThemeColor = () => {
    if (!themeColorMeta) return;
    themeColorMeta.setAttribute("content", schemeMQ.matches ? "#04060f" : "#eef2f9");
  };
  schemeMQ.addEventListener?.("change", syncThemeColor);
  syncThemeColor();

})();
