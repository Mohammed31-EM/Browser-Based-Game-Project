let playerName = ''
let selectedGender = ''
let currentLevel = 7
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

  // (Later: Dynamically load PPE options here too)
}

