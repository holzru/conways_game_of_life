const Board = function (dim) {
  this.dim = dim;
  this.grid = Board.blankGrid(this.dim);
};

Board.blankGrid = function (dim) {
  const grid = [];
  for (let i = 0; i < dim; i++) {
    const row = [];
    for (let j = 0; j < dim; j++) {
      row.push(".");
    }
    grid.push(row);
  }

  return grid;
};

Board.diffs = function() {
  return([[0, -1], [-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1]]);
};

Board.prototype.findNeighborCount = function (coord) {
  let neighbors = [];
  Board.diffs().forEach((diff) => {
    let newCoord = [(coord[0]+diff[0]), (coord[1]+diff[1])];
    neighbors.push(newCoord);
  });
  let count = 0;
  neighbors.forEach((cell) => {
    if (this.inBounds(cell)) {
      if ($(`#${cell[0]}and${cell[1]}`)[0].className.includes('active')) {
        count++;
        console.log(count);
      }
    }
  });
  return count;
};

Board.prototype.inBounds = function(coord) {
  let condition = true;
  coord.forEach((point) => {
    if (point >= this.dim || point < 0) {
      condition = false;
    }
  });
  return condition;
};

Board.prototype.neighbors = function () {
  let newGen = [];
  let cells = $('.cell').toArray();
  cells.forEach((cell) => {
    let pos = cell.id.split("and").map((x) => { return parseInt(x);});
    let nCount = this.findNeighborCount(pos);
    if (nCount === 2) {

    } else if (nCount >= 2 && nCount <= 3) {

    }
  });
};

module.exports = Board;
