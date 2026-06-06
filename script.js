// ===== Modal =====
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
nav.querySelectorAll(".nav-cta, .nav-links a").forEach((el) =>
    el.addEventListener("click", () => nav.classList.remove("open"))
);

// ===== FAQ accordion =====
document.querySelectorAll(".faq-q").forEach((btn) => {
    btn.addEventListener("click", () => {
        const item = btn.parentElement;
        const answer = item.querySelector(".faq-a");
        const isOpen = item.classList.contains("open");
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
    }, { threshold: 0.12 }
);
document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));

// ===== Animated count-up =====
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
                const eased = 1 - Math.pow(1 - p, 3);
                el.textContent = formatNum(to * eased, sep);
                if (p < 1) requestAnimationFrame(tick);
                else el.textContent = formatNum(to, sep);
            }
            requestAnimationFrame(tick);
            countObserver.unobserve(el);
        });
    }, { threshold: 0.5 }
);
document.querySelectorAll(".count").forEach((el) => countObserver.observe(el));

// ===== YouTube Analytics =====
let ytPlayer = null;
let ytProgressTimer = null;
const ytMilestones = [10, 25, 50, 75, 90];
const ytFired = new Set();

// YouTube уже загружен как iframe — инициализируем player сразу
window.onYouTubeIframeAPIReady = function() {
    ytPlayer = new YT.Player("yt-case-iframe", {
        events: {
            onStateChange: function(e) {
                if (e.data === YT.PlayerState.PLAYING) {
                    // Трекаем первый Play
                    if (!ytFired.has("play")) {
                        ytFired.add("play");
                        window.dataLayer = window.dataLayer || [];
                        window.dataLayer.push({
                            event: "video_play_click",
                            video_title: "Кейс ученика - Азамат",
                            video_provider: "youtube",
                        });
                    }
                    startYTTracking();
                }
                if (
                    e.data === YT.PlayerState.PAUSED ||
                    e.data === YT.PlayerState.ENDED
                ) {
                    clearInterval(ytProgressTimer);
                }
            },
        },
    });
};

function startYTTracking() {
    clearInterval(ytProgressTimer);
    ytProgressTimer = setInterval(() => {
        if (!ytPlayer || typeof ytPlayer.getDuration !== "function") return;
        const duration = ytPlayer.getDuration();
        if (!duration) return;
        const percent = Math.floor((ytPlayer.getCurrentTime() / duration) * 100);
        ytMilestones.forEach((m) => {
            if (percent >= m && !ytFired.has(m)) {
                ytFired.add(m);
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({
                    event: "video_milestone",
                    video_title: "Кейс ученика - Азамат",
                    video_percent: m,
                    video_provider: "youtube",
                });
            }
        });
    }, 1000);
}

// ===== Kinescope Analytics (VSL) =====
const kinescopeMilestones = [10, 25, 50, 75, 90];
const kinescopeFired = new Set();

function initKinescopeAnalytics() {
    const iframe = document.querySelector('#vsl iframe');
    if (!iframe) return;

    // Используем Kinescope Player API через postMessage
    function sendToKinescope(method, args) {
        iframe.contentWindow.postMessage(
            JSON.stringify({ method, args }),
            'https://kinescope.io'
        );
    }

    let kinescopeTimer = null;
    let duration = null;

    window.addEventListener('message', function(e) {
        if (!e.data || typeof e.data !== 'object') return;
        const type = e.data.type || '';

        // Play
        if (type === 'KINESCOPE_PLAYER_PLAY_EVENT') {
            if (!kinescopeFired.has('play')) {
                kinescopeFired.add('play');
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({
                    event: 'video_play_click',
                    video_title: 'VSL - Reach',
                    video_provider: 'kinescope',
                });
            }

            // Запускаем polling каждую секунду
            clearInterval(kinescopeTimer);
            kinescopeTimer = setInterval(function() {
                sendToKinescope('getDuration', []);
                sendToKinescope('getCurrentTime', []);
            }, 1000);
        }

        // Пауза / конец
        if (type === 'KINESCOPE_PLAYER_PAUSE_EVENT' || type === 'KINESCOPE_PLAYER_ENDED_EVENT') {
            clearInterval(kinescopeTimer);
        }

        // Ответы на getDuration / getCurrentTime
        if (e.data.event === 'infoDelivery' && e.data.info) {
            const info = e.data.info;

            if (info.duration) duration = info.duration;

            if (info.currentTime && duration) {
                const percent = Math.floor((info.currentTime / duration) * 100);
                kinescopeMilestones.forEach((m) => {
                    if (percent >= m && !kinescopeFired.has(m)) {
                        kinescopeFired.add(m);
                        window.dataLayer = window.dataLayer || [];
                        window.dataLayer.push({
                            event: 'video_milestone',
                            video_title: 'VSL - Reach',
                            video_percent: m,
                            video_provider: 'kinescope',
                        });
                    }
                });
            }
        }
    });
}

window.addEventListener('load', initKinescopeAnalytics);

// ===== Scroll to video tracking =====
const scrollTrackFired = new Set();
const scrollTracker = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const id = entry.target.id;
            if (!scrollTrackFired.has(id)) {
                scrollTrackFired.add(id);
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({
                    event: "video_section_visible",
                    video_title: id === "vsl" ? "VSL - Reach" : "Кейс ученика - Азамат",
                });
            }
        });
    }, { threshold: 0.5 }
);

const vslSection = document.getElementById("vsl");
const caseSection = document.getElementById("case");
if (vslSection) scrollTracker.observe(vslSection);
if (caseSection) scrollTracker.observe(caseSection);