
//* Game scene */
import { Card } from './card.js'
import { MainScene } from './mainScene.js'
import { SplashScene } from './splashScene.js'
import { InstructionScene } from './instructionScene.js'
import { MenuScene } from './menuScene.js'
import { EndScene } from './endScene.js'

  const splashScene = new SplashScene()
  const menuScene = new MenuScene()
  const instructionScene = new InstructionScene()
  const endScene = new EndScene()
  const flippedOrNot = new Boolean(false)
  const mainScene = new MainScene()
  
  const config = {
    width: 1970,
    height: 1080,
    // set background color
    backgroundColor: 0xfffff,
    scale: {
      mode: Phaser.Scale.FIT, 
      autoCenter: Phaser.Scale.CENTER_BOTH
    }
  }
  // create timer in game.js and method to give it to other classes
  export const game = new Phaser.Game(config)
  // add splash and menuScene back in 
  game.scene.add('menuScene', menuScene)
  game.scene.add('splashScene', splashScene)
  game.scene.add('mainScene', mainScene)
  game.scene.add('instructionScene', instructionScene)
  game.scene.add('endScene', endScene)
  game.scene.start('splashScene')