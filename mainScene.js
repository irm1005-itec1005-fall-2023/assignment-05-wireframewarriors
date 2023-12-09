

//* Main scene */

import { Card } from './card.js'
import { game } from './game.js'
import { EndScene } from './endScene.js'

export var moveCounter = 0;

// this is the mainScene class
export class MainScene extends Phaser.Scene {
  // variables 
  #cardArray = []
  #cardClass = new Card();
  #clickCounter = 0;
  #cardPair = []
  #card = null;
  #spriteClickTracker = [];
  #lockBoard = false;
  #previousPlacement = -1;
  #matchedCards = [];
  #timerCount = null;
  
  // constructor
  constructor() {
    super({ key: 'mainScene' })
  }
  // Phaser init built in function
  init (data) {
      this.cameras.main.setBackgroundColor('#00A2E8')
   
  }
  
  // Phaser preload build in function
  preload() {
    console.log('MainScene')
    // Loads images
    for (var i = 0; i <= 8; i++) {
      this.load.image('cardImage'+i, './assets/images/'+i+'image.png')
    }
    this.load.image('homeButton', './assets/images/HomeButton.png')
    this.load.image('backgroundImage', './assets/images/gridBackground.png')
    this.load.image('infoImage', './assets/images/info1.png');
    this.load.image('resetImage', './assets/images/arrow5.png');
    
  }
  // phaser create build in function 
  create(data) {
    // Creates card sprites
    for (var counter = 1; counter <= 8; counter++) {
      for (var t = 0; t < 2; t++) {
        let card = this.add.sprite(0, 0, 'cardImage0').setScale(0.7)
        card.imageKey = 'cardImage'+ counter
        card.index = counter
        card.setInteractive({ useHandCursor: true })
        card.on('pointerdown', () => this.cardClick(card))
        this.#cardArray.push(card)
        card.arrayPlacement = this.#cardArray.length - 1
      }
    }
    const shuffledArray = this.#cardClass.shuffle(this.#cardArray);
    // Apply x and y coordinates to sprites
    this.#cardArray[0].x = 785
    this.#cardArray[0].y = 285
    // Apply x and y coordinates to sprites
    this.#cardArray[1].x = 935
    this.#cardArray[1].y = 285
    // Apply x and y coordinates to sprites
    this.#cardArray[2].x = 1085
    this.#cardArray[2].y = 285
    // Apply x and y coordinates to sprites
    this.#cardArray[3].x = 1235
    this.#cardArray[3].y = 285
    // Apply x and y coordinates to sprites
    this.#cardArray[4].x = 785
    this.#cardArray[4].y = 435
    // Apply x and y coordinates to sprites
    this.#cardArray[5].x = 935
    this.#cardArray[5].y = 435
    // Apply x and y coordinates to sprites
    this.#cardArray[6].x = 1085
    this.#cardArray[6].y = 435
    // Apply x and y coordinates to sprites
    this.#cardArray[7].x = 1235
    this.#cardArray[7].y = 435
    // Apply x and y coordinates to sprites
    this.#cardArray[8].x = 785
    this.#cardArray[8].y = 585
    // Apply x and y coordinates to sprites
    this.#cardArray[9].x = 935
    this.#cardArray[9].y = 585
    // Apply x and y coordinates to sprites
    this.#cardArray[10].x = 1085
    this.#cardArray[10].y = 585
    // Apply x and y coordinates to sprites
    this.#cardArray[11].x = 1235
    this.#cardArray[11].y = 585
    // Apply x and y coordinates to sprites
    this.#cardArray[12].x = 785
    this.#cardArray[12].y = 735
    // Apply x and y coordinates to sprites
    this.#cardArray[13].x = 935
    this.#cardArray[13].y = 735
    // Apply x and y coordinates to sprites
    this.#cardArray[14].x = 1085
    this.#cardArray[14].y = 735
    // Apply x and y coordinates to sprites
    this.#cardArray[15].x = 1235
    this.#cardArray[15].y = 735
    
    // Grid image 
    this.backgroundImage = this.add.sprite(0, 0, 'backgroundImage').setScale(2.75)
    this.backgroundImage.setOrigin(0,0)
    this.backgroundImage.x = 1400 / 2
    this.backgroundImage.y = 400 / 2
    // Creates background layer
    const backgroundLayer = this.add.layer();
    backgroundLayer.add([ this.backgroundImage ])
    const cardLayer = this.add.layer();

    // Card sprite layer association
    cardLayer.add([this.#cardArray[0],this.#cardArray[1],this.#cardArray[2],this.#cardArray[3],this.#cardArray[4],this.#cardArray[5],this.#cardArray[6],this.#cardArray[7],this.#cardArray[8],this.#cardArray[9],this.#cardArray[10],this.#cardArray[11],this.#cardArray[12],this.#cardArray[13],this.#cardArray[14],this.#cardArray[15]])
    
    // Home button
    this.homeButton = this.add.sprite(0, 0, 'homeButton').setScale(0.5)
    this.homeButton.x = 150 / 2
    this.homeButton.y = 150 / 2
    this.homeButton.setInteractive({ useHandCursor: true })
    this.homeButton.on('pointerdown', () => this.clickHomeButton())

    // Instruction button
    this.infoPic = this.add.sprite(0, 0, 'infoImage').setScale(0.19)
    this.infoPic.x = 3750 / 2
    this.infoPic.y = 150 / 2
    this.infoPic.setInteractive({ useHandCursor: true })
    this.infoPic.on('pointerdown', () => this.clickInstrucButton())

    // Reset button
    this.resetPic = this.add.sprite(0, 0, 'resetImage').setScale(0.16)
    this.resetPic.x = 1996 / 2
    this.resetPic.y = 160 / 2
    this.resetPic.setInteractive({ useHandCursor: true })
    this.resetPic.on('pointerdown', () => this.clickResetButton())
  }
  // Function to be executed upon clicking a card
  cardClick(card) {
    if (this.#lockBoard) return;
    if (this.#previousPlacement == card.arrayPlacement) return;
    if (this.#matchedCards.includes(card.index) == true) return
    card.setTexture(card.imageKey)
    this.#clickCounter += 1
    this.#cardPair.push(card.index)
    this.#spriteClickTracker.push(card)
    if (this.#clickCounter == 2) {
      moveCounter += 1
      console.log(moveCounter)
      this.#lockBoard = true;
      let matchCheck = this.#cardClass.checkMatch(this.#cardPair)
      if (matchCheck == false) {
        this.time.addEvent({
          delay: 1000,
          callback: ()=>{
        this.#spriteClickTracker[this.#spriteClickTracker.length - 2].setTexture('cardImage0')
        card.setTexture('cardImage0')
        this.#lockBoard = false;
        },
        })
      } else {
        this.#matchedCards.push(card.index);
        this.#lockBoard = false;
      }
      while(this.#cardPair.length > 0) {
        this.#cardPair.pop();
      }
      this.#clickCounter = 0;
    }
    this.#previousPlacement = card.arrayPlacement;
    if (this.#matchedCards.length == 8) {
      console.log('check6')
      this.scene.switch('endScene')
    }
  }
  // switch to instructionScene
  clickInstrucButton() {
    this.scene.switch('instructionScene')
  }
  // switch to button scene
  clickHomeButton(){
      this.scene.switch('menuScene')
  }
  // reset when restart button is clicked
  clickResetButton() {
    location.reload()
  }
}