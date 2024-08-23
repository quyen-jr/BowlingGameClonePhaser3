class LoadAsset extends Phaser.Scene{
    constructor(){
        super("loadAssets")
    }
    preload(){
        this.load.atlas("assets","assets/bg_0.png","assets/bg_0.json")
        this.load.atlas("ball","assets/ball.png","assets/ball.json")
        this.load.atlas("main","assets/main_0.png","assets/main_0.json")
        this.load.atlas("ui","assets/ui_parts_0.png","assets/ui_parts_0.json")
        //sounds
        this.load.audio('SE_1pin_3.m4a', '/sounds/SE_1pin_3.m4a')
        this.load.audio('SE_1pin.m4a', '/sounds/SE_1pin.m4a')
        this.load.audio('SE_Ball_roll.m4a', '/sounds/SE_Ball_roll.m4a')
        this.load.audio('SE_Gutter.m4a', '/sounds/SE_Gutter.m4a')
        this.load.audio('SE_Start.m4a', '/sounds/SE_Start.m4a')
        this.load.audio('SE_Sweeper.m4a', '/sounds/SE_Sweeper.m4a')
        this.load.audio('BGM_match.m4a', '/sounds/BGM_match.m4a')
        this.load.audio('clickButton', '/sounds/clickButtonAudio.mp3')
        this.load.audio('SE_Cheers_Strike.m4a', '/sounds/SE_Cheers_Strike.m4a')

    }
    create(){
        this.anims.create({
            key:"ball_anim",
            frames:this.anims.generateFrameNames("ball",{
              prefix:"ball",start:1,end:13, zeroPad:3, 
            }),
            repeat:-1,
            frameRate:10
          })  
        this.scene.start("startmenu")
    }
}