const Board = require('./board');

const View = function ($el) {
  this.$el = $el;

  this.board = new Board(40);
  this.setupGrid();
  this.$speedBar = $('#speed-bar');
  this.$startButton = $("#start-button");
  this.$stopButton = $("#stop-button");
  this.$clearButton = $("#clear-button");

  $(".cell").click(this.handleClick.bind(this));
  this.$startButton.click(this.start.bind(this));
  this.$stopButton.click(this.stop.bind(this));
  this.$speedBar.on('input', this.adjustSpeed.bind(this));
  this.$clearButton.click(this.clear.bind(this));
};

View.prototype.adjustSpeed = function(e) {
  View.STEP_MILLIS = this.$speedBar[0].value;
  
};

View.STEP_MILLIS = 100;

View.prototype.handleClick = function (event) {
  if (event.currentTarget.className.includes("active")) {
    $(event.currentTarget).removeClass('active');
  } else {
    $(event.currentTarget).addClass('active');
  }
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

View.prototype.start = function () {
  this.intervalId = window.setInterval(
    this.step.bind(this),
    View.STEP_MILLIS
  );
};

View.prototype.stop = function () {
  clearInterval(this.intervalId);
};

View.prototype.clear = function () {
  let cellsToClear = $('.active').toArray();
  cellsToClear.forEach((cell) => {
    $(cell).removeClass('active');
  });
};


View.prototype.step = function () {
  if (!this.board.over()) {
    this.board.neighbors();
  } else {
    alert ('model over');
    clearInterval(this.intervalId);
  }
};

module.exports = View;
