
// Next Steps:
// Add picture of the rule in terms of mapping binary numbers 1 to 8 to booleans based on the binary representation of the rule
// A touch of styling
// Let user change starting input! Most important part!
// Let user choose color.

var ctx, canvas, cellWidth, numCells;
var rowVals = [];
var rowNum = 0;
var nextRowVals = [];
var draw;
var userRule;
var allBytes = ['111', '110', '101', '100', '011', '010', '001', '000'];

// Initialize the canvas, add event handlers:
(function(window, document, undefined){
  window.onload = init;
  function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    // for pressing Enter:
    $('body').keyup(function(event) {
      if (event.keyCode == 13) {
        submitClicked();
      }
    });

    $('#sub').on('click', submitClicked);

    initializeVals();
  }
})(window, document, undefined);


function submitClicked() {
  $('#binaryRep').empty();
  // Grab user input:
  numCells = parseInt($('#cellsIn').val());
  cellWidth = canvas.width / numCells;
  userRule = parseInt($('#userIn').val());

  // Draw binary representation of rule:
  var binaryRep = dec2bin(userRule);
  $('#binaryRep').append("<span style='color: red'>" + userRule + "</span> is <span style='color: purple'>" + binaryRep + "</span> in binary notation.<br><br>");
  for (var i=0; i < 8; i++) {
    var bool = parseInt(binaryRep[i]) ? true : false;
    var col = bool ? "green" : "pink";
    $('#binaryRep').append("<span style='color: purple'>" + binaryRep[i] + "</span>: " + allBytes[i] + " gets mapped to <span style='color:" + col + "'>" + bool +  "</span>.<br>");
  }

  // Clear everything out to prepare for re-draw:
  rowVals = [];
  rowNum = 0;
  nextRowVals = [];
  clearInterval(draw);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Re-draw:
  initializeVals();
  // Alter draw-speed here:
  draw = setInterval(drawRow, 4000/numCells);
}

function initializeVals() {
  for (var i=0; i < numCells; i++) {
    // Always start with one cell ON in the middle:
    if (i == numCells/2) { // Other possible conditions: Math.random() > 0.5, i % 13 == 0, ...
      rowVals.push(1);
    } else {
      rowVals.push(0);
    }
  }
}

function drawRow() {
  // Draw current row:
  for (var k=0; k < numCells; k++) {
    if (rowVals[k]) {
      ctx.fillStyle = 'blue';
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
  var res = 0;
  var binaryRule = dec2bin(rule);  // e.g. '01011010', which is 90, for the Triangle

  // this is a huge condensation:
  res = parseInt(binaryRule.charAt(allBytes.indexOf(byte)));

  return res;
}

function dec2bin(dec){
  // Thanks Stack Overflow:
  var bin = (dec >>> 0).toString(2);
  // Normalize all lengths to 8:
  while (bin.length < 8) {
    bin = '0' + bin;
  }
  return bin;
}
