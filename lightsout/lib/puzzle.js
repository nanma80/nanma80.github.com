function Puzzle() {

  this.isSolved = function() {
    for (var i = 0; i < this.stickers.length; i++) {
      if (!this.stickers[i].isSolved()) return false;
    };
    return true;
  }

  this.isAllOn = function() {
    for (var i = 0; i < this.stickers.length; i++) {
      if (this.stickers[i].isSolved()) return false;
    };
    return true;
  }

  this.markAsSolved = function() {
    var key = storage.key(this.shape, this.toggleSelf, this.neighborhood);
    storage.set(key);
    $('#' + key).removeClass('unsolved-mark');
    $('#' + key).addClass('solved-mark');
  }

  this.testSolved = function() {
    if (this.scrambledSolve && this.isSolved()) {
      this.markAsSolved();
      alert('Congrats! You solved it in ' + this.nTurnsString() + '!');
      this.scrambledSolve = false;
      this.lastTurn = -1;
      this.draw();
    } else if (this.isAllOn()) {
      alert('Nice job! But the real objective is to turn all tiles OFF.');
    }
  }

  this.setParameters = function(shape, neighborhood, toggleSelf) {
    this.shape = shape;
    this.neighborhood = neighborhood;
    this.toggleSelf = toggleSelf;
  }

  this.initializeState = function() {
    resetRotationMatrix();
    this.vertices = getVertices(this.shape);
    console.log("Number of vertices: " + this.vertices.length);
    
    this.prototypeStickers = getPrototypeStickers(this.shape);
    this.stickersByType = [];
    this.stickers = [];
    for(var i = 0; i < this.prototypeStickers.length; i++) {
      var stickersPerType = populateStickers(this.vertices, this.prototypeStickers[i], getSymmetry(this.shape));
      this.stickers = this.stickers.concat(stickersPerType);
    }
    console.log("Number of stickers: " + this.stickers.length);
    this.scrambledSolve = false;
    this.nTurns = 0;

    this.lastTurn = -1;
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

    for (var i = 0; i < this.stickers.length; i++) {
      this.stickers[i].draw();
    }

    if (this.lastTurn !== -1) {
      this.stickers[this.lastTurn].highlight();
    }

    context.font = "15pt Arial";
    context.fillStyle = "green";
    context.fillText(this.nTurnsString(), 6, viewHeight - 10);
  }

  this.rotate = function(axis, angle) {
    setRotationMatrix(axis, angle);

    for (var i = 0; i < this.vertices.length; i++) {
      this.vertices[i].rotate();
    }
  }

  this.turn = function(handleId) {
    this.lastTurn = handleId;
    if (handleId === -1) return;
    
    this.nTurns += 1;

    for (var i = 0; i < this.stickers.length; i++) {
      var neighborLevel = this.stickers[handleId].neighbor(this.stickers[i]);
      if (neighborLevel > 0 && neighborLevel <3 && neighborLevel >= this.neighborhood)
        this.stickers[i].changeState();
    };

    if (this.toggleSelf)
      this.stickers[handleId].changeState();
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
    this.draw();
  }

  this.nTurnsString = function() {
    return this.nTurns.toString() + " move" + (this.nTurns !== 1 ? "s" : "");
  }
}
