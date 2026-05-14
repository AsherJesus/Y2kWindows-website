// ===============================
// WINDOW.EXE MAIN SYSTEM
// ===============================

document.addEventListener("DOMContentLoaded", function () {
  loadSavedTheme();
  loadSavedLanguage();
  runLoader();
});


// ===============================
// LOADER SYSTEM
// ===============================

function runLoader() {
  const loader = document.getElementById("loader");
  const main = document.getElementById("main-content");
  const text = document.querySelector(".glitch");

  if (!loader || !main) return;

  main.style.display = "none";
  loader.style.display = "flex";
  loader.style.opacity = "1";

  let navType = "navigate";
  const navEntries = performance.getEntriesByType("navigation");

  if (navEntries.length > 0) {
    navType = navEntries[0].type;
  }

  const savedLanguage = localStorage.getItem("windowLanguage") || "en";

  const loaderText = {
    en: {
      loading: "loading...",
      welcomeBack: "welcome back..."
    },

    ko: {
      loading: "로딩 중...",
      welcomeBack: "다시 오신 것을 환영합니다..."
    },

    jp: {
      loading: "読み込み中...",
      welcomeBack: "おかえりなさい..."
    },

    es: {
      loading: "cargando...",
      welcomeBack: "bienvenido de nuevo..."
    }
  };

  const selectedLoaderText = loaderText[savedLanguage] || loaderText.en;

  if (text) {
    if (navType === "reload") {
      text.textContent = selectedLoaderText.welcomeBack;
      text.setAttribute("data-text", selectedLoaderText.welcomeBack);
    } else {
      text.textContent = selectedLoaderText.loading;
      text.setAttribute("data-text", selectedLoaderText.loading);
    }
  }

  setTimeout(() => {
    loader.style.opacity = "0";

    setTimeout(() => {
      loader.style.display = "none";
      main.style.display = "block";
      main.style.opacity = "1";
    }, 400);
  }, 1800);
}


// ===============================
// PAGE TRANSITION
// ===============================

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


// ===============================
// SOUND SYSTEM
// ===============================

function playClick() {
  const s = document.getElementById("clickSound");
  if (!s) return;

  try {
    s.currentTime = 0;
    s.play();
  } catch (e) {}
}

function playHover() {
  const s = document.getElementById("hoverSound");
  if (!s) return;

  try {
    s.currentTime = 0;
    s.play();
  } catch (e) {}
}

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


// ===============================
// THEME SYSTEM
// ===============================

function setTheme(theme) {
  const themes = {
    xp: {
      "--bg-color": "#071a4a",
      "--window-color": "rgba(10,45,130,0.75)",
      "--panel-color": "rgba(0,20,70,0.75)",
      "--accent-color": "#00d9ff",
      "--accent-hover": "#b6ff00"
    },

    green: {
      "--bg-color": "#102e18",
      "--window-color": "rgba(20,60,30,0.75)",
      "--panel-color": "rgba(10,40,20,0.75)",
      "--accent-color": "#7dff7d",
      "--accent-hover": "#d2ff72"
    },

    sunset: {
      "--bg-color": "#4b2a12",
      "--window-color": "rgba(120,60,20,0.75)",
      "--panel-color": "rgba(80,40,10,0.75)",
      "--accent-color": "#ffb347",
      "--accent-hover": "#ffe082"
    },

    red: {
      "--bg-color": "#2a0000",
      "--window-color": "rgba(80,0,0,0.75)",
      "--panel-color": "rgba(40,0,0,0.75)",
      "--accent-color": "#ff4d4d",
      "--accent-hover": "#ff9999"
    },

    gray: {
      "--bg-color": "#1b1b1b",
      "--window-color": "rgba(40,40,40,0.75)",
      "--panel-color": "rgba(20,20,20,0.75)",
      "--accent-color": "#d0d0d0",
      "--accent-hover": "#ffffff"
    },

    purple: {
      "--bg-color": "#1a0b2a",
      "--window-color": "rgba(50,20,90,0.75)",
      "--panel-color": "rgba(30,10,60,0.75)",
      "--accent-color": "#c084ff",
      "--accent-hover": "#e0b3ff"
    },

    cyan: {
      "--bg-color": "#0b2a2a",
      "--window-color": "rgba(20,80,80,0.75)",
      "--panel-color": "rgba(10,40,40,0.75)",
      "--accent-color": "#7fffd4",
      "--accent-hover": "#b3fff0"
    }
  };

  const selectedTheme = themes[theme];

  if (!selectedTheme) return;

  Object.keys(selectedTheme).forEach((key) => {
    document.documentElement.style.setProperty(key, selectedTheme[key]);
  });

  localStorage.setItem("windowTheme", theme);
}

