const gameWidth=380
const gameHeight=710
const totalLevel=6
var totalAI=0;
const config = {
    type: Phaser.AUTO,
    width: gameWidth,
    height: gameHeight,
    backgroundColor: "black", // red
    pixelArt: false,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1800 },
            debug: false
        }
    },
    scene: [LoadAsset,StartMenu,MainGame]
}

 var game = new Phaser.Game(config);