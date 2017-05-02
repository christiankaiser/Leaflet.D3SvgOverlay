var map = L.map("mapdiv",{center:[46.8, 8.3],zoom:8});
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var cities = [];
var citiesOverlay = L.d3SvgOverlay(function(sel, proj){
  var minLogPop = Math.log2(d3.min(cities, function(d){ return d.population; }));
  sel
    .selectAll('circle')
    .data(cities)
    .enter()
    .append('circle')
    .attr('r',function(d){return Math.max(Math.pow(d.population, 0.57) / 100, 2);})
    .attr('cx',function(d){return proj.latLngToLayerPoint(d.latLng).x;})
    .attr('cy',function(d){return proj.latLngToLayerPoint(d.latLng).y;})
    .attr('stroke','white')
    .attr('stroke-width', 0.4)
    .attr('fill',function(d){return (d.place == 'capital') ? "red" : "blue";});
});

d3.csv("swiss-cities.csv",function(data){
  cities = data.map(function(d){
    d.latLng = [+d.lat,+d.lng];
    d.population = (d.population == '') ? 0 : +d.population;
    return d;
  });
  // Sort the cities according to the population in decreasing order
  // so we can draw proportional symbols correctly
  cities.sort(function(a,b) {
    return (a.population > b.population) ? -1 : ((b.population > a.population) ? 1 : 0);
  });
  citiesOverlay.addTo(map);
});

