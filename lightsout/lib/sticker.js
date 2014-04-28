intersection = function(array1, array2) {
  return array1.filter(function(n) {
      return array2.indexOf(n) != -1
  });
}

function Sticker(vertices, indices) {
  this.modulo = 2;
  this.vertices = vertices;
  this.indices = indices;
  this.state = 0;
  this.lighting = new Point3D(1, 1, 1);

  this.isSolved = function() {
    return (this.state === 0);
  }

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

  this.contains = function(point2d) {
    if (!this.visible()) {
      return false;
    }

    var points = this.points2d();
    for (var i = 0; i < points.length; i++) {
      var p1 = points[i];
      var p2 = points[(i + 1) % points.length];
      if (area(p1, p2, point2d) > 0 ) return false;
    };
    return true;
  }

  this.neighbor = function(sticker) {
    return intersection(this.indices, sticker.indices).length;
  }

  this.changeState = function() {
    this.state = (this.state + 1) % this.modulo;
  }

  this.color = function() {
    var colorArray;
    var innerProd = this.center().innerProd(this.lighting); // between -1 and 1
    if (this.state < 0.5) {
      colorArray = [0, 0, 100];
    } else {
      colorArray = [60, 70, 230];
    }
    
    colorArray = colorArray.map(function(x){return Math.floor(x * (0.8 + innerProd * 0.17 ))  });
    var displayColor = colorArray.map(function(x){return Math.max(0,Math.min(255,x))  });

    return "rgb(" + displayColor[0] + "," + displayColor[1] + "," + displayColor[2] + ")";
  }

  this.visible = function() {
    var points = this.points2d();
    return (area(points[0], points[1], points[2]) < 0 );
  }

  this.draw = function() {
    if (!this.visible()) {
      return;
    }

    var points = this.points2d();

    context.strokeStyle = 'black';
    context.lineWidth = 3;
    context.lineJoin = "round";
    context.lineCap = "round";
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
    return new Point3D(x, y, z);
  }

  this.normalizedCenter = function() {
    var output = this.center();
    output.normalize();
    return output;
  }
};