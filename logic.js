var rboard = function(bs) {
  // Prepare the Raphael paper
  var p = Raphael("board", 450, 450), // p = paper (canvas)
      start = 10, end = 10, sr = 40, // sr = size rectangles
      white = "#fff", black = "#000",
      q = p.set(); // Set of queens

  // Rect around the board
  p.rect(start, end, bs*sr, bs*sr, 0)
    .attr("fill", white)
    .attr("stroke", white)
    .attr("stroke-width", 3);

  // Creates a small rectangle within the board: rect x,y
  var rect = function(x,y) {
    var color = function () {
      var c;
      if (x % 2 == 0) c = (y % 2 == 0) ? white : black;
      else c = (y % 2 == 0) ? black : white;
      return c;
    }
    var r = p.rect(start+(x*sr), end+(y*sr), sr, sr, 0)
      .attr("fill", color())
      .attr("stroke-width", 0);
  }

  // Create all the small rectangles within the board
  for (x=0; x<bs; x++)
    for (y=0; y<bs; y++) rect(x,y);

  return {
    // Given a new locations of the queens (lq), update them in the board.
    // Before doing that, clean up all the queens in the board
    update_queens: function(lq) { // lq: list of queens
      var center = function(x) {return (start + ((x*sr) - (sr/2))); };
      q.remove();
      _.each(lq, function(e) {
          q.push(p.circle(center(e[0]), center(e[1]) , 12));
      });
      q.attr({fill: "#f00", stroke: "#f00",  opacity: 1});
    }
  }
};

/* Main */
$(document).ready(function() {
  var solutions = [], partials = [],
      c_mov=0, c_sol=0, // counter_movements, counter_solutions
      board_size = 8;

  // Set the info counter to 0 in the gui
  var update_info = function(n, s, m) {
    $('#nqueens').text(n); $('#solutions').text(s); $('#movements').text(m);
  };
  update_info(0,0,0);

  // Create the raphael canvas
  var rb = rboard(board_size);

  // Compute solutions
  queens.bt(queens.init_board(board_size),
    function(b) { partials.push(b); },
    function()  { solutions.push(partials.length); }
  );

  console.log(">> " + solutions[0]);
  // Iterate over the movements and show them
  (function loop() {
    var pa = partials.shift();
    c_mov += 1;
    if (c_mov == solutions[0]) {
      solutions.shift();
      c_sol +=1;
    }
    update_info(pa.length, c_sol, c_mov);
    rb.update_queens(pa);
    setTimeout(function() { loop(); }, 50);
  })();
  // nqueens, n_movements, solutions
});
