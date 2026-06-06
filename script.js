const modal = document.getElementById("requestModal");
const openBtn = document.getElementById("openModalBtn");
const closeBtn = document.querySelector(".request-modal__close");

openBtn.addEventListener("click", () => {
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
});

closeBtn.addEventListener("click", () => {
  modal.classList.remove("active");
  document.body.style.overflow = "";
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }
});

// ===== Hamburger nav (mobile) =====
const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("nav");
hamburger.addEventListener("click", () => nav.classList.toggle("open"));
nav
  .querySelectorAll(".nav-cta, .nav-links a")
  .forEach((el) =>
    el.addEventListener("click", () => nav.classList.remove("open")),
  );

// ===== FAQ accordion =====
document.querySelectorAll(".faq-q").forEach((btn) => {
  btn.addEventListener("click", () => {
    const item = btn.parentElement;
    const answer = item.querySelector(".faq-a");
    const isOpen = item.classList.contains("open");
    // close all
    document.querySelectorAll(".faq-item").forEach((i) => {
      i.classList.remove("open");
      i.querySelector(".faq-a").style.maxHeight = null;
    });
    if (!isOpen) {
      item.classList.add("open");
      answer.style.maxHeight = answer.scrollHeight + "px";
    }
  });
});

// ===== Intersection Observer fade-in =====
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 },
);
document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));

// ===== Animated count-up on appearance =====
function formatNum(n, sep) {
  n = Math.round(n);
  return sep ? n.toLocaleString("ru-RU") : String(n);
}
const countObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const to = parseFloat(el.dataset.to);
      const sep = el.dataset.sep === "1";
      const duration = 1600;
      const start = performance.now();
      function tick(now) {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
        el.textContent = formatNum(to * eased, sep);
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = formatNum(to, sep);
      }
      requestAnimationFrame(tick);
      countObserver.unobserve(el);
    });
  },
  { threshold: 0.5 },
);
document.querySelectorAll(".count").forEach((el) => countObserver.observe(el));

// ===== YouTube click-to-play (lite facade) =====
document.querySelectorAll(".yt-lite").forEach((box) => {
  box.addEventListener(
    "click",
    () => {
      const id = box.dataset.id;
      const iframe = document.createElement("iframe");
      iframe.src = "https://www.youtube.com/embed/" + id + "?enablejsapi=1&autoplay=1&rel=0";
      iframe.title = "Видео";
      iframe.allow =
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      iframe.allowFullscreen = true;
      box.innerHTML = "";
      box.appendChild(iframe);
    },
    { once: true },
  );
});