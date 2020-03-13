mapboxgl.accessToken = 'pk.eyJ1IjoiZGltYWhraWluIiwiYSI6ImNqZmNqYWV3bjJxM2IzNG52M3cwNG9sbTEifQ.hBZWN6asfRuTVSKV6Ut1Bw'; // token from Mapbox docs (https://docs.mapbox.com/mapbox-gl-js/example/simple-map/)
var map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/dimahkiin/ck7q21t6z0ny71imt9v5valra",
    center: [37.60011784074581, 55.74694688386492],
    zoom: 17
});

var textFieldProps = {
    'type': 'identity',
    'property': 'num'
};

const theme = [
    {
        'id': 'gl-draw-polygon-fill-inactive',
        'type': 'fill',
        'filter': ['all',
        ['==', 'active', 'false'],
        ['==', '$type', 'Polygon'],
        ['!=', 'mode', 'static']
        ],
        'paint': {
        'fill-color': '#3bb2d0',
        'fill-outline-color': '#3bb2d0',
        'fill-opacity': 0.1
        }
    },
    {
        'id': 'gl-draw-polygon-fill-active',
        'type': 'fill',
        'filter': ['all', ['==', 'active', 'true'], ['==', '$type', 'Polygon']],
        'paint': {
        'fill-color': '#fbb03b',
        'fill-outline-color': '#fbb03b',
        'fill-opacity': 0.1
        }
    },
    {
        'id': 'gl-draw-polygon-midpoint',
        'type': 'circle',
        'filter': ['all',
        ['==', '$type', 'Point'],
        ['==', 'meta', 'midpoint']],
        'paint': {
        'circle-radius': 3,
        'circle-color': '#fbb03b'
        }
    },
    {
        'id': 'gl-draw-polygon-stroke-inactive',
        'type': 'line',
        'filter': ['all',
        ['==', 'active', 'false'],
        ['==', '$type', 'Polygon'],
        ['!=', 'mode', 'static']
        ],
        'layout': {
        'line-cap': 'round',
        'line-join': 'round'
        },
        'paint': {
        'line-color': '#3bb2d0',
        'line-width': 2
        }
    },
    {
        'id': 'gl-draw-polygon-stroke-active',
        'type': 'line',
        'filter': ['all', ['==', 'active', 'true'], ['==', '$type', 'Polygon']],
        'layout': {
        'line-cap': 'round',
        'line-join': 'round'
        },
        'paint': {
        'line-color': '#fbb03b',
        'line-dasharray': [0.2, 2],
        'line-width': 2
        }
    },
    {
        'id': 'gl-draw-line-inactive',
        'type': 'line',
        'filter': ['all',
        ['==', 'active', 'false'],
        ['==', '$type', 'LineString'],
        ['!=', 'mode', 'static']
        ],
        'layout': {
        'line-cap': 'round',
        'line-join': 'round'
        },
        'paint': {
        'line-color': '#3bb2d0',
        'line-width': 2
        }
    },
    {
        'id': 'gl-draw-line-active',
        'type': 'line',
        'filter': ['all',
        ['==', '$type', 'LineString'],
        ['==', 'active', 'true']
        ],
        'layout': {
        'line-cap': 'round',
        'line-join': 'round'
        },
        'paint': {
        'line-color': '#fbb03b',
        'line-dasharray': [0.2, 2],
        'line-width': 2
        }
    },
    {
        'id': 'gl-draw-polygon-and-line-vertex-stroke-inactive',
        'type': 'circle',
        'filter': ['all',
        ['==', 'meta', 'vertex'],
        ['==', '$type', 'Point'],
        ['!=', 'mode', 'static']
        ],
        'paint': {
        'circle-radius': 5,
        'circle-color': '#fff'
        }
    },
    {
        'id': 'gl-draw-polygon-and-line-vertex-inactive',
        'type': 'circle',
        'filter': ['all',
        ['==', 'meta', 'vertex'],
        ['==', '$type', 'Point'],
        ['!=', 'mode', 'static']
        ],
        'paint': {
        'circle-radius': 3,
        'circle-color': '#fbb03b'
        }
    },
    {
        'id': 'gl-draw-point-point-stroke-inactive',
        'type': 'circle',
        'filter': ['all',
        ['==', 'active', 'false'],
        ['==', '$type', 'Point'],
        ['==', 'meta', 'feature'],
        ['!=', 'mode', 'static']
        ],
        'paint': {
        'circle-radius': 5,
        'circle-opacity': 1,
        'circle-color': '#fff'
        }
    },
    {
        'id': 'gl-draw-point-inactive',
        'type': 'circle',
        'filter': ['all',
        ['==', 'active', 'false'],
        ['==', '$type', 'Point'],
        ['==', 'meta', 'feature'],
        ['!=', 'mode', 'static']
        ],
        'paint': {
        'circle-radius': 3,
        'circle-color': '#3bb2d0'
        }
    },
    {
        'id': 'gl-draw-point-stroke-active',
        'type': 'circle',
        'filter': ['all',
        ['==', '$type', 'Point'],
        ['==', 'active', 'true'],
        ['!=', 'meta', 'midpoint']
        ],
        'paint': {
        'circle-radius': 7,
        'circle-color': '#fff'
        }
    },
    {
        'id': 'gl-draw-point-active',
        'type': 'circle',
        'filter': ['all',
        ['==', '$type', 'Point'],
        ['!=', 'meta', 'midpoint'],
        ['==', 'active', 'true']],
        'paint': {
        'circle-radius': 5,
        'circle-color': '#fbb03b'
        }
    },
    {
        'id': 'gl-draw-polygon-fill-static',
        'type': 'fill',
        'filter': ['all', ['==', 'mode', 'static'], ['==', '$type', 'Polygon']],
        'paint': {
        'fill-color': '#404040',
        'fill-outline-color': '#404040',
        'fill-opacity': 0.1
        }
    },
    {
        'id': 'gl-draw-polygon-stroke-static',
        'type': 'line',
        'filter': ['all', ['==', 'mode', 'static'], ['==', '$type', 'Polygon']],
        'layout': {
        'line-cap': 'round',
        'line-join': 'round'
        },
        'paint': {
        'line-color': '#404040',
        'line-width': 2
        }
    },
    {
        'id': 'gl-draw-line-static',
        'type': 'line',
        'filter': ['all', ['==', 'mode', 'static'], ['==', '$type', 'LineString']],
        'layout': {
        'line-cap': 'round',
        'line-join': 'round'
        },
        'paint': {
        'line-color': '#404040',
        'line-width': 2
        }
    },
    {
        'id': 'gl-draw-point-static',
        'type': 'circle',
        'filter': ['all', ['==', 'mode', 'static'], ['==', '$type', 'Point']],
        'paint': {
        'circle-radius': 5,
        'circle-color': '#404040'
        }
    }
];

