class MainGame extends Phaser.Scene {
    constructor() {
        super("maingame")
    }
    preload() {
    }
    create() {
        // this.physics.world.setBounds(-20, 0,400, 710);
        this.graphics = this.add.graphics();
        this.UI = new DisplayUI(this, this.graphics)
        this.UI.addBackButton()
        this.graphics.setDepth(2)
        this.addBackGround();
        this.defaulScale = 0.5194999999999999
        this.defaulScale = 0.5194999999999999;

        //pin
        this.addPins();
        this.addAudio()
        this.pinHasCollide = []; //  prevent collide many times with ball : just 1 for 1 pin 
        this.pinIsFly = []; // check  if pin can  collide with another pin if it   collided by ball before
        this.pinIsFall = []; // if pin  is falling and collide with rectangle  ground
        for (let i = 0; i < this.pin.length; i++) {
            this.pinHasCollide[i] = false;
            this.pinIsFly[i] = false;
            this.pinIsFall[i] = false;

        }
        this.pin.forEach(element => {
            // console.log(element.body)
            element.setMass(0.5);
            //   element.setFriction(0)
            element.setSize(30, 30);
            element.setOffset(100, 140);
            element.body.allowGravity = false;
        });
        this.pin[7].setOffset(100, 40);
        this.ball = this.physics.add.sprite(180, 600, "ball");
        this.ball.setScale(this.defaulScale);
        this.ball.setInteractive()
        this.ball.setDepth(4)
        this.ball.body.friction = 0.075
        this.ball.setBounce(0.1);
        this.ball.body.isCircle = true;
        this.ball.body.allowGravity = false
        this.ballIsOut = false
        //    this.ball.frame.name="ball002"
        this.ball.setFrame("ball001")

        this.ballShadow = this.add.sprite(180, 650, "main", "ball_shadow_mirror.png");
        this.defaulScaleShadow = this.defaulScale + 0.15;
        this.ballShadow.setScale(this.defaulScaleShadow).setDepth(3);
        this.ballShadow.y = this.ball.y + this.ball.displayHeight / 1.5;
        this.ballShadow.setTint(0x000000);
        this.ball.setMass(3)
        this.scale = 0.14
        // this.minVelocityWhenMove = 0;

        this.line = new Phaser.Geom.Line(130, 80, -100, 650);
        this.line2 = new Phaser.Geom.Line(250, 80, 480, 650);
        // graphics.setDepth(5);
        this.dragStartTime = 0;
        this.dragEndTime = 0;
        this.input.on("pointerdown", this.startDrag, this);
        this.input.on("pointermove", this.doDrag, this);
        this.input.on("pointerup", this.releaseDrag, this);
        this.input.on('gameout', this.mouseOutOfGame)

        this.MINLeftY = 70
        this.MINLeftX = 120
        this.MINRightY = 70
        this.MINRightX = 260
        this.currentVelocity = { x: 0, y: 0 }
        this.startPos = {
            x: 0,
            y: 0
        }
        this.finalPos = {
            x: 0,
            y: 0
        }
        this.isPushBall = false
        this.speed = 2
        this.dragDuration = 0;
        this.maxTimeToDrag = 2// if time  pass this it will be reset to 2
        this.line.isCircle = true;
        //
        this.isOutSide = false
        this.ballIsRun = false
        this.turnPlay = 1
        this.goToNewTurn = false
        // 
        this.pointerIsDown = false
        this.pointerIsMove = false
        this.addRectangleGRound();
        //ui
        this.scorePlayer = 0
        this.hasDisplayRound1UI = false
        this.hasDisplayRound3UI = false
        this.hasDisplayRound2UI = false
        this.round2IsDone = false
        this.round1IsDone = false
        this.round3IsDone = false
        this.totalScorePlayer = 0
        // this.round2HasDone=false
        this.canPlay = false// can move ball after display ui
        //computer
        this.scoreComPuter = 0
        this.turnComputer = false
        this.hasDisplayRound1UIComputer = false
        this.hasDisplayRound2UIComputer = false
        this.computerRound2IsDone = false
        this.computerRound1IsDone = false
        this.totalScoreComputer = [0, 0, 0, 0]
        this.aiCount = 1
        this.totalAi = totalAI
        // end game
        this.isReset = false
        this.totalTurn = (this.totalAi + 1)*3;
        this.turnHasPlay = 0
        this.hasDisPlayEndUI = false
    }
    addAudio() {
        this.sweeper = this.sound.add('SE_Sweeper.m4a');
        this.ballCollidePinAudio = this.sound.add('SE_1pin.m4a');
        this.pinCollidePinAudio = this.sound.add('SE_1pin_3.m4a');
        this.gutterAudio = this.sound.add('SE_Gutter.m4a');
        this.rollBallAudio = this.sound.add('SE_Ball_roll.m4a');
        this.clickAudio = this.sound.add("clickButton")
        this.startAudio=this.sound.add("SE_Start.m4a")
        this.endAudio=this.sound.add("SE_Cheers_Strike.m4a")
    }
    addPins() {
        this.pin = [];
        this.pin[9] = this.physics.add.sprite(204, 78, "main", "pin_anime.png").setScale(0.33).setDepth(3);
        this.pin[8] = this.physics.add.sprite(175, 78, "main", "pin_anime.png").setScale(0.33).setDepth(3);
        this.pin[7] = this.physics.add.sprite(190, 100, "main", "pin_anime.png").setScale(0.33).setDepth(3).setOffset(100, 40);
        this.pin[6] = this.physics.add.sprite(240, 75, "main", "pin_anime.png").setScale(0.33).setDepth(3);
        this.pin[5] = this.physics.add.sprite(140, 75, "main", "pin_anime.png").setScale(0.33).setDepth(3);
        this.pin[4] = this.physics.add.sprite(156, 90, "main", "pin_anime.png").setScale(0.33).setDepth(3);
        this.pin[3] = this.physics.add.sprite(224, 90, "main", "pin_anime.png").setScale(0.33).setDepth(3);
        this.pin[2] = this.physics.add.sprite(207, 105, "main", "pin_anime.png").setScale(0.33).setDepth(3);
        this.pin[1] = this.physics.add.sprite(173, 105, "main", "pin_anime.png").setScale(0.33).setDepth(3);
        this.pin[0] = this.physics.add.sprite(190, 120, "main", "pin_anime.png").setScale(0.36).setDepth(3);
    }
    resetPin() {

        setTimeout(() => {
            this.pin.forEach(element => {
                element.destroy()
            });
            this.addPins()
            for (let i = 0; i < this.pin.length; i++) {
                this.pinHasCollide[i] = false;
                this.pinIsFly[i] = false;
                this.pinIsFall[i] = false;
                this.pin[i].body.allowGravity = false;
            }
            this.pin.forEach(element => {
                // console.log(element.body)
                element.setMass(0.5);
                //   element.setFriction(0)
                element.setSize(30, 30);
                element.setOffset(100, 140);
            });
            this.pin[7].setOffset(100, 40);
            this.isReset = false
        }, 1500);

    }
    addRectangleGRound() {
        this.rectangle = this.physics.add.sprite(200, 160, "ball").setDepth(1).setScale(0.5);
        this.rectangle.body.allowGravity = false;
        this.rectangle.body.setImmovable(true);
        this.rectangle.setSize(900, 10);
        this.rectangle2 = this.physics.add.sprite(200, 145, "ball").setDepth(1).setScale(0.5);
        this.rectangle2.body.allowGravity = false;
        this.rectangle2.body.setImmovable(true);
        this.rectangle2.setSize(900, 10);
        this.rectangle3 = this.physics.add.sprite(200, 130, "ball").setDepth(1).setScale(0.5);
        this.rectangle3.body.allowGravity = false;
        this.rectangle3.body.setImmovable(true);
        this.rectangle3.setSize(900, 10);
        this.rectangle4 = this.physics.add.sprite(200, 110, "ball").setDepth(0).setScale(0.5);
        this.rectangle4.body.allowGravity = false;
        this.rectangle4.body.setImmovable(true);
        this.rectangle4.setSize(900, 10);
    }

