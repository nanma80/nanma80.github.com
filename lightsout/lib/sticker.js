function Sticker(vertices, indices) {
  this.modulo = 2;
  this.vertices = vertices;
  this.indices = indices;
  this.state = 0;

  this.getSignature = function(){
    var signature = this.indices.concat();
    signature.sort();
    return signature.toString();
  }

  this.signature = this.getSignature();

  this.points3d = function() {
    var points = [];
    for(var i = 0; i < this.indices.length; i++) {
      points.push(this.vertices[this.indices[i]]);
    }
    return points;
  }

  this.points2d = function() {
    return this.points3d().map(function(p){ return p.project()});
  }

  this.changeState = function() {
    this.state = (this.state + 1) % this.modulo;
  }

  this.color = function() {
    if (this.state < 0.5) {
      return 'rgb(0, 0, 100)';
    } else {
      return 'rgb(0, 0, 180)';
    }
  }

  this.draw = function() {
    var points = this.points2d();

    if (area(points[0], points[1], points[2]) > 0 ) {
      return;
    }

    // compute lighting
    // var innerProd = this.normal.innerProd(lighting); // between -1 and 1
    
    // var displayColor = this.colorArray.slice(0);
    // displayColor = displayColor.map(function(x){return Math.floor(x * (0.8 + innerProd * 0.2 ))  });

    // displayColor = displayColor.map(function(x){return Math.max(0,Math.min(255,x))  });

    // context.fillStyle = "rgb(" + displayColor[0] + "," + displayColor[1] + "," + displayColor[2] + ")";
    context.strokeStyle = 'black';
    context.lineWidth = 2;
    context.fillStyle = this.color();
    context.beginPath();
    context.moveTo(points[0].x, points[0].y);
    for (var i = 1; i < points.length; i++) {
      context.lineTo(points[i].x, points[i].y);
    }
    context.closePath();
    context.fill();
    context.stroke();
  }

  this.center = function() {
    var points = this.points3d();
    var x = 0;
    var y = 0;
    var z = 0;

    for(var i = 0; i < points.length; i++) {
      x += points[i].x;
      y += points[i].y;
      z += points[i].z;
    }
    x /= points.length;
    y /= points.length;
    z /= points.length;
    var output = new Point3D(x, y, z);
    output.normalize();
    return output;
  }
};