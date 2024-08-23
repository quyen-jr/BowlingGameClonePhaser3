class DisplayUI {
    constructor(scene, graphics) {
        this.scene = scene
        this.graphics = graphics
        this.x = 0
        this.y = 253
        this.backButton = null
        

    }
    create(){
        
    }
    addNextTurnUI(x, y, round, px, isDisPlayTextGo,isAudio) {
        if(isAudio) if(!this.scene.startAudio.isPlaying) this.scene.startAudio.play()
        this.graphics.setDepth(5)
        var red = 41;
        var green = 253;
        var blue = 246;
        // Tạo màu từ giá trị RGB
        this.darkness = this.scene.add.rectangle(0, 0, 380, 710, 0x000000, 0.6).setOrigin(0, 0).setDepth(5);
        // this.darkness.setAlpha(0.3);

        var color = Phaser.Display.Color.GetColor(red, green, blue);
        var lineTop = this.scene.add.rectangle(-253, 253, 290, 2, color).setDepth(5).setOrigin(0, 0); //0,253
        var lineBottom = this.scene.add.rectangle(380, 445, 290, 2, color).setDepth(5).setOrigin(0, 0);//90,445
        var rect3 = this.scene.add.rectangle(0, 255, 380, 190, 0xFFFFFF, 0.3).setDepth(5).setOrigin(0, 0);//0 255

        var textRound = this.scene.add.text(x, y, round, {
            fontFamily: 'Fantasy', fontSize: px, fontWeight: 'bold', color: '#ff00ff', stroke: '#ffffff',
            strokeThickness: 5
        }).setDepth(5);
        textRound.setScale(0)

        var textGo = this.scene.add.text(120, 280, "GO!", {
            fontFamily: 'Fantasy', fontSize: '100px', fontWeight: 'bold', color: '#ff00ff', stroke: '#ffffff',
            strokeThickness: 5
        }).setDepth(5);
        textGo.visible = false
        this.canADDTextGO = false
        //ui appear
        let tweenLineTop = this.scene.tweens.add({
            targets: lineTop,
            scaleX: 1,
            scaleY: 1,
            x: 0,
            y: 253,
            duration: 600,
            ease: 'erase',
            repeat: 0,
            yoyo: false,
            onComplete: function () {
            }
        });
        let tweenLineBottom = this.scene.tweens.add({
            targets: lineBottom,
            scaleX: 1,
            scaleY: 1,
            x: 90,
            y: 445,
            duration: 600,
            ease: 'erase',
            repeat: 0,
            yoyo: false,
            onComplete: function () {
            }
        });


        this.scene.tweens.add({
            targets: textRound,
            scaleX: 1,
            scaleY: 1,
            duration: 300,
            ease: 'erase',
        });

        //  hide ui
        this.scene.time.delayedCall(2000, () => {
            let tweenLineTop = this.scene.tweens.add({
                targets: lineTop,
                scaleX: 1,
                scaleY: 1,
                x: -303,
                y: 253,
                duration: 600,
                ease: 'erase',
                repeat: 0,
                yoyo: false,
                onComplete: function () {

                }
            });
            let tweenLineBottom = this.scene.tweens.add({
                targets: lineBottom,
                scaleX: 1,
                scaleY: 1,
                x: 380,
                y: 445,
                duration: 600,
                ease: 'erase',
                repeat: 0,
                yoyo: false,
                onComplete: function () {
                }
            });
            this.scene.tweens.add({
                targets: textRound,
                scaleX: 1,
                scaleY: 1,
                x: 390,
                y: y,
                duration: 300,
                ease: 'Linear',
            });
            this.scene.tweens.add({
                targets: rect3,
                alpha: 0,
                duration: 1000,
                ease: 'Linear',
                onComplete: () => {

                }
            });
        }, null, this.scene);

        this.scene.time.delayedCall(2600, () => {
            this.scene.tweens.add({
                targets: this.darkness,
                alpha: 0,
                duration: 1000,
                ease: 'Linear',
                onComplete: function () {

                }
            });
            if (!isDisPlayTextGo) return
            textGo.visible = true
            this.scene.tweens.add({
                targets: textGo,
                alpha: 0,
                duration: 1500,
                ease: 'Linear',
                onComplete: () => { }
            })
            // dark ness

        }, null, this.scene);
        setTimeout(() => {

        }, 2600);
        this.scene.time.delayedCall(3000, () => {
            rect3.destroy()
            lineBottom.destroy()
            lineTop.destroy()
            textRound.destroy()
            textGo.destroy()
            this.scene.canPlay = true
        }, null, this.scene);
    }
    addScoreUI(x, y, round, px) {
        var textRound = this.scene.add.text(x, y, round, {
            fontFamily: 'Fantasy', fontSize: px, color: '#ff00ff', stroke: '#ffffff', strokeThickness: 1
        }).setDepth(5);
        this.scene.time.delayedCall(10, () => {
            textRound.destroy()
        }, null, this);
    }
    displayEndGameUI(playerScore, computerScore) {
        // check win or loss
        var text = null
        var max = playerScore
        for (let i = 0; i < computerScore.length; i++) {
            if (computerScore[i] > max) {
                text = "YOU LOSS"
                break
            } else if (computerScore[i] == max) {
                text = "   DRAW  "

            } else text = "YOU WIN "

        }
        if(!this.scene.endAudio.isPlaying) this.scene.endAudio.play()
        this.addNextTurnUI(50, 300, text, "80px", false)
        this.scene.time.delayedCall(3500, () => {
            if (this.backButton) this.backButton.visible = false
            this.darkness = this.scene.add.rectangle(0, 0, 380, 710, 0x000000, 0.8).setOrigin(0, 0).setDepth(5);
            var rect3 = this.scene.add.rectangle(0, 255, 380, 220, 0xFFFFFF, 0.3).setDepth(7).setOrigin(0, 0);
            // add button reload
            this.reload = this.scene.add.sprite(115, 300, "ui", "btn_play_01.png").setInteractive().setAlpha(0.9).setDepth(7).setDisplaySize(150, 50).setOrigin(0, 0);
            this.scene.add.text(155, 310, 'RELOAD', { fontFamily: 'Fantasy', fontSize: '25px' }).setDepth(7);
            this.reload.on('pointerover', () => { this.reload.setTint(0x808080) }, this);
            this.reload.on('pointerout', () => { this.reload.clearTint() }, this);
            this.reload.on('pointerdown', () => { this.reload.setTint("black"); this.reloadGame(); }, this);
            this.reload.on('pointerup', () => { this.reload.clearTint() }, this);
            // main menu
            this.home = this.scene.add.sprite(115, 370, "ui", "btn_play_01.png").setInteractive().setAlpha(0.9).setDepth(7).setDisplaySize(150, 50).setOrigin(0, 0);
            this.scene.add.text(135, 380, 'MAIN MENU', { fontFamily: 'Fantasy', fontSize: '25px' }).setDepth(7);
            this.home.on('pointerover', () => { this.home.setTint(0x808080) }, this);
            this.home.on('pointerout', () => { this.home.clearTint() }, this);
            this.home.on('pointerdown', () => { this.home.setTint("black"); this.mainMenu(); }, this);
            this.home.on('pointerup', () => { this.home.clearTint() }, this);

        }, null, this.scene);
    }
    mainMenu() {
        this.scene.clickAudio.play()
        this.scene.time.delayedCall(300, () => {
            this.scene.scene.start("startmenu")
        })
    }
    reloadGame() {
        this.scene.clickAudio.play()
        this.scene.time.delayedCall(300, () => {
            this.scene.scene.restart();
        })
    }
    addBackButton() {
        this.backButton = this.scene.add.sprite(315, 660, "ui", "btn_undo_icon.png").setInteractive().setAlpha(1).setDepth(7).setDisplaySize(70, 50).setOrigin(0, 0);
        this.backButton.on('pointerover', () => { this.backButton.setTint(0x808080) }, this);
        this.backButton.on('pointerout', () => { this.backButton.clearTint() }, this);
        this.backButton.on('pointerdown', () => { this.backButton.setTint("black"); this.mainMenu(); }, this);
        this.backButton.on('pointerup', () => { this.backButton.clearTint() }, this);
    }
}