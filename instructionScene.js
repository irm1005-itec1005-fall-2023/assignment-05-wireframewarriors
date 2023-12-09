
// InstructionScene class
export class InstructionScene extends Phaser.Scene {
    // constructor
    constructor () {
      super({ key: 'instructionScene' })
  
      this.info1Image = null
    }
    // phaser init build in function
    init (data) {
      this.cameras.main.setBackgroundColor('#00A2E8')
    }
    // phaser preload build in function
    preload () {
      console.log('instructionScene')
      this.load.image('arrowimage', './assets/images/arrow3.png')
      this.load.text('text', '.images/MemoryGameCards/game.txt');
    }
    // phaser create build in function
    create (data) {
      // Instruction text
      this.text = this.add.text(0, 0, 'Instructions').setScale(5)
      this.text1 = this.add.text(0, 0, 'A player makes a match if the two cards turned picture-side-up are identical.\n When a match is made, That player then takes another turn, and continues\ntaking turns until he gets another match . A player misses if the two cards\n turned over are not identical. When a player misses, he or she keeps trying until a match has been made.\n The game continues until all cards have been matched and removed\n from the playing area.').setScale(2.3)
      this.text.x = 1370 / 2
      this.text.y = 210 / 2
      this.text1.x = 200 / 2
      this.text1.y = 500 / 2
  
      // Back arrow button
      this.arrowPic = this.add.sprite(0, 0, 'arrowimage').setScale(0.3)
      this.arrowPic.x = 210 / 2
      this.arrowPic.y = 200 / 2
      this.arrowPic.setInteractive({ useHandCursor: true })
      this.arrowPic.on('pointerdown', () => this.clickButton())
    }
     // Clickbutton function for after button is pressed
     clickButton() {
    this.scene.switch('mainScene')
    }
  }