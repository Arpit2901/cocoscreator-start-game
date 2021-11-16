"use strict";
cc._RF.push(module, 'b3062hOAdBM660/zwfXONnE', 'game');
// script/game.js

"use strict";

// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
cc.Class({
  "extends": cc.Component,
  properties: {
    // This property quotes the PreFab resource of stars
    starPrefab: {
      "default": null,
      type: cc.Prefab
    },
    // The random scale of disappearing time for stars
    maxStarDuration: 0,
    minStarDuration: 0,
    // Ground node for confirming the height of the generated star's position
    ground: {
      "default": null,
      type: cc.Node
    },
    // Player node for obtaining the jump height of the main character and controlling the movement switch of the main character
    player: {
      "default": null,
      type: cc.Node
    },
    scoreDisplay: {
      "default": null,
      type: cc.Label
    },
    highScoreDisplay: {
      "default": null,
      type: cc.Label
    },
    scoreAudio: {
      "default": null,
      type: cc.AudioClip
    },
    gameOverUI: {
      "default": null,
      type: cc.Node
    },
    gameStart: {
      "default": null,
      type: cc.Node
    },
    isGameOver: false
  },
  // LIFE-CYCLE CALLBACKS: 
  startClick: function startClick() {
    this.gameStart.active = false;
    this.startGame();
  },
  startGame: function startGame() {
    this.player.getComponent('player').startGame();
    this.highScoreDisplay.string = 'HighScore: ' + cc.sys.localStorage.getItem('HighScore');
    this.groundY = this.ground.y + this.ground.height / 2; // "this.ground.top" may also work
    // Initialize timer

    this.timer = 0;
    this.starDuration = 0; // Initialize scoring

    this.score = 0; // Generate a new star

    this.spawnNewStar();
  },
  // onLoad () {},
  // onLoad: function () {
  //     // Obtain the anchor point of ground level on the y axis
  //     this.groundY = this.ground.y + this.ground.height / 2; // "this.ground.top" may also work
  //     // Initialize timer
  //     this.timer = 0;
  //     this.starDuration = 0;
  //     // Initialize scoring
  //     this.score = 0;
  //     // Generate a new star
  //     this.spawnNewStar();
  //     //initializing scoring
  // },
  spawnNewStar: function spawnNewStar() {
    // Generate a new node in the scene with a preset template
    var newStar = cc.instantiate(this.starPrefab); // Put the newly added node under the Canvas node

    this.node.addChild(newStar); // Set up a random position for the star

    newStar.setPosition(this.getNewStarPosition()); // Save a reference of the Game object on the Star script component

    newStar.getComponent('star').game = this; // Reset timer, randomly choose a value according the scale of star duration

    this.starDuration = this.minStarDuration + Math.random() * (this.maxStarDuration - this.minStarDuration);
    this.timer = 0;
  },
  getNewStarPosition: function getNewStarPosition() {
    var randX = 0; // According to the position of the ground level and the main character's jump height, randomly obtain an anchor point of the star on the y axis

    var randY = this.groundY + Math.random() * this.player.getComponent('player').jumpHeight + 50; // According to the width of the screen, randomly obtain an anchor point of star on the x axis

    var maxX = this.node.width / 2;
    randX = (Math.random() - 0.5) * 2 * maxX; // Return to the anchor point of the star

    return cc.v2(randX, randY);
  },
  start: function start() {},
  // update (dt) {}
  update: function update(dt) {
    // Update timer for each frame, when a new star is not generated after exceeding duration
    // Invoke the logic of game failure
    if (this.isGameOver) {
      return;
    }

    if (this.timer > this.starDuration) {
      this.gameOver();
      return;
    }

    this.timer += dt;
  },
  gainScore: function gainScore() {
    this.score += 1; // Update the words of the scoreDisplay Label

    this.scoreDisplay.string = 'Score: ' + this.score;

    if (this.score > cc.sys.localStorage.getItem('HighScore')) {
      cc.sys.localStorage.setItem('HighScore', this.score);
    }

    this.highScoreDisplay.string = 'HighScore: ' + cc.sys.localStorage.getItem('HighScore');
    cc.audioEngine.playEffect(this.scoreAudio, false);
  },
  gameOver: function gameOver() {
    // Stop the jumping action of the Player node
    this.isGameOver = true;
    this.player.stopAllActions();
    this.player.destroy(); // reload the "game" scene

    this.gameOverUI.active = true;
  },
  replayClick: function replayClick() {
    cc.director.loadScene('game');
  }
});

cc._RF.pop();