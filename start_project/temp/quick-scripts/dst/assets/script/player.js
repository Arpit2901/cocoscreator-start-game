
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