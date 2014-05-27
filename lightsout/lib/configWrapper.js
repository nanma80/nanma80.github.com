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
  puzzleConfig.groups.forEach(function(group) {
    options += '<optgroup label="' + group.displayName + '">';
    puzzleConfig.puzzles.forEach(function(puzzle) {
      if(puzzle.group !== group.id) return;
      var isDefaultPuzzle = (puzzle.id === puzzleConfig.defaultPuzzle);
      var option = '<option value="' 
        + puzzle.id 
        + '" ' 
        + (isDefaultPuzzle? 'selected' : '') 
        + '>' 
        + puzzle.displayName 
        + (puzzle.neighborhoodMakesDifference ? ' &dagger;' : '') 
        + '</option>';
      options += option;
    });
    options += '</optgroup>';
  });

  $("#shape").html(options);
}

loadPuzzleRecords = function() {
  var rows = '<tr><th>Toggle clicked tile?</th><th colspan="2">Yes</th><th colspan="2">No</th></tr>\
    <tr><th>Neighborhood</th><th>Edge</th><th>Vertex</th><th>Edge</th><th>Vertex</th></tr>';
  var toggleSelfOptions = [true, false];
  var neighborhoodOptions = [2, 1];

  puzzleConfig.groups.forEach(function(group) {
    puzzleConfig.puzzles.forEach(function(puzzle) {
      if(puzzle.group !== group.id) return;
      var row = '<tr><td>' + puzzle.displayName + '</td>';
      toggleSelfOptions.forEach(function(toggleSelfOption) {
        if (puzzle.neighborhoodMakesDifference) {
          neighborhoodOptions.forEach(function(neighborhood) {
            var key = storage.key(puzzle.id, toggleSelfOption, neighborhood);
            var solved = (storage.get(key) === 'true');
            row += '<td id="' + key + '" class="' + (solved ? 'solved-mark' : 'unsolved-mark') + '"></td>';
          });
        } else {
          var key = storage.key(puzzle.id, toggleSelfOption, neighborhoodOptions[0]);
          var solved = (storage.get(key) === 'true');
          row += '<td colspan="2" id="' + key + '" class="' + (solved ? 'solved-mark' : 'unsolved-mark') + '"></td>';
        }
      });
      row += '</tr>';
      rows += row;
    });
  });

  $("#records").html(rows);
  updateRecordCount();
}

updateRecordCount = function() {
  var nSolved = $(".solved-mark").length;
  var nUnsolved = $(".unsolved-mark").length;
  $("#records-count").html('' + nSolved + "/" + (nSolved + nUnsolved) + ' puzzles solved');
  if(typeof(_gaq) !== 'undefined') {
    _gaq.push(['_trackEvent', 'Record', 'Updated', '' + nSolved + "/" + (nSolved + nUnsolved)]);
    _gaq.push(['_trackEvent', 'Record', 'Stats', 'SolvedPuzzles', nSolved]);
  }
}