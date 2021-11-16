// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

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
            default: null,
            type: cc.AudioClip
        },

    },
    runJumpAction() {
        // Jump up
        var jumpUp = cc.tween().by(this.jumpDuration, { y: this.jumpHeight }, { easing: 'sineOut' });
        // Jump down
        var jumpDown = cc.tween().by(this.jumpDuration, { y: -this.jumpHeight }, { easing: 'sineIn' });

        // Create a easing and perform actions in the order of "jumpUp", "jumpDown"
        var tween = cc.tween().sequence(jumpUp, jumpDown).call(this.playJumpSound, this);
        // Repeat
        return cc.tween().repeatForever(tween);
    },
    playJumpSound: function () {
        // Invoke sound engine to play the sound
        cc.audioEngine.playEffect(this.jumpAudio, false);
    },
    // LIFE-CYCLE CALLBACKS:

    onKeyDown(event) {
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

    onKeyUp(event) {
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

    onLoad() {
        this.xSpeed = 0;
    },

    startGame() {

        var jumpAction = this.runJumpAction();
        cc.tween(this.node).then(jumpAction).start()

        // Acceleration direction switch
        this.accLeft = false;
        this.accRight = false;
        // The main character's current horizontal velocity


        // Initialize the keyboard input listening
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);

    },



    onDestroy() {
        // Cancel keyboard input monitoring
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },


    start() {

    },


    update: function (dt) {
        // Update speed of each frame according to the current acceleration direction
        if (this.accLeft) {
            this.xSpeed -= this.accel * dt;
        } else if (this.accRight) {
            this.xSpeed += this.accel * dt;
        }
        // Restrict the movement speed of the main character to the maximum movement speed
        if (Math.abs(this.xSpeed) > this.maxMoveSpeed) {
            // If speed reach limit, use max speed with current direction
            this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed);
        }

        // Update the position of the main character according to the current speed
        this.node.x += this.xSpeed * dt;
        if (Math.abs(this.node.x) > 980 / 2) {
            this.node.x = 980 / 2 * this.node.x / Math.abs(this.node.x)
        }
    },
});
