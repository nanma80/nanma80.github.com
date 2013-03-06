function Knob(theta, position) {
  this.position = position;
  this.theta = theta;
  this.knobInnerEnd = viewHeight * 0.39;
  this.knobOuterEnd = viewHeight * 0.44;
  this.rayAngleRange = 0.1;
  this.highlighted = false;
  this.numberOfLines = 12;

  this.draw = function() {
    // draw a knob
    context.lineWidth = 1;
    context.strokeStyle = 'black';

    var rotation = 0;
    if (this.position == snap.index && animatingTwist) {
      rotation = Math.PI * animationTwistFrameIndex/animationTwistFrames;
    }

    for (var j = 0; j < this.numberOfLines; j++) {
      var rotationAngle = (Math.PI * 2 / this.numberOfLines * j + rotation) % (2 * Math.PI);
      if (rotationAngle > Math.PI) continue;
      var rayAngle = this.rayAngleRange * Math.cos(rotationAngle);
      context.beginPath();
      context.moveTo( canvasCenter.x - this.knobInnerEnd * Math.sin(this.theta + dragAngle + rayAngle), canvasCenter.y - this.knobInnerEnd * Math.cos(this.theta + dragAngle + rayAngle));
      context.lineTo( canvasCenter.x - this.knobOuterEnd * Math.sin(this.theta + dragAngle + rayAngle), canvasCenter.y - this.knobOuterEnd * Math.cos(this.theta + dragAngle + rayAngle));
      context.stroke();
    }

    context.lineWidth = 5;
    context.strokeStyle = 'grey';
    context.beginPath();
    var fillet = 0.003;
    context.arc(
      canvasCenter.x, 
      canvasCenter.y, 
      this.knobOuterEnd,
      - this.rayAngleRange + fillet + this.theta - dragAngle - Math.PI/2, 
      + this.rayAngleRange - fillet + this.theta - dragAngle - Math.PI/2, 
      false
    );
    context.stroke();
  }
}
