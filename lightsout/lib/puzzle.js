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

  this.key = function() {
    return storage.key(this.shape, this.toggleSelf, this.neighborhood);
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
    if (this.status !== 'solving') {
      return;
    }

    if (this.isSolved()) {
      this.markAsSolved();
      alert('Congrats! You solved it in ' + this.nTurnsString() + '!\nTry more shapes!');
      this.status = 'solved';
      this.lastTurn = -1;
      this.lastNeighbors = [];
      this.draw();
      this.save();
      if(typeof(_gaq) !== 'undefined') {
        _gaq.push(['_trackEvent', 'Puzzle', 'Solved', storage.key(this.shape, this.toggleSelf, this.neighborhood)]);
      }
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

    this.status = options.status || 'investigating';
    this.nTurns = options.nTurns || 0;
    this.lastTurn = options.lastTurn || -1;
    this.lastNeighbors = [];

    if (options.stickerState) {
      for(var i = 0; i < options.stickerState.length; i++) {
        this.stickers[i].state = options.stickerState[i];
      }
    }

    if (options.clickedStickers) {
      for(var i = 0; i < options.clickedStickers.length; i++) {
        this.stickers[i].clicked = options.clickedStickers[i];
      }
    }

    this.generateAdjacencyMatrix();
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

  this.markingStickers = function() {
    return (this.status === 'investigating');
  }

  this.draw = function() {
    var markingStickers = this.markingStickers();
    context.clearRect(0, 0, viewWidth,viewHeight);
    var self = this;

    this.stickers.forEach(function(s) { s.draw(false, markingStickers, self.lastNeighbors.indexOf(s) > -1); })
    this.stickers.forEach(function(s) { s.draw(true, markingStickers, self.lastNeighbors.indexOf(s)> -1); })

    // this.lastNeighbors.forEach(function(s) {
    //   s.highlight('neighbor');
    // })

    if (this.lastTurn !== -1) {
      this.stickers[this.lastTurn].highlight('handle');
    }

    context.font = "15pt Arial";
    context.fillStyle = "green";
    context.textAlign = 'start';
    context.fillText(this.nTurnsString(), 6, viewHeight - 10);

    if (typeof(ranks) !== "undefined") {
      context.textAlign = 'end';
      context.fillText("Difficulty: " + ranks[puzzle.key()], viewWidth - 10, 20);
    }

    context.textAlign = 'end';
    context.fillText(this.statusString(), viewWidth - 10, viewHeight - 10);

    if (this.status === 'solved') {
      context.fillStyle = "rgba(138, 128, 118, 0.5)";
      context.fillRect(0, 0, viewWidth,viewHeight);
    }
  }

  this.rotate = function(axis, angle) {
    setRotationMatrix(axis, angle);
    this.vertices.forEach(function(v) { v.rotate(); })
  }

  this.generateAdjacencyMatrix = function() {
    this.adjacencyMatrix = [];
    
    var nStickers = this.stickers.length;
    for (var i = 0; i < nStickers; i++) {
      var row = [];
      var handleSticker = this.stickers[i];
      for (var j = 0; j < nStickers; j++) {
        var targetSticker = this.stickers[j];
        var neighborLevel = handleSticker.neighbor(targetSticker);
        if (neighborLevel > 0 && neighborLevel <3 && neighborLevel >= this.neighborhood) {
          row.push(1);
        } else if (i === j && this.toggleSelf) {
          row.push(1);
        } else {
          row.push(0);
        }
      };
      this.adjacencyMatrix.push(row);
    };
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
      self.lastNeighbors.push(handleSticker);
    }
    
    handleSticker.click();
    this.save();
  }

  this.isTurnable = function() {
    return (this.status !== 'solved');
  }

  this.snap = function(mouse) {
    if (!this.isTurnable()) {
      return -1;
    }
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
    
    this.status = 'solving';
    this.nTurns = 0;

    this.lastTurn = -1;
    this.lastNeighbors = [];
    this.draw();
    this.save();
    if(typeof(_gaq) !== 'undefined') {
      _gaq.push(['_trackEvent', 'Puzzle', 'Scrambled', storage.key(this.shape, this.toggleSelf, this.neighborhood)]);
    }
  }

  this.nTurnsString = function() {
    return this.nTurns.toString() + " move" + (this.nTurns !== 1 ? "s" : "");
  }

  this.statusString = function () {
    var statusToDisplay = (this.status === 'investigating' ? 'exploring' : this.status);
    return statusToDisplay.charAt(0).toUpperCase() + statusToDisplay.slice(1);
  }

  this.save = function() {
    var saveContent = {};
    saveContent.shape = this.shape;
    saveContent.neighborhood = this.neighborhood;
    saveContent.toggleSelf = this.toggleSelf;
    saveContent.status = this.status;
    saveContent.nTurns = this.nTurns;
    saveContent.lastTurn = this.lastTurn;
    saveContent.stickerState = this.stickers.map(function(s) {return s.state});
    if (this.markingStickers()) {
      saveContent.clickedStickers = this.stickers.map(function(s) {return s.clicked});
    }
    storage.save(saveContent);
  }

  this.load = function() {
    // returns whether the loading is successful
    var loadContent = storage.load();
    if (loadContent !== false && loadContent !== null) {
      if (('shape' in loadContent) && ('neighborhood' in loadContent) && ('toggleSelf' in loadContent)) {
        setParameters(loadContent.shape, loadContent.neighborhood, loadContent.toggleSelf);
        this.resetState(loadContent);
        return true;
      }
    }
    return false;
  }

  this.initialLoad = function() {
    if (this.load() && this.status != 'solved') {
      this.draw();
    } else {
      onParameterChange();
    }
  }
}
