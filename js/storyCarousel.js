
(() => {
    const gallery = document.getElementById("storyGallery");
    if (!gallery) return;

    const slides = [...gallery.querySelectorAll(".story-slide")];
    const dots = [...gallery.querySelectorAll(".story-dot")];
    const previousButton = gallery.querySelector(".story-prev");
    const nextButton = gallery.querySelector(".story-next");
    const playButton = gallery.querySelector(".story-play-toggle");
    const playIcon = gallery.querySelector(".story-play-icon");
    const count = gallery.querySelector(".story-count");
    const viewport = gallery.querySelector(".story-arch-window");

    if (!slides.length) return;

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

    const intervalMs = 2000;
    let current = 0;
    let timer = null;
    let paused = reducedMotion.matches;
    let hoverPaused = false;
    let focusPaused = false;
    let touchStartX = null;

    function render(index) {
        current = (index + slides.length) % slides.length;

        slides.forEach((slide, i) => {
            const active = i === current;
            slide.classList.toggle("is-active", active);
            slide.setAttribute("aria-hidden", String(!active));
        });

        dots.forEach((dot, i) => {
            const active = i === current;
            dot.classList.toggle("is-active", active);

            if (active) {
                dot.setAttribute("aria-current", "true");
            } else {
                dot.removeAttribute("aria-current");
            }
        });

        count.textContent =
            `${String(current + 1).padStart(2, "0")} / ` +
            `${String(slides.length).padStart(2, "0")}`;
    }

    function stopTimer() {
        if (timer !== null) {
            clearInterval(timer);
            timer = null;
        }
    }

    function shouldPause() {
        return paused || hoverPaused || focusPaused ||
               document.hidden || reducedMotion.matches;
    }

    function syncTimer() {
        stopTimer();

        if (!shouldPause() && slides.length > 1) {
            timer = setInterval(() => {
                render(current + 1);
            }, intervalMs);
        }

        playIcon.textContent = paused ? "▶" : "Ⅱ";
        playButton.setAttribute(
            "aria-label",
            paused ? "Play slideshow" : "Pause slideshow"
        );
        playButton.setAttribute("aria-pressed", String(paused));
    }

    function show(index) {
        render(index);
        syncTimer();
    }

    previousButton.addEventListener("click", () => {
        show(current - 1);
    });

    nextButton.addEventListener("click", () => {
        show(current + 1);
    });

    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => show(index));
    });

    playButton.addEventListener("click", () => {
        paused = !paused;
        syncTimer();
    });

    gallery.addEventListener("mouseenter", () => {
        hoverPaused = true;
        syncTimer();
    });

    gallery.addEventListener("mouseleave", () => {
        hoverPaused = false;
        syncTimer();
    });

    gallery.addEventListener("focusin", () => {
        focusPaused = true;
        syncTimer();
    });

    gallery.addEventListener("focusout", event => {
        if (!gallery.contains(event.relatedTarget)) {
            focusPaused = false;
            syncTimer();
        }
    });

    viewport.addEventListener("touchstart", event => {
        touchStartX = event.changedTouches[0].clientX;
    }, { passive: true });

    viewport.addEventListener("touchend", event => {
        if (touchStartX === null) return;

        const distance =
            event.changedTouches[0].clientX - touchStartX;

        if (Math.abs(distance) > 45) {
            show(current + (distance < 0 ? 1 : -1));
        }

        touchStartX = null;
    }, { passive: true });

    document.addEventListener("visibilitychange", syncTimer);

    reducedMotion.addEventListener?.("change", event => {
        if (event.matches) paused = true;
        syncTimer();
    });

    render(0);
    syncTimer();
})();