let modifiedStyles = theme.map(function(style) {
    if (style.id === 'gl-draw-point-inactive') {
        return carCreated(style);
    } else if (style.id === 'gl-draw-point-active') {
        return carClicked(style);
    } else {
        return style;
    }
});

function carCreated(style) {
    return {
        id: style.id,
        filter: style.filter,
        type: "symbol",
        layout: {
            "text-field": ['get', 'id'],
            "text-variable-anchor": ['top', 'bottom', 'left', 'right'],
            "text-radial-offset": 1.0,
            "text-justify": "auto",
            "icon-image": "loc_marker_placed",
            "icon-size": 0.5,
            "icon-allow-overlap": true,
            "text-allow-overlap": true
        }
    };
}

function carClicked(style) {
    return {
        id: style.id,
        filter: style.filter,
        type: "symbol",
        layout: {
            "text-field": ['get', 'id'],
            "text-variable-anchor": ['top', 'bottom', 'left', 'right'],
            "text-radial-offset": 1.0,
            "text-justify": "auto",
            "icon-image": "loc_marker",
            "icon-size": 0.5,
            "icon-allow-overlap": true,
            "text-allow-overlap": true
        }
    };
}

var draw = new MapboxDraw({
    displayControlsDefault: false,
    userProperties: true,
    controls: {
        point: true,
        trash: true
    },
    styles: modifiedStyles
});

