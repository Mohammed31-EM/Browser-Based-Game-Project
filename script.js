//--------------------Constants-----------------------
const levelData = {
  1: { name: "Level 1: Construction Site", image: "assets/backgrounds/ConstructionSite_Background.png" },
  2: { name: "Level 2: Chemical Lab", image: "assets/backgrounds/ChemicalLab_Background.png" },
  3: { name: "Level 3: Oil Refinery Site", image: "assets/backgrounds/OilRefinary_Background.png" },
  4: { name: "Level 4: Cold Storage", image: "assets/backgrounds/ColdStorage_Background.png" },
  5: { name: "Level 5: Factory", image: "assets/backgrounds/Factory_Background.png" },
  6: { name: "Level 6: Underground Tunnel", image: "assets/backgrounds/Undergroundtunnel_Background.png" },
  7: { name: "Level 7: High Voltage Electrical Room", image: "assets/backgrounds/ElectricalRoom_Background.png" }
}
const allPPE = [
  { id: "hard-hat", src: "assets/ppe/ConstructionSite/HardHelmet_ConstructionSite.svg", label: "Hard Hat" },
  { id: "steel-boots", src: "assets/ppe/ConstructionSite/SafetyBoot_ConstructionSite.svg", label: "Steel-Toe Boots" },
  { id: "hi-vis-vest", src: "assets/ppe/ConstructionSite/SafetyVest_ConstructionSite.svg", label: "Hi-Vis Vest" },
  { id: "safety-gloves", src: "assets/ppe/ConstructionSite/SafetyGloves_ConstructionSite.svg", label: "Safety Gloves" },
  { id: "safety-goggles", src: "assets/ppe/ConstructionSite/SafetyGoggles_ConstructionSite.svg", label: "Safety Goggles" },
  { id: "fire-proof-vest", src: "assets/ppe/OilRefinary/FireSuit_OilRefinary.svg", label: "FireProof Vest" },
  { id: "ear-muffs", src: "assets/ppe/OilRefinary/EarMuffs_OilRefinary.svg", label: "Ear Muffs" },
  { id: "face-mask", src: "assets/ppe/ChemicalLab/Facemask_ChemicalLab.svg", label: "Face Mask" },
  { id: "lab-coat", src: "assets/ppe/ChemicalLab/LabCoat_ChemicalLab.svg", label: "Lab Coat" },
  { id: "face-shield", src: "assets/ppe/ColdStorage/FaceShield_ColdStorage.svg", label: "Face Shield" },
  { id: "hat-light", src: "assets/ppe/UndergroundTunnel/HardHatLight_UndergroundTunnel.svg", label: "Hard Hat Light" },
  { id: "thermal-suit", src: "assets/ppe/ColdStorage/ThermalSuit_ColdStorage.svg", label: "Thermal Suit" },
  { id: "arc-suit", src: "assets/ppe/ElectricalRoom/ArcFlashSuit_ElectricalRoom.svg", label: "Arc Suit" }
]
const levelPPE = {
  1: ["hard-hat", "hi-vis-vest", "steel-boots", "safety-gloves", "safety-goggles"],
  2: ["lab-coat", "face-mask", "safety-goggles", "safety-gloves", "steel-boots"],
  3: ["fire-proof-vest", "face-mask", "safety-goggles", "safety-gloves", "steel-boots", "ear-muffs"],
  4: ["thermal-suit", "face-shield", "safety-goggles", "safety-gloves", "steel-boots"],
  5: ["fire-proof-vest", "face-mask", "safety-goggles", "safety-gloves", "steel-boots"],
  6: ["fire-proof-vest", "face-mask", "safety-goggles", "safety-gloves", "hat-light", "steel-boots"],
  7: ["arc-suit", "face-mask", "safety-goggles", "safety-gloves", "steel-boots"]
}
const levelImages = {
  1: "ConstructionSite_Hazard.png",
  2: "ChemicalLab_Hazard.png",
  3: "OilRefinary_Hazard.png",
  4: "ColdStorage_Hazard.png",
  5: "Factory_Hazard.png",
  6: "UndergroundTunnel_Hazard.png",
  7: "ElectricalRoom_Hazard.png"
}
const sounds = {
  selection: new Audio('assets/sounds/selection_sound.ogg'),
  lostGame: new Audio('assets/sounds/lost_game.ogg'),
  wrongPPE: new Audio('assets/sounds/wrongPPE.ogg'),
  nameError: new Audio('assets/sounds/Enter_name_error.ogg'),
  newGame: new Audio('assets/sounds/new_game.ogg'),
  click: new Audio('assets/sounds/Clicking_sound_1.ogg'),
  ticking: new Audio('assets/sounds/clock-ticking.ogg'),
  gameWon: new Audio('assets/sounds/game won.ogg'),
  countdown: new Audio('assets/sounds/countdowntimer.ogg'),
  score: new Audio('assets/sounds/score added.ogg')
}
const avatarPosition = {
  1:{bottom:'10%',left:'50%'},
  2:{bottom:'0.5%',left:'50%'},
  3:{bottom:'6%',left:'50%'},
  4:{bottom:'6%',left:'50%'},
  5:{bottom:'7%',left:'50%'},
  6:{bottom:'9%',left:'50%'},
  7:{bottom:'4%',left:'45%'}
}
const avatarSize = {
  1:'50%',
  2:'80%',
  3:'50%',
  4:'50%',
  5:'50%',
  6:'50%',
  7:'50%'
}

