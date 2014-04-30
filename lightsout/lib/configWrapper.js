getPuzzleProperty = function(id, key) {
  for (var i = 0; i < puzzleConfig.puzzles.length; i++) {
    if (puzzleConfig.puzzles[i].id === id) return puzzleConfig.puzzles[i][key];
  };
}

getPrototypeStickers = function(shape) {
  return getPuzzleProperty(shape, 'prototypeStickers');
}

getSymmetry = function(shape) {
  return getPuzzleProperty(shape, 'symmetry');
}

loadPuzzleDropdown = function() {
  var options = '';
  for (var i = 0; i < puzzleConfig.puzzles.length; i++) {
    var puzzle = puzzleConfig.puzzles[i];
    var isDefaultPuzzle = (puzzle.id === puzzleConfig.defaultPuzzle);
    var option = '<option value="' + puzzle.id + '" ' + (isDefaultPuzzle? 'selected' : '') + '>' + puzzle.displayName + '</option>';
    options += option;
  };
  document.getElementById("shape").innerHTML = options;
}
