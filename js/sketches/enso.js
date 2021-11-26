const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 2048, 2048 ]
};

const iterations = 50;

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    context.lineWidth = 5;

    for (let k = 1; k < 5; k++) {
      for (let i = 1; i < iterations; i++) {
        context.strokeStyle = `rgba(
          1,
          1,
          ${Math.random()*255},
          0.2
        )`
        context.beginPath();
        context.arc(width/2, height/2, 500+i*10, Math.floor(Math.random()*1000), Math.floor(Math.random()*360));
        context.stroke();
      }
    }
  };
};

canvasSketch(sketch, settings);
