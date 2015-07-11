// TO-DO
// initialize player, goal, and fields positions
var setupMode = true;

var boardWidth = $('.gameboard').width();
var boardHeight = $('.gameboard').height();

var radius = 10
var initialVx = 5;
var initialVy = 0;

var player = {
  x: radius,
  y: radius,
  vx: initialVx,
  vy: initialVy,
  r: radius
}
var goal = {
  x: boardWidth - radius,
  y: boardHeight - radius,
  r: radius
}

var attract = function(playerX, playerY){
  var dX = this.x - playerX;
  var dY = this.y - playerY;
  var distance = Math.sqrt(Math.pow(dX, 2) + Math.pow(dY, 2));

  var force = 1000 / Math.pow(distance, 2);

  var changeVx = force * dX / distance;
  var changeVy = force * dY / distance;

  return [changeVx, changeVy];
}

var fields = [];
for (var i = 0; i < 100; i++) {
  fields.push({
    x: Math.random() * boardWidth,
    y: Math.random() * boardHeight,
    calculateEffect: attract,
    r: radius
  });
}

var drag = d3.behavior.drag();
drag.on('drag', function(d){
  d3.select(this)
    // Set position within bounds of game board
    .attr('cx', d.x = Math.max(0 + player.r, Math.min(boardWidth - player.r, d3.event.x)))
    .attr('cy', d.y = Math.max(0 + player.r, Math.min(boardHeight - player.r, d3.event.y)));
});

var d3player = d3.select('.gameboard').selectAll('.player').data([player]);

d3player.enter()
    .append('circle')
    .attr('cx', function(d){return d.x})
    .attr('cy', function(d){return d.y})
    .attr('r', function(d){return d.r})
    .style('fill', 'blue');

d3.select('.gameboard').selectAll('.goal')
    .data([goal])
    .enter()
    .append('circle')
    .attr('cx', function(d){return d.x})
    .attr('cy', function(d){return d.y})
    .attr('r', function(d){return d.r})
    .style('fill', 'red')

var d3Fields = d3.select('.gameboard').selectAll('.field').data(fields);

d3Fields.enter()
  .append('circle')
  .attr('class', 'field')
  .attr('cx', function(d) {return d.x})
  .attr('cy', function(d) {return d.y})
  .attr('r', function(d){return d.r})
  .style('fill', 'black')
  .call(drag);

d3.select('.start').on('click', function() {
  setupMode = false;
});
d3.select('.reset').on('click', function() {
  setupMode = true;
  player.x = player.r;
  player.y = player.r;
  player.vx = initialVx;
  player.vy = initialVy;
  d3player.transition()
    .attr('cx', function(d){return d.x})
    .attr('cy', function(d){return d.y});
});

setInterval(function(){
  if (!setupMode) {
// when not in setup mode, check for collision with goal
    var dX = goal.x - player.x;
    var dY = goal.y - player.y;
    var distance = Math.sqrt(Math.pow(dX, 2) + Math.pow(dY, 2));
    if (distance < 2 * radius) {
      setupMode = true;
      alert('You win!');
    } else {
  // else
    // calculate delta-v of player resulting from interactions with all fields
      fields.forEach(function(field, i){
        var effect = field.calculateEffect(player.x, player.y);
        player.vx += effect[0];
        player.vy += effect[1];
      });

    // transition player to new position resulting from adjusted velocity
      player.x += player.vx;
      player.y += player.vy;
      d3player.transition()
        .duration(33)
        .attr('cx', function(d){return d.x})
        .attr('cy', function(d){return d.y});
    }
  }
}, 33);


// allow moving of fields in while board is in setup mode
// if goal collision detected  
  // win!

