const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 2048, 2048 ], 
  pixelsPerInch: 300,
};

const sketch = () => {
  return ({ context, width, height }) => {
    const clifford = (point, a, b, c, d, scale) => {
      let x_next = Math.sin(a*point.y) + c*Math.cos(a*point.x) * scale;
      let y_next = Math.sin(b*point.x) + d*Math.cos(b*point.y) * scale;
      return {x: x_next, y: y_next}
    }

    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);
    context.strokeStyle = `rgba(${Math.random()*255},
      ${Math.random()*255}, 
      ${Math.random()*255}, 
      0.2)`
    
    const constants = [1.20, -1.50,  1.45, -1.45];
    const iterations = 450000;
    let prev_point = {
      x: 1,
      y: 1,
    }
    context.translate(width / 2, height / 2);

    for (let i = 1; i < iterations; i++) {
      let point = clifford(prev_point, ...constants, 1);
      context.moveTo(point.x*350, point.y*350);
      context.arc(point.x*350, point.y*350, 1, 0, 2 * Math.PI);
      prev_point = point;
    }

    context.stroke();
  };
};

canvasSketch(sketch, settings);

// TODO: saving is not working
