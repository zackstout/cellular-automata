
var ctx, canvas, cellWidth, numCells;
var rowVals = [];
var rowNum = 0;
var nextRowVals = [];
var draw;
var userRule;

function dec2bin(dec){
    var bin = (dec >>> 0).toString(2);
    while (bin.length < 8) {
      bin = '0' + bin;
    }
    return bin;
}

// console.log(dec2bin(30));

// I have no idea why we need this wrapper now, I feel like we never needed it before:
(function(window, document, undefined){
  window.onload = init;
    function init() {
      // numCells = 200;
      canvas = document.getElementById('canvas');
      console.log(canvas);

      $('#sub').on('click', function() {
        console.log($('#userIn').val());
        console.log($('#cellsIn').val());
        //why can't we set numCells in here? Even if we bring up the cellWidth setting?
        // I thought maybe it was that it has to be an even number to see values.... but that wasn't it:
        // Oooh i suspect the issue is failing to parseInt. Fool me once:
        numCells = parseInt($('#cellsIn').val()); // *does* have to be an even number, to work with current way of initializing values
        cellWidth = canvas.width / numCells;
        userRule = parseInt($('#userIn').val());
        // Clear everything out to prepare for re-draw:
        rowVals = [];
        rowNum = 0;
        nextRowVals = [];
        clearInterval(draw);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // re-draw:
        initializeVals();
        // alter draw-speed here:
        draw = setInterval(drawRow, 25);
      });

      ctx = canvas.getContext('2d');
      // cellWidth = canvas.width / numCells;

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
    // if (i % 13 == 0) {
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

    // nice consolidation of if/else:
    nextRowVals.push(rulesSet(byteDescription, userRule));
  }
  // because first and last element will always be 0:
  nextRowVals.push(0);

  // Save the new row vals for the next iteration to pick up on:
  rowVals = nextRowVals;
  // This is the key, emptying this out:
  nextRowVals = [];
  // Increase the row number:
  rowNum ++;

  // Stopping condition:
  if (rowNum > numCells) {
    clearInterval(draw);
    console.log('done');
  }
}

// Still not entirely clear on why the order has to be reversed:
var allBytes = ['111', '110', '101', '100', '011', '010', '001', '000'];
// Wait something is odd: we're going left to right when reading 0 up to 111, but the digits represent the opposite order... I mean in this case it doesn't matter because it's symmetric, but still:
// Rule 90: 01011010
function rulesSet(byte, rule) {
  // console.log(byte);
   var res = 0;

  var binaryRule = dec2bin(rule);  // e.g. '01011010', which is 90, for the Triangle
  // console.log(binaryRule);

  // console.log(parseInt(binaryRule.charAt(allBytes.indexOf(byte))));

  // this is a huge condensation:
  res = parseInt(binaryRule.charAt(allBytes.indexOf(byte)));

  return res;
}
