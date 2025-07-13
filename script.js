let playerName = ''
let selectedGender = ''
let currentLevel = 1
let totalTime = 300 

function startGame(gender) {
  const nameInput = document.getElementById("player-name")
  playerName = nameInput.value.trim()

if (!playerName) {
    
    nameInput.classList.add("input-error")

    
    nameInput.classList.add("shake")
    setTimeout(() => nameInput.classList.remove("shake"), 500)

    return
  }

  nameInput.classList.remove("input-error")
  selectedGender = gender;

  document.getElementById("home-screen").classList.add("hidden")
  document.getElementById("level-screen").classList.remove("hidden")
  document.getElementById("instructions").classList.add("hidden")
  document.getElementById("win-screen").classList.add("hiddden")
  
  setupLevel(currentLevel)

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
  loadPPEOptions(levelNumber)
  
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


const levelPPE = {
  1: ["hard-hat", "steel-boots", "hi-vis-vest", "safety-gloves", "safety-goggles"],
  2: ["face-mask", "lab-coat", "safety-goggles", "steel-boots"],
  3: ["face-mask", "fire-proof-vest", "safety-googles", "safety-gloves","safety-boots"],
  4: ["face-shield", "thermal-suit", "safety-googles", "safety-gloves",],
  5: ["face-mask", "fire-proof-vest", "safety-googles", "safety-gloves"],
  6: ["face-mask", "fire-proof-vest", "safety-googles", "safety-gloves"],
  7: ["face-mask", "fire-proof-vest", "safety-googles", "safety-gloves"]
};

function loadPPEOptions(level) {
  const inventory = document.getElementById("ppe-inventory")
  inventory.innerHTML = "" 

  const allPPE = [
    { id: "hard-hat", src: "assets/ppe/ConstructionSite/HardHelmet_ConstructionSite.svg", label: "Hard Hat" },
    { id: "steel-boots", src: "assets/ppe/ConstructionSite/SafetyBoot_ConstructionSite.svg", label: "Steel-Toe Boots" },
    { id: "hi-vis-vest", src: "assets/ppe/ConstructionSite/SafetyVest_ConstructionSite.svg", label: "Hi-Vis Vest" },
    { id: "safety-gloves", src: "assets/ppe/safety-gloves.svg", label: "Safety Gloves" },
    { id: "safety-goggles", src: "assets/ppe/ConstructionSite/SafetyGoggles_ConstructionSite.svg", label: "Safety Goggles" },
    { id: "fire-proof-vest", src: "assets/ppe/OilRefinary/FireSuit_OilRefinary.svg", label: "FireProof Vest"},
    { id: "ear-muffs", src: "assets/ppe/OilRefinary/EarMuffs_OilRefinary.svg", label: "Ear Muffs"},
    { id: "face-mask", src: "assets/ppe/ChemicalLab/Facemask_ChemicalLab.svg", label: "Face Mask"},
    { id: "lab-coat", src: "assets/ppe/ChemicalLab/LabCoat_ChemicalLab.svg", label: "Lab Coat"},
    { id: "face-shield", src: "assets/ppe/ColdStorage/FaceShield_ColdStorage.svg", label: "Face Shield"},
    { id: "hat-light", src: "assets/ppe/UndergroundTunnel/HardHatLight_UndergroundTunnel.svg", label: "Hard Hat Light"},
    { id: "thermal-suit", src: "assets/ppe/ColdStorage/ThermalSuit_ColdStorage.svg", label: "Thermal Suit"},
    { id: "arc-suit", src: "assets/ppe/ElectricalRoom/ArcFlashSuit_ElectricalRoom.svg", label: "Arc Suit"}

   
  ];

  allPPE.forEach(item => {
    const img = document.createElement("img")
    img.src = item.src
    img.alt = item.label
    img.classList.add("ppe-item")
    img.dataset.ppeId = item.id

    img.addEventListener("click", () => {
      img.classList.toggle("selected")
    });

    inventory.appendChild(img)
  })
}

function submitPPE() {
  const selected = Array.from(document.querySelectorAll(".ppe-item.selected"))
    .map(img => img.dataset.ppeId)

  const required = levelPPE[currentLevel]

  const isCorrect = required.every(item => selected.includes(item)) && selected.length === required.length

  if (isCorrect) {
    currentLevel++
    totalTime -= 30

    if (currentLevel > 7) {
      showWinScreen();
    } else {
      setupLevel(currentLevel)
    }
  } else {
    showHazardScreen();
    setTimeout(() => {
      restartGame()
    }, 2500)
  }
}

document.getElementById("player-avatar").src = 
  gender === 'female' ? 'assets/avatars/Female_Levels_NoBackground.svg' 
                      : 'assets/avatars/Male_Levels_NoBackground.svg'

