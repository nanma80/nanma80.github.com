function createCanvas(numberOfCanvases) {
  var canvasDiv = document.getElementById('canvasDiv');
  canvasDiv.innerHTML = "";
  
  for(var i = 0; i < numberOfCanvases; i++ ) {
    canvasDiv.innerHTML += '<canvas id = "canvas'+ pad(i,2) +'" width="' + canvasSize +'" height="' + canvasSize +'" oncontextmenu="return false;" onselectstart="return false;">  Your browser does not support the HTML5 canvas tag.  </canvas>';
    var newCanvas = document.getElementById("canvas"+pad(i,2)); 
    var newContext = newCanvas.getContext("2d");

    canvases.push( newCanvas );
    contexts.push( newContext );

    // newCanvas.addEventListener("mousedown", mouseDown, false);
    // newCanvas.addEventListener("mousemove", mouseMove, false);
    // newCanvas.addEventListener("mouseover", mouseOver, false);
    // newCanvas.addEventListener("mouseout", mouseOut, false);
  }

  // document.body.addEventListener("mouseup", mouseUp, false);

}

function pad(number, length) {
    var str = '' + number;
    while (str.length < length) {
        str = '0' + str;
    }
    return str;
}


