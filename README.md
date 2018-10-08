# Leaflet.D3SvgOverlay

An overlay class for [Leaflet](http://leafletjs.com), a JS library for interactive maps.  Allows drawing overlay using SVG with the help of [D3](http://d3js.org), a JavaScript library for manipulating documents based on data.

This plugin has initially been developed by [Teralytics AG](https://github.com/teralytics/Leaflet.D3SvgOverlay) and has been adapted to D3 v4/v5 and Leaflet 1.0+ by [Christian Kaiser](https://github.com/christiankaiser).

## Features

 * Easy SVG-drawing with D3
 * No limitations to polylines, circles or geoJSON. Draw whatever you want with SVG
 * No need to reproject your geometries on zoom, this is done using SVG scaling
 * Zoom animation where Leaflet supports it

___Compatible with Leaflet 1.0 and later, and d3 v4 and v5.___


## Examples

There is a folder with simple examples you can use to get started.

## Basic usage

Include the dependency libraries:

```html
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.4/dist/leaflet.css" integrity="sha512-puBpdR0798OZvTTbP4A8Ix/l+A4dHDD0DGqYW6RQ+9jxkRFclaxxQb/SJAWZfWAkuyeQUytO7+7N4QKrDh+drA==" crossorigin=""/>
<script src="https://unpkg.com/leaflet@1.3.4/dist/leaflet.js" integrity="sha512-nMMmRyTVoLYqjP9hrbed9S+FzjZHW5gY1TWCHA5ckwXZBadntCNs8kEqAWdrb9O7rxbCaA4lKTIWjDXZxflOcA==" crossorigin=""></script>
<script src="https://d3js.org/d3.v5.min.js"></script>
```

Include the D3SvgOverlay library:

```html
<script src="L.D3SvgOverlay.min.js"></script>
```

Create a map:

```javascript
var map = L.map(...);
```

Create an overlay:

```javascript
var d3Overlay = L.d3SvgOverlay(function(selection, projection){

selection
	.selectAll('circle')
	.data(dataset)
	.enter()
	.append('circle')
	...
   .attr("cx", function(d) { 
   		return projection.latLngToLayerPoint(d.latLng).x;
   	})
   .attr("cy", function(d) { 
   		return projection.latLngToLayerPoint(d.latLng).y;
   	});
```

Add it to the map:

```javascript
d3Overlay.addTo(map);
```

Note: within the drawing callback function you can and should use the normal [D3 workflow](https://github.com/d3/d3/blob/master/API.md#selections-d3-selection) with *update*, *.enter()* and *.exit()* selections.

## API

*Factory method*

```javascript
L.d3SvgOverlay(<function> drawCallback, <options> options?)
```

 * `drawCallback`  - callback to draw/update overlay contents, it's called with arguments:
 * `options`  - overlay options object:
 
 
*Drawing callback function*

```javascript
drawCallback(selection, projection)
```
 
 * `selection`   - D3 selection of a parent element for drawing. Put your SVG elements bound to data here
 * `projection`  - projection object. Contains methods to work with layers coordinate system and scaling
  
*Overlay options object*

available fields:

 * `zoomHide`   - (bool) hide the layer while zooming. Default is *false*. Useful when overlay contains a lot of elements and animation is laggy.
 * `zoomDraw`   - (bool) whether to trigger drawCallback on after zooming is done. Default is *true*. Useful e.g. when you want to adjust size or width of the elements depending on zoom.

*Projection object*

available methods/fields:

 * `latLngToLayerPoint(latLng, zoom?)`   - (function) returns `L.Point` projected from `L.LatLng` in the coordinate system of the overlay.
 * `layerPointToLatLng(point, zoom?)`    - (function) returns `L.LatLng` projected back from `L.Point` into the original CRS.
 * `unitsPerMeter`    - (float) this is a number of the overlay coordinate system units in 1 meter. Useful to get dimensions in meters.
 * `scale`  - scale of current zoom compared to the zoom level of overlay coordinate system. Useful if you want to make your elements of a size independent of zoom. Just divide the size by the scale.
 * `map`    - reference to the `L.Map` object, useful to get map state (zoom, viewport bounds, etc), especially when having multiple maps in the page.
 * `layer`  - reference to the `L.D3SvgOverlay` object, useful for extending behavior of the overlay.
 * `pathFromGeojson` - a [d3.geo.path](https://github.com/mbostock/d3/wiki/Geo-Paths#path) path generator object that can generate _SVG Path_ projected into the overlay's coordinate system from any [GeoJSON](http://geojson.org/)


## Development

Contributions are welcome. Please submit a pull request.

There is a Gulp file included in order to automatically produce a minified version of the library, located in the `dist` folder.

In order to setup your local development environment, follow these steps:

1. Install gulp on the dev machine if not already done:  ```sudo npm install -g gulp```
	
2. Setup gulp locally (where `gulpfile.js` and `package.json` are
located):  ```npm install```  

3. During development, start the watch task by running ```gulp watch```
