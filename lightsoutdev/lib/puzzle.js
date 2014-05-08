function Puzzle() {

  this.isSolved = function() {
    return this.stickers.every(function(s) { 
      return s.isSolved(); 
    });
  }

  this.isAllOn = function() {
    return this.stickers.every(function(s) { 
      return (!s.isSolved()); 
    });
  }

  this.markAsSolved = function() {
    var neighborhoodToStore = getNeighborhoodMakesDifference(this.shape) ? this.neighborhood : '2';
    var key = storage.key(this.shape, this.toggleSelf, neighborhoodToStore);
    storage.set(key);
    $('#' + key).removeClass('unsolved-mark');
    $('#' + key).addClass('solved-mark');
    updateRecordCount();
  }

  this.testSolved = function() {
    if (this.scrambledSolve && this.isSolved()) {
      this.markAsSolved();
      alert('Congrats! You solved it in ' + this.nTurnsString() + '!');
      this.scrambledSolve = false;
      this.lastTurn = -1;
      this.lastNeighbors = [];
      this.draw();
    } else if (this.isAllOn()) {
      alert('Nice job! But the real objective is to turn all tiles OFF. Keep on solving!');
    }
  }

  this.setParameters = function(shape, neighborhood, toggleSelf) {
    this.shape = shape;
    this.neighborhood = neighborhood;
    this.toggleSelf = toggleSelf;
  }

  this.initializeState = function() {
    var self = this;
    resetRotationMatrix();
    this.vertices = getVertices(this.shape);
    console.log(this.shape);
    console.log("Number of vertices: " + this.vertices.length);
    
    this.prototypeStickers = getPrototypeStickers(this.shape);
    this.stickersByType = [];
    this.stickers = [];
    this.prototypeStickers.forEach(function(prototypeSticker) {
      var stickersPerType = populateStickers(self.vertices, prototypeSticker, getSymmetry(self.shape));
      self.stickers = self.stickers.concat(stickersPerType);
    });

    console.log("Number of Faces: " + this.stickers.length);
    this.scrambledSolve = false;
    this.nTurns = 0;

    this.lastTurn = -1;
    this.lastNeighbors = [];
  }

  this.resetState = function() {
    this.initializeState();

    this.rotate(new Point3D(-1,0,0), 1.3);
    this.rotate(new Point3D(0,-1,0), 1.7);
    this.rotate(new Point3D(1,0,0), 0.7);
    this.rotate(new Point3D(0,0,-1), 0.2);
    
    this.draw();
  }

  this.draw = function() {
    context.fillStyle = "white";
    context.fillRect(0, 0, viewWidth,viewHeight);

    this.stickers.forEach(function(s) { s.draw(); })

    // this.lastNeighbors.forEach(function(s) {
    //   s.highlight('neighbor');
    // })

    if (this.lastTurn !== -1) {
      this.stickers[this.lastTurn].highlight('handle');
    }

    context.font = "15pt Arial";
    context.fillStyle = "green";
    context.fillText(this.nTurnsString(), 6, viewHeight - 10);
  }

  this.rotate = function(axis, angle) {
    setRotationMatrix(axis, angle);
    this.vertices.forEach(function(v) { v.rotate(); })
  }

  this.turn = function(handleId) {
    var self = this;
    this.lastTurn = handleId;
    if (handleId === -1) return;
    this.lastNeighbors = [];
    this.nTurns += 1;

    var handleSticker = this.stickers[handleId];
    var neighborhood = this.neighborhood;
    this.stickers.forEach(function(s) {
      var neighborLevel = handleSticker.neighbor(s);
      if (neighborLevel > 0 && neighborLevel <3 && neighborLevel >= neighborhood) {
        s.changeState();
        self.lastNeighbors.push(s);
      }
    });

    if (this.toggleSelf) {
      handleSticker.changeState();
    }
  }

  this.snap = function(mouse) {
    for (var i = 0; i < this.stickers.length; i++) {
      if (this.stickers[i].contains(mouse)) return i;
    };
    return -1;
  }

  this.scramble = function() {
    this.resetState();
    var scrambleLength = 50;
    scrambleLength += Math.round(Math.random());

    for (var scrambleIndex = 0; scrambleIndex < scrambleLength; scrambleIndex++) {
      this.turn( Math.floor(Math.random() * 10000) % this.stickers.length);
    }

    if (this.isSolved()) {
      this.turn(0);
    }
    
    this.scrambledSolve = true;
    this.nTurns = 0;

    this.lastTurn = -1;
    this.lastNeighbors = [];
    this.draw();
  }

  this.nTurnsString = function() {
    return this.nTurns.toString() + " move" + (this.nTurns !== 1 ? "s" : "");
  }
}
