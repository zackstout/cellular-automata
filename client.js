
var ctx, canvas, cellWidth, numCells;
var rowVals = [];
var rowNum = 0;
var nextRowVals = [];
var draw;

function dec2bin(dec){
    var bin = (dec >>> 0).toString(2);
    while (bin.length < 8) {
      bin = '0' + bin;
    }
    return bin;
}

console.log(dec2bin(30));

// I have no idea why we need this wrapper now, I feel like we never needed it before:
(function(window, document, undefined){
  window.onload = init;
    function init() {
      numCells = 1000;
      canvas = document.getElementById('canvas');
      console.log(canvas);

      $('#sub').on('click', function() {
        console.log($('#userIn').val());
        console.log($('#cellsIn').val());
        //why can't we set numCells in here? Even if we bring up the cellWidth setting?
        // I thought maybe it was that it has to be an even number to see values.... but that wasn't it:
        // numCells = $('#cellsIn').val();
        // cellWidth = canvas.width / numCells;
        rowVals = [];
        rowNum = 0;
        nextRowVals = [];
        clearInterval(draw);
        ctx.clearRect(0, 0, canvas.width, canvas.height);


        initializeVals();
        // alter draw-speed here:
        draw = setInterval(drawRow, 25);
      });

      ctx = canvas.getContext('2d');
      cellWidth = canvas.width / numCells;

      initializeVals();

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
    ctx.fillRect(k * cellWidth, 5 + rowNum * cellWidth, cellWidth - 50 / numCells, cellWidth - 50 / numCells);
  }

  findNextRow();
}

function initializeVals() {
  for (var i=0; i < numCells; i++) {
    if (i == numCells/2) {
    // if (i % 3 == 0) {
    // if (Math.random() > 0.5) {
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
      // ctx.fillStyle = 'black';
      nextRowVals.push(1);
    } else {
      // ctx.fillStyle = 'lightgray';
      nextRowVals.push(0);
    }
    // ahh we forgot the all-important line. Wait but we're doing this in drawRow():
    // ctx.fillRect(i * cellWidth, 5 + rowNum * cellWidth, cellWidth - 1, cellWidth - 1);

  }
  // because first and last element will always be 0:
  nextRowVals.push(0);

  // Save the new row vals for the next iteration to pick up on:
  rowVals = nextRowVals;
  // This is the key, emptying this out:
  nextRowVals = [];
  // Increase the row number:
  rowNum ++;

  if (rowNum > numCells) {
    clearInterval(draw);
    console.log('done');
  }
}

// Wait something is odd: we're going left to right when reading 0 up to 111, but the digits represent the opposite order... I mean in this case it doesn't matter because it's symmetric, but still:
// Rule 90: 01011010
function rulesSet(byte) {
  var res = 0;
  switch(byte) {
    // Rule 190:
    // case '000':
    // break;
    //
    // case '001':
    // break;
    //
    // case '010':
    // res = 1;
    // break;
    //
    // case '011':
    // break;
    //
    // case '100':
    // res = 1;
    // break;
    //
    // case '101':
    // res = 1;
    // break;
    //
    // case '110':
    // break;
    //
    // case '111':
    // res = 1;
    // break;



    // Rule 30 (00011110):
    // case '000':
    // break;
    //
    // case '001':
    // res = 1;
    // break;
    //
    // case '010':
    // res = 1;
    // break;
    //
    // case '011':
    // res = 1;
    // break;
    //
    // case '100':
    // res = 1;
    // break;
    //
    // case '101':
    // break;
    //
    // case '110':
    // break;
    //
    // case '111':
    // break;



    // Rule 90:
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
