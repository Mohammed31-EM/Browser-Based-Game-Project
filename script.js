let playerName = ''
let selectedGender = ''
let currentLevel = 1
let totalTime = 300 //5 minutes to seconds

function startGame(gender) {
  const nameInput = document.getElementById("player-name")
  playerName = nameInput.value.trim()

if (!playerName) {
    
    nameInput.classList.add("input-error")

    
    nameInput.classList.add("shake")
    setTimeout(() => nameInput.classList.remove("shake"), 500)

    return
  }

  // Remove error state if previously shown
  nameInput.classList.remove("input-error")
  selectedGender = gender;

  // Hide home screen, show level screen
  document.getElementById("home-screen").classList.add("hidden")
  document.getElementById("level-screen").classList.remove("hidden")
  document.getElementById("instructions").classList.add("hidden")
  document.getElementById("win-screen").classList.add("hiddden")
  // Set up level 1
  setupLevel(currentLevel)

  // Start timer
  startTimer()
}

function setupLevel(levelNumber) {
  const levelTitle = document.getElementById("level-title")
  const levelBg = document.getElementById("level-bg")


  const levelData = {
    1: {
        name: "Level 1: Construction Site",
        image: "assets/backgrounds/ConstructionSite_Background.png"
    },
    2: {
         name: "Level 2: Chemical Lab",
        image: "assets/backgrounds/ChemicalLab_Background.png"
    },
    3: {
        name: "Level 3: Oil refinary site",
        image: "assets/backgrounds/OilRefinary_Background.png"
    },
    4: {
        name:"Level 4: Cold Storage",
        image:"assets/backgrounds/ColdStorage_Background.png"
    },
    5: {
        name:"Level 5: Factory",
        image:"assets/backgrounds/Factory_Background.png"
    },
    6: {
        name:"Level 6: Underground Tunnel",
        image:"assets/backgrounds/Undergroundtunnel_Background.png"
    },
    7: {
        name:"Level 7: High Voltage Elecrical Room",
        image:"assets/backgrounds/ElectricalRoom_Background.png"
    }


};

  levelTitle.textContent = levelData[levelNumber].name
  levelBg.src = levelData[levelNumber].image
  loadPPEOptions(levelNumber);
  // (Later: Dynamically load PPE options here too)
}

function startTimer() {
  let timerDisplay = document.getElementById("timer")

  let interval = setInterval(function () {

    if (totalTime <= 0) {
      clearInterval(interval)
      showTimeoutScreen()
      return
    }

    totalTime = totalTime - 1

    let minutes = Math.floor(totalTime / 60)
    let seconds = totalTime % 60

    if (seconds < 10) {
      seconds += "0" 
    }

    timerDisplay.textContent = "Time Left: " + minutes + ":" + seconds

  }, 1000)
}

function showCertificate() {
  document.getElementById("level-screen").classList.add("hidden");
  document.getElementById("win-screen").classList.remove("hidden");
  document.getElementById("certificate-name").textContent = `Awarded to: ${playerName}`
}


function showCertificate() {
  document.getElementById("level-screen").classList.add("hidden")
  document.getElementById("win-screen").classList.remove("hidden")

  
  document.getElementById("certificate-name").textContent = playerName
  const today = new Date().toLocaleDateString()
  document.getElementById("certificate-date").textContent = today
}

window.onload = function () {
  playerName = "Mohammed"; // Simulated player name
  showCertificate();         
};

const levelPPE = {
  1: ["hard-hat", "steel-boots", "hi-vis-vest", "safety-gloves", "safety-goggles"]
  // Add others later
};

function loadPPEOptions(level) {
  const inventory = document.getElementById("ppe-inventory");
  inventory.innerHTML = ""; // Clear previous

  const allPPE = [
    { id: "hard-hat", src: "assets/ppe/ConstructionSite/HardHelmet_ConstructionSite.svg", label: "Hard Hat" },
    { id: "steel-boots", src: "assets/ppe/ConstructionSite/SafetyBoot_ConstructionSite.svg", label: "Steel-Toe Boots" },
    { id: "hi-vis-vest", src: "assets/ppe/ConstructionSite/SafetyVest_ConstructionSite.svg", label: "Hi-Vis Vest" },
    { id: "safety-gloves", src: "assets/ppe/safety-gloves.svg", label: "Safety Gloves" },
    { id: "safety-goggles", src: "assets/ppe/ConstructionSite/SafetyGoggles_ConstructionSite.svg", label: "Safety Goggles" },
    // Future: add other level PPE here
  ];

  allPPE.forEach(item => {
    const img = document.createElement("img");
    img.src = item.src;
    img.alt = item.label;
    img.classList.add("ppe-item");
    img.dataset.ppeId = item.id;

    img.addEventListener("click", () => {
      img.classList.toggle("selected");
    });

    inventory.appendChild(img);
  });
}

function submitPPE() {
  const selected = Array.from(document.querySelectorAll(".ppe-item.selected"))
    .map(img => img.dataset.ppeId);

  const required = levelPPE[currentLevel];

  const isCorrect = required.every(item => selected.includes(item)) && selected.length === required.length;

  if (isCorrect) {
    // Advance to next level or win
    currentLevel++;
    totalTime -= 30;

    if (currentLevel > 7) {
      showWinScreen();
    } else {
      setupLevel(currentLevel);
    }
  } else {
    showHazardScreen();
    setTimeout(() => {
      restartGame();
    }, 2500);
  }
}
