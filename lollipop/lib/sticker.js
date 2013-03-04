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
    var counterClockwise = ( ((maxAngle - minAngle + 2 * Math.PI) % (2 * Math.PI)) < Math.PI);

    context.beginPath();
    context.arc(
      canvasCenter.x, 
      canvasCenter.y, 
      (minRadius + maxRadius)/2, 
      -minAngle - dragAngle - Math.PI/2 -0.0001, 
      -maxAngle - dragAngle - Math.PI/2 + 0.0001, 
      counterClockwise
    );

    context.lineWidth = (maxRadius - minRadius) - 2;

    var lighting = (this.highlighted) ? (this.lighting_highlighted) : (this.lighting_original);
    context.strokeStyle = 'hsl('+ this.hue.toString() +','+ this.saturation + ','+ lighting +')';
    context.stroke();
  }
}
