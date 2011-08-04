$(document).ready(function() {
  $('#console').append("Ready...");
  var solutions = [];
  queens.bt(queens.init_board(4), solutions);
  for (var i=0; i<solutions.length; i++) { 
    var b = solutions[i];
    for (var r=0; r<4; r++) { console.log([r]); }
    console.log("");
  }
});
