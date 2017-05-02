var map = L.map("mapdiv",{center:[46.8, 8.3],zoom:8});
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var vec200_topojson = null;


var cantonsOverlay = L.d3SvgOverlay(function(sel, proj){

  features = sel.selectAll('path')
    .data(topojson.feature(vec200_topojson, vec200_topojson.objects.cantons).features);

  features
    .enter()
    .append('path')
    .attr('stroke','white')
    .attr('fill', 'red')
    .attr('fill-opacity', 0.5)
    .attr('d', proj.pathFromGeojson);

  features
    .attr('stroke-width', 0.6 / proj.scale);

});


d3.json('vec200-cantons-topo.json', function(data){
  vec200_topojson = data;
  cantonsOverlay.addTo(map);
});