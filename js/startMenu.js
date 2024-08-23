class StartMenu extends Phaser.Scene{
    constructor(){
        super("startmenu")
    }
    create(){
        this.add.sprite(190, 710, "assets", "bg_lane_01_1.png").setScale(0.51).setOrigin(0.5, 0.5).setDepth(6)//btn_undo_icon.png
        this.add.sprite(190, 200, "assets", "bg_lane_04_1.png").setDepth(1).setDisplaySize(380,400);
        this.add.sprite(190, 150, "main", "ui_title.png").setDepth(6).setScale(0.4);
        this.darkness = this.add.rectangle(0, 0, 380, 710, 0x000000, 0.3).setOrigin(0, 0).setDepth(5);
        ///
        this.startButton = this.add.sprite(190, 320, "ui", "btn_play_01.png").setInteractive().setAlpha(0.9).setDepth(7).setDisplaySize(150,50);
        this.playGameText=this.add.text(137, 305, 'PLAY GAME', { fontFamily: 'Fantasy', fontSize: '25px' }).setDepth(7);
        this.startButton.on('pointerover', () => { this.startButton.setTint(0x808080)}, this);
        this.startButton.on('pointerout', () => {  this.startButton.clearTint()}, this);
        this.startButton.on('pointerdown', this.startGame, this);
        this.startButton.on('pointerup', () => { this.startButton.clearTint() }, this);
        //
        this.clickAudio=this.sound.add("clickButton")
        this.audio= this.sound.add('BGM_match.m4a');
        if(!this.audio.isPlaying) this.audio.play()
    }
    startGame(){
        this.startButton.setTint("black")
        this.clickAudio.play()
        this.time.delayedCall(300, () => {
            this.startButton.visible=false
            this.playGameText.visible=false
            this.displayOptionalMenu()
        })
    }
    playOnevsOne(){
        this.onevsone.setTint("black")
        totalAI=1
        this.audio.stop()
        this.clickAudio.play()
        this.time.delayedCall(300, () => {
            this.scene.start("maingame")
        })
    }
    playOnevsTwo(){
        this.onevstwo.setTint("black")
        totalAI=2
        this.audio.stop()
        this.clickAudio.play()
        this.time.delayedCall(300, () => {
            this.scene.start("maingame")
        })
    }
    playOnevsThree(){
        this.onevsthree.setTint("black")
        totalAI=3
        this.audio.stop()
        this.clickAudio.play()
        this.time.delayedCall(300, () => {
            this.scene.start("maingame")
        })

    }
    displayOptionalMenu(){
        var rect3 = this.add.rectangle(0, 255, 380, 220, 0xFFFFFF, 0.3).setDepth(7).setOrigin(0, 0);
        this.onevsone = this.add.sprite(115, 270, "ui", "btn_play_01.png").setInteractive().setAlpha(0.9).setDepth(7).setDisplaySize(150,50).setOrigin(0,0);
        this.onevsoneText=this.add.text(160, 280, '1 VS 1', { fontFamily: 'Fantasy', fontSize: '25px' }).setDepth(7);
        this.onevsone.on('pointerover', () => { this.onevsone.setTint(0x808080)}, this);
        this.onevsone.on('pointerout', () => {  this.onevsone.clearTint()}, this);
        this.onevsone.on('pointerdown', this.playOnevsOne, this);
        this.onevsone.on('pointerup', () => { this.onevsone.clearTint() }, this);







        this.onevstwo = this.add.sprite(115, 340, "ui", "btn_play_01.png").setInteractive().setAlpha(0.9).setDepth(7).setDisplaySize(150,50).setOrigin(0,0);
        this.add.text(160, 350, '1 VS 2', { fontFamily: 'Fantasy', fontSize: '25px' }).setDepth(7);
        this.onevstwo.on('pointerover', () => { this.onevstwo.setTint(0x808080)}, this);
        this.onevstwo.on('pointerout', () => {  this.onevstwo.clearTint()}, this);
        this.onevstwo.on('pointerdown', this.playOnevsTwo, this);
        this.onevstwo.on('pointerup', () => { this.onevstwo.clearTint() }, this);



        this.onevsthree = this.add.sprite(115, 410, "ui", "btn_play_01.png").setInteractive().setAlpha(0.9).setDepth(7).setDisplaySize(150,50).setOrigin(0,0);
        this.add.text(160, 420, '1 VS 3', { fontFamily: 'Fantasy', fontSize: '25px' }).setDepth(7);
        this.onevsthree.on('pointerover', () => { this.onevsthree.setTint(0x808080)}, this);
        this.onevsthree.on('pointerout', () => {  this.onevsthree.clearTint()}, this);
        this.onevsthree.on('pointerdown', this.playOnevsThree, this);
        this.onevsthree.on('pointerup', () => { this.onevsthree.clearTint() }, this);

    }
}