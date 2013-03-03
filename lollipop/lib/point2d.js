function Point2D(x,y) {
  this.x = x;
  this.y = y;

  this.norm = function () {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  this.angle = function() {
    // return the angle of the 2D point. returned value belongs to [0, 2 pi)
    var angle = 0;

    if (this.x > 0) {
      angle = Math.atan( this.y/this.x );
    } else if (this.x < 0) {
      angle = Math.atan( this.y/this.x ) + Math.PI;
    } else if (this.y > 0) {
      angle = Math.PI/2;
    } else {
      angle = - Math.PI/2;
    }

    angle = (angle + 2 * Math.PI) % (2 * Math.PI);
    return angle;
  }

  this.distance = function(p2) {
    var dx = this.x - p2.x;
    var dy = this.y - p2.y;
    return Math.sqrt(dx*dx + dy*dy);
  }
}