#!/usr/bin/env node

var foo = function() {
  var count = 0;
  var ten = function() {
    count = 10;
  }
  return {
    add: function() { count += 1;},
    ten: ten,
    count: count,
    print: function() { p(count);} 
  }
}

var p = console.log;
//f = foo(); f.print(); f.add(); f.print(); f.ten(); f.print(); f.add(); f.print();

function fact(n, r) {
  if (n === 1) {
    p(r); 
    return 1;
  }
  else {
    r.push(n);
    return (n * fact(n-1, r))
  }
}

p(fact(5, []));
