
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
      setInterval(drawRow, 1000);

    }
})(window, document, undefined);

function drawRow() {
  // Draw current row:
  // Wow that was a silly mistake -- it's numCells, not numCells.length!
  for (var k=0; k < numCells; k++) {
    if (rowVals[k]) {
      ctx.fillStyle = 'black';
    } else {
      ctx.fillStyle = 'lightgray';
    }
    ctx.fillRect(k * cellWidth, 5 + rowNum * cellWidth, cellWidth - 1, cellWidth - 1);
  }

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
  // because first and last element will always be 0:
  nextRowVals.push(0);
  for (var i=1; i < rowVals.length - 1; i++) {
    var byteDescription = '';
    byteDescription += rowVals[i - 1];
    byteDescription += rowVals[i];
    byteDescription += rowVals[i + 1];

    // console.log(byteDescription);

    if (rulesSet(byteDescription)) {
      ctx.fillStyle = 'black';
      nextRowVals.push(1);
    } else {
      ctx.fillStyle = 'lightgray';
      nextRowVals.push(0);
    }
    // ahh we forgot the all-important line:
    ctx.fillRect(i * cellWidth, 5 + rowNum * cellWidth, cellWidth - 1, cellWidth - 1);

  }
  // because first and last element will always be 0:
  nextRowVals.push(0);

  // Save the new row vals for the next iteration to pick up on:
  rowVals = nextRowVals;
  // Increase the row number:
  rowNum++;
}

// Wait something is odd: we're going left to right when reading 0 up to 111, but the digits represent the opposite order... I mean in this case it doesn't matter because it's symmetric, but still:
// Rule 90: 01011010
function rulesSet(byte) {
  var res = 0;
  switch(byte) {
    case '000':
    break;

    case '001':
    res = 1;
    break;

    case '010':
    break;

    case '011':
    res = 1;
    break;

    case '100':
    res = 1;
    break;

    case '101':
    break;

    case '110':
    res = 1;
    break;

    case '111':
    break;
  }
  return res;
}
