/* ============================================================
   INDEX.JS — Portfolio interactions
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

    /* ---- 1. Inject links from config.js ---- */
    if (typeof CONFIG !== "undefined") {
        const set = (id, url) => {
            const el = document.getElementById(id);
            if (el && url) { el.href = url; el.target = "_blank"; }
        };
        set("btn-github",      CONFIG.GITHUB_URL);
        set("btn-linkedin",    CONFIG.LINKEDIN_URL);
        set("btn-kaggle",      CONFIG.KAGGLE_URL);
        set("footer-github",   CONFIG.GITHUB_URL);
        set("contact-linkedin", CONFIG.LINKEDIN_URL);

        // Inject Images
        if (CONFIG.IMAGES) {
            const setImg = (id, src) => {
                const el = document.getElementById(id);
                if (el && src) el.src = src;
            };
            setImg("img-profile",     CONFIG.IMAGES.profile_photo);
            setImg("cert-dl",          CONFIG.IMAGES.cert_dl);
            setImg("cert-ml",          CONFIG.IMAGES.cert_ml);
            setImg("cert-dsp",         CONFIG.IMAGES.cert_dsp);
            setImg("cert-python",      CONFIG.IMAGES.cert_python);
            setImg("cert-icbeem",      CONFIG.IMAGES.cert_icbeem_h);
            setImg("logo-icbeem",      CONFIG.IMAGES.logo_icbeem);
            setImg("logo-icomet",      CONFIG.IMAGES.logo_icomet);
            setImg("img-pitch-waste",  CONFIG.IMAGES.pitch_waste);
            setImg("cert-pitch-waste", CONFIG.IMAGES.pitch_waste);
        }

        // Project card links
        document.querySelectorAll("[data-link]").forEach(el => {
            const key = el.getAttribute("data-link");          // e.g. "leadIntelligence-github"
            const [project, type] = key.split("-");             // ["leadIntelligence", "github"]
            if (CONFIG.projects && CONFIG.projects[project]) {
                const url = CONFIG.projects[project][type];
                if (url) {
                    el.href = url;
                    el.target = "_blank";
                } else {
                    el.style.display = "none"; // hide if no link provided
                }
            }
        });

        // Resume
        if (CONFIG.RESUME_PATH) {
            const cvBtn = document.getElementById("btn-cv");
            if (cvBtn) cvBtn.href = CONFIG.RESUME_PATH;
        }

        /* ---- Certificate Slider for highlights circle ---- */
        const certImgs = [
            CONFIG.IMAGES.cert_dl,
            CONFIG.IMAGES.cert_ml,
            CONFIG.IMAGES.cert_dsp,
            CONFIG.IMAGES.cert_python,
            CONFIG.IMAGES.cert_icbeem_h          // iCBEEM now included
        ].filter(Boolean);

        let currentCertIndex = 0;
        const certSliderImg = document.getElementById("hl-cert-slider");

        if (certSliderImg && certImgs.length > 0) {
            certSliderImg.src = certImgs[0];

            // Click on the circle → jump to next cert manually
            const certCircle = document.getElementById("hl-cert-circle");
            if (certCircle) {
                certCircle.addEventListener("click", (e) => {
                    e.stopPropagation(); // don't open lightbox
                    certSliderImg.style.opacity = 0;
                    setTimeout(() => {
                        currentCertIndex = (currentCertIndex + 1) % certImgs.length;
                        certSliderImg.src = certImgs[currentCertIndex];
                        certSliderImg.style.opacity = 1;
                    }, 300);
                });
            }

            // Auto-rotate every 3 s
            setInterval(() => {
                certSliderImg.style.opacity = 0;
                setTimeout(() => {
                    currentCertIndex = (currentCertIndex + 1) % certImgs.length;
                    certSliderImg.src = certImgs[currentCertIndex];
                    certSliderImg.style.opacity = 1;
                }, 500);
            }, 3000);
        }
    }

    /* ---- 1b. Dark / Light theme toggle ---- */
    const themeToggle = document.getElementById("theme-toggle");
    const savedTheme = localStorage.getItem("portfolio-theme");

    // Apply saved theme on load
    if (savedTheme === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
    }

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const isDark = document.documentElement.getAttribute("data-theme") === "dark";
            if (isDark) {
                document.documentElement.removeAttribute("data-theme");
                localStorage.setItem("portfolio-theme", "light");
            } else {
                document.documentElement.setAttribute("data-theme", "dark");
                localStorage.setItem("portfolio-theme", "dark");
            }
        });
    }

    /* ---- 1c. Lightbox — click avatar / highlight circles to view full image ---- */
    const lightbox    = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const backdrop    = lightbox ? lightbox.querySelector(".lightbox-backdrop") : null;

    function openLightbox(src) {
        if (!lightbox || !lightboxImg) return;
        lightboxImg.src = src;
        lightbox.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function closeLightbox() {
        if (!lightbox) return;
        lightbox.classList.remove("active");
        document.body.style.overflow = "";
    }

    // Avatar click
    const avatarRing = document.querySelector(".avatar-ring");
    if (avatarRing) {
        avatarRing.addEventListener("click", () => {
            const img = avatarRing.querySelector("img");
            if (img) openLightbox(img.src);
        });
    }

    // Highlight circles click
    document.querySelectorAll(".highlight-circle").forEach(circle => {
        circle.addEventListener("click", () => {
            const img = circle.querySelector("img");
            if (img) openLightbox(img.src);
        });
    });

    // Close lightbox
    if (backdrop) backdrop.addEventListener("click", closeLightbox);
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeLightbox();
    });

    /* ---- 1d. Publication card click — toggle abstract ---- */
    document.querySelectorAll(".pub-clickable").forEach(card => {
        card.addEventListener("click", (e) => {
            // Don't toggle if clicking a link inside the card
            if (e.target.closest("a")) return;
            const abstract = card.querySelector(".pub-abstract");
            const hint = card.querySelector(".pub-click-hint");
            if (abstract) {
                abstract.classList.toggle("visible");
                abstract.classList.toggle("hidden");
                if (hint) {
                    hint.textContent = abstract.classList.contains("visible")
                        ? "Click to hide abstract"
                        : "Click to read abstract";
                }
            }
        });
    });

    /* ---- 2. Hamburger menu ---- */
    const hamburger = document.getElementById("hamburger");
    const navMenu   = document.getElementById("nav-menu");
    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
        });
        navMenu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                hamburger.classList.remove("active");
                navMenu.classList.remove("active");
            });
        });
    }

    /* ---- 3. Tab switching (Projects / Certifications) ---- */
    const tabBtns = document.querySelectorAll(".tab-btn");
    tabBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const target = btn.getAttribute("data-tab");
            // Deactivate all tabs & grids
            tabBtns.forEach(b => b.classList.remove("active"));
            document.querySelectorAll(".content-grid").forEach(g => g.classList.add("hidden"));
            // Activate clicked
            btn.classList.add("active");
            const grid = document.getElementById(target);
            if (grid) grid.classList.remove("hidden");
        });
    });

    /* ---- 3b. Certificate Carousel ---- */
    (function initCertCarousel() {
        const track     = document.getElementById("cert-track");
        const prevBtn   = document.getElementById("cert-prev");
        const nextBtn   = document.getElementById("cert-next");
        const dotsWrap  = document.getElementById("cert-dots");
        if (!track || !prevBtn || !nextBtn || !dotsWrap) return;

        const slides = track.querySelectorAll(".cert-slide");
        const dots   = dotsWrap.querySelectorAll(".cert-dot");
        const total  = slides.length;
        let current  = 0;

        function goTo(idx) {
            // Clamp
            idx = Math.max(0, Math.min(total - 1, idx));
            current = idx;
            track.style.transform = `translateX(-${current * 100}%)`;
            // Update dots
            dots.forEach((d, i) => d.classList.toggle("active", i === current));
            // Arrow states
            prevBtn.disabled = current === 0;
            nextBtn.disabled = current === total - 1;
        }

        // Arrow clicks
        prevBtn.addEventListener("click", () => goTo(current - 1));
        nextBtn.addEventListener("click", () => goTo(current + 1));

        // Dot clicks
        dots.forEach(dot => {
            dot.addEventListener("click", () => {
                goTo(parseInt(dot.getAttribute("data-index"), 10));
            });
        });

        // Touch / swipe support
        let touchStartX = 0;
        track.addEventListener("touchstart", e => {
            touchStartX = e.changedTouches[0].clientX;
        }, { passive: true });
        track.addEventListener("touchend", e => {
            const dx = e.changedTouches[0].clientX - touchStartX;
            if (Math.abs(dx) > 40) goTo(dx < 0 ? current + 1 : current - 1);
        }, { passive: true });

        // Keyboard arrows when certs tab is visible
        document.addEventListener("keydown", e => {
            const certsGrid = document.getElementById("certs-grid");
            if (!certsGrid || certsGrid.classList.contains("hidden")) return;
            if (e.key === "ArrowLeft")  goTo(current - 1);
            if (e.key === "ArrowRight") goTo(current + 1);
        });

        // Init
        goTo(0);
    })();

    /* ---- 4. Stat counter animation ---- */
    const statNumbers = document.querySelectorAll(".stat-number");
    let statsCounted = false;

    function animateStats() {
        if (statsCounted) return;
        statsCounted = true;
        statNumbers.forEach(el => {
            const target = parseInt(el.getAttribute("data-target"), 10);
            let current = 0;
            const step = Math.max(1, Math.ceil(target / 40));
            const interval = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(interval);
                    el.textContent = current + "+";
                } else {
                    el.textContent = current;
                }
            }, 40);
        });
    }

    /* ---- 5. Scroll-triggered fade-in + stat counter ---- */
    const fadeEls = document.querySelectorAll(
        ".grid-card, .cert-slide, .timeline-item, .pub-card, .contact-link"
    );
    fadeEls.forEach(el => el.classList.add("fade-in"));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.1 });

    fadeEls.forEach(el => observer.observe(el));

    // Stats observer
    const homeSection = document.getElementById("home");
    if (homeSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) animateStats();
        }, { threshold: 0.3 });
        statsObserver.observe(homeSection);
    }

    /* ---- 6. Active nav link on scroll ---- */
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-list ul a");

    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach(sec => {
            const top = sec.offsetTop - 100;
            if (window.scrollY >= top) current = sec.getAttribute("id");
        });
        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === "#" + current) {
                link.classList.add("active");
            }
        });
    });
});