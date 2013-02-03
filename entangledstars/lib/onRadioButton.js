onRadioButton = function() {
  var orderElements = document.getElementsByName('order');
  var i;

  for (i=0; i < orderElements.length; i++) {
    if (orderElements[i].checked) {
      if (!(orderElements[i].value == puzzle.order)) {
        puzzle.setOrder(orderElements[i].value);
        puzzle.resetState();
        return;
      }
    }
  }
}
