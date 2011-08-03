#!/usr/bin/env node

var init_board = function(bs) { // bs: board size
  var board    = new Array(bs);
  var n_queens = 1;
  var cr = 0, cc = 0; // Current row and column

  for (var r=0; r<bs; r++) {
    board[r] = new Array(bs);
    for (var c=0; c < bs; c++) board[r][c] = 0;
  }
  board[cr][cc] = 1;

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
    r = cl - 1; c = cc - 1;
    while (r < bs && c < bs) { if (board[r][c] === 1) nq += 1; r -= 1; c -= 1; }
    return nq == 1;
  }
  var up = function() {
    var nq = 0, r = cr, c = cc;
    while (r < bs && c < bs) { if (board[r][c] === 1) nq += 1; r -= 1; c += 1; }
    r = cr + 1; c = cc - 1;
    while (r < bs && c < bs) { if (board[r][c] === 1) nq += 1; r += 1; c -= 1; }
    return nq == 1;
  }

  var check_if_valid = function() { 
    return (vertical && horizontal && down && up); 
  }

  return {
    print: function() {
      for (var i=0; i < bs; i++) p(board[i]);
      p("--> [" + cr + "," + cc + "]"); 
    },
    add_queen: function() { 
      cr += 1; cc = 0;
      board[cr][cc] = 1;
      n_queens += 1;
    },
    can_move_right: function() { return cc < (bs - 1); },
    next: function() { // Move queen to the next column
      board[cr][cc] = 0;
      cc += 1;
      board[cr][cc] = 1;
    },
    is_solution: function() { return (check_if_valid() && n_queens == bs); },
    is_valid: function() { return check_if_valid(); }
  }
}

var bt = function(b) {
  if (!b.is_valid()) return;
  if (b.is_solution()) { b.print; return; }

  b.add_queen();
  while (b.can_move_right) {
    bt(b);
    b.next();
  }
}

var p = console.log;
var b = init_board(4);
b.print();
bt(b);