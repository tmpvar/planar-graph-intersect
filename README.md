# planar-graph-intersect

intersect two planar graphs

what is a planar graph? Well, it's roughly a polygon, but instead of specifying it as an array of loops it is represented as a 2d [simplicial-complex](https://github.com/mikolalysenko/simplicial-complex)

## install

`npm install planar-graph-intersect`

## use

```javascript
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

var r = isect(a, b, function(vec, index) {
  var d = float(vec[2]);
  return [
    float(vec[0]) / d,
    float(vec[1]) / d
  ];
});

console.log(r);

/*
  outputs:
  [ [ 5, 10 ], [ 10, 5 ] ]
*/
```

### api surface

_isect_(`a`, `b`[, `fn`])

* `a` - 2d simplicial complex
* `b` - 2d simplicial complex
* `fn` - an optional callback to preprocess the result set

__returns__ an array of homogeneous vectors in [robust predicate](https://github.com/mikolalysenko/robust-arithmetic-notes) form or whatever `fn` converts them them to.

## license

[MIT](LICENSE.txt)
