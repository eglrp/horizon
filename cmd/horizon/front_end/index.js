mapboxgl.accessToken = 'pk.eyJ1IjoiZGltYWhraWluIiwiYSI6ImNqZmNqYWV3bjJxM2IzNG52M3cwNG9sbTEifQ.hBZWN6asfRuTVSKV6Ut1Bw'; // token from Mapbox docs (https://docs.mapbox.com/mapbox-gl-js/example/simple-map/)
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [0, 0],
    zoom: 1
});

var draw = new MapboxDraw({
    displayControlsDefault: false,
    controls: {
        point: true,
        trash: true
    }
});

map.addControl(draw, 'top-left');

map.on('load', function() {
    console.log("Map has been loaded");
    map.on('draw.create', updateMapMatch);
    map.on('draw.delete', updateMapMatch);
    map.on('draw.update', updateMapMatch);
});

function updateMapMatch(e) {
    var data = draw.getAll();
    if (data.features.length < 3) {
        console.log(`You need to provide another ${3-data.features.length} GPS points`);
        return
    }
    console.log("Doing map matching");

    let gpsMeasurements = data.features.map(element => {
       return {
           "tm": element.id,
           "lonLat": [element.geometry.coordinates[0], element.geometry.coordinates[0]],
       };
    });
    
    let requestData = {
        "maxStates": 5,
        "stateRadius": 7,
        "gps": gpsMeasurements
    }
}