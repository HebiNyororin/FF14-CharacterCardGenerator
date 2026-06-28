// FF14 Character Card Generator - app.js

// --- データベース定義 ---

// データセンターと所属ワールド
const dcData = {
  "Mana": ["Anima", "Asura", "Chocobo", "Hades", "Ixion", "Masamune", "Pandaemonium", "Titan"],
  "Gaia": ["Alexander", "Bahamut", "Durandal", "Fenrir", "Ifrit", "Ridill", "Tiamat", "Ultima"],
  "Elemental": ["Aegis", "Atomos", "Carbuncle", "Garuda", "Gungnir", "Kujata", "Tonberry", "Typhon"],
  "Meteor": ["Belias", "Mandragora", "Ramuh", "Shinryu", "Unicorn", "Valefor", "Yojimbo", "Zeromus"]
};

// ジョブアイコン画像をBase64でプリロードする（html2canvas対応のため）
const jobIconCache = {};
const jobIds = ['pld','war','drk','gnb','drg','rpr','mnk','sam','nin','vpr','brd','mch','dnc','blm','smn','rdm','pct','whm','sch','ast','sge'];

function preloadJobIcons() {
  return Promise.all(jobIds.map(id => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        // Canvasに描画してBase64を取得
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        jobIconCache[id] = canvas.toDataURL('image/png');
        resolve();
      };
      img.onerror = () => {
        jobIconCache[id] = null;
        resolve();
      };
      img.src = `icons/${id}.png`;
    });
  }));
}

// ジョブアイコンimgタグを返す（Base64キャッシュがあれば使用）
function getJobIconImg(jobId, size = 32) {
  const src = jobIconCache[jobId] || `icons/${jobId}.png`;
  return `<img src="${src}" alt="${jobId}" width="${size}" height="${size}" style="display:block; image-rendering: auto;">`;
}

// ジョブとクラスの定義
const jobs = [
  // TANK
  { id: "pld", name: "ナイト", abbr: "PLD", role: "tank", category: "TANK" },
  { id: "war", name: "戦士", abbr: "WAR", role: "tank", category: "TANK" },
  { id: "drk", name: "暗黒騎士", abbr: "DRK", role: "tank", category: "TANK" },
  { id: "gnb", name: "ガンブレイカー", abbr: "GNB", role: "tank", category: "TANK" },
  
  // MELEE DPS
  { id: "drg", name: "竜騎士", abbr: "DRG", role: "melee", category: "MELEE DPS" },
  { id: "rpr", name: "リーパー", abbr: "RPR", role: "melee", category: "MELEE DPS" },
  { id: "mnk", name: "モンク", abbr: "MNK", role: "melee", category: "MELEE DPS" },
  { id: "sam", name: "侍", abbr: "SAM", role: "melee", category: "MELEE DPS" },
  { id: "nin", name: "忍者", abbr: "NIN", role: "melee", category: "MELEE DPS" },
  { id: "vpr", name: "ヴァイパー", abbr: "VPR", role: "melee", category: "MELEE DPS" },

  // PHYSICAL RANGED DPS
  { id: "brd", name: "吟遊詩人", abbr: "BRD", role: "ranged", category: "PHYSICAL RANGED" },
  { id: "mch", name: "機工士", abbr: "MCH", role: "ranged", category: "PHYSICAL RANGED" },
  { id: "dnc", name: "踊り子", abbr: "DNC", role: "ranged", category: "PHYSICAL RANGED" },

  // MAGICAL RANGED DPS
  { id: "blm", name: "黒魔道士", abbr: "BLM", role: "caster", category: "MAGICAL RANGED" },
  { id: "smn", name: "召喚士", abbr: "SMN", role: "caster", category: "MAGICAL RANGED" },
  { id: "rdm", name: "赤魔道士", abbr: "RDM", role: "caster", category: "MAGICAL RANGED" },
  { id: "pct", name: "ピクトマンサー", abbr: "PCT", role: "caster", category: "MAGICAL RANGED" },

  // HEALER
  { id: "whm", name: "白魔道士", abbr: "WHM", role: "healer", category: "HEALER" },
  { id: "sch", name: "学者", abbr: "SCH", role: "healer", category: "HEALER" },
  { id: "ast", name: "占星術師", abbr: "AST", role: "healer", category: "HEALER" },
  { id: "sge", name: "賢者", abbr: "SGE", role: "healer", category: "HEALER" }
];

