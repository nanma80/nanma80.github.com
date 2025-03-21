var EPSILON = 0.00000000001;

area = function(p1, p2, p3) {
  return (p1.x * p2.y - p1.y * p2.x) + (p2.x * p3.y - p2.y * p3.x) + (p3.x * p1.y - p3.y * p1.x);
}

var rotationMatrix = [[1,0,0],[0,1,0],[0,0,1]];

resetRotationMatrix = function() {
  for(var i = 0; i<3; i++){
    for(var j = 0; j<3; j++){
      if (i === j) {
        rotationMatrix[i][j] = 1;
      } else {
        rotationMatrix[i][j] = 0;
      }
    }  
  }
}

setRotationMatrix = function(axis, t) {
  axis.normalize();

  var ux = axis.x;
  var uy = axis.y;
  var uz = axis.z;

  var ct = Math.cos(t);
  var st = Math.sin(t);

  rotationMatrix[0][0] = (ct + ux * ux * (1-ct));
  rotationMatrix[0][1] = (ux * uy *(1-ct) -uz * st);
  rotationMatrix[0][2] = (ux*uz *(1-ct) + uy*st);
  rotationMatrix[1][0] = (uy * ux *(1-ct) + uz* st);
  rotationMatrix[1][1] = (ct + uy * uy *(1-ct));
  rotationMatrix[1][2] = (uy*uz*(1-ct)-ux*st);
  rotationMatrix[2][0] = (uz*ux*(1-ct) - uy*st);
  rotationMatrix[2][1] = (uz*uy*(1-ct) +ux*st);
  rotationMatrix[2][2] = (ct + uz*uz*(1-ct));
}

dedupOnInnerProd = function(inputArray) {
  var outputArray = [];
  inputArray.forEach(function(input) {
    if (input.indexIn(outputArray) < 0) {
      outputArray.push(input);
    }
  });
  return outputArray;
}

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

  this.norm = function() {
    var norm_sq = this.x*this.x + this.y*this.y + this.z*this.z;
    return Math.sqrt(norm_sq);
  }

  this.rotate = function() {
    
    var coord = [this.x, this.y, this.z].slice(0);
    var output = [0,0,0];
    for (var i=0; i<3; i++) {
      for (var j=0; j<3; j++) {
        output[i] += rotationMatrix[i][j] * coord[j];
      }
    }
    this.x = output[0];
    this.y = output[1];
    this.z = output[2];
  }

  this.project = function() {
    // project this 3D point to 2D, viewed from the +x direction, considering the origin of 2D is the center of canvas
    
    var origin_projection = this.project_origin();
    return new Point2D(origin_projection.x + viewWidth/2, origin_projection.y + viewHeight/2)
  }

  this.project_origin = function() {
    // project this 3D point to 2D, viewed from the +z direction, 3D origin -> 2D origin
    var factor, x, y, viewDistance;
    
    factor = viewHeight * 0.45 / (1 - this.z / 15);
    
    x = this.x * factor;
    y = -this.y * factor;
    return new Point2D(x, y);
  }

  this.innerProd = function(p2) {
    var output = 0;
    output += this.x * p2.x;
    output += this.y * p2.y;
    output += this.z * p2.z;
    return output;
  }

  this.outerProd = function(p2) {
    var x, y, z;
    x = this.y * p2.z - this.z * p2.y;
    y = this.z * p2.x - this.x * p2.z;
    z = this.x * p2.y - this.y * p2.x;
    return new Point3D(x, y, z);
  }

  this.scale = function(s) {
    return new Point3D(s * this.x, s * this.y, s * this.z);
  }

  this.clone = function() {
    return this.scale(1);
  }

  this.reverse = function() {
    return this.scale(-1);
  }

  this.indexIn = function(arr) {
    for (var i = 0; i < arr.length; i++) {
      if (this.innerProd(arr[i]) > this.norm() * arr[i].norm() - EPSILON) {
        return i;
      }
    }
    return -1;
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