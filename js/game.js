var r1 = ["J", "K", "J", "K", "10", "K", "K", "A", "K", "Q", "J", "J", "A", "Q", "J", "J", "J", "A", "10", "10", "K", "A", "Q", "J", "10", "Q", "Q", "A", "10", "10", "Q", "Q", "A", "J", "K", "K", "J", "Q", "J", "K", "A", "10", "A", "J", "K", "A", "10", "10", "10", "Q", "Q", "A", "A", "10", "K", "10", "Q", "A", "A", "J"];
var r2 = ["Q", "K", "J", "A", "A", "Q", "A", "J", "J", "10", "K", "Q", "A", "K", "J", "Q", "A", "J", "J", "J", "K", "10", "J", "Q", "10", "A", "J", "J", "10", "J", "A", "K", "Q", "K", "J", "A", "Q", "A", "J", "A", "K", "A", "Q", "10", "K", "10", "K", "Q", "J", "J", "Q", "K", "Q", "Q", "J", "J", "J", "K", "10", "K"];
var r3 = ["10", "Q", "K", "J", "A", "10", "A", "10", "A", "K", "J", "Q", "A", "10", "A", "J", "10", "J", "J", "K", "10", "K", "10", "Q", "K", "K", "10", "A", "J", "K", "J", "Q", "Q", "K", "J", "J", "J", "Q", "J", "Q", "Q", "J", "J", "J", "10", "10", "10", "10", "10", "10", "A", "Q", "A", "A", "A", "Q", "10", "A", "K", "A"];
var r4 = ["10", "Q", "A", "10", "K", "J", "10", "10", "10", "Q", "Q", "J", "10", "J", "J", "Q", "J", "K", "J", "J", "K", "Q", "J", "K", "Q", "J", "J", "K", "A", "Q", "J", "Q", "K", "10", "K", "A", "10", "J", "A", "K", "A", "10", "10", "A", "10", "J", "A", "10", "A", "K", "Q", "A", "Q", "K", "A", "Q", "A", "K", "10", "A"];
var r5 = ["10", "K", "10", "A", "A", "10", "J", "K", "J", "J", "10", "K", "K", "10", "Q", "Q", "Q", "K", "10", "K", "10", "K", "J", "J", "K", "A", "J", "J", "10", "A", "10", "A", "J", "K", "J", "A", "K", "K", "10", "K", "10", "10", "Q", "A", "J", "A", "A", "Q", "A", "A", "A", "10", "A", "Q", "10", "10", "K", "J", "Q", "K"];

var symbols = ['A', 'K', 'Q', 'J', '10'];
var numOfSymbols = 60;
var minSymbolsPassed = 10;
var maxSymbolsPassed = 20;
var slowDownDistances = [500, 350, 220, 100, 60, 50, 30, 20, 10];
var reelSpeedOnDistances = [20, 15, 14, 14, 9, 6, 5, 4, 1];

var speedMulti = 1;

var spinTime = 0;
var startSpinTime = 0;

var cash = 10000;

var slotSpinning = false;

var gameState = 'start';

var reel_one = new Reel();
var reel_two = new Reel();
var reel_three = new Reel();
var reel_four = new Reel();
var reel_five = new Reel();

var winLines = [];
var ui_layer = new UI();


var winLineHeight = 2;
var winLineWidth = 290;


function setup() {
  createCanvas(400, 400);
  frameRate(20);
  document.getElementById("defaultCanvas0").style = " ";
}

function startGame() {
  removeElements();
  slotSpinning = false;
  textAlign(CENTER, CENTER);
  setReels();
  ui_layer.create();
  gameState = 'init';
  loop();
}

function GameLoop() {
  background(255);
  textSize(30);
  updateReels();

  if (reel_five.getCalculateWin()) {
    var s1 = reel_one.getWinSymbols();
    var s2 = reel_two.getWinSymbols();
    var s3 = reel_three.getWinSymbols();
    var s4 = reel_four.getWinSymbols();
    var s5 = reel_five.getWinSymbols();
    console.log("New Spin");
    var pay = CalculatePayout(s1, s2, s3, s4, s5);
    ui_layer.addMoney(pay);
    reel_five.setCalculateWin(false);
    slotSpinning = false;
  }

  ui_layer.show();


}

function draw() {
  if (gameState == 'start') {
    startGame();
  } else if (gameState == 'init') {
    GameLoop();
  }
}

function setReels() {
  reel_one.create(80, r1);
  reel_two.create(130, r2);
  reel_three.create(180, r3);
  reel_four.create(230, r4);
  reel_five.create(280, r5);
}

function keyPressed() {
  if (keyCode === 32) {
    if (!slotSpinning) {
      startSpin();
    }
  }
}

function mouseClicked() {
  if(pmouseX < width && pmouseY < height){
  if (!slotSpinning) {
    startSpin();
  }
}
}

function startSpin() {
  winLines = [];
  ui_layer.takeMoney(100);
  slotSpinning = true;
  if (speedMulti == 1) {
    reel_one.startSpinning(0);
    reel_two.startSpinning(300);
    reel_three.startSpinning(500);
    reel_four.startSpinning(650);
    reel_five.startSpinning(800);
  } else {
    //remove individual reel delay if speed is manipulated
    reel_one.startSpinning(0);
    reel_two.startSpinning(0);
    reel_three.startSpinning(0);
    reel_four.startSpinning(0);
    reel_five.startSpinning(0);
  }
}

function updateReels() {
  if (slotSpinning) {
    reel_one.update();
    reel_two.update();
    reel_three.update();
    reel_four.update();
    reel_five.update();
  }
  reel_one.show();
  reel_two.show();
  reel_three.show();
  reel_four.show();
  reel_five.show();
}