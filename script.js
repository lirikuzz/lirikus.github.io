/* ============================================================
   Lirikus bio — script.js
   Переводы, выбор языка, плеер, анимации при скролле
   ============================================================ */

/* ---------- 1. ПЕРЕВОДЫ ---------- */
const translations = {
  ru: {
    alt_nick: "Альтернативный ник",
    about_title: "Обо мне",
    name_label: "Имя", name_value: "Кирилл",
    gender_label: "Пол", gender_value: "Мужской",
    status_label: "Статус", status_value: "Свободен",
    bd_label: "День рождения",
    from_label: "Родом из", from_value: "Херсон, Украина",
    clan_label: "Клан",
    services_title: "Чем я занимаюсь",
    edit_title: "Монтаж видео", edit_sub: "На заказ",
    edit_short: "Короткие видео (Reels/Shorts/TikTok)", edit_short_price: "$15 за видео",
    edit_long: "Длинные видео", edit_long_price: "$3 за 1 минуту",
    edit_note: "Правки и срочность обсуждаются отдельно.",
    code_title: "Программирование", code_sub: "Кодинг",
    code_price_label: "Прайс", code_price_value: "Договорной",
    code_note: "Зависит от объёма работы, сложности и дедлайна.",
    discuss_btn: "Обсудить проект",
    socials_title: "Соцсети",
    player_hint: "Нажмите play, чтобы включить музыку",
    no_track: "Добавь mp3 в assets/music/"
  },
  en: {
    alt_nick: "Alternative nickname",
    about_title: "About me",
    name_label: "Name", name_value: "Kirill",
    gender_label: "Gender", gender_value: "Male",
    status_label: "Status", status_value: "Single",
    bd_label: "Birthday",
    from_label: "From", from_value: "Kherson, Ukraine",
    clan_label: "Clan",
    services_title: "What I do",
    edit_title: "Video editing", edit_sub: "On request",
    edit_short: "Short videos (Reels/Shorts/TikTok)", edit_short_price: "$15 per video",
    edit_long: "Long videos", edit_long_price: "$3 per 1 minute",
    edit_note: "Revisions and rush orders are discussed separately.",
    code_title: "Programming", code_sub: "Coding",
    code_price_label: "Price", code_price_value: "Negotiable",
    code_note: "Depends on scope, complexity and deadline.",
    discuss_btn: "Discuss a project",
    socials_title: "Socials",
    player_hint: "Press play to start the music",
    no_track: "Add mp3 files to assets/music/"
  },
  cs: {
    alt_nick: "Alternativní přezdívka",
    about_title: "O mně",
    name_label: "Jméno", name_value: "Kirill",
    gender_label: "Pohlaví", gender_value: "Muž",
    status_label: "Stav", status_value: "Volný",
    bd_label: "Narozeniny",
    from_label: "Pocházím z", from_value: "Cherson, Ukrajina",
    clan_label: "Klan",
    services_title: "Čím se zabývám",
    edit_title: "Střih videa", edit_sub: "Na objednávku",
    edit_short: "Krátká videa (Reels/Shorts/TikTok)", edit_short_price: "$15 za video",
    edit_long: "Dlouhá videa", edit_long_price: "$3 za 1 minutu",
    edit_note: "Úpravy a spěšné zakázky se domlouvají zvlášť.",
    code_title: "Programování", code_sub: "Kódování",
    code_price_label: "Cena", code_price_value: "Dohodou",
    code_note: "Závisí na rozsahu práce, složitosti a termínu.",
    discuss_btn: "Probrat projekt",
    socials_title: "Sociální sítě",
    player_hint: "Klikněte na play pro spuštění hudby",
    no_track: "Přidej mp3 do assets/music/"
  },
  uk: {
    alt_nick: "Альтернативний нік",
    about_title: "Про мене",
    name_label: "Ім'я", name_value: "Кирило",
    gender_label: "Стать", gender_value: "Чоловіча",
    status_label: "Статус", status_value: "Вільний",
    bd_label: "День народження",
    from_label: "Родом з", from_value: "Херсон, Україна",
    clan_label: "Клан",
    services_title: "Чим я займаюся",
    edit_title: "Монтаж відео", edit_sub: "На замовлення",
    edit_short: "Короткі відео (Reels/Shorts/TikTok)", edit_short_price: "$15 за відео",
    edit_long: "Довгі відео", edit_long_price: "$3 за 1 хвилину",
    edit_note: "Правки та терміновість обговорюються окремо.",
    code_title: "Програмування", code_sub: "Кодинг",
    code_price_label: "Прайс", code_price_value: "Договірний",
    code_note: "Залежить від обсягу роботи, складності та дедлайну.",
    discuss_btn: "Обговорити проєкт",
    socials_title: "Соцмережі",
    player_hint: "Натисніть play, щоб увімкнути музику",
    no_track: "Додай mp3 до assets/music/"
  }
};