// Playstyle definitions
const playstyles = [
  { id: "main-scenario",  name: "Main Story" },
  { id: "dungeons",       name: "Dungeons / Trials" },
  { id: "raids",          name: "Savage / Ultimate" },
  { id: "casual",         name: "Casual" },
  { id: "gpose",          name: "GPose / Screenshots" },
  { id: "housing",        name: "Housing" },
  { id: "glamour",        name: "Glamour" },
  { id: "gather-craft",   name: "Gathering / Crafting" },
  { id: "gold-saucer",    name: "Gold Saucer" },
  { id: "roleplay",       name: "Roleplay" },
  { id: "chatting",       name: "Social / Chat" },
  { id: "pvp",            name: "PvP" }
];

// --- 状態管理 ---
let selectedJobs = [];
let mainJobId = null;
let selectedPlaystyles = [];

// 画像のドラッグ & ズーム状態
let imageState = {
  src: "",
  scale: 1.0,
  x: 0,
  y: 0,
  isDragging: false,
  startX: 0,
  startY: 0
};

// --- DOM要素の取得 ---
const selectDc = document.getElementById("select-dc");
const selectWorld = document.getElementById("select-world");
const inputNameJa = document.getElementById("input-name-ja");
const cardNameJa = document.getElementById("card-name-ja-val");
const cardServer = document.getElementById("card-server-val");
const cardJobsList = document.getElementById("card-jobs-list-val");
const cardPlaystylesList = document.getElementById("card-playstyles-list-val");
const jobsContainer = document.getElementById("jobs-container");
const playstylesContainer = document.getElementById("playstyles-container");
const inputImage = document.getElementById("input-image");
const cardImage = document.getElementById("card-image");
const cardImageContainer = document.getElementById("card-image-container");
const imagePlaceholder = document.getElementById("image-placeholder");
const sliderZoom = document.getElementById("slider-zoom");
const btnDownload = document.getElementById("btn-download");
const characterCard = document.getElementById("character-card");
const inputTimeStart = document.getElementById("input-time-start");
const inputTimeEnd = document.getElementById("input-time-end");
const cardTimeDisplay = document.getElementById("card-time-display");

// --- 初期化処理 ---

// アクティブタイムセレクトの初期化
function initTimeSelectors() {
  // 00〜23時のオプションを生成
  for (let h = 0; h < 24; h++) {
    const label = String(h).padStart(2, '0') + ':00';

    const optStart = document.createElement('option');
    optStart.value = h;
    optStart.textContent = label;
    inputTimeStart.appendChild(optStart);

    const optEnd = document.createElement('option');
    optEnd.value = h;
    optEnd.textContent = label;
    inputTimeEnd.appendChild(optEnd);
  }
  // デフォルト: 20:00 〜 24:00 相当 (end=0で翌日0時)
  inputTimeStart.value = 20;
  inputTimeEnd.value = 0;
  updateCardTimeDisplay();
}

function updateCardTimeDisplay() {
  const s = String(inputTimeStart.value).padStart(2, '0') + ':00';
  const e = String(inputTimeEnd.value).padStart(2, '0') + ':00';
  cardTimeDisplay.textContent = `${s} 〜 ${e}`;
}

// DC/サーバープルダウンの初期化
function initServerSelectors() {
  selectDc.innerHTML = "";
  Object.keys(dcData).forEach(dc => {
    const option = document.createElement("option");
    option.value = dc;
    option.textContent = dc;
    selectDc.appendChild(option);
  });

  // 初期値のロード
  updateWorldOptions(selectDc.value);
  updateCardServerDisplay();
}

function updateWorldOptions(dc) {
  selectWorld.innerHTML = "";
  const worlds = dcData[dc] || [];
  worlds.forEach(world => {
    const option = document.createElement("option");
    option.value = world;
    option.textContent = world;
    selectWorld.appendChild(option);
  });
  updateCardServerDisplay();
}

function updateCardServerDisplay() {
  cardServer.textContent = `${selectDc.value} / ${selectWorld.value}`;
}

