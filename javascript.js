let order = [];
let playerOrder = [];
let flash;
let turn;
let good;
let compTurn;
let intervalId;
let strict = false;
let noise = true;
let on = false;
let win;

const turnCounter = document.querySelector("#turn");
const firstBulb = document.querySelector("#violetBulb");
const secondBulb = document.querySelector("#blueBulb");
const thirdBulb = document.querySelector("#greenBulb");
const forthBulb = document.querySelector("#orangeBulb");
const fifthBulb = document.querySelector("#redBulb");
const startButton = document.querySelector("#start");
const stopButton = document.querySelector("stop");
const strictButton = document.querySelector("#strict");
const onButton = document.querySelector("#on");



strictButton.addEventListener('click', (event) => {
    if (strictButton.checked == true) {
      strict = true;
    } else {
      strict = false;
    }
  });
  
  onButton.addEventListener('click', (event) => {
    if (onButton.checked == true) {
      on = true;
      turnCounter.innerHTML = "-";
    } else {
      on = false;
      turnCounter.innerHTML = "";
      clearColor();
      clearInterval(intervalId);
    }
  });

startButton.addEventListener('click', (event) => {
  if (on || win) {
    play();
  }
});


function play() {
    win = false;
    order = [];
    playerOrder = [];
    flash = 0;
    intervalId = 0;
    turn = 1;
    turnCounter.innerHTML = 1;
    good = true;
    for (var i = 0; i < 20; i++) {
      order.push(Math.floor(Math.random() * 5) + 1);
    }
    compTurn = true;
  
    intervalId = setInterval(gameTurn, 500);
  }

  function gameTurn() {
    on = false;
  
    if (flash == turn) {
      clearInterval(intervalId);
      compTurn = false;
      clearColor();
      on = true;
    }
  
    if (compTurn) {
      clearColor();
      setTimeout(() => {
        if (order[flash] == 1) one();
        if (order[flash] == 2) two();
        if (order[flash] == 3) three();
        if (order[flash] == 4) four();
        if (order[flash] == 5) five();
        flash++;
      }, 200);
    }
  }

  function one() {
    if (noise) {
        let audio = document.getElementById("sound1");
        audio.play();
      }
    noise = true;
    document.getElementById("violetBulb").src = "violet_bulb.png";
  }
  
  function two() {
    if (noise) {
        let audio = document.getElementById("sound2");
        audio.play();
      }
    noise = true;
    document.getElementById("blueBulb").src = "blue_bulb.png";
  }
  
  function three() {
    if (noise) {
        let audio = document.getElementById("sound3");
        audio.play();
      }
    noise = true;
    document.getElementById("greenBulb").src = "green_bulb.png";
  }
  
  function four() {
    if (noise) {
        let audio = document.getElementById("sound4");
        audio.play();
      }
    noise = true;
    document.getElementById("orangeBulb").src = "orange_bulb.png";
  }

  function five() {
    if (noise) {
        let audio = document.getElementById("sound5");
        audio.play();
      }
    noise = true;
    document.getElementById("redBulb").src = "red_bulb.png";
  }

  function clearColor() {
    document.getElementById("violetBulb").src = "off_bulb.png";
    document.getElementById("blueBulb").src = "off_bulb.png";
    document.getElementById("greenBulb").src = "off_bulb.png";
    document.getElementById("orangeBulb").src = "off_bulb.png";
    document.getElementById("redBulb").src = "off_bulb.png";
  }

  function flashColor() {
    document.getElementById("violetBulb").src = "violet_bulb.png";
    document.getElementById("blueBulb").src = "blue_bulb.png";
    document.getElementById("greenBulb").src = "green_bulb.png";
    document.getElementById("orangeBulb").src = "orange_bulb.png";
    document.getElementById("redBulb").src = "red_bulb.png";
  }

  firstBulb.addEventListener('click', (event) => {
    if (on) {
        playerOrder.push(1);
        check();
        one();
        if(!win) {
          setTimeout(() => {
            clearColor();
          }, 200);
        }
      }
    })
  secondBulb.addEventListener('click', (event) => {
    if (on) {
      playerOrder.push(2);
      check();
      two();
      if(!win) {
        setTimeout(() => {
          clearColor();
        }, 200);
      }
    }
  })
  
  thirdBulb.addEventListener('click', (event) => {
    if (on) {
      playerOrder.push(3);
      check();
      three();
      if(!win) {
        setTimeout(() => {
          clearColor();
        }, 200);
      }
    }
  })
  
  forthBulb.addEventListener('click', (event) => {
    if (on) {
      playerOrder.push(4);
      check();
      four();
      if(!win) {
        setTimeout(() => {
          clearColor();
        }, 200);
      }
    }
  })

  fifthBulb.addEventListener('click', (event) => {
    if (on) {
      playerOrder.push(5);
      check();
      five();
      if(!win) {
        setTimeout(() => {
          clearColor();
        }, 200);
      }
    }
  })

  function check() {
    if (playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1])
      good = false;
  
    if (playerOrder.length == 10 && good) {
      winGame();
    }
  
    if (good == false) {
      flashColor();
      turnCounter.innerHTML = "NO!";
      let audio = document.getElementById("error");
      audio.play();
      noise = true;
      setTimeout(() => {
        turnCounter.innerHTML = turn;
        clearColor();
  
        if (strict) {
          play();
        } else {
          compTurn = true;
          flash = 0;
          playerOrder = [];
          good = true;
          intervalId = setInterval(gameTurn, 800);
        }
      }, 800);
  
      noise = false;
    }
  
    if (turn == playerOrder.length && good && !win) {
      turn++;
      playerOrder = [];
      compTurn = true;
      flash = 0;
      turnCounter.innerHTML = turn;
      intervalId = setInterval(gameTurn, 800);
    }
  
  }

    function winGame() {
        flashColor();
        turnCounter.innerHTML = "WIN!";
        on = false;
        win = true;
        if (noise) {
            let audio = document.getElementById("win");
            audio.play();
          }
        noise = true;
      }