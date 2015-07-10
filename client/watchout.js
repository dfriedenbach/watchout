// start slingin' some d3 here.
var enemies = [];
for(var i = 0 ; i < 10; i++){
  enemies.push({
    x: Math.random() * $('.gameboard').width(),
    y: Math.random() * $('.gameboard').height(),
    id: i
  });
}
var d3Enemies = d3.select('.gameboard').selectAll('.asteroid').data(enemies);

d3Enemies.enter()
  .append('circle')
  .attr('class', 'asteroid')
  .attr('cx', function(d){return d.x})
  .attr('cy', function(d){return d.y})
  .attr('r', 25)
  .style('fill', 'black');

setInterval(function(){
  d3Enemies.transition()
    .duration(1000)
    .attr('cx', function(d){return Math.random() * $('.gameboard').width()})
    .attr('cy', function(d){return Math.random() * $('.gameboard').height()})
}, 1000);

var player = {
  x: $('.gameboard').width() / 2,
  y: $('.gameboard').height() / 2,
  id: 'player'
}
var drag = d3.behavior.drag();
drag.on('drag', function(d){
  d3.select(this)
    .attr('cx', d.x = d3.event.x)
    .attr('cy', d.y = d3.event.y);
});


d3.select('.gameboard').selectAll('.player')
    .data([player])
    .enter()
    .append('circle')
    .attr('cx', function(d){return d.x})
    .attr('cy', function(d){return d.y})
    .attr('r', 25)
    .style('fill', 'purple')
    .call(drag);

