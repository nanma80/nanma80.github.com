function Puzzle() {
  this.initialize = function () {
    // initial values
    this.totalSize = viewHeight * 0.4;
    this.backgroundColor = 'rgb(250,250,250)';
    this.setOrder(3);
    this.count = 0;
    this.resetState();
  }

  this.setOrder = function(order) {
    this.order = order;
    var layerSize = this.totalSize / configuration[this.order].layer;
    this.layerRadii = new Array(configuration[this.order].layer + 1);

    for (var i = 0; i <= configuration[this.order].layer; i++) {
      this.layerRadii[i] = layerSize * (configuration[this.order].layer - i);
    }

    this.highlightedLayer = -1;

    this.angleSize = Math.PI / this.order;
    this.turnability = configuration[this.order].turnability;
  }

  this.highlightLayer = function(indexOfLayer) {
    this.highlightedLayer = indexOfLayer;
    this.highlightFactor = (indexOfLayer < 0)? 1 : 3 ; // a highlighted layer = Factor times other layer
    var layerSize = this.totalSize / (configuration[this.order].layer + this.highlightFactor - 1);

    for (var i = 0; i <= configuration[this.order].layer; i++) {
      if (i <= indexOfLayer)
        this.layerRadii[i] = layerSize * (configuration[this.order].layer - i + this.highlightFactor - 1);
      else 
        this.layerRadii[i] = layerSize * (configuration[this.order].layer - i);
    }

    for (var i=0; i<this.layers.length; i++) {
      for (var j=0; j< 2 * this.order; j++) {
        this.layers[i][j].minRadius = this.layerRadii[i+1];
        this.layers[i][j].maxRadius = this.layerRadii[i];
      }
    }
  }

  this.draw = function() {

    // draw background
    context.fillStyle = this.backgroundColor;
    context.fillRect(0, 0, viewWidth, viewHeight);

    // draw axis

    for (var i=0; i< this.order; i++) {
      var theta = i * Math.PI * 2 / this.order;
      var textAbs = viewHeight * 0.475;
      var textPosition = new Point2D( - textAbs * Math.sin(theta) - 9, - textAbs * Math.cos(theta) + 13);

      context.font = '20pt Arial';
      context.fillStyle = 'blue';
      context.textAlign = 'left';
      // displayed axis number is the internal index plus one. Counting from 1
      context.fillText((i+1).toString(), canvasCenter.x + textPosition.x, canvasCenter.y + textPosition.y);
      // draw knobs
      this.knobs[i].draw();
    }

    context.font = "20pt Arial";
    context.fillStyle = "black";
    context.fillText(this.count.toString() + " move" + (this.count > 1 ? "s" : ""), 10, viewHeight - 10);

    var magnifiedString = "";
    if (this.highlightedLayer < 0) magnifiedString = 'Shift + click to magnify a ring';
    else magnifiedString = 'Magnifying ring #' + (this.highlightedLayer + 1).toString();

    context.font = "12pt Arial";
    context.fillStyle = "black";
    context.textAlign = 'right';
    context.fillText(magnifiedString, viewWidth-10, viewHeight - 10);
    context.textAlign = 'left';


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
          this.layerRadii[i+1], // minRadius
          this.layerRadii[i], // maxRadius
          j * this.angleSize, //minAngle
          (j + 1) * this.angleSize, //maxAngle
          i,
          j
        );
        this.duplicateHue[i][j] = 0;
      }
    }

    this.knobs = new Array(this.order);

    for (var i=0; i<this.order; i++) {
      var theta = i * Math.PI * 2 / this.order;
      this.knobs[i] = new Knob(theta, i);
    }
    
    document.getElementById('historyBox').value = '';
    this.count = 0;
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
    animationTwistFrameIndex = 0;
    animatingTwist = true;

    var animationTwistInterval = setInterval(
      function() {
        animationTwistFrameIndex ++;
        puzzle.draw();
        if( animationTwistFrameIndex >= animationTwistFrames ) {
          animatingTwist = false;
          clearInterval(animationTwistInterval);
        }
      }
    , animationTwistDuration / animationTwistFrames);

    this.copyHue();
    this.copyBackTwist(snapIndex);
    this.count += 1;
  }

  this.reorient = function(reorientation) {
    if (reorientation == 0) {
      return;
    }
    this.copyHue();
    this.copyBackReorient(reorientation);
  }

  this.scramble = function() {
    var scrambleLength = 50;
    scrambleLength += Math.round(Math.random());

    for (var scrambleIndex = 0; scrambleIndex < scrambleLength; scrambleIndex++) {
      this.twist( Math.floor(Math.random() * 100) % this.order );
    }
    snap.update();
    this.count = 0;
    this.draw();
    document.getElementById('historyBox').value = '';
  }

  this.initialize();
}