function loadSavedTheme() {
  const savedTheme = localStorage.getItem("windowTheme");

  if (savedTheme) {
    setTheme(savedTheme);
  }
}


// ===============================
// LANGUAGE SYSTEM
// ===============================
const languageText = {

  // 🇺🇸 ENGLISH
  en: {

   // 🇺🇸 ENGLISH
    settingsText: "⚙️ Setting.exe",

    profileTitle: "Digital Memory",
    
    mainTitle: "WINDOW.EXE ONLINE",

    mainSubtitle:
      "archive system • digital rooms • lost desktop",

    tileOne: "archive fragment #01",

    tileTwo: "archive fragment #02",

    tileThree: "static loop #03",

    enterButton: "enter archive →",

    musicButton: "🎧 music on/off",

    
    // 🌌 PAGE 2

    roomTitle: "ARCHIVE SYSTEM",

    roomSubtitle:
      "memory logs • corrupted files • digital fragments",

    visualLogsTitle: "visual logs",

    systemNoticeTitle: "system_notice",

    systemNoticeText:
      "you are now inside the archive.\nnavigation is unstable.\nnot all files are safe to open.\n\nproceed anyway?",

    corruptedMediaTitle: "corrupted_media",

    systemEntitiesTitle: "system_entities",

    contactNodeTitle: "contact_node",

    GmailText: "Gmail: AsherKirkland45@gmail.com",

    statusText: "status: active",

    backButton: "← return to home",

    // 👥 ENTITIES

    entityOne: "Signal_lost",

    entityTwo: "Null_entity",

    entityThree: "Ghost_archive",

    entityFour: "Offline_user",

    entityFive: "Memory_holder"
  },


  // 🇰🇷 KOREAN
  ko: {

    // 🇰🇷 KOREAN
    settingsText: "⚙️ 설정.exe",

    profileTitle: "디지털 메모리",

    mainTitle: "WINDOW.EXE 온라인",

    mainSubtitle:
      "아카이브 시스템 • 디지털 방 • 잃어버린 데스크탑",

    tileOne: "아카이브 조각 #01",

    tileTwo: "아카이브 조각 #02",

    tileThree: "정적 루프 #03",

    enterButton: "아카이브 들어가기 →",

    musicButton: "🎧 음악 켜기/끄기",

    glitchButton: "💥 글리치 사운드",

    // 🌌 PAGE 2

    roomTitle: "아카이브 시스템",

    roomSubtitle:
      "기억 로그 • 손상된 파일 • 디지털 조각",

    visualLogsTitle: "비주얼 로그",

    systemNoticeTitle: "시스템_알림",

    systemNoticeText:
      "지금 아카이브 안에 있습니다.\n이동이 불안정합니다.\n모든 파일이 안전한 것은 아닙니다.\n\n그래도 진행할까요?",

    corruptedMediaTitle: "손상된_미디어",

    systemEntitiesTitle: "시스템_엔티티",

    contactNodeTitle: "연락_노드",

    GmailText: "이메일: Asherkirkland45@gmail.com",

    statusText: "상태: 활성",

    backButton: "← 홈으로 돌아가기",

    // 👥 ENTITIES

    entityOne: "신호_손실",

    entityTwo: "널_엔티티",

    entityThree: "고스트_아카이브",

    entityFour: "오프라인_유저",

    entityFive: "메모리_보관자"
  },


  // 🇯🇵 JAPANESE
  jp: {

   // 🇯🇵 JAPANESE
    settingsText: "⚙️ 設定.exe",

    profileTitle: "デジタルメモリー",

    mainTitle: "WINDOW.EXE オンライン",

    mainSubtitle:
      "アーカイブシステム • デジタルルーム • 失われたデスクトップ",

    tileOne: "アーカイブ断片 #01",

    tileTwo: "アーカイブ断片 #02",

    tileThree: "静的ループ #03",

    enterButton: "アーカイブに入る →",

    musicButton: "🎧 音楽 オン/オフ",

    glitchButton: "💥 グリッチサウンド",

    // 🌌 PAGE 2

    roomTitle: "アーカイブシステム",

    roomSubtitle:
      "メモリログ • 破損ファイル • デジタル断片",

    visualLogsTitle: "ビジュアルログ",

    systemNoticeTitle: "システム通知",

    systemNoticeText:
      "あなたは今アーカイブの中にいます。\nナビゲーションは不安定です。\nすべてのファイルが安全とは限りません。\n\nそれでも進みますか？",

    corruptedMediaTitle: "破損メディア",

    systemEntitiesTitle: "システムエンティティ",

    contactNodeTitle: "コンタクトノード",

      GmailText: "メール: AsherKirkland45@gmail.com",

    statusText: "状態: アクティブ",

    backButton: "← ホームへ戻る",

    // 👥 ENTITIES

    entityOne: "シグナルロスト",

    entityTwo: "ヌルエンティティ",

    entityThree: "ゴーストアーカイブ",

    entityFour: "オフラインユーザー",

    entityFive: "メモリーホルダー",
  },

  // 🇪🇸 SPANISH
  es: {

   // 🇪🇸 SPANISH
    settingsText: "⚙️ Configuración.exe",

    profileTitle: "Memoria Digital",
    mainTitle: "WINDOW.EXE EN LÍNEA",
    mainSubtitle:
      "sistema de archivos • salas digitales • escritorio perdido",
    tileOne: "fragmento de archivo #01",
    tileTwo: "fragmento de archivo #02",
    tileThree: "bucle estático #03",
    enterButton: "entrar al archivo →",
    musicButton: "🎧 música on/off",
    
    // 🌌 PAGE 2
    roomTitle: "SISTEMA DE ARCHIVOS",
    roomSubtitle:
      "registros de memoria • archivos corruptos • fragmentos digitales",
    visualLogsTitle: "registros visuales",
    systemNoticeTitle: "aviso_del_sistema",
    systemNoticeText:
      "Estás en el archivo ahora.\nLa navegación es inestable.\nNo todos los archivos son seguros.\n\n¿Continuar de todos modos?"
    ,
    corruptedMediaTitle: "medios_corruptos",
    systemEntitiesTitle: "entidades_del_sistema",
    contactNodeTitle: "nodo_de_contacto",
    GmailText: "correo electrónico: AsherKirkland45@gmail.com",
    statusText: "estado: activo",
    backButton: "← volver al inicio",
    // 👥 ENTITIES
    entityOne: "señal perdida",
    entityTwo: "entidad nula",
    entityThree: "archivo fantasma",
    entityFour: "usuario sin conexión",
    entityFive: "poseedor de memoria"
}
};



function setLanguage(lang) {
  const selectedLanguage = languageText[lang];

  if (!selectedLanguage) return;

  Object.keys(selectedLanguage).forEach((id) => {
    const element = document.getElementById(id);

    if (element) {
      element.textContent = selectedLanguage[id];
    }
  });

  localStorage.setItem("windowLanguage", lang);
}

function loadSavedLanguage() {
  const savedLanguage = localStorage.getItem("windowLanguage");

  if (savedLanguage) {
    setLanguage(savedLanguage);
  }
}


// ===============================
// SETTINGS PANEL TOGGLE
// ===============================

function toggleSettings() {
  const panel = document.getElementById("settingsPanel");

  if (!panel) return;

  if (panel.style.display === "none" || panel.style.display === "") {
    panel.style.display = "block";
  } else {
    panel.style.display = "none";
  }
}

function toggleRoomMusic() {

  const music =
    document.getElementById("roomMusic");

  const button =
    document.getElementById("musicToggleButton");

  if (!music || !button) return;

  if (music.paused) {

    music.volume = 0.45;

    music.play().catch(() => {});

    button.textContent =
      "🎧 music: ON";

  } else {

    music.pause();

    button.textContent =
      "🔇 music: OFF";
  }
}

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
