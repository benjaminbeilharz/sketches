const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 2048, 2048 ]
};

const drawRect = (ctx, x, y, w, h, choice, ran) => {
  ctx.lineWidth = 2;
  ctx.fillStyle = `rgba(
    ${Math.random()*255},
    ${Math.random()*255},
    ${Math.random()*255},
    0.2
  )
  `
  if (ran) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x+w, y);
    ctx.lineTo(choice, y+h);
    ctx.lineTo(choice-w, y+h);
    ctx.closePath();
    ctx.stroke(); 
    ctx.fill();
  } else {
    ctx.fillRect(x, y, w, h);
  }
  return ran;
}

const drawOffsets = (ctx, x, y, w, h, offset, choice, ran) => {
  ctx.lineWidth = 4;
  if (ran) {
    ctx.beginPath();
    ctx.moveTo(choice-w-offset, y+h-offset);
    ctx.lineTo(x-offset, y-offset);
    ctx.lineTo(x+w-offset, y-offset);
    ctx.stroke();
  } else {
    ctx.strokeRect(x-offset, y-offset, w-offset, h-offset)
    //ctx.fillStyle = 'white';
    //ctx.fillRect(x-offset, y-offset, w-offset, h-offset)
  }
}

const frame = (ctx, w, h, margin) => {
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, w, margin);
  ctx.fillRect(0, 0, margin, h);
  ctx.fillRect(w-margin, 0, margin, h);
  ctx.fillRect(0, h-margin, w, margin);
}

const iterations = 50;
const margin = 75;

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    for (let i = 1; i < iterations; i++) {
      let params = {
        x: width * Math.random(),
        y: height * Math.random(),
        w: 500 * Math.random() + 50,
        h: 500 * Math.random() + 50,
        offset: 5,
      }
      let ran = Math.random() > .5;
      let choice = Math.random() > 0.5 ? Math.floor(params.x+params.w/2) : Math.floor(params.x-params.w/2);
      // rotation is not working
      //if (Math.random() > .5) {
      //  context.rotate(Math.PI*360*Math.random());
      //} else {
      //  context.rotate(Math.PI*0);
      //}
      drawOffsets(context, params.x, params.y, params.w, params.h, params.offset, choice, ran);
      drawRect(context, params.x, params.y, params.w, params.h, choice, ran);
    }
    frame(context, width, height, margin);
  };
};

canvasSketch(sketch, settings);
