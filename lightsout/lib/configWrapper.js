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

getNeighborhoodMakesDifference = function(shape) {
  return getPuzzleProperty(shape, 'neighborhoodMakesDifference');
}

loadPuzzleDropdown = function() {
  var options = '';
  for (var i = 0; i < puzzleConfig.puzzles.length; i++) {
    var puzzle = puzzleConfig.puzzles[i];
    var isDefaultPuzzle = (puzzle.id === puzzleConfig.defaultPuzzle);
    var option = '<option value="' + puzzle.id + '" ' + (isDefaultPuzzle? 'selected' : '') + '>' + puzzle.displayName + '</option>';
    options += option;
  };
  $("#shape").html(options);
}

loadPuzzleRecords = function() {
  if (!storage.useLocalStorage) {
    return;
  }

  var rows = '<tr><th>Toggle clicked tile?</th><th colspan="2">No</th><th colspan="2">Yes</th></tr>\
    <tr><th>Neighborhood</th><th>Edge</th><th>Vertex</th><th>Edge</th><th>Vertex</th></tr>';
  var toggleSelfOptions = [false, true];
  var neighborhoodOptions = [2, 1];

  for (var i = 0; i < puzzleConfig.puzzles.length; i++) {
    var puzzle = puzzleConfig.puzzles[i];
    var row = '<tr><td>' + puzzle.displayName + '</td>';
    for (var j = 0; j < toggleSelfOptions.length; j++) {
      var toggleSelfOption = toggleSelfOptions[j];
      if (puzzle.neighborhoodMakesDifference) {
        for (var k = 0; k < neighborhoodOptions.length; k++) {
          var neighborhood = neighborhoodOptions[k];
          var key = storage.key(puzzle.id, toggleSelfOption, neighborhood);
          var solved = (storage.get(key) === 'true');
          row += '<td id="' + key + '" class="' + (solved ? 'solved-mark' : 'unsolved-mark') + '"></td>';
        };
      } else {
        var key = storage.key(puzzle.id, toggleSelfOption, neighborhoodOptions[0]);
        var solved = (storage.get(key) === 'true');
        row += '<td colspan="2" id="' + key + '" class="' + (solved ? 'solved-mark' : 'unsolved-mark') + '"></td>';
      }
    };
    row += '</tr>';
    rows += row;
  };

  $("#records").html(rows);
  updateRecordCount();
}

updateRecordCount = function() {
  var nSolved = $(".solved-mark").length;
  var nUnsolved = $(".unsolved-mark").length;
  $("#records-count").html('' + nSolved + "/" + (nSolved + nUnsolved) + ' puzzles solved');
}