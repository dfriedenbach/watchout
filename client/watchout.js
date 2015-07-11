// start slingin' some d3 here.
var score = 0;
var highScore = 0;
var collisions = 0;
var enemySize = 50;

var enemies = [];
for(var i = 0 ; i < 10; i++){
  enemies.push({
    x: Math.random() * $('.gameboard').width() - enemySize / 2,
    y: Math.random() * $('.gameboard').height() - enemySize / 2,
    r: 15,
    id: i
  });
}
var d3Enemies = d3.select('.gameboard').selectAll('.enemy').data(enemies);

d3Enemies.enter()
  .append('svg:image')
  .attr('xlink:href', 'Shuriken.png')
  .attr('height', enemySize)
  .attr('width', enemySize)
  .attr('class', 'enemy rotate')
  .attr('x', function(d){return d.x})
  .attr('y', function(d){return d.y})
  .attr('r', function(d){return d.r});

setInterval(function(){
  d3Enemies.transition()
    .duration(1000)
    .attr('x', function(d){return Math.random() * $('.gameboard').width() - enemySize / 2})
    .attr('y', function(d){return Math.random() * $('.gameboard').height() - enemySize / 2})
}, 1000);

var player = {
  x: $('.gameboard').width() / 2,
  y: $('.gameboard').height() / 2,
  r: 25,
  id: 'player'
}
var drag = d3.behavior.drag();
drag.on('drag', function(d){
  d3.select(this)
    // Set player position within bounds of game board
    .attr('cx', d.x = Math.max(0 + player.r, Math.min($('.gameboard').width() - player.r, d3.event.x)))
    .attr('cy', d.y = Math.max(0 + player.r, Math.min($('.gameboard').height() - player.r, d3.event.y)));
});


d3.select('.gameboard').selectAll('.player')
    .data([player])
    .enter()
    .append('circle')
    .attr('cx', function(d){return d.x})
    .attr('cy', function(d){return d.y})
    .attr('r', function(d){return d.r})
    .style('fill', 'purple')
    .call(drag);

setInterval(function(){
  var collision = false;

  d3.selectAll('.enemy').each(function(d, i){
    var x = this.getAttribute('x') - player.x + enemySize / 2;
    var y = this.getAttribute('y') - player.y + enemySize / 2;

    var distance = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    var threshold = Number(player.r) + Number(this.getAttribute('r'));

    if(distance <= threshold){
      collision = true;
    }
  });

  if(collision){
    if(score) {
      collisions++;
    }
    score = 0;
    d3.select('.collisions span').text(collisions);
    d3.select('.current span').text(score);
  } else {
    score++;
    if(score > highScore){
      highScore = score;
      d3.select('.high span').text(highScore);
    }
    d3.select('.current span').text(score); 
  }

}, 30)
