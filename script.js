let playerName = '';
let selectedGender = '';
let currentLevel = 7;
let totalTime = 300;
let timerInterval = null;
let countdownPlayed = false;


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
};

function startGame(gender) {
  const nameInput = document.getElementById("player-name")
  playerName = nameInput.value.trim();

  if (!playerName) {
    nameInput.classList.add("input-error", "shake")
    sounds.nameError.play()
    setTimeout(() => nameInput.classList.remove("shake"), 500)
    return
  }

  nameInput.classList.remove("input-error")
  selectedGender = gender
  const avatar = document.getElementById("player-avatar")
  avatar.src = gender === 'female'
    ? 'assets/avatars/Female_Levels_NoBackground.svg'
    : 'assets/avatars/Male_Levels_NoBackground.svg'

  document.getElementById("home-screen").classList.add("hidden")
  document.getElementById("level-screen").classList.remove("hidden")
  document.getElementById("instructions").classList.add("hidden")
  document.getElementById("win-screen").classList.add("hidden")

  setupLevel(currentLevel)
  startTimer();
  sounds.newGame.play()
  sounds.ticking.loop = true
  sounds.ticking.play()
}

function setupLevel(levelNumber) {
  const levelTitle = document.getElementById("level-title")
  const levelBg = document.getElementById("level-bg")

  const levelData = {
    1: { name: "Level 1: Construction Site", image: "assets/backgrounds/ConstructionSite_Background.png" },
    2: { name: "Level 2: Chemical Lab", image: "assets/backgrounds/ChemicalLab_Background.png" },
    3: { name: "Level 3: Oil Refinery Site", image: "assets/backgrounds/OilRefinary_Background.png" },
    4: { name: "Level 4: Cold Storage", image: "assets/backgrounds/ColdStorage_Background.png" },
    5: { name: "Level 5: Factory", image: "assets/backgrounds/Factory_Background.png" },
    6: { name: "Level 6: Underground Tunnel", image: "assets/backgrounds/Undergroundtunnel_Background.png" },
    7: { name: "Level 7: High Voltage Electrical Room", image: "assets/backgrounds/ElectricalRoom_Background.png" }
  };

  levelTitle.textContent = levelData[levelNumber].name
  levelBg.src = levelData[levelNumber].image
  loadPPEOptions(levelNumber)

  const avatar = document.getElementById("player-avatar")
  const avatarPosition = {
    1: { bottom: '10%', left: '50%' },
    2: { bottom: '0.5%', left: '50%' },
    3: { bottom: '6%', left: '50%' },
    4: { bottom: '6%', left: '50%' },
    5: { bottom: '7%', left: '50%' },
    6: { bottom: '9%', left: '50%' },
    7: { bottom: '4%', left: '45%' }
  };

  const avatarSize = {
    1: '50%',
    2: '80%',
    3: '50%',
    4: '50%',
    5: '50%',
    6: '50%',
    7: '50%'
  }

  const isMobile = window.innerWidth <= 600
  avatar.style.height = isMobile ? '18%' : avatarSize[levelNumber]

  const pos = avatarPosition[levelNumber]
  avatar.style.bottom = pos.bottom
  avatar.style.left = pos.left
  avatar.style.transform = 'translateX(-50%)'
  avatar.style.width = 'auto'
  updateProgressBar(levelNumber)

}

function startTimer() {
  clearInterval(timerInterval)
  countdownPlayed = false

  const timerDisplay = document.getElementById("timer")

  timerInterval = setInterval(() => {
    if (totalTime <= 0) {
      clearInterval(timerInterval);
      sounds.ticking.pause();
      sounds.ticking.currentTime = 0
      showTimeoutScreen();
      return;
    }

    if (totalTime === 10 && !countdownPlayed) {
      sounds.countdown.play()
      countdownPlayed = true
    }

    totalTime--;
    const minutes = Math.floor(totalTime / 60)
    let seconds = totalTime % 60;
    if (seconds < 10) seconds = "0" + seconds

    timerDisplay.textContent = `Time Left: ${minutes}:${seconds}`
  }, 1000)
}