// ジョブ選択エリアの動的生成
function initJobsSelector() {
  // カテゴリごとに整理
  const categories = {};
  jobs.forEach(job => {
    if (!categories[job.category]) {
      categories[job.category] = [];
    }
    categories[job.category].push(job);
  });

  jobsContainer.innerHTML = "";
  
  Object.keys(categories).forEach(catName => {
    const catTitle = document.createElement("div");
    catTitle.className = "job-category-title";
    catTitle.textContent = catName;
    jobsContainer.appendChild(catTitle);

    const grid = document.createElement("div");
    grid.className = "jobs-grid";

    categories[catName].forEach(job => {
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = `job-check-${job.id}`;
      checkbox.className = "job-checkbox";
      checkbox.value = job.id;

      const label = document.createElement("label");
      label.htmlFor = `job-check-${job.id}`;
      label.className = "job-label";
      
      // アイコンプレースホルダーと名前
      label.innerHTML = `
        <div class="job-icon-placeholder">${getJobIconImg(job.id, 32)}</div>
        <div class="job-name">${job.abbr}</div>
      `;

      checkbox.addEventListener("change", (e) => {
        handleJobSelection(job.id, e.target.checked);
      });

      grid.appendChild(checkbox);
      grid.appendChild(label);
    });

    jobsContainer.appendChild(grid);
  });
}

// プレイスタイル選択エリアの動的生成
function initPlaystylesSelector() {
  playstylesContainer.innerHTML = "";
  playstyles.forEach(style => {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `playstyle-check-${style.id}`;
    checkbox.className = "playstyle-checkbox";
    checkbox.value = style.id;

    const label = document.createElement("label");
    label.htmlFor = `playstyle-check-${style.id}`;
    label.className = "playstyle-label";
    label.textContent = style.name;

    checkbox.addEventListener("change", (e) => {
      handlePlaystyleSelection(style.id, e.target.checked);
    });

    playstylesContainer.appendChild(checkbox);
    playstylesContainer.appendChild(label);
  });
}

// --- イベント処理 ---

// ジョブ選択の制御
function handleJobSelection(jobId, isChecked) {
  if (isChecked) {
    if (!selectedJobs.includes(jobId)) {
      selectedJobs.push(jobId);
    }
    // 最初のジョブを自動的にメインジョブにする
    if (!mainJobId) {
      setMainJob(jobId);
    }
  } else {
    selectedJobs = selectedJobs.filter(id => id !== jobId);
    if (mainJobId === jobId) {
      mainJobId = selectedJobs.length > 0 ? selectedJobs[0] : null;
    }
  }
  updateCardJobsPreview();
  updateJobSelectorUI();
}

function setMainJob(jobId) {
  mainJobId = jobId;
}

// ジョブプレビューの更新
function updateCardJobsPreview() {
  cardJobsList.innerHTML = "";
  
  if (selectedJobs.length === 0) {
    cardJobsList.innerHTML = `<span class="card-playstyle-badge" style="opacity: 0.5;">No jobs selected</span>`;
    return;
  }

  // メインジョブを先頭に、その後ろに他ジョブを並べる
  const orderedJobs = [...selectedJobs].sort((a, b) => {
    if (a === mainJobId) return -1;
    if (b === mainJobId) return 1;
    return 0;
  });

  orderedJobs.forEach(jobId => {
    const job = jobs.find(j => j.id === jobId);
    if (!job) return;

    const badge = document.createElement("div");
    badge.className = `card-job-badge ${jobId === mainJobId ? 'is-main' : ''}`;
    badge.style.cursor = "pointer";
    badge.title = "クリックしてメインジョブに設定";
    
    let badgeContent = `<div class="card-job-badge-icon">${getJobIconImg(job.id, 20)}</div><span>${job.abbr}</span>`;
    
    // メインジョブには王冠または星マークを追加
    if (jobId === mainJobId) {
      badgeContent = `
        <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor" style="color: #fbbf24; margin-right: 2px;">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
        ${badgeContent}
      `;
    }
    
    badge.innerHTML = badgeContent;
    
    // クリックでメインジョブに設定
    badge.addEventListener("click", () => {
      setMainJob(jobId);
      updateCardJobsPreview();
      updateJobSelectorUI();
    });
    
    cardJobsList.appendChild(badge);
  });
}

// 設定パネル側のジョブUIの状態を更新
function updateJobSelectorUI() {
  jobs.forEach(job => {
    const label = document.querySelector(`label[for="job-check-${job.id}"]`);
    if (!label) return;

    // メインジョブは設定パネル上でも識別できるように枠線や星を追加する
    if (job.id === mainJobId) {
      label.style.borderColor = "var(--accent)";
      label.style.background = "rgba(var(--accent-rgb), 0.25)";
      // 王冠などのシンボルを一時的に付与
      if (!label.querySelector('.main-job-star')) {
        const star = document.createElement('span');
        star.className = 'main-job-star';
        star.innerHTML = '★';
        star.style.cssText = "position: absolute; top: 2px; right: 4px; font-size: 8px; color: #fbbf24;";
        label.style.position = "relative";
        label.appendChild(star);
      }
    } else {
      label.style.borderColor = "";
      label.style.background = "";
      const star = label.querySelector('.main-job-star');
      if (star) star.remove();
    }
  });
}

