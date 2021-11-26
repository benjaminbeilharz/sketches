const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 2048, 2048 ]
};

function intersection(p1, p2, p3, p4) {
  let D = (p1.x - p2.x)*(p3.y - p4.y) - (p1.y - p2.y)*(p3.x - p4.x)
  let x = ((p1.x*p2.y - p1.y*p2.x)*(p3.x-p4.x) - (p1.x-p2.x)*(p3.x*p4.y - p3.y*p4.x)) / D
  let y = ((p1.x*p2.y - p1.y*p2.x)*(p3.y-p4.y) - (p1.y-p2.y)*(p3.x*p4.y - p3.y*p4.x)) / D
  return {
    x: Math.floor(x),
    y: Math.floor(y)
  }
}

function distance(p1, p2) {
  let x = Math.pow((p2.x - p1.x), 2)
  let y = Math.pow((p2.y - p1.y), 2)
  return -Math.sqrt(x + y);
}

function sampleValues(max) {
  return Math.floor(Math.random() * max);
}

function createPoint(max) {
  return {
    x: sampleValues(max),
    y: sampleValues(max),
  }
}

function drawLine(ctx, p1, p2) {
  ctx.beginPath();
  ctx.moveTo(p1.x, p1.y);
  ctx.lineTo(p2.x, p2.y);
  ctx.closePath();
  ctx.stroke();
}

function drawHeight(ctx, p1, distance) {
  ctx.beginPath();
  ctx.moveTo(p1.x, p1.y);
  ctx.lineTo(p1.x, p1.y+distance);
  ctx.closePath();
  ctx.stroke();
}

function connectHeights(ctx, p1, p2) {
  ctx.strokeStyle = 'red';
  ctx.beginPath();
  ctx.moveTo(p1.x, p1.y);
  ctx.lineTo(p2.x, p2.y);
  ctx.closePath();
  ctx.stroke();
}

function circle(ctx, p1) {
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(p1.x, p1.y, 10, 0, Math.PI*2);
  ctx.stroke();
  ctx.closePath();
}

function main(context, width, height) {
    context.lineWidth = 1;
    context.strokeStyle = 'black';
    let p1 = createPoint(width, height);
    let p2 = createPoint(width, height);
    let p3 = createPoint(width, height);
    let p4 = createPoint(width, height);
    circle(context, p1);
    circle(context, p2);
    circle(context, p3);
    circle(context, p4);
    drawLine(context, p1, p2);
    drawLine(context, p3, p4);
    let intersect = intersection(p1, p2, p3, p4);
    let d = distance(intersect, p1);
    // drawHeight(context, intersect, d);
    return {
      x: intersect.x,
      y: intersect.y + d
    }
}

const sketch = () => {
  return ({ context, width, height }) => {

    const iterations = 10;
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    let previousHeight = {
      x: Math.floor(width / 2),
      y: Math.floor(height / 2),
    }

    for (let i = 1; i < iterations; i++) {
      let point = main(context, width, height);
      connectHeights(context, previousHeight, point);
      previousHeight = point;
    }
  };
};

canvasSketch(sketch, settings);
