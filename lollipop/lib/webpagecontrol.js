///////// onRadioButton: 

onRadioButton = function() {
  var needUpdate = false;
  var layersElements = document.getElementsByName('order');
  var j;

  for (j=0; j < layersElements.length; j++) {
    if (layersElements[j].checked) {
      if (!(eval(layersElements[j].value) == puzzle.order)) needUpdate = true;
        break;
    }
  }

  if (needUpdate) {
    puzzle.setOrder(eval(layersElements[j].value));
    puzzle.resetState();
    puzzle.draw();
  }
}

function TextInput() {
  this.initialize = function () {
  }

  this.execute = function() {
    var batchExecute = document.getElementById('batchExecuteBox').value;

    var pattern = '[^';
    for (var i=1; i<= puzzle.order; i++) {
      pattern = pattern + i.toString();
    }
    pattern = pattern + 'LRlr]';

    var regexp = new RegExp(pattern,'g');
    batchExecute = batchExecute.replace(regexp,'').toUpperCase();

    document.getElementById('batchExecuteBox').value = '';

    if (batchExecute.length == 0) return;

    this.executeString(batchExecute);
  }

  this.executeString = function(algorithm) {
    for(var i=0; i<algorithm.length; i++) {
      var step = algorithm[i];

      if (step == 'L') {
        puzzle.reorient(1);
      } else if (step == 'R') {
        puzzle.reorient(puzzle.order - 1);
      } else {
        var axis = eval(step) - 1;
        puzzle.twist(axis);
      }
    }

    var historyLength = document.getElementById('historyBox').value.length;
    if (historyLength> 0 && document.getElementById('historyBox').value[historyLength-1] != "\n") {
      document.getElementById('historyBox').value += "\n"
    }
    
    document.getElementById('historyBox').value += algorithm +"\n";

    puzzle.draw();
  }

  this.undo = function() {
    var history = document.getElementById('historyBox').value;
    var historyLength = history.length;

    if (historyLength <= 0) return;

    var lastStep = history[historyLength - 1];

    while (lastStep == "\n") {
      historyLength -= 1;
      if (historyLength <= 0) return;
      lastStep = history[historyLength - 1];
    }

    if (lastStep == 'R') {
      puzzle.reorient(1);
    } else if (lastStep == 'L') {
      puzzle.reorient(puzzle.order - 1);
    } else {
      var axis = eval(lastStep) - 1;
      puzzle.twist(axis);
      puzzle.count -= 2;
    }

    document.getElementById('historyBox').value = history.slice(0, historyLength-1);
    puzzle.draw();
  }

  this.initialize();
}
