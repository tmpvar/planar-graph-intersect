var segseg = require('exact-segment-intersect');
var doesIsect = require('robust-segment-intersect');

module.exports = isect;

function isect(a, b, fn) {
  var ret = [];

  var al = a.cells.length;
  var bl = b.cells.length;

  for (var ai = 0; ai<al; ai++) {
    var astart = a.positions[a.cells[ai][0]]
    var aend = a.positions[a.cells[ai][1]]

    for (var bi = 0; bi<bl; bi++) {

      var bstart =  b.positions[b.cells[bi][0]];
      var bend = b.positions[b.cells[bi][1]];

      if (doesIsect(astart, aend, bstart, bend)) {
        var r = segseg(
          astart,
          aend,
          bstart,
          bend
        );

        if (fn) {
          var res = fn(r, ret.length)
          if (res) {
            ret.push(res);
          } else {
            ret.push(r);
          }
        } else {
          ret.push(r);
        }
      }
    }
  }

  return ret;
}
