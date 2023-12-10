// Imported moveCounter variable from mainScene
import { moveCounter } from './mainScene.js'
// Imported game object from game.js
import { game } from './game.js' 

export class EndScene extends Phaser.Scene {
  // constructor
  constructor () {
    super({ key: 'endScene' })
  }
  // Phaser init build in function
  init (data) {
    this.cameras.main.setBackgroundColor('#00A2E8')
  }
  // Phaser preload build in function
  preload () {
    console.log(moveCounter)
    this.load.image('winimage', './assets/images/win.png')
    this.load.image('resetImage', './assets/images/reset.png')
  }

  // Phaser create build in function
  create (data) {
    this.winImage = this.add.sprite(0, 0, 'winimage').setScale(2)
    this.winImage.x = 1920 / 2
    this.winImage.y = 1000 / 2

    // Reset button
    this.resetPic = this.add.sprite(0, 0, 'resetImage').setScale(0.16)
    this.resetPic.x = 1920 / 2 - 850
    this.resetPic.y = 160 / 2
    this.resetPic.setInteractive({ useHandCursor: true })
    this.resetPic.on('pointerdown', () => this.clickResetButton())

    // Move counter text and style
    var style = { font: "bold 32px Arial", fill: "#8510d8", boundsAlignH: "center", boundsAlignV: "middle" }
    this.moveCounterText = this.add.text(0, 0, "It took you: " + moveCounter + " moves to solve the puzzle", style).setScale(2)
    this.moveCounterText.x = 1920 / 2 - 600
    this.moveCounterText.y = 1000 / 2 - 400 
  }

  // Function to be executed after reset button is pressed
  clickResetButton() {
    location.reload()
  } 
  
}