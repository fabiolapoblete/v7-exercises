const holes = document.querySelectorAll("main article");
let currentHole;
let moleAppearance = 800;
let molesWhacked = 0;
let currentTime = 60;

gameLoop();

let timer = setInterval(() => {
  // Check if time left

  if (currentTime >= 0) {
    // Update timer in gui
    document.querySelector(".timeleft b").innerHTML = `${currentTime}s`;

    // count down current time
    currentTime--;
  } else {
    // Game over
    clearInterval(timer);
    clearInterval(gameLoop);

    alert(`You whacked ${molesWhacked} moles in 60 sec.`);
  }
}, 1000);

function gameLoop() {
  appendListener();

  let moleSpeed = 2000;

  setInterval(() => {
    //Empty holes
    holes.forEach((hole) => hole.classList.remove("mole"));

    //Pick random hole to pop up
    let randomId = Math.floor(Math.random() * holes.length);
    currentHole = randomId; //Set ranomdId to current hole

    let currentHoleDisplay = document.querySelector(`[data-id="${randomId}"]`);
    currentHoleDisplay.classList.add("mole");

    setTimeout(() => {
      currentHoleDisplay.classList.remove("mole");
      currentHole = null;
    }, moleAppearance);
  }, moleSpeed);
}

function appendListener() {
  holes.forEach((hole) => {
    hole.addEventListener("click", () => {
      let whackedHole = hole.getAttribute("data-id");
      checkIfWhacked(whackedHole);
    });
  });
}

function checkIfWhacked(whackedHole) {
  let molesWhackedDisplay = document.querySelector(".moleswhacked b");
  let hitDisplay = document.querySelector(`[data-id="${whackedHole}"]`);

  if (parseInt(whackedHole) === currentHole) {
    molesWhacked++;
    molesWhackedDisplay.innerHTML = molesWhacked;
    hitDisplay.classList.add("hit");

    setTimeout(() => {
      hitDisplay.classList.remove("hit");
    }, moleAppearance);
  }
}

// function timer() {
//   setInterval(() => {
//     //Check if time left
//     let timeLeft = document.querySelector(".timeleft b");
//     let currentTime = 60;

//     if (currentTime >= 0) {
//       //Update timer in gui and count down current time
//       timeLeft.innerHTML = `${currentTime}s`;
//       currentTime--;
//     } else {
//       //game is over
//       //   clearInterval(timer);
//       //   clearInterval(gameLoop);

//       alert(`You whacked ${molesWhacked} moles in 60 sec.`);
//     }

//     console.log(currentTime);
//   }, 1000);
// }
