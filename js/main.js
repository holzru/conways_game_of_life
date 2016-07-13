const ConwayView = require('./conway_view');
const Board = require('./board');
window.Board = Board;

document.addEventListener("DOMContentLoaded", function() {
  $(function () {
    const rootEl = $('.conway');
    new ConwayView(rootEl);
  });
});
