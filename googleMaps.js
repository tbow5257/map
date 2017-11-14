var markers = [];

const nationalHistory = {
    position: {
        lat: 34.0170,
        lng: -118.2888,
    },
    title: "The National History Museum",
    flickrTag: "la+brea+tarpits"
};

const contemporaryArts = {
    position: {
        lat: 34.05333,
        lng: -118.25083,
    },
    title: "The Museum of Contemporary Arts",
    flickrTag: "Museum+of+Contemporary+Arts"
};

const hammer = {
    position: {
        lat: 34.0596,
        lng: -118.4438,
    },
    title: "The Hammer Museum",
    flickrTag: "hammer+museum"
};

const getty = {
    position: {
        lat: 34.0780,
        lng: -118.4741,
    },
    title: "The Getty Museum",
    flickrTag: "the+getty+center"
};

const iceCream = {
    position: {
        lat: 34.0342,
        lng: -118.2316,
    },
    title: "The Museum of Ice Cream",
    flickrTag: "museum+of+ice+cream"
};
var initMarkers = [nationalHistory, contemporaryArts, hammer, getty, iceCream];

function initMap() {
    var uluru = {
        lat: 34.0522,
        lng: -118.2437
    };

    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: uluru
    });

    initMarkers.forEach(function(location) {
        addMarker(location);
    });

    function addMarker(location) {
        var marker = new google.maps.Marker({
            position: location.position,
            customInfo: location.title,
            map: map,
        });
        marker.addListener('click', toggleBounce);
        attachImages(location);

        function attachImages(location) {
            var image;
            $.ajax({
                url: "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=612c51845db13e59fea3677771fb3613&tags=" + location.flickrTag + "&per_page=5&page=1&format=json&nojsoncallback=1"
            }).done(function(success) {
                var photos = success.photos.photo;
                var content = `<h2>Images of ${location.title}</h2>`;
                if (photos.length > 0) {
                    photos.forEach(function(photo) {
                        content += `<img src="https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg" height="100" width="100">`;
                    })
                    var infowindow = new google.maps.InfoWindow({
                        content: content
                    });

                    marker.addListener('click', function() {
                        infowindow.open(marker.get('map'), marker);
                    });
                }
            })

        }
        markers.push(marker);

        function toggleBounce() {
            marker.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(function() {
                marker.setAnimation(null);
            }, 750);
        }
    }
}
