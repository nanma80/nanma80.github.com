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
    if (!this.scrambledSolve) {
      return;
    }

    if (this.isSolved()) {
      this.markAsSolved();
      alert('Congrats! You solved it in ' + this.nTurnsString() + '!\nTry more shapes!');
      this.scrambledSolve = false;
      this.lastTurn = -1;
      this.lastNeighbors = [];
      this.draw();
      $('#shape').focus();
    } else if (this.isAllOn()) {
      alert('Nice job! But the real objective is to turn all tiles OFF. Keep on solving!');
    }
  }

  this.setParameters = function(shape, neighborhood, toggleSelf) {
    this.shape = shape;
    this.neighborhood = neighborhood;
    this.toggleSelf = toggleSelf;
  }

  this.initializeState = function(options) {
    if(typeof(options)==='undefined') options = {};
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

    this.scrambledSolve = options.scrambledSolve || false;
    this.nTurns = options.nTurns || 0;
    this.lastTurn = options.lastTurn || -1;
    this.lastNeighbors = [];

    if (options.stickerState) {
      for(var i = 0; i < options.stickerState.length; i++) {
        this.stickers[i].state = options.stickerState[i];
      }
    }
  }

  this.resetState = function(options) {
    this.initializeState(options);

    this.rotate(new Point3D(-1,0,0), 1.3);
    this.rotate(new Point3D(0,-1,0), 1.7);
    this.rotate(new Point3D(1,0,0), 0.7);
    this.rotate(new Point3D(0,0,-1), 0.2);
    
    this.draw();
    this.save();
  }

  this.draw = function() {
    context.clearRect(0, 0, viewWidth,viewHeight);

    this.stickers.forEach(function(s) { s.draw(false); })
    this.stickers.forEach(function(s) { s.draw(true); })

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
    this.save();
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
    this.save();
  }

  this.nTurnsString = function() {
    return this.nTurns.toString() + " move" + (this.nTurns !== 1 ? "s" : "");
  }

  this.save = function() {
    var saveContent = {};
    saveContent.shape = this.shape;
    saveContent.neighborhood = this.neighborhood;
    saveContent.toggleSelf = this.toggleSelf;
    saveContent.scrambledSolve = this.scrambledSolve;
    saveContent.nTurns = this.nTurns;
    saveContent.lastTurn = this.lastTurn;
    saveContent.stickerState = this.stickers.map(function(s) {return s.state});
    storage.save(saveContent);
  }

  this.load = function() {
    var loadContent = storage.load();
    if (loadContent !== false && loadContent !== null) {
      if (loadContent.shape && loadContent.neighborhood && loadContent.toggleSelf) {
        setParameters(loadContent.shape, loadContent.neighborhood, loadContent.toggleSelf);
      } else {
        return false;
      }

      this.resetState(loadContent);
      return true;
    } else {
      return false;
    }
  }

  this.initialLoad = function() {
    if (this.load()) {
      this.draw();
    } else {
      onParameterChange();
    }
  }
}
