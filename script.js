//-------------------------------------------Constants----------------------------------------------------------
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
  1: ["hard-hat","hi-vis-vest","steel-boots","safety-gloves","safety-goggles"],
  2: ["lab-coat","face-mask","safety-goggles","safety-gloves","steel-boots"],
  3: ["fire-proof-vest","face-mask","safety-goggles","safety-gloves","steel-boots","ear-muffs"],
  4: ["thermal-suit","face-shield","safety-goggles","safety-gloves","steel-boots"],
  5: ["fire-proof-vest","face-mask","safety-goggles","safety-gloves","steel-boots"],
  6: ["fire-proof-vest","face-mask","safety-goggles","safety-gloves","hat-light","steel-boots"],
  7: ["arc-suit","face-mask","safety-goggles","safety-gloves","steel-boots"]
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

//-------------------------------------------Variables---------------------------------------------------------
let playerName = ''
let selectedGender = ''
let currentLevel = 1
let totalTime = 300
let timerInterval = null
let countdownPlayed = false
let hintUsed = false

//-------------------------------------------Event Listeners----------------------------------------------------
['submit-ppe','restart-button','print-button','hint-button'].forEach(id => {
  const el = document.getElementById(id)
  if(!el) return
  const fn = id === 'submit-ppe'? submitPPE:( id === 'restart-button' ? restartGame:(id ==='print-button'?() => window.print() : showHint));
  el.addEventListener('click', fn)
})

//-------------------------------------------Functions---------------------------------------------------------
function startGame(gender){
  const nameInput = document.getElementById('player-name')
  playerName = nameInput.value.trim()
  if(!playerName){
    nameInput.classList.add('input-error','shake')
    sounds.nameError.play()
    setTimeout(() => nameInput.classList.remove('shake'),500)
    return
  }
  nameInput.classList.remove('input-error')
  selectedGender = gender
  const avatar = document.getElementById('player-avatar')
  avatar.src = selectedGender === 'female'? 'assets/avatars/Female_Levels_NoBackground.svg':'assets/avatars/Male_Levels_NoBackground.svg'
  ['home-screen','instructions'].forEach(id => document.getElementById(id).classList.add('hidden'))
  document.getElementById('level-screen').classList.remove('hidden')
  document.getElementById('win-screen').classList.add('hidden')
  hintUsed = false
  setupLevel(currentLevel)
  startTimer()
  sounds.newGame.play()
  sounds.ticking.loop=true
  sounds.ticking.play()
}

function setupLevel(levelNum){
  hintUsed=false
  const btn=document.getElementById('hint-button')
   if(btn)
    btn.disabled=false
  document.getElementById('hint-text')?.classList.add('hidden')
  const { name, image } = levelData[levelNum]
  document.getElementById('level-title').textContent = name
  document.getElementById('level-bg').src = image
  const avatar = document.getElementById('player-avatar')
  const isM = window.innerWidth<=600
  avatar.style.height = isM?'18%': avatarSize[levelNum]
  avatar.style.bottom = avatarPosition[levelNum].bottom
  avatar.style.left = avatarPosition[levelNum].left
  avatar.style.transform = 'translateX(-50%)'
  avatar.style.width = 'auto'
  updateProgressBar(levelNum)
  loadPPEOptions(levelNum)
}

function showHint() {
  if (hintUsed) return
  hintUsed = true
  document.getElementById("hint-button").disabled = true

  document.querySelectorAll(".ppe-item.hinted").forEach(e => e.classList.remove("hinted"))

  const required = levelPPE[currentLevel] || []
  const unselectedRequired = required.filter(id =>
    !document.querySelector(`.ppe-item[data-ppe-id="${id}"]`)?.classList.contains("selected")
  )
  if (unselectedRequired.length === 0) return
  const hintId = unselectedRequired[Math.floor(Math.random() * unselectedRequired.length)]
  const ppeImg = document.querySelector(`.ppe-item[data-ppe-id="${hintId}"]`)
  if (ppeImg) ppeImg.classList.add("hinted")
}


function loadPPEOptions(level){
  const inv = document.getElementById('ppe-inventory')
  inv.innerHTML = ''
  allPPE.forEach(item => {
    const w = document.createElement('div') 
    w.classList.add('ppe-wrapper')
    const img = document.createElement('img')
    img.src = item.src
    img.alt = item.label
    img.classList.add('ppe-item')
    img.dataset.ppeId = item.id
    img.addEventListener('click',() => {
    img.classList.toggle('selected')
    sounds.selection.play()
    })
    const lbl = document.createElement('div')
    lbl.textContent = item.label
    lbl.classList.add('ppe-label')
    w.append(img,lbl)
    inv.appendChild(w);
  });
}

function startTimer(){
  clearInterval(timerInterval)
  countdownPlayed=false
  const dsp=document.getElementById('timer')
  timerInterval=setInterval(()=>{
    if(totalTime<=0){ 
      clearInterval(timerInterval)
      sounds.ticking.pause()
      sounds.ticking.currentTime=0
      if(document.getElementById('win-screen').classList.contains('hidden')) 
        showTimeoutScreen()
       return
    }
    if(totalTime===10 && !countdownPlayed){ sounds.countdown.play(); countdownPlayed=true; }
    totalTime--; 
    const m=Math.floor(totalTime/60);
    let s=totalTime%60; 
    if(s<10)
      s='0'+s
    dsp.textContent=`Time Left: ${m}:${s}`
  },1000)
}

function submitPPE(){
  const sel = Array.from(document.querySelectorAll('.ppe-item.selected')).map(i=>i.dataset.ppeId).sort()
  const req = [...(levelPPE[currentLevel] || [])].sort()
  const ok = sel.length === req.length && sel.every((v, i) => v === req[i])
  if(ok){ 
    currentLevel++ 
    totalTime-=30
    sounds.score.play()
    currentLevel>7? showCertificate(): setupLevel(currentLevel)
  } else { 
    sounds.wrongPPE.play()
    showHazardScreen()
    setTimeout(restartGame,2500)
  }
}

function showHazardScreen(){
  document.getElementById('hazard-img').src=`assets/hazards/${levelImages[currentLevel]}`
  document.getElementById('level-screen').classList.add('hidden')
  document.getElementById('hazard-screen').classList.remove('hidden')
  sounds.lostGame.play()
}

function showTimeoutScreen(){
  document.getElementById('level-screen').classList.add('hidden')
  document.getElementById('timeout-screen').classList.remove('hidden')
  sounds.lostGame.play()
}

function showCertificate(){
  document.getElementById('level-screen').classList.add('hidden')
  document.getElementById('win-screen').classList.remove('hidden')
  document.getElementById('certificate-name').textContent = `Awarded to: ${playerName}`
  document.getElementById('certificate-date').textContent = new Date().toLocaleDateString()
  sounds.ticking.pause()
  sounds.ticking.currentTime=0 
  sounds.gameWon.play()
}

function restartGame(){
  currentLevel=1
  totalTime=300
  countdownPlayed=false
  clearInterval(timerInterval)
  sounds.ticking.pause()
  sounds.ticking.currentTime=0; sounds.newGame.play()
  document.getElementById('hazard-screen').classList.add('hidden')
  document.getElementById('timeout-screen').classList.add('hidden')
  document.getElementById('win-screen').classList.add('hidden')
  document.getElementById('home-screen').classList.remove('hidden')
}

function updateProgressBar(l){
  document.getElementById('progress-bar').style.width = `${((l-1)/7)*100}%`
}
