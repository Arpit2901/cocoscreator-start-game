
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/__qc_index__.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}
require('./assets/script/game');
require('./assets/script/player');
require('./assets/script/star');

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
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/player.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c453esIHNxGAbhetUWlNpv8', 'player');
// script/player.js

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
    // Main character's jump height
    jumpHeight: 0,
    // Main character's jump duration
    jumpDuration: 0,
    // Maximal movement speed
    maxMoveSpeed: 0,
    // Acceleration
    accel: 0,
    jumpAudio: {
      "default": null,
      type: cc.AudioClip
    }
  },
  runJumpAction: function runJumpAction() {
    // Jump up
    var jumpUp = cc.tween().by(this.jumpDuration, {
      y: this.jumpHeight
    }, {
      easing: 'sineOut'
    }); // Jump down

    var jumpDown = cc.tween().by(this.jumpDuration, {
      y: -this.jumpHeight
    }, {
      easing: 'sineIn'
    }); // Create a easing and perform actions in the order of "jumpUp", "jumpDown"

    var tween = cc.tween().sequence(jumpUp, jumpDown).call(this.playJumpSound, this); // Repeat

    return cc.tween().repeatForever(tween);
  },
  playJumpSound: function playJumpSound() {
    // Invoke sound engine to play the sound
    cc.audioEngine.playEffect(this.jumpAudio, false);
  },
  // LIFE-CYCLE CALLBACKS:
  onKeyDown: function onKeyDown(event) {
    // Set a flag when key pressed
    switch (event.keyCode) {
      case cc.macro.KEY.a:
        this.accLeft = true;
        break;

      case cc.macro.KEY.d:
        this.accRight = true;
        break;

      case cc.macro.KEY.left:
        this.accLeft = true;
        break;

      case cc.macro.KEY.right:
        this.accRight = true;
        break;
    }
  },
  onKeyUp: function onKeyUp(event) {
    // Unset a flag when key released
    switch (event.keyCode) {
      case cc.macro.KEY.a:
        this.accLeft = false;
        break;

      case cc.macro.KEY.d:
        this.accRight = false;
        break;

      case cc.macro.KEY.left:
        this.accLeft = false;
        break;

      case cc.macro.KEY.right:
        this.accRight = false;
        break;
    }
  },
  onLoad: function onLoad() {
    this.xSpeed = 0;
  },
  startGame: function startGame() {
    var jumpAction = this.runJumpAction();
    cc.tween(this.node).then(jumpAction).start(); // Acceleration direction switch

    this.accLeft = false;
    this.accRight = false; // The main character's current horizontal velocity
    // Initialize the keyboard input listening

    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
  },
  onDestroy: function onDestroy() {
    // Cancel keyboard input monitoring
    cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
  },
  start: function start() {},
  update: function update(dt) {
    // Update speed of each frame according to the current acceleration direction
    if (this.accLeft) {
      this.xSpeed -= this.accel * dt;
    } else if (this.accRight) {
      this.xSpeed += this.accel * dt;
    } // Restrict the movement speed of the main character to the maximum movement speed


    if (Math.abs(this.xSpeed) > this.maxMoveSpeed) {
      // If speed reach limit, use max speed with current direction
      this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed);
    } // Update the position of the main character according to the current speed


    this.node.x += this.xSpeed * dt;

    if (Math.abs(this.node.x) > 980 / 2) {
      this.node.x = 980 / 2 * this.node.x / Math.abs(this.node.x);
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxwbGF5ZXIuanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJqdW1wSGVpZ2h0IiwianVtcER1cmF0aW9uIiwibWF4TW92ZVNwZWVkIiwiYWNjZWwiLCJqdW1wQXVkaW8iLCJ0eXBlIiwiQXVkaW9DbGlwIiwicnVuSnVtcEFjdGlvbiIsImp1bXBVcCIsInR3ZWVuIiwiYnkiLCJ5IiwiZWFzaW5nIiwianVtcERvd24iLCJzZXF1ZW5jZSIsImNhbGwiLCJwbGF5SnVtcFNvdW5kIiwicmVwZWF0Rm9yZXZlciIsImF1ZGlvRW5naW5lIiwicGxheUVmZmVjdCIsIm9uS2V5RG93biIsImV2ZW50Iiwia2V5Q29kZSIsIm1hY3JvIiwiS0VZIiwiYSIsImFjY0xlZnQiLCJkIiwiYWNjUmlnaHQiLCJsZWZ0IiwicmlnaHQiLCJvbktleVVwIiwib25Mb2FkIiwieFNwZWVkIiwic3RhcnRHYW1lIiwianVtcEFjdGlvbiIsIm5vZGUiLCJ0aGVuIiwic3RhcnQiLCJzeXN0ZW1FdmVudCIsIm9uIiwiU3lzdGVtRXZlbnQiLCJFdmVudFR5cGUiLCJLRVlfRE9XTiIsIktFWV9VUCIsIm9uRGVzdHJveSIsIm9mZiIsInVwZGF0ZSIsImR0IiwiTWF0aCIsImFicyIsIngiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUFBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSO0FBQ0FDLElBQUFBLFVBQVUsRUFBRSxDQUZKO0FBR1I7QUFDQUMsSUFBQUEsWUFBWSxFQUFFLENBSk47QUFLUjtBQUNBQyxJQUFBQSxZQUFZLEVBQUUsQ0FOTjtBQU9SO0FBQ0FDLElBQUFBLEtBQUssRUFBRSxDQVJDO0FBVVJDLElBQUFBLFNBQVMsRUFBRTtBQUNQLGlCQUFTLElBREY7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Q0FBQ0MsR0FBTCxDQUFTLEtBQUtqQixNQUFkLElBQXdCLEtBQUsvQixZQUFqQyxFQUErQztBQUMzQztBQUNBLFdBQUsrQixNQUFMLEdBQWMsS0FBSy9CLFlBQUwsR0FBb0IsS0FBSytCLE1BQXpCLEdBQWtDZ0IsSUFBSSxDQUFDQyxHQUFMLENBQVMsS0FBS2pCLE1BQWQsQ0FBaEQ7QUFDSCxLQVhpQixDQWFsQjs7O0FBQ0EsU0FBS0csSUFBTCxDQUFVZSxDQUFWLElBQWUsS0FBS2xCLE1BQUwsR0FBY2UsRUFBN0I7O0FBQ0EsUUFBSUMsSUFBSSxDQUFDQyxHQUFMLENBQVMsS0FBS2QsSUFBTCxDQUFVZSxDQUFuQixJQUF3QixNQUFNLENBQWxDLEVBQXFDO0FBQ2pDLFdBQUtmLElBQUwsQ0FBVWUsQ0FBVixHQUFjLE1BQU0sQ0FBTixHQUFVLEtBQUtmLElBQUwsQ0FBVWUsQ0FBcEIsR0FBd0JGLElBQUksQ0FBQ0MsR0FBTCxDQUFTLEtBQUtkLElBQUwsQ0FBVWUsQ0FBbkIsQ0FBdEM7QUFDSDtBQUNKO0FBN0hJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIGNjLkNsYXNzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9jbGFzcy5odG1sXHJcbi8vIExlYXJuIEF0dHJpYnV0ZTpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5cclxuY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICAvLyBNYWluIGNoYXJhY3RlcidzIGp1bXAgaGVpZ2h0XHJcbiAgICAgICAganVtcEhlaWdodDogMCxcclxuICAgICAgICAvLyBNYWluIGNoYXJhY3RlcidzIGp1bXAgZHVyYXRpb25cclxuICAgICAgICBqdW1wRHVyYXRpb246IDAsXHJcbiAgICAgICAgLy8gTWF4aW1hbCBtb3ZlbWVudCBzcGVlZFxyXG4gICAgICAgIG1heE1vdmVTcGVlZDogMCxcclxuICAgICAgICAvLyBBY2NlbGVyYXRpb25cclxuICAgICAgICBhY2NlbDogMCxcclxuXHJcbiAgICAgICAganVtcEF1ZGlvOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkF1ZGlvQ2xpcFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgfSxcclxuICAgIHJ1bkp1bXBBY3Rpb24oKSB7XHJcbiAgICAgICAgLy8gSnVtcCB1cFxyXG4gICAgICAgIHZhciBqdW1wVXAgPSBjYy50d2VlbigpLmJ5KHRoaXMuanVtcER1cmF0aW9uLCB7IHk6IHRoaXMuanVtcEhlaWdodCB9LCB7IGVhc2luZzogJ3NpbmVPdXQnIH0pO1xyXG4gICAgICAgIC8vIEp1bXAgZG93blxyXG4gICAgICAgIHZhciBqdW1wRG93biA9IGNjLnR3ZWVuKCkuYnkodGhpcy5qdW1wRHVyYXRpb24sIHsgeTogLXRoaXMuanVtcEhlaWdodCB9LCB7IGVhc2luZzogJ3NpbmVJbicgfSk7XHJcblxyXG4gICAgICAgIC8vIENyZWF0ZSBhIGVhc2luZyBhbmQgcGVyZm9ybSBhY3Rpb25zIGluIHRoZSBvcmRlciBvZiBcImp1bXBVcFwiLCBcImp1bXBEb3duXCJcclxuICAgICAgICB2YXIgdHdlZW4gPSBjYy50d2VlbigpLnNlcXVlbmNlKGp1bXBVcCwganVtcERvd24pLmNhbGwodGhpcy5wbGF5SnVtcFNvdW5kLCB0aGlzKTtcclxuICAgICAgICAvLyBSZXBlYXRcclxuICAgICAgICByZXR1cm4gY2MudHdlZW4oKS5yZXBlYXRGb3JldmVyKHR3ZWVuKTtcclxuICAgIH0sXHJcbiAgICBwbGF5SnVtcFNvdW5kOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8gSW52b2tlIHNvdW5kIGVuZ2luZSB0byBwbGF5IHRoZSBzb3VuZFxyXG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3QodGhpcy5qdW1wQXVkaW8sIGZhbHNlKTtcclxuICAgIH0sXHJcbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcclxuXHJcbiAgICBvbktleURvd24oZXZlbnQpIHtcclxuICAgICAgICAvLyBTZXQgYSBmbGFnIHdoZW4ga2V5IHByZXNzZWRcclxuICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcclxuICAgICAgICAgICAgY2FzZSBjYy5tYWNyby5LRVkuYTpcclxuICAgICAgICAgICAgICAgIHRoaXMuYWNjTGVmdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBjYy5tYWNyby5LRVkuZDpcclxuICAgICAgICAgICAgICAgIHRoaXMuYWNjUmlnaHQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgY2MubWFjcm8uS0VZLmxlZnQ6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjY0xlZnQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgY2MubWFjcm8uS0VZLnJpZ2h0OlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hY2NSaWdodCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIG9uS2V5VXAoZXZlbnQpIHtcclxuICAgICAgICAvLyBVbnNldCBhIGZsYWcgd2hlbiBrZXkgcmVsZWFzZWRcclxuICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcclxuICAgICAgICAgICAgY2FzZSBjYy5tYWNyby5LRVkuYTpcclxuICAgICAgICAgICAgICAgIHRoaXMuYWNjTGVmdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgY2MubWFjcm8uS0VZLmQ6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjY1JpZ2h0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBjYy5tYWNyby5LRVkubGVmdDpcclxuICAgICAgICAgICAgICAgIHRoaXMuYWNjTGVmdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgY2MubWFjcm8uS0VZLnJpZ2h0OlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hY2NSaWdodCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy54U3BlZWQgPSAwO1xyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydEdhbWUoKSB7XHJcblxyXG4gICAgICAgIHZhciBqdW1wQWN0aW9uID0gdGhpcy5ydW5KdW1wQWN0aW9uKCk7XHJcbiAgICAgICAgY2MudHdlZW4odGhpcy5ub2RlKS50aGVuKGp1bXBBY3Rpb24pLnN0YXJ0KClcclxuXHJcbiAgICAgICAgLy8gQWNjZWxlcmF0aW9uIGRpcmVjdGlvbiBzd2l0Y2hcclxuICAgICAgICB0aGlzLmFjY0xlZnQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmFjY1JpZ2h0ID0gZmFsc2U7XHJcbiAgICAgICAgLy8gVGhlIG1haW4gY2hhcmFjdGVyJ3MgY3VycmVudCBob3Jpem9udGFsIHZlbG9jaXR5XHJcblxyXG5cclxuICAgICAgICAvLyBJbml0aWFsaXplIHRoZSBrZXlib2FyZCBpbnB1dCBsaXN0ZW5pbmdcclxuICAgICAgICBjYy5zeXN0ZW1FdmVudC5vbihjYy5TeXN0ZW1FdmVudC5FdmVudFR5cGUuS0VZX0RPV04sIHRoaXMub25LZXlEb3duLCB0aGlzKTtcclxuICAgICAgICBjYy5zeXN0ZW1FdmVudC5vbihjYy5TeXN0ZW1FdmVudC5FdmVudFR5cGUuS0VZX1VQLCB0aGlzLm9uS2V5VXAsIHRoaXMpO1xyXG5cclxuICAgIH0sXHJcblxyXG5cclxuXHJcbiAgICBvbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgLy8gQ2FuY2VsIGtleWJvYXJkIGlucHV0IG1vbml0b3JpbmdcclxuICAgICAgICBjYy5zeXN0ZW1FdmVudC5vZmYoY2MuU3lzdGVtRXZlbnQuRXZlbnRUeXBlLktFWV9ET1dOLCB0aGlzLm9uS2V5RG93biwgdGhpcyk7XHJcbiAgICAgICAgY2Muc3lzdGVtRXZlbnQub2ZmKGNjLlN5c3RlbUV2ZW50LkV2ZW50VHlwZS5LRVlfVVAsIHRoaXMub25LZXlVcCwgdGhpcyk7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICBzdGFydCgpIHtcclxuXHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xyXG4gICAgICAgIC8vIFVwZGF0ZSBzcGVlZCBvZiBlYWNoIGZyYW1lIGFjY29yZGluZyB0byB0aGUgY3VycmVudCBhY2NlbGVyYXRpb24gZGlyZWN0aW9uXHJcbiAgICAgICAgaWYgKHRoaXMuYWNjTGVmdCkge1xyXG4gICAgICAgICAgICB0aGlzLnhTcGVlZCAtPSB0aGlzLmFjY2VsICogZHQ7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmFjY1JpZ2h0KSB7XHJcbiAgICAgICAgICAgIHRoaXMueFNwZWVkICs9IHRoaXMuYWNjZWwgKiBkdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gUmVzdHJpY3QgdGhlIG1vdmVtZW50IHNwZWVkIG9mIHRoZSBtYWluIGNoYXJhY3RlciB0byB0aGUgbWF4aW11bSBtb3ZlbWVudCBzcGVlZFxyXG4gICAgICAgIGlmIChNYXRoLmFicyh0aGlzLnhTcGVlZCkgPiB0aGlzLm1heE1vdmVTcGVlZCkge1xyXG4gICAgICAgICAgICAvLyBJZiBzcGVlZCByZWFjaCBsaW1pdCwgdXNlIG1heCBzcGVlZCB3aXRoIGN1cnJlbnQgZGlyZWN0aW9uXHJcbiAgICAgICAgICAgIHRoaXMueFNwZWVkID0gdGhpcy5tYXhNb3ZlU3BlZWQgKiB0aGlzLnhTcGVlZCAvIE1hdGguYWJzKHRoaXMueFNwZWVkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFVwZGF0ZSB0aGUgcG9zaXRpb24gb2YgdGhlIG1haW4gY2hhcmFjdGVyIGFjY29yZGluZyB0byB0aGUgY3VycmVudCBzcGVlZFxyXG4gICAgICAgIHRoaXMubm9kZS54ICs9IHRoaXMueFNwZWVkICogZHQ7XHJcbiAgICAgICAgaWYgKE1hdGguYWJzKHRoaXMubm9kZS54KSA+IDk4MCAvIDIpIHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnggPSA5ODAgLyAyICogdGhpcy5ub2RlLnggLyBNYXRoLmFicyh0aGlzLm5vZGUueClcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG59KTtcclxuIl19
//------QC-SOURCE-SPLIT------

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
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/star.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '038b1Z8jkxFr5VQEcny1oNt', 'star');
// script/star.js

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
    pickRadius: 0
  },
  // LIFE-CYCLE CALLBACKS:
  // onLoad () {},
  getPlayerDistance: function getPlayerDistance() {
    // Determine the distance according to the position of the Player node
    var playerPos = this.game.player.getPosition(); // Calculate the distance between two nodes according to their positions

    var dist = this.node.position.sub(playerPos).mag();
    return dist;
  },
  onPicked: function onPicked() {
    // When the stars are being collected, invoke the interface in the Game script to generate a new star
    this.game.spawnNewStar(); // Invoke the scoring method of the Game script

    this.game.gainScore(); // Then destroy the current star's node

    this.node.destroy();
  },
  start: function start() {},
  // update
  update: function update(dt) {
    // Determine if the distance between the Star and main character is less than the collecting distance for each frame
    if (this.game.isGameOver) {
      return;
    }

    if (this.getPlayerDistance() < this.pickRadius) {
      // Invoke collecting behavior
      this.onPicked();
      return;
    }

    var opacityRatio = 1 - this.game.timer / this.game.starDuration;
    var minOpacity = 20;
    this.node.opacity = minOpacity + Math.floor(opacityRatio * (235 - minOpacity));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxzdGFyLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwicGlja1JhZGl1cyIsImdldFBsYXllckRpc3RhbmNlIiwicGxheWVyUG9zIiwiZ2FtZSIsInBsYXllciIsImdldFBvc2l0aW9uIiwiZGlzdCIsIm5vZGUiLCJwb3NpdGlvbiIsInN1YiIsIm1hZyIsIm9uUGlja2VkIiwic3Bhd25OZXdTdGFyIiwiZ2FpblNjb3JlIiwiZGVzdHJveSIsInN0YXJ0IiwidXBkYXRlIiwiZHQiLCJpc0dhbWVPdmVyIiwib3BhY2l0eVJhdGlvIiwidGltZXIiLCJzdGFyRHVyYXRpb24iLCJtaW5PcGFjaXR5Iiwib3BhY2l0eSIsIk1hdGgiLCJmbG9vciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLFVBQVUsRUFBRTtBQURKLEdBSFA7QUFPTDtBQUVBO0FBQ0FDLEVBQUFBLGlCQUFpQixFQUFFLDZCQUFZO0FBQzNCO0FBQ0EsUUFBSUMsU0FBUyxHQUFHLEtBQUtDLElBQUwsQ0FBVUMsTUFBVixDQUFpQkMsV0FBakIsRUFBaEIsQ0FGMkIsQ0FJM0I7O0FBQ0EsUUFBSUMsSUFBSSxHQUFHLEtBQUtDLElBQUwsQ0FBVUMsUUFBVixDQUFtQkMsR0FBbkIsQ0FBdUJQLFNBQXZCLEVBQWtDUSxHQUFsQyxFQUFYO0FBQ0EsV0FBT0osSUFBUDtBQUNILEdBakJJO0FBbUJMSyxFQUFBQSxRQUFRLEVBQUUsb0JBQVk7QUFDbEI7QUFDQSxTQUFLUixJQUFMLENBQVVTLFlBQVYsR0FGa0IsQ0FJbEI7O0FBQ0EsU0FBS1QsSUFBTCxDQUFVVSxTQUFWLEdBTGtCLENBT2xCOztBQUNBLFNBQUtOLElBQUwsQ0FBVU8sT0FBVjtBQUNILEdBNUJJO0FBOEJMQyxFQUFBQSxLQTlCSyxtQkE4QkcsQ0FFUCxDQWhDSTtBQWlDTDtBQUVBQyxFQUFBQSxNQUFNLEVBQUUsZ0JBQVVDLEVBQVYsRUFBYztBQUNsQjtBQUNBLFFBQUksS0FBS2QsSUFBTCxDQUFVZSxVQUFkLEVBQTBCO0FBQ3RCO0FBQ0g7O0FBQ0QsUUFBSSxLQUFLakIsaUJBQUwsS0FBMkIsS0FBS0QsVUFBcEMsRUFBZ0Q7QUFDNUM7QUFDQSxXQUFLVyxRQUFMO0FBQ0E7QUFDSDs7QUFDRCxRQUFJUSxZQUFZLEdBQUcsSUFBSSxLQUFLaEIsSUFBTCxDQUFVaUIsS0FBVixHQUFrQixLQUFLakIsSUFBTCxDQUFVa0IsWUFBbkQ7QUFDQSxRQUFJQyxVQUFVLEdBQUcsRUFBakI7QUFDQSxTQUFLZixJQUFMLENBQVVnQixPQUFWLEdBQW9CRCxVQUFVLEdBQUdFLElBQUksQ0FBQ0MsS0FBTCxDQUFXTixZQUFZLElBQUksTUFBTUcsVUFBVixDQUF2QixDQUFqQztBQUNIO0FBaERJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIGNjLkNsYXNzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9jbGFzcy5odG1sXHJcbi8vIExlYXJuIEF0dHJpYnV0ZTpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5cclxuY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBwaWNrUmFkaXVzOiAwLFxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcclxuXHJcbiAgICAvLyBvbkxvYWQgKCkge30sXHJcbiAgICBnZXRQbGF5ZXJEaXN0YW5jZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vIERldGVybWluZSB0aGUgZGlzdGFuY2UgYWNjb3JkaW5nIHRvIHRoZSBwb3NpdGlvbiBvZiB0aGUgUGxheWVyIG5vZGVcclxuICAgICAgICB2YXIgcGxheWVyUG9zID0gdGhpcy5nYW1lLnBsYXllci5nZXRQb3NpdGlvbigpO1xyXG5cclxuICAgICAgICAvLyBDYWxjdWxhdGUgdGhlIGRpc3RhbmNlIGJldHdlZW4gdHdvIG5vZGVzIGFjY29yZGluZyB0byB0aGVpciBwb3NpdGlvbnNcclxuICAgICAgICB2YXIgZGlzdCA9IHRoaXMubm9kZS5wb3NpdGlvbi5zdWIocGxheWVyUG9zKS5tYWcoKTtcclxuICAgICAgICByZXR1cm4gZGlzdDtcclxuICAgIH0sXHJcblxyXG4gICAgb25QaWNrZWQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyBXaGVuIHRoZSBzdGFycyBhcmUgYmVpbmcgY29sbGVjdGVkLCBpbnZva2UgdGhlIGludGVyZmFjZSBpbiB0aGUgR2FtZSBzY3JpcHQgdG8gZ2VuZXJhdGUgYSBuZXcgc3RhclxyXG4gICAgICAgIHRoaXMuZ2FtZS5zcGF3bk5ld1N0YXIoKTtcclxuXHJcbiAgICAgICAgLy8gSW52b2tlIHRoZSBzY29yaW5nIG1ldGhvZCBvZiB0aGUgR2FtZSBzY3JpcHRcclxuICAgICAgICB0aGlzLmdhbWUuZ2FpblNjb3JlKCk7XHJcblxyXG4gICAgICAgIC8vIFRoZW4gZGVzdHJveSB0aGUgY3VycmVudCBzdGFyJ3Mgbm9kZVxyXG4gICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXJ0KCkge1xyXG5cclxuICAgIH0sXHJcbiAgICAvLyB1cGRhdGVcclxuXHJcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xyXG4gICAgICAgIC8vIERldGVybWluZSBpZiB0aGUgZGlzdGFuY2UgYmV0d2VlbiB0aGUgU3RhciBhbmQgbWFpbiBjaGFyYWN0ZXIgaXMgbGVzcyB0aGFuIHRoZSBjb2xsZWN0aW5nIGRpc3RhbmNlIGZvciBlYWNoIGZyYW1lXHJcbiAgICAgICAgaWYgKHRoaXMuZ2FtZS5pc0dhbWVPdmVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuZ2V0UGxheWVyRGlzdGFuY2UoKSA8IHRoaXMucGlja1JhZGl1cykge1xyXG4gICAgICAgICAgICAvLyBJbnZva2UgY29sbGVjdGluZyBiZWhhdmlvclxyXG4gICAgICAgICAgICB0aGlzLm9uUGlja2VkKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIG9wYWNpdHlSYXRpbyA9IDEgLSB0aGlzLmdhbWUudGltZXIgLyB0aGlzLmdhbWUuc3RhckR1cmF0aW9uO1xyXG4gICAgICAgIHZhciBtaW5PcGFjaXR5ID0gMjA7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9wYWNpdHkgPSBtaW5PcGFjaXR5ICsgTWF0aC5mbG9vcihvcGFjaXR5UmF0aW8gKiAoMjM1IC0gbWluT3BhY2l0eSkpO1xyXG4gICAgfSxcclxufSk7XHJcbiJdfQ==
//------QC-SOURCE-SPLIT------