map.addControl(draw, "top-left");
var timerAnimatedRoute = null;
var pointsCounter = 0;

map.on("load", function() {
    console.log("Map has been loaded");
    map.on("draw.create", updateMapMatch);
    map.on("draw.update", updateMapMatch);
    map.on("draw.delete", updateMapMatch);
    // map.loadImage("assets/img/location.png", function(error, image) {
    //     if (error) {
    //         throw error
    //     };
    //     map.addImage('loc-marker', image);
    // });
});

function updateMapMatch(e) {

    if (e.features && e.features.length === 1 && e.type === "draw.create") {
        pointsCounter++;
        // Tyring to play with ID
        // Can't do text-field with properties ['get', 'property_name'] just doesn't work, when I do provide property)
        draw.delete(e.features[0].id);
        e.features[0].id = `GPS #${pointsCounter}`;
        draw.add(e.features[0]);
    }

    var data = draw.getAll();
    if (data.features.length < 3) {
        console.log(`You need to provide another ${3-data.features.length} GPS points`);
        if (map.getLayer("layer_matched_route")) { // Clear layer when 'draw.delete' fired
            map.removeLayer("layer_matched_route");
        }
        return
    }

    console.log("Doing map matching");
    let currentTime = new Date();
    let gpsMeasurements = data.features.map(element => {
        currentTime.setSeconds(currentTime.getSeconds() + 30); // artificial GPS timestamps
        return {
            "tm": moment(currentTime).format("YYYY-MM-DDTh:mm:ss"),
            "lonLat": [element.geometry.coordinates[0], element.geometry.coordinates[1]],
        };
    });
    doMapMatch(gpsMeasurements)
}

function doMapMatch(gpsMeasurements) {
    
    let requestData = {
        "maxStates": 5,
        "stateRadius": 7,
        "gps": gpsMeasurements
    }
    let sourceName = "source_matched_route";
    let layerName = "layer_matched_route";

    fetch("http://localhost:32800/api/v0.1.0/mapmatch", {
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
    })
    .then(response => response.json())
    .then(function(jsoned) {

        clearInterval(timerAnimatedRoute);

        if (map.getSource(sourceName)) {
            map.getSource(sourceName).setData(jsoned.data);
        } else {
            map.addSource(sourceName, {
                "type": "geojson",
                "data": jsoned.data
            });
        }
        if (!map.getLayer(layerName)) {
            map.addLayer({
                "id": layerName,
                "type": "line",
                "source": sourceName,
                "layout": {
                    "line-join": "round",
                    "line-cap": "butt"
                },
                "paint": {
                    "line-color": "#0000ff",
                    "line-opacity": 0.8 ,
                    "line-dasharray": [0, 4, 3],
                    "line-width": 3
                }
            });
        }

        // Animation - https://stackoverflow.com/a/45817976/6026885
        let step = 0;
        let dashArraySeq = [
          [0, 4, 3],
          [1, 4, 2],
          [2, 4, 1],
          [3, 4, 0],
          [0, 1, 3, 3],
          [0, 2, 3, 2],
          [0, 3, 3, 1]
        ];
        let animationStep = 100;
        timerAnimatedRoute = setInterval(() => {
            step = (step + 1) % dashArraySeq.length;
            if (map.getLayer(layerName)) {
                map.setPaintProperty(layerName, "line-dasharray", dashArraySeq[step]);
            }
        }, animationStep);

    });
}
