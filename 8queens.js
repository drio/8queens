var queens = {
  init_board:  function(bs) { // bs: board size
    var board    = new Array(bs);
    var n_queens = 0;
    var cr = -1, cc = -1; // Current row and column
    var p = console.log; // Alias

    for (var r=0; r<bs; r++) {
      board[r] = new Array(bs);
      for (var c=0; c < bs; c++) board[r][c] = 0;
    }

    var horizontal = function(b) {
      var nq = 0;
      for (var c=0; c<bs; c++) { if (board[cr][c] === 1) nq += 1; }
      return nq == 1;
    }
    var vertical = function() {
      var nq = 0;
      for (var r=0; r<bs; r++) { if (board[r][cc] === 1) nq += 1; }
      return nq == 1;
    }
    var down = function() {
      var nq = 0, r = cr, c = cc;
      while (r < bs && c < bs) { if (board[r][c] === 1) nq += 1; r += 1; c += 1; }
      r = cr - 1; c = cc - 1;
      while (r >= 0 && c >= 0) { if (board[r][c] === 1) nq += 1; r -= 1; c -= 1; }
      return nq == 1;
    }
    var up = function() {
      var nq = 0, r = cr, c = cc;
      while (r >= 0 && c < bs) { if (board[r][c] === 1) nq += 1; r -= 1; c += 1; }
      r = cr + 1; c = cc - 1;
      while (r < bs  && c >= 0) { if (board[r][c] === 1) nq += 1; r += 1; c -= 1; }
      return nq == 1;
    }

    var check_if_valid = function() { 
      if (cr == -1) return true;
      else return (vertical() && horizontal() && down() && up()); 
    }

    return {
      print: function() { 
        for (var i=0; i < bs; i++) console.log(board[i]); 
        console.log("");
      },
      add_queen: function() { 
        cr += 1; cc = 0;
        board[cr][cc] = 1;
        n_queens += 1;
      },
      can_move_right: function() { return (cc < bs); },
      next: function() { // Move queen to the next column
        board[cr][cc] = 0;
        cc+=1;
        board[cr][cc] = 1;
      },
      is_solution: function() { return (check_if_valid() && n_queens == bs); },
      is_valid: function() { return check_if_valid(); },
      level_down: function() { 
        board[cr] = []; for (var c=0; c<bs; c++) board[cr][c] = 0;
        cr = cr - 1;
        cc = _.indexOf(board[cr], 1);
        n_queens -= 1;
      },
      current: function() {
        var cq = []; // cq: current queens
        for (var r=0; r<bs; r++)
          for (var c=0; c < bs; c++)
            if (board[r][c] == 1) cq.push([c+1, r+1]);
        return cq;
      }
    }
  },
  // board object, array to store solutions, callback valid, callback solution
  bt:  function(b, cb_valid, cb_solution) {
    if (!b.is_valid()) { cb_valid(b.current()); return; } ;
    if (b.is_solution()) { cb_solution(b.current()); return; }

    b.add_queen();
    while (b.can_move_right()) {
      queens.bt(b, cb_valid, cb_solution);
      b.next();
    }
    b.level_down();
  }
}

/*
var _ = require('./underscore')._;
var b = queens.init_board(4);
var solutions = [];
queens.bt(b, solutions);
for (var i=0; i<solutions.length; i++) { 
  var b = solutions[i];
  for (var r=0; r<4; r++) { console.log(b[r]); }
  console.log("");
}
*/
