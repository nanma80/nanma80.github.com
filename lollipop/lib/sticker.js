function Sticker(minRadius, maxRadius, minAngle, maxAngle) {
  this.minRadius = minRadius;
  this.maxRadius = maxRadius;
  this.minAngle = minAngle;
  this.maxAngle = maxAngle;

  this.color = 'hsl('+ ((this.minAngle + this.maxAngle)/2 /Math.PI * 180).toString() +', 90%, 50%)';

  this.draw = function() {
    var counterClockwise = ((maxAngle - minAngle) > Math.PI);

    context.beginPath();
    context.arc(canvasCenter.x, canvasCenter.y, (minRadius + maxRadius)/2, minAngle + Math.PI/2+0.0001, maxAngle + Math.PI/2-0.0001, counterClockwise);
    context.lineWidth = (maxRadius - minRadius) * 0.95;

    // line color
    context.strokeStyle = this.color;
    context.stroke();

    return;
  }
}
