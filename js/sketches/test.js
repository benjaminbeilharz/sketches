const canvasSketch = require('canvas-sketch');
const p5 = require('p5');


const settings = {
  dimensions: [ 2048, 2048 ]
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    for (let i = 0; i < 250; i++) {
      let x = Math.random() * 2048;
      let y = Math.random() * 2048;
      context.globalAlpha = Math.random();
      context.lineWidth = 1.5;
      context.strokeStyle = `rgba(
        ${Math.floor(255 * Math.random())},
        ${Math.floor(255 * Math.random())},
        ${Math.floor(255 * Math.random())},
        ${Math.random() * 0.5}
      )`

      context.moveTo(x, y);
      context.arc(x, y, 360, 0, 2 * Math.PI);
      // context.fillRect(x, y, w, h);
    }
    context.stroke();
  };
};

canvasSketch(sketch, settings);
