confirmResetPuzzle = function() {
  var nTurnsTriggeringConfirmation = 10;
  if (puzzle.status === 'solving' && puzzle.nTurns > nTurnsTriggeringConfirmation) {
    var r = confirm("You'll lose your progress. Are you sure?");
    if (r === false) {
      return false;
    }
  }
  return true;
}

onParameterChange = function() {
  if (!confirmResetPuzzle()) return;

  var shape = $("#shape")[0].value;
  var neighborhood = $('#neighborhood')[0].value;
  var toggleSelf = $('#toggleSelf')[0].checked;

  puzzle.setParameters(shape, neighborhood, toggleSelf);
  puzzle.scramble();
};

onAllowAnimation = function() {
  allowAnimation = $('#allowAnimation')[0].checked;
};


setParameters = function(shape, neighborhood, toggleSelf) {
  $("#shape")[0].value = shape;
  $('#neighborhood')[0].value = neighborhood;
  $('#toggleSelf')[0].checked = toggleSelf;
  puzzle.setParameters(shape, neighborhood, toggleSelf);
}

onClearRecords = function() {
  var r = confirm("List of solved puzzles will be cleared. Are you sure?");
  if (r === true) {
    storage.clearRecords();
    loadPuzzleRecords();
  }
};

onReset = function() {
  if (!confirmResetPuzzle()) return;
  puzzle.resetState();
  if(typeof(_gaq) !== 'undefined') {
    _gaq.push(['_trackEvent', 'Puzzle', 'Reset', storage.key(puzzle.shape, puzzle.toggleSelf, puzzle.neighborhood)]);
  }
}

onScramble = function() {
  if (!confirmResetPuzzle()) return;
  puzzle.scramble();
}

onResize = function() {
  size = 550;
  var canvasJquery = $('canvas');
  var size = canvasJquery.width();
  canvasJquery.height(size);
  canvas.width = size;
  canvas.height = size;
  
  viewHeight = canvas.height;
  viewWidth = canvas.width;

  if(puzzle) puzzle.draw();
}
