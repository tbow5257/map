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
        title: "National History Museum",
        yelpId: "natural-history-museum-los-angeles?osq=national+history+museum"
    };

    const contemporaryArts = {
      position: {
          lat: 34.05333,
          lng: -118.25083,
      },
      title: "Museum of Contemporary Arts",
      yelpId: "the-museum-of-contemporary-art-los-angeles"
    };

    const hammer = {
      position: {
          lat: 34.0596,
          lng: -118.4438,
      },
      title: "Hammer Museum",
      yelpId: "hammer-museum-los-angeles"
    };

    const getty = {
        position: {
            lat: 34.0780,
            lng: -118.4741,
        },
        title: "The Getty Museum",
        yelpId: "the-getty-center-los-angeles-2"
    };

    const iceCream = {
        position: {
            lat: 34.0342,
            lng: -118.2316,
        },
        title: "Museum of Ice Cream",
        yelpId: "museum-of-ice-cream-los-angeles-4"
    };
    var initMarkers = [nationalHistory, contemporaryArts, hammer, getty, iceCream];

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