//--------------------Variables-----------------------
let playerName = ''
let selectedGender = ''
let currentLevel = 1
let totalTime = 300
let timerInterval
let countdownPlayed = false
let hintUsed = false

//--------------------Functions-----------------------
function startGame(gender) {
  const nameEl = document.getElementById("player-name")
  playerName = nameEl.value.trim()
  if (!playerName) {
    nameEl.classList.add("input-error", "shake")
    sounds.nameError.play()
    setTimeout(() => nameEl.classList.remove("shake"), 500)
    return
  }
  nameEl.classList.remove("input-error")

  selectedGender = gender
  document.getElementById("player-avatar").src = gender === "female"
    ? "assets/avatars/Female_Levels_NoBackground.svg"
    : "assets/avatars/Male_Levels_NoBackground.svg";

  ["home-screen", "instructions"].forEach(id => {
    const el = document.getElementById(id)
    if (el) el.classList.add("hidden")
  })
  document.getElementById("level-screen").classList.remove("hidden");

  hintUsed = false;
  currentLevel = 1;
  totalTime = 300;
  setupLevel(currentLevel);
  startTimer();

  sounds.newGame.play();
  sounds.ticking.loop = true;
  sounds.ticking.play();
}

function setupLevel(levelNum) {
  hintUsed = false;
  const hintBtn = document.getElementById("hint-button");
  if (hintBtn) hintBtn.disabled = false;

  document.getElementById("hint-text").classList.add("hidden");
  document.querySelectorAll(".ppe-item.hinted").forEach(e => e.classList.remove("hinted"));

  const { name, image } = levelData[levelNum];
  document.getElementById("level-title").textContent = name;
  document.getElementById("level-bg").src = image;

  const avatar = document.getElementById("player-avatar");
  const mobile = window.innerWidth <= 600;
  avatar.style.height = mobile ? "18%" : avatarSize[levelNum];
  avatar.style.bottom = avatarPosition[levelNum].bottom;
  avatar.style.left = avatarPosition[levelNum].left;

  updateProgressBar(levelNum);
  loadPPEOptions(levelNum);
}

function showHint() {
  if (hintUsed) return;
  hintUsed = true;
  const hintBtn = document.getElementById("hint-button");
  const hintText = document.getElementById("hint-text");
  hintBtn.disabled = true;

  document.querySelectorAll(".ppe-item.hinted").forEach(el => el.classList.remove("hinted"));

  const required = levelPPE[currentLevel];
  // Only choose unselected required PPE
  const unselected = required.filter(id => {
    const el = document.querySelector(`.ppe-item[data-ppe-id="${id}"]`);
    return el && !el.classList.contains("selected");
  });

  if (unselected.length === 0) {
    hintText.textContent = "All required gear already selected!";
    hintText.classList.remove("hidden");
    return;
  }

  const hintId = unselected[Math.floor(Math.random() * unselected.length)];
  const el = document.querySelector(`.ppe-item[data-ppe-id="${hintId}"]`);
  if (el) el.classList.add("hinted");

  hintText.textContent = "Hint: Look for the highlighted item above!";
  hintText.classList.remove("hidden");
}

