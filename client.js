
// Next steps:
// Add picture of the rule in terms of mapping binary numbers 1 to 8 to booleans based on the binary representation of the rule
// Change speed based on number of cells (DONE)
// A touch of styling
// Let user change starting input! Most importantpart!

var ctx, canvas, cellWidth, numCells;
var rowVals = [];
var rowNum = 0;
var nextRowVals = [];
var draw;
var userRule;

// Still not entirely clear on why the order has to be reversed:
var allBytes = ['111', '110', '101', '100', '011', '010', '001', '000'];

// I have no idea why we need this wrapper now, I feel like we never needed it before:
(function(window, document, undefined){
  window.onload = init;
    function init() {
      canvas = document.getElementById('canvas');

      // for pressing Enter:
      $('body').keyup(function(event) {
        if (event.keyCode == 13) {
          submitClicked();
        }
      });

      $('#sub').on('click', submitClicked);

      ctx = canvas.getContext('2d');

      initializeVals();
    }
})(window, document, undefined);


function submitClicked() {
  $('#binaryRep').empty();
  // Oooh i suspect the issue is failing to parseInt. Fool me once:
  numCells = parseInt($('#cellsIn').val()); // *does* have to be an even number, to work with current way of initializing values
  cellWidth = canvas.width / numCells;
  userRule = parseInt($('#userIn').val());

  // Draw binary representation of rule:
  var binaryRep = dec2bin(userRule);
  $('#binaryRep').append(userRule + " is " + binaryRep + " in binary notation.<br>");
  for (var i=0; i < 8; i++) {
    var bool = parseInt(binaryRep[i]) ? true : false;
    $('#binaryRep').append(binaryRep[i] + ": " + allBytes[i] + " gets mapped to " + bool +  ".<br>");
  }

  // Clear everything out to prepare for re-draw:
  rowVals = [];
  rowNum = 0;
  nextRowVals = [];
  clearInterval(draw);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // re-draw:
  initializeVals();
  // alter draw-speed here:
  draw = setInterval(drawRow, 4000/numCells);
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

function rulesSet(byte, rule) {
  // declare variable:
  var res = 0;

  var binaryRule = dec2bin(rule);  // e.g. '01011010', which is 90, for the Triangle

  // this is a huge condensation:
  res = parseInt(binaryRule.charAt(allBytes.indexOf(byte)));

  return res;
}

function dec2bin(dec){
    var bin = (dec >>> 0).toString(2);
    while (bin.length < 8) {
      bin = '0' + bin;
    }
    return bin;
}
