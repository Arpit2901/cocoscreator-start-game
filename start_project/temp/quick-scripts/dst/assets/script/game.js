
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/game.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxnYW1lLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwic3RhclByZWZhYiIsInR5cGUiLCJQcmVmYWIiLCJtYXhTdGFyRHVyYXRpb24iLCJtaW5TdGFyRHVyYXRpb24iLCJncm91bmQiLCJOb2RlIiwicGxheWVyIiwic2NvcmVEaXNwbGF5IiwiTGFiZWwiLCJoaWdoU2NvcmVEaXNwbGF5Iiwic2NvcmVBdWRpbyIsIkF1ZGlvQ2xpcCIsImdhbWVPdmVyVUkiLCJnYW1lU3RhcnQiLCJpc0dhbWVPdmVyIiwic3RhcnRDbGljayIsImFjdGl2ZSIsInN0YXJ0R2FtZSIsImdldENvbXBvbmVudCIsInN0cmluZyIsInN5cyIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJncm91bmRZIiwieSIsImhlaWdodCIsInRpbWVyIiwic3RhckR1cmF0aW9uIiwic2NvcmUiLCJzcGF3bk5ld1N0YXIiLCJuZXdTdGFyIiwiaW5zdGFudGlhdGUiLCJub2RlIiwiYWRkQ2hpbGQiLCJzZXRQb3NpdGlvbiIsImdldE5ld1N0YXJQb3NpdGlvbiIsImdhbWUiLCJNYXRoIiwicmFuZG9tIiwicmFuZFgiLCJyYW5kWSIsImp1bXBIZWlnaHQiLCJtYXhYIiwid2lkdGgiLCJ2MiIsInN0YXJ0IiwidXBkYXRlIiwiZHQiLCJnYW1lT3ZlciIsImdhaW5TY29yZSIsInNldEl0ZW0iLCJhdWRpb0VuZ2luZSIsInBsYXlFZmZlY3QiLCJzdG9wQWxsQWN0aW9ucyIsImRlc3Ryb3kiLCJyZXBsYXlDbGljayIsImRpcmVjdG9yIiwibG9hZFNjZW5lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUjtBQUNBQyxJQUFBQSxV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SCxDQUFPQyxZQUFQLENBQW9CNkIsT0FBcEIsQ0FBNEIsV0FBNUIsRUFBeUMsS0FBS3RCLEtBQTlDO0FBQ0g7O0FBQ0QsU0FBS25CLGdCQUFMLENBQXNCVSxNQUF0QixHQUErQixnQkFBZ0J4QixFQUFFLENBQUN5QixHQUFILENBQU9DLFlBQVAsQ0FBb0JDLE9BQXBCLENBQTRCLFdBQTVCLENBQS9DO0FBRUEzQixJQUFBQSxFQUFFLENBQUN3RCxXQUFILENBQWVDLFVBQWYsQ0FBMEIsS0FBSzFDLFVBQS9CLEVBQTJDLEtBQTNDO0FBQ0gsR0FsSkk7QUFtSkxzQyxFQUFBQSxRQUFRLEVBQUUsb0JBQVk7QUFDbEI7QUFDQSxTQUFLbEMsVUFBTCxHQUFrQixJQUFsQjtBQUNBLFNBQUtSLE1BQUwsQ0FBWStDLGNBQVo7QUFDQSxTQUFLL0MsTUFBTCxDQUFZZ0QsT0FBWixHQUprQixDQUtsQjs7QUFDQSxTQUFLMUMsVUFBTCxDQUFnQkksTUFBaEIsR0FBeUIsSUFBekI7QUFDSCxHQTFKSTtBQTZKTHVDLEVBQUFBLFdBN0pLLHlCQTZKUztBQUNWNUQsSUFBQUEsRUFBRSxDQUFDNkQsUUFBSCxDQUFZQyxTQUFaLENBQXNCLE1BQXRCO0FBQ0g7QUEvSkksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gY2MuQ2xhc3M6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2NsYXNzLmh0bWxcclxuLy8gTGVhcm4gQXR0cmlidXRlOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcblxyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIC8vIFRoaXMgcHJvcGVydHkgcXVvdGVzIHRoZSBQcmVGYWIgcmVzb3VyY2Ugb2Ygc3RhcnNcclxuICAgICAgICBzdGFyUHJlZmFiOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlByZWZhYlxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vIFRoZSByYW5kb20gc2NhbGUgb2YgZGlzYXBwZWFyaW5nIHRpbWUgZm9yIHN0YXJzXHJcbiAgICAgICAgbWF4U3RhckR1cmF0aW9uOiAwLFxyXG4gICAgICAgIG1pblN0YXJEdXJhdGlvbjogMCxcclxuXHJcbiAgICAgICAgLy8gR3JvdW5kIG5vZGUgZm9yIGNvbmZpcm1pbmcgdGhlIGhlaWdodCBvZiB0aGUgZ2VuZXJhdGVkIHN0YXIncyBwb3NpdGlvblxyXG4gICAgICAgIGdyb3VuZDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy8gUGxheWVyIG5vZGUgZm9yIG9idGFpbmluZyB0aGUganVtcCBoZWlnaHQgb2YgdGhlIG1haW4gY2hhcmFjdGVyIGFuZCBjb250cm9sbGluZyB0aGUgbW92ZW1lbnQgc3dpdGNoIG9mIHRoZSBtYWluIGNoYXJhY3RlclxyXG4gICAgICAgIHBsYXllcjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzY29yZURpc3BsYXk6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGhpZ2hTY29yZURpc3BsYXk6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNjb3JlQXVkaW86IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuQXVkaW9DbGlwXHJcbiAgICAgICAgfSxcclxuICAgICAgICBnYW1lT3ZlclVJOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGdhbWVTdGFydDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBpc0dhbWVPdmVyOiBmYWxzZVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzogXHJcblxyXG5cclxuICAgIHN0YXJ0Q2xpY2soKSB7XHJcblxyXG4gICAgICAgIHRoaXMuZ2FtZVN0YXJ0LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc3RhcnRHYW1lKCk7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydEdhbWUoKSB7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIuZ2V0Q29tcG9uZW50KCdwbGF5ZXInKS5zdGFydEdhbWUoKTtcclxuICAgICAgICB0aGlzLmhpZ2hTY29yZURpc3BsYXkuc3RyaW5nID0gJ0hpZ2hTY29yZTogJyArIGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnSGlnaFNjb3JlJyk7XHJcbiAgICAgICAgdGhpcy5ncm91bmRZID0gdGhpcy5ncm91bmQueSArIHRoaXMuZ3JvdW5kLmhlaWdodCAvIDI7IC8vIFwidGhpcy5ncm91bmQudG9wXCIgbWF5IGFsc28gd29ya1xyXG4gICAgICAgIC8vIEluaXRpYWxpemUgdGltZXJcclxuICAgICAgICB0aGlzLnRpbWVyID0gMDtcclxuICAgICAgICB0aGlzLnN0YXJEdXJhdGlvbiA9IDA7XHJcbiAgICAgICAgLy8gSW5pdGlhbGl6ZSBzY29yaW5nXHJcbiAgICAgICAgdGhpcy5zY29yZSA9IDA7XHJcbiAgICAgICAgLy8gR2VuZXJhdGUgYSBuZXcgc3RhclxyXG4gICAgICAgIHRoaXMuc3Bhd25OZXdTdGFyKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIG9uTG9hZCAoKSB7fSxcclxuICAgIC8vIG9uTG9hZDogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIC8vICAgICAvLyBPYnRhaW4gdGhlIGFuY2hvciBwb2ludCBvZiBncm91bmQgbGV2ZWwgb24gdGhlIHkgYXhpc1xyXG4gICAgLy8gICAgIHRoaXMuZ3JvdW5kWSA9IHRoaXMuZ3JvdW5kLnkgKyB0aGlzLmdyb3VuZC5oZWlnaHQgLyAyOyAvLyBcInRoaXMuZ3JvdW5kLnRvcFwiIG1heSBhbHNvIHdvcmtcclxuXHJcbiAgICAvLyAgICAgLy8gSW5pdGlhbGl6ZSB0aW1lclxyXG4gICAgLy8gICAgIHRoaXMudGltZXIgPSAwO1xyXG4gICAgLy8gICAgIHRoaXMuc3RhckR1cmF0aW9uID0gMDtcclxuXHJcbiAgICAvLyAgICAgLy8gSW5pdGlhbGl6ZSBzY29yaW5nXHJcbiAgICAvLyAgICAgdGhpcy5zY29yZSA9IDA7XHJcblxyXG4gICAgLy8gICAgIC8vIEdlbmVyYXRlIGEgbmV3IHN0YXJcclxuICAgIC8vICAgICB0aGlzLnNwYXduTmV3U3RhcigpO1xyXG4gICAgLy8gICAgIC8vaW5pdGlhbGl6aW5nIHNjb3JpbmdcclxuXHJcblxyXG5cclxuICAgIC8vIH0sXHJcblxyXG4gICAgc3Bhd25OZXdTdGFyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8gR2VuZXJhdGUgYSBuZXcgbm9kZSBpbiB0aGUgc2NlbmUgd2l0aCBhIHByZXNldCB0ZW1wbGF0ZVxyXG4gICAgICAgIHZhciBuZXdTdGFyID0gY2MuaW5zdGFudGlhdGUodGhpcy5zdGFyUHJlZmFiKTtcclxuICAgICAgICAvLyBQdXQgdGhlIG5ld2x5IGFkZGVkIG5vZGUgdW5kZXIgdGhlIENhbnZhcyBub2RlXHJcbiAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5ld1N0YXIpO1xyXG4gICAgICAgIC8vIFNldCB1cCBhIHJhbmRvbSBwb3NpdGlvbiBmb3IgdGhlIHN0YXJcclxuICAgICAgICBuZXdTdGFyLnNldFBvc2l0aW9uKHRoaXMuZ2V0TmV3U3RhclBvc2l0aW9uKCkpO1xyXG4gICAgICAgIC8vIFNhdmUgYSByZWZlcmVuY2Ugb2YgdGhlIEdhbWUgb2JqZWN0IG9uIHRoZSBTdGFyIHNjcmlwdCBjb21wb25lbnRcclxuICAgICAgICBuZXdTdGFyLmdldENvbXBvbmVudCgnc3RhcicpLmdhbWUgPSB0aGlzO1xyXG4gICAgICAgIC8vIFJlc2V0IHRpbWVyLCByYW5kb21seSBjaG9vc2UgYSB2YWx1ZSBhY2NvcmRpbmcgdGhlIHNjYWxlIG9mIHN0YXIgZHVyYXRpb25cclxuICAgICAgICB0aGlzLnN0YXJEdXJhdGlvbiA9IHRoaXMubWluU3RhckR1cmF0aW9uICsgTWF0aC5yYW5kb20oKSAqICh0aGlzLm1heFN0YXJEdXJhdGlvbiAtIHRoaXMubWluU3RhckR1cmF0aW9uKTtcclxuICAgICAgICB0aGlzLnRpbWVyID0gMDtcclxuICAgIH0sXHJcblxyXG4gICAgZ2V0TmV3U3RhclBvc2l0aW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHJhbmRYID0gMDtcclxuICAgICAgICAvLyBBY2NvcmRpbmcgdG8gdGhlIHBvc2l0aW9uIG9mIHRoZSBncm91bmQgbGV2ZWwgYW5kIHRoZSBtYWluIGNoYXJhY3RlcidzIGp1bXAgaGVpZ2h0LCByYW5kb21seSBvYnRhaW4gYW4gYW5jaG9yIHBvaW50IG9mIHRoZSBzdGFyIG9uIHRoZSB5IGF4aXNcclxuICAgICAgICB2YXIgcmFuZFkgPSB0aGlzLmdyb3VuZFkgKyBNYXRoLnJhbmRvbSgpICogdGhpcy5wbGF5ZXIuZ2V0Q29tcG9uZW50KCdwbGF5ZXInKS5qdW1wSGVpZ2h0ICsgNTA7XHJcbiAgICAgICAgLy8gQWNjb3JkaW5nIHRvIHRoZSB3aWR0aCBvZiB0aGUgc2NyZWVuLCByYW5kb21seSBvYnRhaW4gYW4gYW5jaG9yIHBvaW50IG9mIHN0YXIgb24gdGhlIHggYXhpc1xyXG4gICAgICAgIHZhciBtYXhYID0gdGhpcy5ub2RlLndpZHRoIC8gMjtcclxuICAgICAgICByYW5kWCA9IChNYXRoLnJhbmRvbSgpIC0gMC41KSAqIDIgKiBtYXhYO1xyXG4gICAgICAgIC8vIFJldHVybiB0byB0aGUgYW5jaG9yIHBvaW50IG9mIHRoZSBzdGFyXHJcbiAgICAgICAgcmV0dXJuIGNjLnYyKHJhbmRYLCByYW5kWSk7XHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXJ0KCkge1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgLy8gdXBkYXRlIChkdCkge31cclxuICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XHJcbiAgICAgICAgLy8gVXBkYXRlIHRpbWVyIGZvciBlYWNoIGZyYW1lLCB3aGVuIGEgbmV3IHN0YXIgaXMgbm90IGdlbmVyYXRlZCBhZnRlciBleGNlZWRpbmcgZHVyYXRpb25cclxuXHJcbiAgICAgICAgLy8gSW52b2tlIHRoZSBsb2dpYyBvZiBnYW1lIGZhaWx1cmVcclxuICAgICAgICBpZiAodGhpcy5pc0dhbWVPdmVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMudGltZXIgPiB0aGlzLnN0YXJEdXJhdGlvbikge1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVPdmVyKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy50aW1lciArPSBkdDtcclxuICAgIH0sXHJcblxyXG4gICAgZ2FpblNjb3JlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5zY29yZSArPSAxO1xyXG4gICAgICAgIC8vIFVwZGF0ZSB0aGUgd29yZHMgb2YgdGhlIHNjb3JlRGlzcGxheSBMYWJlbFxyXG4gICAgICAgIHRoaXMuc2NvcmVEaXNwbGF5LnN0cmluZyA9ICdTY29yZTogJyArIHRoaXMuc2NvcmU7XHJcbiAgICAgICAgaWYgKHRoaXMuc2NvcmUgPiBjYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ0hpZ2hTY29yZScpKSB7XHJcbiAgICAgICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnSGlnaFNjb3JlJywgdGhpcy5zY29yZSlcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5oaWdoU2NvcmVEaXNwbGF5LnN0cmluZyA9ICdIaWdoU2NvcmU6ICcgKyBjYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ0hpZ2hTY29yZScpO1xyXG5cclxuICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KHRoaXMuc2NvcmVBdWRpbywgZmFsc2UpO1xyXG4gICAgfSxcclxuICAgIGdhbWVPdmVyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8gU3RvcCB0aGUganVtcGluZyBhY3Rpb24gb2YgdGhlIFBsYXllciBub2RlXHJcbiAgICAgICAgdGhpcy5pc0dhbWVPdmVyID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnBsYXllci5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgIHRoaXMucGxheWVyLmRlc3Ryb3koKTtcclxuICAgICAgICAvLyByZWxvYWQgdGhlIFwiZ2FtZVwiIHNjZW5lXHJcbiAgICAgICAgdGhpcy5nYW1lT3ZlclVJLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICByZXBsYXlDbGljaygpIHtcclxuICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoJ2dhbWUnKTtcclxuICAgIH1cclxufSk7XHJcbiJdfQ==