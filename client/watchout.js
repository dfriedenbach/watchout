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
    .style('fill', 'purple');

setInterval(function(){
  d3Enemies.transition()
    .attr('cx', function(d){return Math.random() * $('.gameboard').width()})
    .attr('cy', function(d){return Math.random() * $('.gameboard').height()})
}, 1000);