    addBackGround() {
        this.topBg2 = this.add.sprite(190, 45, "assets", "bg_lane_04_1.png").setDepth(1);
        this.topBg2.setScale(0.52).setOrigin(0.5, 0.5).setDisplaySize(380, 90);
        this.topBg = this.add.sprite(190, 55, "assets", "bg_lane_04_1.png").setDepth(1);
        this.topBg.setScale(0.52).setOrigin(0.5, 0.5).setDisplaySize(380, 90);
        this.add.sprite(190, 420, "assets", "bg_lane_01_1.png").setScale(0.51).setOrigin(0.5, 0.5).setDepth(3)
        this.add.sprite(190, 255, "assets", "img_bglight.png").setScale(1.02).setOrigin(0.5, 0.5).setDepth(3)
    }

    update() {
        this.graphics.clear();
        if (this.turnHasPlay == this.totalTurn) {
            if (!this.hasDisPlayEndUI) {
                this.UI.displayEndGameUI(this.totalScorePlayer, this.totalScoreComputer)
                this.hasDisPlayEndUI = true
            }
            return
        }
        this.UI.addScoreUI(10, 20, "YOUR  SCORE  :  " + this.totalScorePlayer, '15px')
        this.UI.addScoreUI(280, 20, "AI SCORE  :  " + this.totalScoreComputer[1], '15px')
        if (this.totalAi >= 2)
            this.UI.addScoreUI(280, 40, "AI2 SCORE  :  " + this.totalScoreComputer[2], '15px')
        if (this.totalAi == 3)
            this.UI.addScoreUI(280, 60, "AI3 SCORE  :  " + this.totalScoreComputer[3], '15px')
        if (this.isReset) return
        this.logicOfPlayer()
        if (this.turnHasPlay == this.totalTurn) return
        this.logicOfComputer()

        //this.ball.b.setVelocity(this.currentVelocity.x, this.currentVelocity.y)
        this.checkCollisionBetweenBallAndPins();
        this.checkCollisionPinWithGround();
        this.checkIfBallOutOFGroundGame();
        this.checkCollideBallWithGroundSide()
        this.modifyScaleWhenBallMoving();
    }
    updateScore() {
        this.totalScorePlayer += this.scorePlayer
        this.scorePlayer = 0
        this.totalScoreComputer[this.aiCount] += this.scoreComPuter
        this.scoreComPuter = 0
    }
    resetComputer() {
        this.resetPin()
        this.scoreComPuter = 0
        this.turnComputer = true
        this.hasDisplayRound1UIComputer = false
        this.hasDisplayRound2UIComputer = false
        this.computerRound2IsDone = false
        this.computerRound1IsDone = false
    }
    logicOfPlayer() {
        if (!this.turnComputer) {
            if (this.round1IsDone && this.scorePlayer == 10) {
                this.scorePlayer = 15
                this.turnHasPlay += 1
                this.resetGame()
                this.updateScore()
                this.convertToComputerTurn()
                return
            }
            if (this.round2IsDone) {
                if (this.scorePlayer == 10) this.scorePlayer = 15
                this.turnHasPlay += 1
                this.resetGame()
                this.updateScore()
                this.convertToComputerTurn()
            }
            if (!this.hasDisplayRound1UI) {// display turn  1 ui
                this.UI.addNextTurnUI(30, 290, "Round 1", '100px', true,true)
                this.hasDisplayRound1UI = true
            }
            if (this.goToNewTurn) {// aplly for computer and player
                this.resetGame()
                //  when player finish turn 1
                if (!this.hasDisplayRound2UI && this.round1IsDone) {
                    this.updateScore()
                    this.UI.addNextTurnUI(30, 290, "Round 2", '100px', true,true)
                    this.hasDisplayRound2UI = true
                }
                this.goToNewTurn = false;

            }
        }
    }
    logicOfComputer() {
        if (this.turnComputer) {
            if (this.computerRound1IsDone && this.scoreComPuter == 10) {
                this.scoreComPuter = 15
                this.turnHasPlay += 1
                this.resetGame()
                this.updateScore()
                if (this.aiCount < this.totalAi) {
                    this.aiCount++
                    this.resetComputer()
                } else this.convertToPlayerTurn()
                return
            }
            if (this.computerRound2IsDone) {
                if (this.scoreComPuter == 10) this.scoreComPuter = 15
                this.turnHasPlay += 1
                this.resetGame()
                this.updateScore()
                if (this.aiCount < this.totalAi) {
                    this.aiCount++
                    this.resetComputer()
                } else this.convertToPlayerTurn()
                return
            }
            if (!this.hasDisplayRound1UIComputer) {// display turn  1 ui
                this.hasDisplayRound1UIComputer = true
                this.UI.addNextTurnUI(20, 300, "AI" + this.aiCount + " Round 1", '70px',false,true)
                console.log(this.hasDisplayRound1UIComputer)
            }
            if (this.canPlay && !this.isPushBall) {
                this.isPushBall = true
                this.startPos.x = this.ball.x
                this.startPos.y = this.ball.y
                this.finalPos.x = Math.floor(Math.random() * (230 - 150) + 150) + 10;
                this.finalPos.y = Math.floor(Math.random() * (150 - 70 + 1)) + 70;
                //this.dragDuration=Math.
                const minTime = 1.3 * 1000; // chuyển đổi thành mili giây
                const maxTime = 2 * 1000;   // chuyển đổi thành mili giây
                const randomTime = Math.random() * (maxTime - minTime) + minTime;
                this.dragDuration = randomTime / 1000
                this.pushBall()
            }
            if (this.goToNewTurn) {
                this.resetGame()
                if (!this.hasDisplayRound2UIComputer && this.computerRound1IsDone) {
                    this.updateScore()
                    this.UI.addNextTurnUI(20, 300, "AI" + this.aiCount + " Round 2", '70px',false,true)
                    this.hasDisplayRound2UIComputer = true
                }
                this.goToNewTurn = false;
            }
        }
    }
    convertToComputerTurn() {
        this.isReset = true
        this.resetPin()
        this.turnComputer = true
        this.hasDisplayRound1UIComputer = false
        this.hasDisplayRound2UIComputer = false
        this.hasDisplayRound3UIComputer = false
        this.computerRound2IsDone = false
        this.computerRound1IsDone = false
        this.computerRound3IsDone = false
        this.goToNewTurn = false
        this.scoreComPuter = 0
    }
    convertToPlayerTurn() {
        this.isReset = true
        this.resetPin()
        this.turnComputer = false
        this.hasDisplayRound1UI = false
        this.hasDisplayRound2UI = false
        this.round2IsDone = false
        this.round1IsDone = false
        this.goToNewTurn = false
        this.scorePlayer = 0
    }
    modifyScaleWhenBallMoving() {
        this.ballShadow.x = this.ball.x;
        this.ballShadow.y = this.ball.y + this.ball.displayHeight / 1.5;
        if (this.ball.y < 650) {
            this.scale = (650 - this.ball.y) / 0.5 * 0.00033;
            this.ball.setScale(this.defaulScale - this.scale);
            this.ballShadow.setScale(this.defaulScaleShadow - this.scale - 0.1);
        }
    }

