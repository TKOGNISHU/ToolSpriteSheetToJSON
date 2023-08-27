const fs = require('fs')
const path = require('path')

const spriteSheetName = 'circleStick'
const inputSrcImg = 'src/assets/circle.stick.png'
const outputFolderPath = 'E:\F folder\Design\StairGun\Character';
const outputFilePath = 'E:\F folder\Design\StairGun\Character\circleStick.json';

const options = {
  format: 'json',
  path: outputFolderPath,
  name: 'spritesheet',
  width: 231,
  height: 882,
  frameSize: {
    x: 33,
    y: 147
  },
  exporter: 'json'
};

const textExport = {
  width: options.width,
  height: options.height,
  src: inputSrcImg,
  frame: {
    frameWidth: options.frameSize.x,
    frameHeight: options.frameSize.y
  },
  animation: {}
}

const frameConfig = {
  start: undefined, //number | undefined, The starting frame of the animation.
  end: undefined, // number | undefined, The ending frame of the animation.
  first: undefined, //number | boolean | undefined,
  // A frame to put at the beginning of the animation, before start or outputArray or frames.
  outputArray: undefined, //Phaser.Types.Animations.AnimationFrame[] | undefined,
  // An array to concatenate the output onto.
  frames: undefined, // boolean | number[] | undefined, A custom sequence of frames.
}

const animationItem = {
  key: `animation_key`, //string | undefined, The key that the animation will be associated with. i.e. sprite.animations.play(key)
  frames: [spriteSheetName, {...frameConfig}],/*string | Phaser.Types.Animations.AnimationFrame[] | undefined,
      Either a string, in which case it will use all frames from a texture with the matching key, or an array of Animation Frame configuration objects.*/
  frameRate: 10, //number | undefined, The frame rate of playback in frames per second (default 24 if duration is null)
  repeat: -1, // number | undefined, Number of times to repeat the animation (-1 for infinity)
  repeatDelay: undefined, //number | undefined, Delay before the animation repeats. Value given in milliseconds.
  defaultTextureKey: undefined, //string | undefined, The key of the texture all frames of the animation will use. Can be overridden on a per frame basis.
  delay: undefined, //number | undefined, Delay before starting playback. Value given in milliseconds.
  duration: undefined, //number | undefined, How long the animation should play for in milliseconds. If not given its derived from frameRate.
  hideOnComplete: undefined, //boolean | undefined, Should sprite.visible = false when the animation finishes?
  yoyo: undefined, //boolean | undefined, Should the animation yoyo? (reverse back down to the start) before repeating?
  showBeforeDelay: undefined, //boolean | undefined, If this animation has a delay, should it show the first frame immediately (true), or only after the delay (false)
  showOnStart: undefined, //boolean | undefined, Should sprite.visible = true when the animation starts to play? This happens after any delay, if set.
  skipMissedFrames: undefined, //boolean | undefined, Skip frames if the time lags, or always advanced anyway?
  sortFrames: undefined, //boolean | undefined, If you provide a string for frames you can optionally have the frame names numerically sorted.
}
///////////////////
let frameLengthX = Math.floor(options.width / options.frameSize.x)
let frameLengthY = Math.floor(options.height / options.frameSize.y)
for (let frameIndex = 0; frameIndex < frameLengthX * frameLengthY; frameIndex += frameLengthX) {
  const item = {...animationItem}
  item.frames = [spriteSheetName, {...frameConfig}]
  item.frames[1].start = frameIndex
  item.frames[1].end = frameIndex + frameLengthX - 1

  const keyAnims = `activity-${Math.floor(frameIndex / frameLengthY)}`
  item.key = keyAnims
  
  textExport.animation[keyAnims] = item
}
console.log(JSON.stringify(textExport))

fs.writeFile('./circleStick.json', JSON.stringify(textExport), err => {
  console.log(err);
})

console.log('Written successfully!');
