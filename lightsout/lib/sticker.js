intersection = function(array1, array2) {
  return array1.filter(function(n) {
      return array2.indexOf(n) != -1
  });
}

var colors = {
  3: {0: [50, 0, 0], 1: [255, 0, 0]},
  4: {0: [0, 50, 0], 1: [20, 255, 20]},
  5: {0: [0, 0, 80], 1: [60, 70, 255]},
  6: {0: [40, 40, 0], 1: [255, 255, 60]},
  8: {0: [0, 40, 40], 1: [60, 255, 255]},
  10: {0: [40, 0, 40], 1: [255, 60, 255]}
}

var opacities = {
  0: 0.9,
  1: 1
}

var highlightColor = {
  'handle': 'rgba(255, 40, 255, 0.5)',
  'neighbor': 'gray',
}

var highlightWidth = {
  'handle': 5,
  'neighbor': 3,
}

function Sticker(vertices, indices) {
  this.modulo = 2;
  this.vertices = vertices;
  this.indices = indices;
  this.state = 0;
  this.lighting = new Point3D(1, 1, 1);
  this.clicked = false;

  this.isSolved = function() {
    return (this.state === 0);
  }

  this.click = function() {
    this.clicked = !this.clicked;
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
    var colorArray = colors[this.indices.length][this.state];
    var innerProd = this.center().innerProd(this.lighting); // between -1 and 1
    
    colorArray = colorArray.map(function(x){return Math.floor(x * (0.8 + innerProd * 0.17 ))  });
    var displayColor = colorArray.map(function(x){return Math.max(0,Math.min(255,x))  });

    var opacity = opacities[this.state];

    return "rgba(" + displayColor[0] + "," + displayColor[1] + "," + displayColor[2] + ", " + opacity + ")";
  }

  this.visible = function() {
    var points = this.points2d();
    return (area(points[0], points[1], points[2]) < 0 );
  }

  this.draw = function(visible, marked) {
    if(typeof(marked) === 'undefined') marked = false;
    context.strokeStyle = 'black';
    context.lineWidth = 3;
    context.fillStyle = this.color();
    this.drawSticker(visible, true, marked);
  }

  this.highlight = function(style) {
    context.strokeStyle = highlightColor[style];
    context.lineWidth = highlightWidth[style];
    this.drawSticker(true, false, false);
  }

  this.drawSticker = function(visible, filling, marked) {
    if (this.visible() !== visible) {
      return;
    }

    var points = this.points2d();

    // common style
    context.lineJoin = "round";
    context.lineCap = "round";

    context.beginPath();
    context.moveTo(points[0].x, points[0].y);
    points.forEach(function(p) {
      context.lineTo(p.x, p.y);
    })
    context.closePath();
    if (filling) {
      context.fill();
    }
    context.stroke();

    if (marked && this.clicked) {
      var center = this.center().project();
      var radius = 2;
      // context.fillRect(center.x - size / 2, center.y - size / 2, size, size);
      context.beginPath();
      context.arc(center.x, center.y, radius, 0, 2 * Math.PI, false);
      context.lineWidth = radius ;
      context.strokeStyle = 'white';
      context.stroke();
    }
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