    checkCollisionPinWithGround() {
        this.checkCollidePinAndPin();
        this.addCollisionWithGround(this.rectangle, this.pin[0], 0);
        this.addCollisionWithGround(this.rectangle2, this.pin[1], 1);
        this.addCollisionWithGround(this.rectangle2, this.pin[2], 2);
        this.addCollisionWithGround(this.rectangle3, this.pin[3], 3);
        this.addCollisionWithGround(this.rectangle3, this.pin[4], 4);
        for (let i = 5; i < this.pin.length; i++) {
            this.addCollisionWithGround(this.rectangle4, this.pin[i], i);
        }
    }

    resetGame() {
        this.ball.setFrame("ball001");
        this.pointerIsDown = false;
        this.ball.setPosition(180, 600);
        this.ball.setDepth(4);
        this.ball.stop();
        this.ball.setScale(this.defaulScale);
        this.ballShadow.setDepth(4);
        this.ballShadow.setPosition(180, 650);
        this.ball.body.setVelocity(0, 0);
        this.ballShadow.visible = true;
        this.ballIsOut = false;
        this.ballIsRun = false;
        this.startPos.x = 0;
        this.startPos.y = 0;
        this.finalPos.x = 0;
        this.finalPos.y = 0;
        this.isPushBall = false;
        this.dragStartTime = 0;
        this.dragEndTime = 0;
        this.isOutSide = false;
    }

