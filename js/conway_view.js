const Board = require('./board');

const View = function ($el) {
  this.$el = $el;

  this.board = new Board(4);
  this.setupGrid();

  // this.intervalId = window.setInterval(
  //   this.evolve.bind(this),
  //   View.STEP_MILLIS
  // );
  $(".cell").click(this.handleClick.bind(this));
};

View.STEP_MILLIS = 100;

View.prototype.handleClick = function (event) {
  if (event.currentTarget.className.includes("active")) {
    $(event.currentTarget).removeClass('active');
  } else {
    $(event.currentTarget).addClass('active');
  }
  console.log(this.board.neighbors());
};

View.prototype.setupGrid = function () {
  let html = "";

  for (let i = 0; i < this.board.dim; i++) {
    html += "<ul>";
    for (let j = 0; j < this.board.dim; j++) {
      html += `<li class="cell" id='${i}and${j}'></li>`;
    }
    html += "</ul>";
  }

  this.$el.html(html);
  this.$li = this.$el.find("li");
};

View.prototype.step = function () {
  if (this.board.snake.segments.length > 0) {
    this.board.neighbors();
    this.render();
  } else {
    alert("You lose!");
    window.clearInterval(this.intervalId);
  }
};

module.exports = View;
