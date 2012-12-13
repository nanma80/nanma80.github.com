function Point3D(x,y,z) {
  this.x = x;
  this.y = y;
  this.z = z;

  this.normalize = function() {
    var norm_sq = this.x*this.x + this.y*this.y + this.z*this.z;
    if (norm_sq > 0) {
      norm = Math.sqrt(norm_sq);
      this.x = this.x / norm;
      this.y = this.y / norm;
      this.z = this.z / norm;
    }
  }

  this.rotate = function(axis, t) {
    axis.normalize();
    var ux = axis.x;
    var uy = axis.y;
    var uz = axis.z;

    var ct = Math.cos(t);
    var st = Math.sin(t);

    var newx = (ct + ux * ux * (1-ct)) * x + (ux * uy *(1-ct) -uz * st) * y +(ux*uz *(1-ct) + uy*st) * z;
    var newy = (uy * ux *(1-ct) + uz* st)*x + (ct + uy * uy *(1-ct)) *y +(uy*uz*(1-ct)-ux*st) * z;
    var newz = (uz*ux*(1-ct) - uy*st) *x + (uz*uy*(1-ct) +ux*st)*y + (ct + uz*uz*(1-ct))*z;

    return new Point3D(newx, newy, newz);
  }

  this.project = function() {
      var factor, x, y, viewDistance
      factor = viewHeight/7;
      
      x = this.y * factor + viewWidth  / 2
      y = -this.z * factor + viewHeight / 2
      return new Point2D(x, y)
  }

  this.project_origin = function() {
      var factor, x, y, viewDistance
      factor = viewHeight/7;
      
      x = this.y * factor
      y = -this.z * factor
      return new Point2D(x, y)
  }
}

function Point2D(x,y) {
  this.x = x;
  this.y = y;
  this.norm = Math.sqrt(this.x * this.x + this.y * this.y);

  this.distance = function(p2) {
    var dx = this.x - p2.x;
    var dy = this.y - p2.y;

    return Math.sqrt(dx*dx + dy*dy);
  }
}