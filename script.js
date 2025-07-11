let playerName = '';
let selectedGender = '';
let currentLevel = 1;
let totalTime = 300; //5 minutes to seconds

function startGame(gender) {
  const nameInput = document.getElementById("player-name");
  playerName = nameInput.value.trim();

if (!playerName) {
    
    nameInput.classList.add("input-error");

    
    nameInput.classList.add("shake");
    setTimeout(() => nameInput.classList.remove("shake"), 500);

    return;
  }

  // Remove error state if previously shown
  nameInput.classList.remove("input-error");
  selectedGender = gender;

  // Hide home screen, show level screen
  document.getElementById("home-screen").classList.add("hidden");
  document.getElementById("level-screen").classList.remove("hidden");

  // Set up level 1
  setupLevel(currentLevel);

  // Start timer
  startTimer();
}
