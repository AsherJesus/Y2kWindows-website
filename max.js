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

// 🎨 WINDOW.EXE THEME SYSTEM

function setTheme(theme) {

  // XP BLUE
  if (theme === "xp") {

    document.documentElement.style.setProperty(
      "--bg-color",
      "#071a4a"
    );

    document.documentElement.style.setProperty(
      "--window-color",
      "rgba(10,45,130,0.75)"
    );

    document.documentElement.style.setProperty(
      "--panel-color",
      "rgba(0,20,70,0.75)"
    );

    document.documentElement.style.setProperty(
      "--accent-color",
      "#00d9ff"
    );

    document.documentElement.style.setProperty(
      "--accent-hover",
      "#b6ff00"
    );
  }

  // JUNGLE GREEN
  if (theme === "green") {

    document.documentElement.style.setProperty(
      "--bg-color",
      "#102e18"
    );

    document.documentElement.style.setProperty(
      "--window-color",
      "rgba(20,60,30,0.75)"
    );

    document.documentElement.style.setProperty(
      "--panel-color",
      "rgba(10,40,20,0.75)"
    );

    document.documentElement.style.setProperty(
      "--accent-color",
      "#7dff7d"
    );

    document.documentElement.style.setProperty(
      "--accent-hover",
      "#d2ff72"
    );
  }

  // SUNSET GOLD
  if (theme === "sunset") {

    document.documentElement.style.setProperty(
      "--bg-color",
      "#4b2a12"
    );

    document.documentElement.style.setProperty(
      "--window-color",
      "rgba(120,60,20,0.75)"
    );

    document.documentElement.style.setProperty(
      "--panel-color",
      "rgba(80,40,10,0.75)"
    );

    document.documentElement.style.setProperty(
      "--accent-color",
      "#ffb347"
    );

    document.documentElement.style.setProperty(
      "--accent-hover",
      "#ffe082"
    );
  }

  // ERROR RED
  if (theme === "red") {

    document.documentElement.style.setProperty(
      "--bg-color",
      "#2a0000"
    );

    document.documentElement.style.setProperty(
      "--window-color",
      "rgba(80,0,0,0.75)"
    );

    document.documentElement.style.setProperty(
      "--panel-color",
      "rgba(40,0,0,0.75)"
    );

    document.documentElement.style.setProperty(
      "--accent-color",
      "#ff4d4d"
    );

    document.documentElement.style.setProperty(
      "--accent-hover",
      "#ff9999"
    );
  }

  // CRT GRAY
  if (theme === "gray") {

    document.documentElement.style.setProperty(
      "--bg-color",
      "#1b1b1b"
    );

    document.documentElement.style.setProperty(
      "--window-color",
      "rgba(40,40,40,0.75)"
    );

    document.documentElement.style.setProperty(
      "--panel-color",
      "rgba(20,20,20,0.75)"
    );

    document.documentElement.style.setProperty(
      "--accent-color",
      "#d0d0d0"
    );

    document.documentElement.style.setProperty(
      "--accent-hover",
      "#ffffff"
    );
  }

  // 💾 SAVE THEME
  localStorage.setItem("windowTheme", theme);
}


// 💾 LOAD SAVED THEME
document.addEventListener("DOMContentLoaded", () => {

  const savedTheme = localStorage.getItem("windowTheme");

  if (savedTheme) {
    setTheme(savedTheme);
  }

});

// 🌐 WINDOW.EXE LANGUAGE SYSTEM

const languageText = {

  // 🇺🇸 ENGLISH
  en: {

    profileTitle: "window.exe",

    mainTitle: "WINDOW.EXE ONLINE",

    mainSubtitle:
      "archive system • digital rooms • lost desktop",

    tileOne: "archive fragment #01",

    tileTwo: "archive fragment #02",

    tileThree: "static loop #03",

    enterButton: "enter archive →",

    musicButton: "🎧 music on/off",

    glitchButton: "💥 glitch sound"
  },

  // 🇰🇷 KOREAN
  ko: {

    profileTitle: "윈도우.exe",

    mainTitle: "WINDOW.EXE 온라인",

    mainSubtitle:
      "아카이브 시스템 • 디지털 방 • 잃어버린 데스크탑",

    tileOne: "아카이브 조각 #01",

    tileTwo: "아카이브 조각 #02",

    tileThree: "정적 루프 #03",

    enterButton: "아카이브 들어가기 →",

    musicButton: "🎧 음악 켜기/끄기",

    glitchButton: "💥 글리치 사운드"
  },

  // 🇯🇵 JAPANESE
  jp: {

    profileTitle: "ウィンドウ.exe",

    mainTitle: "WINDOW.EXE オンライン",

    mainSubtitle:
      "アーカイブシステム • デジタルルーム • 失われたデスクトップ",

    tileOne: "アーカイブ断片 #01",

    tileTwo: "アーカイブ断片 #02",

    tileThree: "静的ループ #03",

    enterButton: "アーカイブに入る →",

    musicButton: "🎧 音楽 オン/オフ",

    glitchButton: "💥 グリッチサウンド"
  }
};


// 🌐 CHANGE LANGUAGE
function setLanguage(lang) {

  const selectedLanguage = languageText[lang];

  if (!selectedLanguage) return;

  Object.keys(selectedLanguage).forEach((id) => {

    const element =
      document.getElementById(id);

    if (element) {
      element.textContent =
        selectedLanguage[id];
    }
  });

  // 💾 SAVE LANGUAGE
  localStorage.setItem(
    "windowLanguage",
    lang
  );
}


// 💾 LOAD SAVED LANGUAGE
document.addEventListener(
  "DOMContentLoaded",
  () => {

    const savedLanguage =
      localStorage.getItem(
        "windowLanguage"
      );

    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }
);

// ⚙️ SETTINGS PANEL TOGGLE

function toggleSettings() {
  const panel = document.getElementById("settingsPanel");

  if (!panel) return;

  if (panel.style.display === "none" || panel.style.display === "") {
    panel.style.display = "block";
  } else {
    panel.style.display = "none";
  }
}
