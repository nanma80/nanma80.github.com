onParameterChange = function() {
  if (puzzle.scrambledSolve && puzzle.nTurns > 10) {
    var r = confirm("You'll lose your progress. Are you sure?");
    if (r === false) {
      return;
    }
  }

  var shape = $("#shape")[0].value;
  var neighborhood = $('#neighborhood')[0].value;
  var toggleSelf = $('#toggleSelf')[0].checked;

  puzzle.setParameters(shape, neighborhood, toggleSelf);
  puzzle.scramble();
};

onClearRecords = function() {
  var r = confirm("List of solved puzzles will be cleared. Are you sure?");
  if (r === true) {
    localStorage.clear();
    loadPuzzleRecords();
  }
};