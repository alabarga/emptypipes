function haversine(lat1, lon1, lat2, lon2) {
    /*
    Calculate the haversine distance between two points on the
    globe. Code taken from:

    http://stackoverflow.com/a/14561433
   */
    Number.prototype.toRad = function() {
        return this * Math.PI / 180;
    };

    var R = 6371; // km 
    //has a problem with the .toRad() method below.
    var x1 = lat2-lat1;
    var dLat = x1.toRad();  
    var x2 = lon2-lon1;
    var dLon = x2.toRad();  

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
                    Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * 
                    Math.sin(dLon/2) * Math.sin(dLon/2);  
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c;

    return d;
}

drawSkiMap = function(divName) {
    //var map = L.map('isochroneMap').setView([48.2858, 6.7868], 4);
    var initialLat = 47.630119;
    var initialLon = 15.781780;


    var map = new L.Map(divName, {
        center: new L.LatLng(initialLat, initialLon),
        minZoom: 1,
        zoom: 5
    });

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);


    var topPane = map._createPane('leaflet-top-pane', map.getPanes().mapPane);
    //var topLayerLines = new L.StamenTileLayer('toner-lines', {'opacity': 0.8});

    var width=550, height=400;
    //var defaultContourColor = 'transparent';

    // Initialize the SVG layer
    map._initPathRoot();

    // We pick up the SVG from the map object
    var svg = d3.select("#" + divName).select("svg");
    var gMain = svg.append("g").attr("class", "leaflet-zoom-hide").attr('opacity', 0.8);

    var gAreaBoundaries = gMain.append('g');

    /*
    queue()
    .defer(d3.xml, "application/xml", "/data/stuhleck.osm")
    .await(ready);
    */
    function projectPoint(x, y) {
          var point = map.latLngToLayerPoint(new L.LatLng(x, y));
            this.stream.point(point.x, point.y);
    }

    var transform = d3.geo.transform({point: projectPoint}),
        path = d3.geo.path().projection(transform);

   d3.json('/jsons/ski-areas.topo', function(error, data) {
    var southWest = L.latLng(data.bbox[0], data.bbox[1]),
        northEast = L.latLng(data.bbox[2], data.bbox[3]),
        bounds = L.latLngBounds(southWest, northEast);
        map.fitBounds(bounds);

       console.log('data:', data);

       console.log('data:', data);
       console.log('feature:', topojson.feature(data, data.objects.boundaries));
        var feature = gAreaBoundaries.selectAll(".boundary-path")
        .data(topojson.feature(data, data.objects.boundaries).features)
        .enter().append("path")
        .classed('boundary-path', true);

        function resetView() {
            feature.attr("d", function(d) { return path(d.geometry); });
        }

        map.on("viewreset", resetView);
        resetView();
    });
};
