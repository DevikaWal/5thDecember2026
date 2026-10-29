/* =========================================================
   ENTRANCE PAGE
========================================================= */


/* =========================================================
   INITIAL PAGE STATE
========================================================= */

document.body.classList.add("locked");
document.documentElement.classList.add("entry-active");
document.body.classList.add("entry-active");


/* =========================================================
   OPEN INVITATION
========================================================= */

function enterSite() {

    /* Hide entrance page */
    document.getElementById("entry").style.display = "none";

    /* Show welcome page */
    const welcome = document.getElementById("welcomePage");
    welcome.style.display = "block";

    requestAnimationFrame(() => {
        welcome.classList.add("active");
    });

    /* Start music */
    const music = document.getElementById("bgMusic");
    music.volume = 0.5;
    music.currentTime = 17.5;

    music.play()
        .then(() => {
            console.log("Music started successfully");
        })
        .catch((error) => {
            console.error("Music failed:", error);
        });

    /* Show music button */
    document.getElementById("musicToggle").style.display = "flex";

    /* Start welcome page from the top */
    window.scrollTo(0, 0);
}


/* =========================================================
   SHOW PAGE AS SOON AS THE ENTRANCE PHOTO IS READY
   (no longer waits for every image on the page)
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const hero = document.querySelector(".entry-photo");
    const show = () => document.body.classList.add("loaded");

    if (!hero || hero.complete) {
        show();
    } else {
        hero.addEventListener("load", show, { once: true });
        hero.addEventListener("error", show, { once: true });
    }

    /* Never leave guests on a blank page */
    setTimeout(show, 2500);
});


/* =========================================================
   MUSIC CONTROLS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const toggleBtn = document.getElementById("musicToggle");
    const music = document.getElementById("bgMusic");

    if (!toggleBtn || !music) {
        return;
    }

    /* PLAY / PAUSE */
    toggleBtn.onclick = () => {

        if (music.paused) {
            music.play();
            toggleBtn.innerText = "🔊";
        } else {
            music.pause();
            toggleBtn.innerText = "🔇";
        }
    };

    /* HANDLE TAB VISIBILITY */
    let wasPlaying = false;

    document.addEventListener("visibilitychange", () => {

        if (document.hidden) {
            wasPlaying = !music.paused;
            music.pause();
        } else if (wasPlaying) {
            music.play().catch(() => {});
        }
    });
});