const SUPPORTED = ["ru", "en", "cs", "uk"];
const STORAGE_KEY = "lirikus_lang";
let currentLang = "ru";

function storageGet(key) { try { return localStorage.getItem(key); } catch (e) { return null; } }
function storageSet(key, val) { try { localStorage.setItem(key, val); } catch (e) { /* игнорируем */ } }

/* ---------- 2. СМЕНА ЯЗЫКА ---------- */
function applyTranslations(code) {
  const dict = translations[code];
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (dict[key] !== undefined) el.textContent = dict[key];
  });
}

function setLanguage(code, animate = true, save = true) {
  if (!SUPPORTED.includes(code)) code = "ru";
  currentLang = code;
  if (save) storageSet(STORAGE_KEY, code);
  document.documentElement.lang = code;
  document.getElementById("langCurrent").textContent = code.toUpperCase();

  document.querySelectorAll("#langMenu button").forEach(b =>
    b.classList.toggle("is-active", b.dataset.lang === code));

  if (!animate) { applyTranslations(code); refreshTrackInfo(); return; }

  document.body.classList.add("is-fading");
  setTimeout(() => {
    applyTranslations(code);
    refreshTrackInfo();
    document.body.classList.remove("is-fading");
  }, 260);
}

/* ---------- 3. ОВЕРЛЕЙ И ДРОПДАУН ЯЗЫКА ---------- */
const overlay = document.getElementById("langOverlay");
const langSwitchBtn = document.getElementById("langSwitchBtn");
const langMenu = document.getElementById("langMenu");

function hideOverlay() {
  overlay.classList.add("is-hiding");
  setTimeout(() => { overlay.hidden = true; }, 700);
}

overlay.querySelectorAll("[data-lang]").forEach(btn => {
  btn.addEventListener("click", () => {
    setLanguage(btn.dataset.lang, false, true);
    hideOverlay();
    startMusic();
  });
});

function toggleMenu(open) {
  langMenu.hidden = !open;
  langSwitchBtn.setAttribute("aria-expanded", String(open));
}
langSwitchBtn.addEventListener("click", () => toggleMenu(langMenu.hidden));
langMenu.querySelectorAll("[data-lang]").forEach(btn => {
  btn.addEventListener("click", () => { setLanguage(btn.dataset.lang); toggleMenu(false); });
});
document.addEventListener("click", e => {
  if (!document.getElementById("langSwitch").contains(e.target)) toggleMenu(false);
});
document.addEventListener("keydown", e => { if (e.key === "Escape") toggleMenu(false); });

/* ---------- 4. ПЛЕЕР ---------- */
/* Оставлены только рабочие треки: track5, track6, track7.
   Если будешь добавлять новые — допиши строку в массив ниже
   и положи соответствующий mp3 в assets/music/. */
const playlist = [
  { title: "СЕЙЧАС", artist: "NEWLIGHTCHILD", src: "assets/music/track5.mp3" },
  { title: "Толпы",  artist: "Madk1d",        src: "assets/music/track6.mp3" },
  { title: "Улетаю", artist: "Xe1to",         src: "assets/music/track7.mp3" }
];

const audio = new Audio();
audio.volume = 0.3;
audio.preload = "metadata";
let trackIndex = 0;
let trackBroken = false;

const $ = id => document.getElementById(id);
const els = {
  title: $("trackTitle"), artist: $("trackArtist"),
  play: $("btnPlay"), prev: $("btnPrev"), next: $("btnNext"),
  iconPlay: $("iconPlay"), iconPause: $("iconPause"),
  seek: $("seek"), vol: $("volume"),
  cur: $("timeCurrent"), total: $("timeTotal"), hint: $("playerHint")
};

function fmt(sec) {
  if (!isFinite(sec)) return "0:00";
  const m = Math.floor(sec / 60), s = Math.floor(sec % 60);
  return m + ":" + String(s).padStart(2, "0");
}

function refreshTrackInfo() {
  const t = playlist[trackIndex];
  els.title.textContent = trackBroken ? translations[currentLang].no_track : t.title;
  els.artist.textContent = trackBroken ? "" : t.artist;
}

function loadTrack(i) {
  trackIndex = (i + playlist.length) % playlist.length;
  trackBroken = false;
  audio.src = playlist[trackIndex].src;
  els.seek.value = 0;
  els.cur.textContent = "0:00";
  els.total.textContent = "0:00";
  refreshTrackInfo();
}

