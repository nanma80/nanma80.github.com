function Sticker(minRadius, maxRadius, minAngle, maxAngle) {
  this.minRadius = minRadius;
  this.maxRadius = maxRadius;
  this.minAngle = minAngle;
  this.maxAngle = maxAngle;
  this.hue_original = Math.floor((this.minAngle + this.maxAngle)/2 /Math.PI * 180);
  this.hue_original = Math.floor(this.minAngle /Math.PI * 180);
  this.saturation = '90%';
  this.lighting_original = '48%';
  this.lighting_highlighted = '70%';

  this.hue = this.hue_original;
  this.highlighted = false;

  this.draw = function() {
    var angle = - 2 * Math.PI * snap.index / puzzle.order;

    var radiusx = 0.5;
    var radiusy = 1;

    if (this.highlighted) {
      context.save();
      context.translate(canvasCenter.x,canvasCenter.y);
      context.rotate(angle);
      context.scale(radiusx, radiusy);
      context.rotate(- angle);
      context.translate(- canvasCenter.x,- canvasCenter.y);

      this.drawArc();

      context.restore();
    } else {
      this.drawArc();
    }

  }

  this.drawArc = function() {
    var counterClockwise = (((this.maxAngle - this.minAngle + 2 * Math.PI) % (2 * Math.PI)) < Math.PI);

    context.beginPath();
    context.arc(
      canvasCenter.x, 
      canvasCenter.y, 
      (this.minRadius + this.maxRadius)/2, 
      -this.minAngle - dragAngle - Math.PI/2 -0.0001, 
      -this.maxAngle - dragAngle - Math.PI/2 + 0.0001, 
      counterClockwise
    );

    context.lineWidth = (this.maxRadius - this.minRadius) - 2;

    var lighting = (this.highlighted) ? (this.lighting_highlighted) : (this.lighting_original);
    context.strokeStyle = 'hsl('+ this.hue.toString() +','+ this.saturation + ','+ lighting +')';
    context.stroke();
  }
}
