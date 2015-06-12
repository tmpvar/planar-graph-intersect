var test = require('tape');
var isect = require('./planar-graph-intersect');
var float = require('robust-estimate-float');

var a = {
  positions: [
    [0, 0],
    [0, 10],
    [10, 10],
    [10, 0],
  ],
  cells: [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 0],
  ]
};

var b = {
  positions: [
    [5, 5],
    [5, 20],
    [20, 20],
    [20, 5]
  ],
  cells: [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 0],
  ]
};

test('properly reports intersections (no callback)', function(t) {
  var r = isect(a, b);

  t.deepEqual(r, [
    [ [ 750 ], [ 1500 ], [ 150 ] ],
    [ [ -1500 ], [ -750 ], [ -150 ] ]
  ]);

  t.end();
});

test('properly reports intersections (callback)', function(t) {
  var r = isect(a, b, function(vec, index) {
    var d = float(vec[2]);
    return [
      float(vec[0]) / d,
      float(vec[1]) / d
    ];
  });

  t.deepEqual(r, [
    [ 5, 10 ],
    [ 10, 5 ]
  ]);

  t.end();
});


test('properly reports intersections (callback + skip)', function(t) {
  var r = isect(a, b, function(vec, index) {
    if (index > 0) {
      return false;
    }

    var d = float(vec[2]);
    return [
      float(vec[0]) / d,
      float(vec[1]) / d
    ];
  });

  t.deepEqual(r, [
    [ 5, 10 ],
    [ [ -1500 ], [ -750 ], [ -150 ] ]
  ]);

  t.end();
});