function loadPPEOptions(level) {
  const inv = document.getElementById("ppe-inventory");
  inv.innerHTML = "";
  allPPE.forEach(item => {
    const w = document.createElement("div");
    w.className = "ppe-wrapper";
    const img = document.createElement("img");
    img.src = item.src;
    img.alt = item.label;
    img.className = "ppe-item";
    img.dataset.ppeId = item.id;

    img.addEventListener("click", () => {
      img.classList.toggle("selected");
      sounds.selection.play();
    });

    const lbl = document.createElement("div");
    lbl.className = "ppe-label";
    lbl.textContent = item.label;

    w.appendChild(img);
    w.appendChild(lbl);
    inv.appendChild(w);
  });
}

function startTimer() {
  clearInterval(timerInterval);
  countdownPlayed = false;
  totalTime = totalTime || 300;
  document.getElementById("timer").textContent = "Time Left: 5:00";
  timerInterval = setInterval(() => {
    if (totalTime <= 0) {
      clearInterval(timerInterval);
      sounds.ticking.pause();
      sounds.ticking.currentTime = 0;
      if (document.getElementById("win-screen").classList.contains("hidden")) showTimeoutScreen();
      return;
    }
    if (totalTime === 10 && !countdownPlayed) {
      sounds.countdown.play();
      countdownPlayed = true;
    }
    totalTime--;
    const min = Math.floor(totalTime / 60);
    let sec = totalTime % 60;
    if (sec < 10) sec = "0" + sec;
    document.getElementById("timer").textContent = `Time Left: ${min}:${sec}`;
  }, 1000);
}

function submitPPE() {
  const selected = Array.from(document.querySelectorAll(".ppe-item.selected"))
    .map(el => el.dataset.ppeId)
    .sort();
  const required = levelPPE[currentLevel].slice().sort()
  const correct = selected.length === required.length &&
    selected.every((v, i) => v === required[i])

  if (correct) {
    currentLevel++
    totalTime -= 30
    sounds.score.play()
    currentLevel > 7 ? showCertificate() : setupLevel(currentLevel);
  } else {
    sounds.wrongPPE.play()
    showHazardScreen()
    setTimeout(restartGame, 2500)
  }
}

function showHazardScreen() {
  document.getElementById("hazard-img").src = `assets/hazards/${levelImages[currentLevel]}`
  document.getElementById("level-screen").classList.add("hidden")
  document.getElementById("hazard-screen").classList.remove("hidden")
}

function showTimeoutScreen() {
  document.getElementById("level-screen").classList.add("hidden")
  document.getElementById("timeout-screen").classList.remove("hidden")
  sounds.lostGame.play();
}

function showCertificate() {
  document.getElementById("level-screen").classList.add("hidden")
  document.getElementById("win-screen").classList.remove("hidden")
  document.getElementById("certificate-name").textContent = `Awarded to: ${playerName}`
  document.getElementById("certificate-date").textContent = new Date().toLocaleDateString()
  sounds.gameWon.play();
}

function restartGame() {
  currentLevel = 1
  totalTime = 300
  countdownPlayed = false
  clearInterval(timerInterval)
  sounds.ticking.pause()
  sounds.ticking.currentTime = 0
  sounds.newGame.play()
  ["hazard-screen", "timeout-screen", "win-screen"].forEach(id => {
    document.getElementById(id).classList.add("hidden");
  });
  document.getElementById("home-screen").classList.remove("hidden");
}

function updateProgressBar(level) {
  const bar = document.getElementById("progress-bar")
  bar.style.width = `${((level - 1) / 7) * 100}%`
}

//--------------------Event Listeners-----------------------
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("hint-button").addEventListener("click", showHint)
  document.getElementById("submit-ppe").addEventListener("click", submitPPE)
  document.getElementById("restart-hazard").addEventListener("click", restartGame)
  document.getElementById("restart-timeout").addEventListener("click", restartGame)
  document.getElementById("restart-win").addEventListener("click", restartGame)
  document.getElementById("print-button").addEventListener("click", () => window.print())
  document.getElementById("female-character").addEventListener("click", () => startGame("female"))
  document.getElementById("male-character").addEventListener("click", () => startGame("male"))
})
