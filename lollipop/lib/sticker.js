function Sticker(minRadius, maxRadius, minAngle, maxAngle, indexOfLayer, indexOfPhase) {
  this.indexOfLayer = indexOfLayer;
  this.indexOfPhase = indexOfPhase;
  this.minRadius = minRadius;
  this.maxRadius = maxRadius;
  this.minAngle = minAngle;
  this.maxAngle = maxAngle;
  // this.hue_original = Math.floor((this.minAngle + this.maxAngle)/2 /Math.PI * 180);
  this.hue_original = Math.floor(this.minAngle /Math.PI * 180);
  this.saturation_original = (this.indexOfPhase % 2)? '100%': '80%';
  this.lighting_original = '50%';
  this.lighting_highlighted = '70%';

  this.hue = this.hue_original;
  this.saturation = this.saturation_original;
  this.highlighted = false;

  this.draw = function() {
    if (this.highlighted && animatingTwist) {
      var angle = - 2 * Math.PI * snap.index / puzzle.order;
      var radiusx = - Math.cos( Math.PI * animationTwistFrameIndex/animationTwistFrames );
      var radiusy = 1;

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
    var counterClockwise = (((this.maxAngle - this.minAngle + 2 * Math.PI -0.0001) % (2 * Math.PI)) < Math.PI);

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

    // highlighting by lighting
    var lighting = (this.highlighted && stickerHighlightByColor) ? (this.lighting_highlighted) : (this.lighting_original);
    // var lighting = (this.lighting_original);
    context.strokeStyle = 'hsl('+ this.hue.toString() +','+ this.saturation + ','+ lighting +')';
    context.stroke();

    if (stickerHighlightByDot) {
      // highlighting by drawing a dot
      if (this.highlighted) {
        var avgRadius = (this.minRadius + this.maxRadius)/2;
        var avgAngle = (this.minAngle + this.maxAngle)/2;

        context.beginPath();
        context.arc(
          canvasCenter.x - avgRadius * Math.sin(avgAngle + dragAngle), 
          canvasCenter.y - avgRadius * Math.cos(avgAngle + dragAngle), 
          2, 0, 2 * Math.PI, false);
        context.fillStyle = 'black';
        context.fill();
      }
    }
  }
}
