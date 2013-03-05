function Puzzle() {
  this.initialize = function () {
    // initial values
    this.totalSize = viewHeight * 0.4;
    this.backgroundColor = 'white';
    this.setOrder(3);

    this.resetState();
  }

  this.setOrder = function(order) {
    this.order = order;
    this.layerSize = this.totalSize / configuration[this.order].layer;
    this.angleSize = Math.PI / this.order;
    this.turnability = configuration[this.order].turnability;
  }

  this.draw = function() {
    // draw background
    context.fillStyle = this.backgroundColor;
    context.fillRect(0, 0, viewWidth, viewHeight);

    // draw axis
    for (var i=0; i< this.order; i++) {
      var theta = i * Math.PI * 2 / this.order;
      var textAbs = viewHeight * 0.45;
      var textPosition = new Point2D( - textAbs * Math.sin(theta) - 11, - textAbs * Math.cos(theta) + 13);

      context.font = '30pt Arial';
      context.fillStyle = 'blue';
      // displayed axis number is the internal index plus one. Counting from 1
      context.fillText((i+1).toString(), canvasCenter.x + textPosition.x, canvasCenter.y + textPosition.y);
    }

    // draw stickers
    for (var i = this.layers.length -1 ; i >= 0 ; i--) {
      var turnability_layer = this.turnability[i];
      for (var j=0; j < 2 * this.order; j++) {
        if (snap.index >= 0) {
          var jOffset = (j - 2 * snap.index + 2 * this.order) % (2 * this.order);
          this.layers[i][j].highlighted = (turnability_layer.indexOf(jOffset) >= 0);

          this.layers[i][j].draw();
          
        } else {
          this.layers[i][j].highlighted = false;          
          this.layers[i][j].draw(); // draw normal stickers
        }
      }
    }
  }

  this.resetState = function() {
    this.layers = new Array( configuration[this.order].layer );
    this.duplicateHue = new Array( configuration[this.order].layer );
    for (var i=0; i<this.layers.length; i++) {
      this.layers[i] = new Array( 2 * this.order );
      this.duplicateHue[i] = new Array( 2 * this.order );

      for (var j=0; j< 2 * this.order; j++) {
        this.layers[i][j] = new Sticker(
          (configuration[this.order].layer - i -1) * this.layerSize, // minRadius 
          (configuration[this.order].layer - i) * this.layerSize, // maxRadius
          j * this.angleSize, //minAngle
          (j + 1) * this.angleSize //maxAngle
        );
        this.duplicateHue[i][j] = 0;
      }
    }
  }

  this.copyHue = function() {
    for(var i=0; i<this.layers.length; i++) {
      for(var j=0; j< 2*this.order; j++) {
        this.duplicateHue[i][j] = this.layers[i][j].hue;
      }
    }
  }

  this.copyBackTwist = function(snapIndex) {
    for(var i=0; i<this.layers.length; i++) {
      var turnability_layer = this.turnability[i];
      for(var j=0; j< 2*this.order; j++) {
        var jOffset = (j - 2 * snapIndex + 2 * this.order) % (2 * this.order);
        if ( turnability_layer.indexOf(jOffset) >= 0 ) {
          // piece [i,j] should be twisted
          var jTwisted = (4*snapIndex - 1 - j + 4 * this.order) % (2 * this.order);
          this.layers[i][j].hue = this.duplicateHue[i][jTwisted];
        } else {
          this.layers[i][j].hue = this.duplicateHue[i][j];
        }
      }
    }
  }

  this.copyBackReorient = function(reorientation) {
    for(var i=0; i<this.layers.length; i++) {
      for(var j=0; j< 2*this.order; j++) {
        var jNew = (j + reorientation * 2) % (2 * this.order);
        this.layers[i][jNew].hue = this.duplicateHue[i][j];
      }
    }
  }

  this.twist = function(snapIndex) {
    // console.log("Turning Axis " + snapIndex.toString());
    this.copyHue();
    this.copyBackTwist(snapIndex);
  }

  this.reorient = function(reorientation) {
    if (reorientation == 0) {
      return;
    }
    this.copyHue();
    this.copyBackReorient(reorientation);
  }

  this.initialize();
}