function showCertificate() {
  document.getElementById("level-screen").classList.add("hidden")
  document.getElementById("win-screen").classList.remove("hidden")
  document.getElementById("certificate-name").textContent = `Awarded to: ${playerName}`
  document.getElementById("certificate-date").textContent = new Date().toLocaleDateString()

  sounds.ticking.pause()
  sounds.ticking.currentTime = 0
  sounds.gameWon.play()
}

const levelPPE = {
  1: ["hard-hat", "hi-vis-vest", "steel-boots", "safety-gloves", "safety-goggles"],
  2: ["lab-coat", "face-mask", "safety-goggles", "safety-gloves", "steel-boots"],
  3: ["fire-proof-vest", "face-mask", "safety-goggles", "safety-gloves", "steel-boots", "ear-muffs"],
  4: ["thermal-suit", "face-shield", "safety-goggles", "safety-gloves", "steel-boots"],
  5: ["fire-proof-vest", "face-mask", "safety-gloves", "safety-goggles", "steel-boots"],
  6: ["fire-proof-vest", "face-mask", "safety-goggles", "safety-gloves", "hat-light", "steel-boots"],
  7: ["arc-suit", "face-mask", "safety-goggles", "safety-gloves", "steel-boots"]
};

function loadPPEOptions(level) {
  const inventory = document.getElementById("ppe-inventory");
  inventory.innerHTML = "";

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
  ];

  allPPE.forEach(item => {
    const img = document.createElement("img");
    img.src = item.src;
    img.alt = item.label;
    img.classList.add("ppe-item");
    img.dataset.ppeId = item.id;

    img.addEventListener("click", () => {
      img.classList.toggle("selected");
      sounds.selection.play();
    });

    inventory.appendChild(img);
  });
}

function submitPPE() {
  const selected = Array.from(document.querySelectorAll(".ppe-item.selected"))
    .map(img => img.dataset.ppeId)
    .sort();

  const required = (levelPPE[currentLevel] || []).slice().sort();

  const isCorrect = selected.length === required.length &&
                    selected.every((item, index) => item === required[index]);

  if (isCorrect) {
    currentLevel++;
    totalTime -= 30;
    sounds.score.play();

    if (currentLevel > 7) {
      showCertificate();
    } else {
      setupLevel(currentLevel);
    }
  } else {
    sounds.wrongPPE.play();
    showHazardScreen();
    setTimeout(restartGame, 2500);
  }
}

function showHazardScreen() {
  const levelImages = {
    1: "ConstructionSite_Hazard.png",
    2: "ChemicalLab_Hazard.png",
    3: "OilRefinary_Hazard.png",
    4: "ColdStorage_Hazard.png",
    5: "Factory_Hazard.png",
    6: "UndergroundTunnel_Hazard.png",
    7: "ElectricalRoom_Hazard.png"
  };

  const hazardImg = document.getElementById("hazard-img");
  hazardImg.src = `assets/hazards/${levelImages[currentLevel]}`;  // ✔️ Direct file path

  document.getElementById("level-screen").classList.add("hidden");
  document.getElementById("hazard-screen").classList.remove("hidden");
  sounds.lostGame.play();
}


function showTimeoutScreen() {
  document.getElementById("level-screen").classList.add("hidden");
  document.getElementById("timeout-screen").classList.remove("hidden");
  sounds.lostGame.play();
}

function restartGame() {
  currentLevel = 1;
  totalTime = 300;
  countdownPlayed = false;
  clearInterval(timerInterval);
  sounds.ticking.pause();
  sounds.ticking.currentTime = 0;
  sounds.newGame.play();

  document.getElementById("hazard-screen").classList.add("hidden");
  document.getElementById("timeout-screen").classList.add("hidden");
  document.getElementById("win-screen").classList.add("hidden");
  document.getElementById("home-screen").classList.remove("hidden");
}

function updateProgressBar(levelNumber) {
  const bar = document.getElementById("progress-bar");
  const percentage = ((levelNumber - 1) / 7) * 100;
  bar.style.width = `${percentage}%`;
}