function setPlayingUI(playing) {
  // ВАЖНО: у SVG нет свойства .hidden, поэтому используем атрибут
  els.iconPlay.toggleAttribute("hidden", playing);
  els.iconPause.toggleAttribute("hidden", !playing);
  els.play.setAttribute("aria-label", playing ? "Pause" : "Play");
}

function playAudio() {
  if (trackBroken) return;
  const p = audio.play();
  if (p && typeof p.then === "function") {
    p.then(() => { els.hint.hidden = true; })
     .catch(() => { els.hint.hidden = false; setPlayingUI(false); });
  }
}

function startMusic() { playAudio(); }

els.play.addEventListener("click", () => {
  if (trackBroken) return;
  audio.paused ? playAudio() : audio.pause();
});
els.next.addEventListener("click", () => { loadTrack(trackIndex + 1); playAudio(); });
els.prev.addEventListener("click", () => {
  if (audio.currentTime > 3) { audio.currentTime = 0; }
  else { loadTrack(trackIndex - 1); playAudio(); }
});

audio.addEventListener("play", () => setPlayingUI(true));
audio.addEventListener("pause", () => setPlayingUI(false));
audio.addEventListener("ended", () => { loadTrack(trackIndex + 1); playAudio(); });
audio.addEventListener("loadedmetadata", () => { els.total.textContent = fmt(audio.duration); });
audio.addEventListener("timeupdate", () => {
  if (audio.duration) els.seek.value = (audio.currentTime / audio.duration) * 100;
  els.cur.textContent = fmt(audio.currentTime);
});
audio.addEventListener("error", () => {
  trackBroken = true;
  refreshTrackInfo();
  setPlayingUI(false);
});

els.seek.addEventListener("input", () => {
  if (audio.duration) audio.currentTime = (els.seek.value / 100) * audio.duration;
});
els.vol.addEventListener("input", () => { audio.volume = parseFloat(els.vol.value); });

/* ---------- 5. АНИМАЦИЯ ПРИ СКРОЛЛЕ ---------- */
function initReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) { items.forEach(i => i.classList.add("is-visible")); return; }
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("is-visible"); obs.unobserve(e.target); }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -60px 0px" });
  items.forEach(i => io.observe(i));
}

/* ---------- 5.1 ФОТО ЛЕСА ---------- */
function initForestPhoto() {
  const forest = document.querySelector(".forest");
  const photo = document.getElementById("forestPhoto");
  const candidates = [
    "assets/forest.jpg", "assets/forest.jpeg", "assets/forest.webp", "assets/forest.png",
    "forest.jpg", "forest.jpeg", "forest.webp", "forest.png"
  ];
  let i = 0;
  const probe = new Image();
  probe.onload = () => {
    photo.style.backgroundImage = `url("${candidates[i]}")`;
    forest.classList.add("has-photo");
  };
  probe.onerror = () => { i++; if (i < candidates.length) probe.src = candidates[i]; };
  probe.src = candidates[0];
}

/* ---------- 5.2 АВАТАРКА ---------- */
function initAvatar() {
  const wrap = document.getElementById("avatar");
  const img = document.getElementById("avatarImg");
  const candidates = ["assets/avatar.jpg", "assets/avatar.jpeg", "assets/avatar.png", "avatar.jpg", "avatar.jpeg", "avatar.png"];
  let i = 0;
  img.addEventListener("load", () => wrap.classList.add("has-img"));
  img.addEventListener("error", () => { i++; if (i < candidates.length) img.src = candidates[i]; });
  img.src = candidates[0];
}

/* ---------- 5.3 СВОРАЧИВАНИЕ ПЛЕЕРА ---------- */
function initPlayerToggle() {
  const player = document.getElementById("player");
  const btn = document.getElementById("btnMini");
  const setMini = mini => {
    player.classList.toggle("player--mini", mini);
    btn.setAttribute("aria-expanded", String(!mini));
    btn.setAttribute("aria-label", mini ? "Expand player" : "Collapse player");
  };
  setMini(window.matchMedia("(max-width: 767px)").matches);
  btn.addEventListener("click", () => setMini(!player.classList.contains("player--mini")));
}

/* ---------- 6. СТАРТ ---------- */
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("year").textContent = new Date().getFullYear();
  loadTrack(0);
  initForestPhoto();
  initAvatar();
  initPlayerToggle();
  initReveal();

  const saved = storageGet(STORAGE_KEY);
  if (saved && SUPPORTED.includes(saved)) {
    // пользователь уже выбирал язык — оверлей не показываем
    setLanguage(saved, false, false);
    startMusic(); // может быть заблокировано — тогда появится подсказка
  } else {
    setLanguage("ru", false, false); // язык по умолчанию, но БЕЗ сохранения
    overlay.hidden = false;
  }
});