    checkCollidePinAndPin() {
        if (this.pinIsFly[1]) {
            this.addCollidePinvsPin(this.pin[1], this.pin[4])
        }
        if (this.pinIsFly[2]) {
            this.addCollidePinvsPin(this.pin[2], this.pin[3])
        }
        if (this.pin[3].body.velocity.y != 0) {
            this.addCollidePinvsPin(this.pin[3], this.pin[6])
        }
        if (this.pin[4].body.velocity.y != 0) {
            this.addCollidePinvsPin(this.pin[4], this.pin[5])
        }
    }
    addCollidePinvsPin(obj1, obj2) {
        this.physics.world.overlap(obj1, obj2, (object1, object2) => {
            if (!this.pinCollidePinAudio.isPlaying)
                this.pinCollidePinAudio.play()
            //    console.log("pin vs pin")
            var ballRight = object1.x + object1.displayWidth;
            var ballLeft = object1.x;
            var squareRight = object2.x + object2.displayWidth;
            var squareLeft = object2.x;
            if (ballRight >= squareLeft && ballRight < squareRight && ballLeft < squareLeft) {
                object2.body.setVelocity(Math.abs(object1.body.velocity.y), object1.body.velocity.y);
                object2.body.angularVelocity = -object2.body.velocity.y * 5;
            } else {
                object2.body.setVelocity(-Math.abs(object1.body.velocity.y), object1.body.velocity.y);
                object2.body.angularVelocity = object2.body.velocity.y * 5;
            }
            setTimeout(() => {
                object2.body.allowGravity = true;
            }, 200);
        })
    }
    checkCollisionBetweenBallAndPins() {
        if (this.ballIsOut)
            return
        for (let i = 0; i < this.pin.length; i++) {
            this.physics.world.overlap(this.ball, this.pin[i], (object1, object2) => {
                if (this.pinHasCollide[i]) return;
                if (this.pinIsFall[i]) return 
                this.pinHasCollide[i] = true;
                this.pinIsFly[i] = true
                if (!this.ballCollidePinAudio.isPlaying)
                    this.ballCollidePinAudio.play()
                if (this.ballCollidePinAudio.isPlaying&&!this.pinCollidePinAudio.isPlaying)
                    this.pinCollidePinAudio.play()
      
                //  console.log('Overlap occurred between sprite1 and sprites2Array[' + i + ']');

                // check  rotate left or right
                var ballRight = object1.x + object1.displayWidth;
                var ballLeft = object1.x;
                var squareRight = object2.x + object2.displayWidth;
                var squareLeft = object2.x;
                if (ballRight >= squareLeft && ballRight < squareRight && ballLeft < squareLeft) {
                    //  console.log(object2.displayWidth)
                    object2.body.setVelocity(Math.abs(this.ball.body.velocity.y / 8), this.ball.body.velocity.y / 4);
                    object2.body.angularVelocity = -object2.body.velocity.y * 5;
                } else {
                    //  console.log(2)
                    object2.body.setVelocity(-Math.abs(this.ball.body.velocity.y / 8), this.ball.body.velocity.y / 4);
                    object2.body.angularVelocity = object2.body.velocity.y * 5;
                }
                //  object2.body.angularVelocity = object2.body.velocity.y * 5;
                this.time.delayedCall(200, () => {
                    object2.body.allowGravity = true;
                }, null, this);
            }, null, this);

        }
    }

