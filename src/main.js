let config = {
    type: Phaser.auto,
    width: 1280,
    height: 720,
    scene: [Menu],
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
}
let room = {
    exits: []
}
let menu;
let gameRooms = [];
let game = new Phaser.Game(config);
let keyC, keyF, keyT, keyR, keyRIGHT, keyLEFT, keyUP, keyDOWN, keySPACE;