// プレイスタイル選択の制御
function handlePlaystyleSelection(styleId, isChecked) {
  if (isChecked) {
    if (!selectedPlaystyles.includes(styleId)) {
      selectedPlaystyles.push(styleId);
    }
  } else {
    selectedPlaystyles = selectedPlaystyles.filter(id => id !== styleId);
  }
  updateCardPlaystylesPreview();
}

function updateCardPlaystylesPreview() {
  cardPlaystylesList.innerHTML = "";
  
  if (selectedPlaystyles.length === 0) {
    cardPlaystylesList.innerHTML = `<span class="card-playstyle-badge" style="opacity: 0.5;">Not set</span>`;
    return;
  }

  selectedPlaystyles.forEach(styleId => {
    const style = playstyles.find(p => p.id === styleId);
    if (!style) return;

    const badge = document.createElement("div");
    badge.className = "card-playstyle-badge";
    badge.textContent = style.name;
    cardPlaystylesList.appendChild(badge);
  });
}

// --- 画像アップロードとドラッグ＆ズーム ---

function applyImageTransform() {
  cardImage.style.transform = `translate(${imageState.x}px, ${imageState.y}px) scale(${imageState.scale})`;
}

// 画像の読み込み
inputImage.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    imageState.src = event.target.result;
    cardImage.src = event.target.result;
    cardImage.style.display = "block";
    imagePlaceholder.style.display = "none";
    
    // 画像がロードされたら初期位置にリセット
    cardImage.onload = () => {
      resetImagePosition();
    };
  };
  reader.readAsDataURL(file);
});

function resetImagePosition() {
  // コンテナと画像のサイズから適切な初期スケール・位置を計算
  const containerWidth = cardImageContainer.clientWidth;
  const containerHeight = cardImageContainer.clientHeight;
  const imgWidth = cardImage.naturalWidth;
  const imgHeight = cardImage.naturalHeight;

  // コンテナ全体をカバーするように拡大
  const scaleX = containerWidth / imgWidth;
  const scaleY = containerHeight / imgHeight;
  const initialScale = Math.max(scaleX, scaleY);

  imageState.scale = Math.round(initialScale * 10) / 10;
  imageState.x = (containerWidth - imgWidth * imageState.scale) / 2;
  imageState.y = (containerHeight - imgHeight * imageState.scale) / 2;
  
  sliderZoom.value = imageState.scale;
  applyImageTransform();
}

// スライダーによるズーム
sliderZoom.addEventListener("input", (e) => {
  if (!imageState.src) return;
  imageState.scale = parseFloat(e.target.value);
  applyImageTransform();
});

// マウス/タッチドラッグ操作
function startDrag(e) {
  if (!imageState.src) return;
  imageState.isDragging = true;
  
  const clientX = e.touches ? e.touches[0].clientX : e.clientX;
  const clientY = e.touches ? e.touches[0].clientY : e.clientY;
  
  imageState.startX = clientX - imageState.x;
  imageState.startY = clientY - imageState.y;
}

function doDrag(e) {
  if (!imageState.isDragging) return;
  e.preventDefault();

  const clientX = e.touches ? e.touches[0].clientX : e.clientX;
  const clientY = e.touches ? e.touches[0].clientY : e.clientY;

  imageState.x = clientX - imageState.startX;
  imageState.y = clientY - imageState.startY;

  applyImageTransform();
}

function endDrag() {
  imageState.isDragging = false;
}

// マウスイベント登録
cardImageContainer.addEventListener("mousedown", startDrag);
window.addEventListener("mousemove", doDrag);
window.addEventListener("mouseup", endDrag);

// タッチイベント登録(モバイル対応)
cardImageContainer.addEventListener("touchstart", startDrag, { passive: false });
window.addEventListener("touchmove", doDrag, { passive: false });
window.addEventListener("touchend", endDrag);

// スクロールホイールでの拡大縮小サポート
cardImageContainer.addEventListener("wheel", (e) => {
  if (!imageState.src) return;
  e.preventDefault();
  
  const zoomStep = 0.05;
  if (e.deltaY < 0) {
    imageState.scale = Math.min(imageState.scale + zoomStep, 3.0);
  } else {
    imageState.scale = Math.max(imageState.scale - zoomStep, 0.1);
  }
  
  sliderZoom.value = imageState.scale;
  applyImageTransform();
}, { passive: false });