    checkIfBallOutOFGroundGame() {
        // console.log(this.ball.y)
        if (this.ball.y <= 110) {
            if (!this.sweeper.isPlaying && !this.ballIsOut)
                this.sweeper.play()
        }
        if (this.ball.y <= 75) {
            this.ball.body.setVelocity(0, 0);
            this.ball.setDepth(2);
            this.ballShadow.setDepth(2);
            this.ball.body.setVelocity(0, 80);
            this.ball.setScale(this.defaulScale - 0.00033);
            this.ballIsOut = true
        }
        if (this.ballIsOut) {
            this.time.delayedCall(1500, () => {
                this.turnPlay++
                for (let i = 0; i < this.pin.length; i++) {
                    if (this.pinIsFall[i])
                        this.pin[i].visible = false
                }
                if (this.hasDisplayRound2UI && this.ballIsOut && !this.turnComputer)
                    this.round2IsDone = true
                if (this.hasDisplayRound1UI && this.ballIsOut && !this.turnComputer)
                    this.round1IsDone = true

                if (this.hasDisplayRound2UIComputer && this.ballIsOut && this.turnComputer)
                    this.computerRound2IsDone = true
                if (this.hasDisplayRound1UIComputer && this.ballIsOut && this.turnComputer)
                    this.computerRound1IsDone = true

                this.goToNewTurn = true
                this.canPlay = false
            }, null, this);
        }
    }
    checkCollideBallWithGroundSide() {
      //  console.log(this.ball.body.velocity.x)
        if (Phaser.Geom.Intersects.LineToCircle(this.line, 
            new Phaser.Geom.Circle(this.ball.x+ this.ball.body.velocity.x/10, this.ball.y+ this.ball.body.velocity.y/10, this.ball.displayWidth / 10))) {
                if (this.isOutSide) return
                if (!this.gutterAudio.isPlaying)
                    this.gutterAudio.play()
        }
        if (Phaser.Geom.Intersects.LineToCircle(this.line, new Phaser.Geom.Circle(this.ball.x, this.ball.y, this.ball.displayWidth / 10))) {
            if (this.isOutSide) return
       
            this.isOutSide = true
            console.log('Va chạm xảy ra!');
            this.time.delayedCall(45, () => {
                this.ballShadow.visible = false
                const currentVelocityY = this.ball.body.velocity.y
                this.ball.body.setVelocity(0, 0)
                const currentHeight = this.ball.y - this.MINLeftY;
                const newX = this.MINLeftX - (currentHeight / 0.5) * 0.22;
                this.ball.x = newX;
                var reduceSpeed = 1.2
                this.ball.body.setVelocity(-0.22 * (currentVelocityY / reduceSpeed), 0.5 * (currentVelocityY / reduceSpeed));
                this.currentVelocity.x = -0.22 * (currentVelocityY / reduceSpeed)
                this.currentVelocity.y = 0.5 * (currentVelocityY / reduceSpeed)
            }, null, this);
        }
        if (Phaser.Geom.Intersects.LineToCircle(this.line2, 
            new Phaser.Geom.Circle(this.ball.x+ this.ball.body.velocity.x/10, this.ball.y+ this.ball.body.velocity.y/10, this.ball.displayWidth / 10))) {
                if (this.isOutSide) return
                if (!this.gutterAudio.isPlaying)
                    this.gutterAudio.play()
        }
        if (Phaser.Geom.Intersects.LineToCircle(this.line2, new Phaser.Geom.Circle(this.ball.x, this.ball.y, this.ball.displayWidth / 10))) {
            if (this.isOutSide) return
            this.isOutSide = true
            // if (!this.gutterAudio.isPlaying)
            //     this.gutterAudio.play()
            console.log('Va chạm xảy ra!');
            this.time.delayedCall(45, () => {
                this.ballShadow.visible = false
                const currentVelocityY = this.ball.body.velocity.y
                this.ball.body.setVelocity(0, 0)
                const currentHeight = this.ball.y - this.MINRightY;
                const newX = this.MINRightX + (currentHeight / 0.5) * 0.22;
                this.ball.x = newX;
                var reduceSpeed = 1.2
                this.ball.body.setVelocity(0.22 * (currentVelocityY / reduceSpeed), 0.5 * (currentVelocityY / reduceSpeed));
                this.currentVelocity.x = 0.22 * (currentVelocityY / reduceSpeed)
                this.currentVelocity.y = 0.5 * (currentVelocityY / reduceSpeed)
            }, null, this);

        }
    }
    addCollisionWithGround(rectangle, obj, index) {
        this.physics.world.collide(rectangle, obj, function (object1, object2) {
            if (this.pinIsFall[index]) return
            if (this.turnComputer) this.scoreComPuter += 1
            if (!this.turnComputer) this.scorePlayer += 1
            object2.body.setVelocity(0, 0)
            this.pinIsFall[index] = true
            this.pinIsFly[index] = false
            object2.body.angularVelocity = 0
        }, null, this);
    }
    mouseOutOfGame() {
        //console.log(1)
    }
    startDrag(pointer, targets) {
        if (this.turnHasPlay == this.totalTurn) return
        if (this.turnComputer) return
        if (!this.canPlay) return
        this.pointerIsDown = true
        if (this.ballIsRun) return
        this.dragObj = targets[0];
        if (this.dragObj) {
            this.startPos.x = pointer.x
            this.startPos.y = pointer.y
            this.dragStartTime = this.time.now;
        }
    }

