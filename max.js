document.addEventListener("DOMContentLoaded", function () {
  const loader = document.getElementById("loader");
  const main = document.getElementById("main-content");
  const text = document.querySelector(".glitch");

  if (!loader || !main) return;

  // initial state
  main.style.display = "none";
  loader.style.display = "flex";
  loader.style.opacity = "1";

  // navigation type detection (safe)
  let navType = "navigate";
  const navEntries = performance.getEntriesByType("navigation");
  if (navEntries.length > 0) {
    navType = navEntries[0].type;
  }

  if (text) {
    if (navType === "reload") {
      text.textContent = "welcome back...";
      text.setAttribute("data-text", "welcome back...");
    } else {
      text.textContent = "loading...";
      text.setAttribute("data-text", "loading...");
    }
  }

  // loader fade out
  setTimeout(() => {
    loader.style.opacity = "0";

    setTimeout(() => {
      loader.style.display = "none";
      main.style.display = "block";
    }, 400);

  }, 1800);
});


// 🔁 PAGE TRANSITION
function goToPage(page) {
  const loader = document.getElementById("loader");
  const main = document.getElementById("main-content");

  if (loader) {
    loader.style.display = "flex";
    loader.style.opacity = "1";
  }

  if (main) {
    main.style.opacity = "0";
  }

  setTimeout(() => {
    window.location.href = page;
  }, 800);
}


// 🔊 CLICK SOUND
function playClick() {
  const s = document.getElementById("clickSound");
  if (!s) return;

  try {
    s.currentTime = 0;
    s.play();
  } catch (e) {}
}


// 🔊 HOVER SOUND
function playHover() {
  const s = document.getElementById("hoverSound");
  if (!s) return;

  try {
    s.currentTime = 0;
    s.play();
  } catch (e) {}
}


// 🎧 MUSIC TOGGLE
function toggleMusic() {
  const music = document.getElementById("bgMusic");
  if (!music) return;

  if (music.paused) {
    music.volume = 0.5;
    music.play().catch(() => {});
  } else {
    music.pause();
  }
}


// 🎵 MUSIC START (FADE IN)
let fadeInterval;

function startMusic() {
  const music = document.getElementById("bgMusic");
  if (!music) return;

  if (!music.paused) return;

  music.volume = 0;
  music.play().catch(() => {});

  let vol = 0;

  if (fadeInterval) clearInterval(fadeInterval);

  fadeInterval = setInterval(() => {
    if (vol < 1) {
      vol += 0.05;
      music.volume = vol;
    } else {
      clearInterval(fadeInterval);
    }
  }, 80);
}


// 🎧 BOOT SOUND SYSTEM (Y2K STARTUP EFFECT)
function playBoot() {
  const boot = document.getElementById("bootSound");
  if (!boot) return;

  boot.volume = 0.3;
  boot.play().catch(() => {});
}

let bootPlayed = false;

document.addEventListener("click", () => {
  if (bootPlayed) return;

  playBoot();
  bootPlayed = true;
});