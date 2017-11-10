var markers = [];

function initMap() {
    var uluru = {
        lat: 34.0522,
        lng: -118.2437
    };

    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: uluru
    });

    const nationalHistory = {
        position: {
            lat: 34.0170,
            lng: -118.2888,
        },
        title: "National History Museum"
    };

    const contemporaryArts = {
      position: {
          lat: 34.05333,
          lng: -118.25083,
      },
      title: "Museum of Contemporary Arts"
    };

    const hammer = {
      position: {
          lat: 34.0596,
          lng: -118.4438,
      },
      title: "Hammer Museum"
    };

    const modernArt = {
        position: {
            lat: 34.064251,
            lng: -118.360565,
        },
        title: "Los Angeles Museum of Modern Art"
    };

    const iceCream = {
        position: {
            lat: 34.0342,
            lng: -118.2316,
        },
        title: "Museum of Ice Cream"
    };
    var initMarkers = [nationalHistory, contemporaryArts, hammer, modernArt, iceCream];

    initMarkers.forEach(function(location) {
        addMarker(location);
    });

    function addMarker(location) {
        var marker = new google.maps.Marker({
            position: location.position,
            tite: location.title,
            map: map,
        });
        markers.push(marker);
    }
}
