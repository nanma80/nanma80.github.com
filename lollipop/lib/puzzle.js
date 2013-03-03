function Puzzle() {
  // initial values
  this.totalSize = viewHeight * 0.49;
  this.backgroundColor = 'white';

  // Find how many layers the puzzle has
  this.findNumberOfLayers = function() {
    if (this.order == 3) {
      return 4;
    } else if (this.order == 4) {
      return 6;
    } else if (this.order == 5) {
      return 8;
    } else if (this.order == 6) {
      return 13;
    } else {
      return 1;
    }
  }

  this.initialize = function () {

  }

  this.setOrder = function(order) {
    this.order = order;
    this.layerSize = this.totalSize / this.findNumberOfLayers();
    this.angleSize = Math.PI / this.order;
  }

  this.draw = function() {
    context.fillStyle = this.backgroundColor;
    context.fillRect(0,0,viewWidth,viewHeight);

    for (var i=0; i < this.layers.length; i++) {
      for (var j=0; j< 2 * this.order; j++) {
        this.layers[i][j].draw();
      }
    }
  }

  this.resetState = function() {
    this.layers = new Array( this.findNumberOfLayers() );
    for (var i=0; i<this.layers.length; i++) {
      this.layers[i] = new Array( 2 * this.order );

      for (var j=0; j< 2 * this.order; j++) {
        this.layers[i][j] = new Sticker( i * this.layerSize , (i+1) * this.layerSize , j * this.angleSize, (j + 1) * this.angleSize );
      }
    }
  }

  this.setOrder(3);
  this.resetState();

}
