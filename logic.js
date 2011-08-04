$(document).ready(function() {
  var solutions = [];
  var board_size = 8;
  var p = function (s) { $('#console').append(s); }
  var to_s = function(a) {
    var s = "[ "
    _.each(a, function(e) { s += " " + e });  
    return s + " ]";
  }

  p("Computing solutions for a board size of: " + board_size + "<br>");
  queens.bt(queens.init_board(board_size), solutions);
  p(solutions.length + " solutions found." + "<hr>");
  for (var i=0; i<solutions.length; i++) { 
    var b = solutions[i];
    for (var r=0; r<board_size; r++) {
      p(to_s(b[r]) + "<br>");
    }
    p("<br>");
  }
});
