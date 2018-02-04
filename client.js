
var ctx, canvas, cellWidth, numCells;
var rowVals = [];
var rowNum = 0;
var nextRowVals = [];

// I have no idea why we need this now, I feel like we never needed it before:
(function(window, document, undefined){
  window.onload = init;

    function init() {
      numCells = 30;
      canvas = document.getElementById('canvas');
      console.log(canvas);
      ctx = canvas.getContext('2d');
      cellWidth = canvas.width / numCells;

      initializeVals();
      drawRow();

    }

})(window, document, undefined);

function drawRow() {
  // Wow that was a silly mistake -- it's numCells, not numCells.length!
  for (var k=0; k < numCells; k++) {
    if (rowVals[k]) {
      ctx.fillStyle = 'black';
    } else {
      ctx.fillStyle = 'lightgray';
    }
    ctx.fillRect(k * cellWidth, 5 + rowNum * cellWidth, cellWidth - 1, cellWidth - 1);
  }
  // console.log('drawin', cellWidth, numCells);

  findNextRow();
}

function initializeVals() {
  for (var i=0; i < numCells; i++) {
    if (i == 15) {
      rowVals.push(1);
    } else {
      rowVals.push(0);
    }
  }
}

function findNextRow() {
  for (var i=1; i < rowVals.length - 1; i++) {
    // if (rowVals[i]) {
    //   console.log('ya');
    // }
  }
}
