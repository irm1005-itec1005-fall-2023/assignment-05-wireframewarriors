

// class Menuescene
export class MenuScene extends Phaser.Scene {
    // constructor
    constructor () {
      super({ key: 'menuScene' })
  
      this.menuSceneBackgroundImage = null
      this.startButton = null
    }
    // Phaser init build in function
    init (data) {
      this.cameras.main.setBackgroundColor('#00A2E8')
    }
    // Phaser preload build in function
    preload () {
      console.log('Menu Scene')
  
      this.load.image('menuSceneBackground', './assets/images/memory.png')
      this.load.image('startButton', './assets/images/start1.png')
    }
    // Phaser create build in function
    create (data) {
      // Background image 
      this.menuSceneBackgroundImage = this.add.sprite(10, 10, 'menuSceneBackground').setScale(0.22)
      this.menuSceneBackgroundImage.x = 1920 / 2
      this.menuSceneBackgroundImage.y = 300 / 2
  
      // Start button sprite
      this.startButton = this.add.sprite(1920 / 2, (1080 / 2) + 100, 'startButton')
      this.startButton.setInteractive({ useHandCursor: true })
      this.startButton.on('pointerdown', () => this.clickButton())
      
    }
    // Switch to mainscene when button click
    clickButton () {
      this.scene.switch('mainScene')
    }
  }