    doDrag(pointer) {
        if (this.turnHasPlay == this.totalTurn) return
        if (this.turnComputer) return
        if (!this.canPlay) return
        if (!this.pointerIsDown) return
        if (this.ballIsRun) return
        if (this.dragObj) {
            this.finalPos.x = pointer.x
            this.finalPos.y = pointer.y
            if (this.finalPos.y == this.startPos.y || this.finalPos.y > this.startPos.y) {
                this.startPos.y = this.finalPos.y;
                this.startPos.x = this.finalPos.x;
                this.finalPos.y = 0;
                this.finalPos.x = 0;
                this.dragStartTime = this.time.now;
            }
            // console.log(this.finalPos.y)
            if (pointer.y > 450) {
                this.dragObj.y = pointer.y;
                this.dragObj.x = pointer.x;

            } else {
                var distanceHasDraged = this.calculateDistance2D(this.startPos.x, this.startPos.y, this.finalPos.x, this.finalPos.y);
                if (!this.isPushBall && this.finalPos.y != 0 && distanceHasDraged > 25) {
                    this.dragEndTime = this.time.now;
                    this.dragDuration = ((this.dragEndTime - this.dragStartTime) / 1000);
                    if (this.dragDuration >= 1)
                        this.dragDuration = 1
                    this.dragDuration = this.maxTimeToDrag - this.dragDuration
                    this.pushBall()
                    this.isPushBall = true
                    this.ballIsRun = true
                }
            }
        }
    }
    releaseDrag(pointer) {
        if (this.turnHasPlay == this.totalTurn) return
        if (this.turnComputer) return
        if (!this.canPlay) return
        if (this.ballIsRun) return
        var distanceHasDraged = this.calculateDistance2D(this.startPos.x, this.startPos.y, this.finalPos.x, this.finalPos.y);
        if (!this.isPushBall && this.finalPos.y != 0 && distanceHasDraged > 25) {
            this.dragEndTime = this.time.now;
            this.dragDuration = ((this.dragEndTime - this.dragStartTime) / 1000);
            if (this.dragDuration >= 1)
                this.dragDuration = 1
            this.dragDuration = this.maxTimeToDrag - this.dragDuration
            this.pushBall()
            this.isPushBall = true
            this.ballIsRun = true
        }
        this.dragObj = null;
    }
    pushBall() {
        if (!this.rollBallAudio.isPlaying)
            this.rollBallAudio.play()
        this.time.delayedCall(45, () => {
            var distanceHasDraged = this.calculateDistance2D(this.startPos.x, this.startPos.y, this.finalPos.x, this.finalPos.y);
            if (distanceHasDraged < 160) distanceHasDraged = 160
            if (distanceHasDraged > 270) distanceHasDraged = 270
            const directionX = this.finalPos.x - this.startPos.x;
            const directionY = this.finalPos.y - this.startPos.y;
            const angle = Math.atan2(directionY, directionX);
            this.ball.body.setVelocity(Math.cos(angle) * distanceHasDraged * this.dragDuration, Math.sin(angle) * distanceHasDraged * this.dragDuration);
            //  console.log(this.dragDuration)
            this.currentVelocity.x = this.ball.body.velocity.x
            this.currentVelocity.y = this.ball.body.velocity.y
            this.minVelocityWhenMove = Math.abs(this.ball.body.velocity.y / 100 * 20)
            this.ball.anims.timeScale = Math.abs(this.ball.body.velocity.y / 100) + 0.5;
            this.ball.play("ball_anim")
        })

    }
    calculateDistance2D(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }
    drawRoad() {
        this.road.draw(this.graphics)
        //    this.road2.draw(this.graphics)
    }
}