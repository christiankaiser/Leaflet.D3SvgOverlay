# L.D3SvgOverlay: simple example showing how to work with TopoJSON files

This example uses a [TopoJSON](https://github.com/topojson/topojson) file as source for the geometries to be drawn with d3. TopoJSON files are typically much smaller than GeoJSON files and hence quicker to load over the Web. In this example, we have a file with the 26 Swiss cantons, the TopoJSON file is roughly 165 KB while the equivalent GeoJSON file is 1.2 MB.

A TopoJSON file can encode several layers in the same file. The Javascript TopoJSON file enables extracting the data in a TopoJSON file and convert it into a GeoJSON representation. We only need to include the [TopoJSON Javascript library](https://d3js.org/topojson.v2.min.js) in our HTML file.

__Note:__ the data in the TopoJSON file comes originally from [Swisstopo](http://www.swisstopo.admin.ch). The license for these data can be found on the Swisstopo Website.