// --- テキスト入力同期 ---
inputNameJa.addEventListener("input", (e) => {
  cardNameJa.textContent = e.target.value || "Name";
});

selectDc.addEventListener("change", (e) => {
  updateWorldOptions(e.target.value);
});

selectWorld.addEventListener("change", () => {
  updateCardServerDisplay();
});

inputTimeStart.addEventListener("change", updateCardTimeDisplay);
inputTimeEnd.addEventListener("change", updateCardTimeDisplay);


// --- Theme, Decoration & Font Changes ---
document.querySelectorAll('input[name="theme"]').forEach(radio => {
  radio.addEventListener("change", (e) => {
    characterCard.className = characterCard.className.replace(/\btheme-\w+/g, "");
    characterCard.classList.add(e.target.value);
  });
});

document.querySelectorAll('input[name="decoration"]').forEach(radio => {
  radio.addEventListener("change", (e) => {
    characterCard.className = characterCard.className.replace(/\bdeco-[\w-]+/g, "");
    // Remove any existing frame overlay
    const existingOverlay = characterCard.querySelector('.deco-frame-overlay');
    if (existingOverlay) existingOverlay.remove();

    if (e.target.value) {
      characterCard.classList.add(e.target.value);

      // If Gothic Lace, add frame image overlay
      if (e.target.value.startsWith('deco-gothic-lace')) {
        const frameImg = document.createElement('img');
        frameImg.src = `assets/frame-${e.target.value}.png`;
        frameImg.className = 'deco-frame-overlay';
        frameImg.alt = '';
        frameImg.draggable = false;
        characterCard.appendChild(frameImg);
      }
    }
  });
});

document.querySelectorAll('input[name="font"]').forEach(radio => {
  radio.addEventListener("change", (e) => {
    characterCard.className = characterCard.className.replace(/\bfont-[\w-]+/g, "");
    characterCard.classList.add(e.target.value);
  });
});

document.querySelectorAll('input[name="layout"]').forEach(radio => {
  radio.addEventListener("change", (e) => {
    if (e.target.value === "layout-left") {
      characterCard.classList.add("layout-left");
    } else {
      characterCard.classList.remove("layout-left");
    }
  });
});


// --- カード画像生成 & ダウンロード (html2canvas) ---
btnDownload.addEventListener("click", () => {
  // ダウンロード中アニメーション/テキスト変更などのUIフィードバック
  const originalBtnText = btnDownload.innerHTML;
  btnDownload.disabled = true;
  btnDownload.innerHTML = `
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" class="loading-spin" style="animation: spin 1s linear infinite; margin-right: 8px;">
      <path d="M12 4V2C6.48 2 2 6.48 2 12h2c0-4.41 3.59-8 8-8zm0 14c4.41 0 8-3.59 8-8h2c0 5.52-4.48 10-10 10v-2z"/>
    </svg>
    Generating image...
  `;

  // スピン用スタイルの一時付与
  if (!document.getElementById("spin-style")) {
    const style = document.createElement("style");
    style.id = "spin-style";
    style.textContent = "@keyframes spin { 100% { transform: rotate(360deg); } }";
    document.head.appendChild(style);
  }

  // フォントの読み込み完了を待ってからレンダリングする
  document.fonts.ready.then(() => {
    // html2canvasを実行する
    // scale: 2.5 に設定し、よりシャープでSNSシェア等に最適な高画質画像を作成
    html2canvas(characterCard, {
      scale: 2.5,
      useCORS: true,
      allowTaint: true,
      backgroundColor: null,
      logging: false
    }).then(canvas => {
      // 画像のダウンロード
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      
      // キャラクター名をファイル名に組み込む
      const charName = inputNameJa.value.trim() || "ff14-character";
      link.download = `${charName}_card.png`;
      link.href = dataUrl;
      link.click();

      // ボタンのテキストと状態を戻す
      btnDownload.disabled = false;
      btnDownload.innerHTML = originalBtnText;
    }).catch(err => {
      console.error("Card generation failed:", err);
      alert("画像の生成に失敗しました。時間をおいて再度お試しください。");
      btnDownload.disabled = false;
      btnDownload.innerHTML = originalBtnText;
    });
  });
});


// --- アプリ初期ロード時の処理 ---
window.addEventListener("DOMContentLoaded", () => {
  // ジョブアイコンをBase64でプリロードしてからUIを初期化
  preloadJobIcons().then(() => {
    initServerSelectors();
    initJobsSelector();
    initPlaystylesSelector();
    initTimeSelectors();

    // テキストの初期値反映
    cardNameJa.textContent = inputNameJa.value;
  });
});
