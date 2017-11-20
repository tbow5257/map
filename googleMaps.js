var markers = [];

const nationalHistory = {
    index: 0,
    position: {
        lat: 34.0170,
        lng: -118.2888,
    },
    title: "The National History Museum",
    description: "The largest natural and historical museum in the western United States",
    flickrTag: "la+brea+tarpits"
};

const contemporaryArts = {
    index: 1,
    position: {
        lat: 34.05333,
        lng: -118.25083,
    },
    title: "The Museum of Contemporary Arts",
    description: "Dedicated to collecting and exhibiting contemporary art",
    flickrTag: "Museum+of+Contemporary+Arts"
};

const hammer = {
    index: 2,
    position: {
        lat: 34.0596,
        lng: -118.4438,
    },
    title: "The Hammer Museum",
    description: "Gallery with a permanent collection of historical works & special exhibits of edgy contemporary art.\n",
    flickrTag: "hammer+museum"
};

const getty = {
    index: 3,
    position: {
        lat: 34.0780,
        lng: -118.4741,
    },
    title: "The Getty Museum",
    description: "A private collection of Western art from the Middle Ages to the present",
    flickrTag: "the+getty+center"
};

const iceCream = {
    index: 4,
    position: {
        lat: 34.0342,
        lng: -118.2316,
    },
    title: "The Museum of Ice Cream",
    description: "Collection of art with ice cream theme",
    flickrTag: "museum+of+ice+cream"
};

var locationsObject = {
    nationalHistory,
    contemporaryArts,
    hammer,
    getty,
    iceCream,
};


function initMap() {
    var infowindow = new google.maps.InfoWindow();

    var uluru = {
        lat: 34.0522,
        lng: -118.2437
    };

    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: uluru
    });

    for (key in locationsObject) {
        addMarker(locationsObject[key]);
    }

    function addMarker(location) {
        var marker = new google.maps.Marker({
            position: location.position,
            customInfo: location.title,
            descrip: location.description,
            index: location.index,
            map: map
        });
        marker.addListener('click', toggleBounce);
        attachImages(location);

        function attachImages(location) {
            var image;
            $.ajax({
                url: "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=670f68b5652539e20b8b1ed74da4ca5b&tags=" + location.flickrTag + "&per_page=5&page=1&format=json&nojsoncallback=1"
            })
                .done(function (success) {
                    if (success.photos) {
                        var photos = success.photos.photo;
                        var content = `<h2>${location.title}</h2> <br> <p>${location.description}</p> <br>  <h3>Images from Flickr</h3>`;
                        if (photos.length > 0) {
                            photos.forEach(function (photo) {
                                content += `<img src="https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg" height="100" width="100">`;
                            });

                            marker.addListener('click', function () {
                                infowindow.setContent(content);
                                infowindow.open(marker.get('map'), marker);
                            });
                        }
                    } else {
                        alert("Flickr is currently not working!");
                    }
                })
                .fail(function (error) {
                    alert("There was an error with the Flickr API, please refresh!");
                });

        }

        markers.push(marker);

        function toggleBounce() {
            marker.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(function () {
                marker.setAnimation(null);
            }, 750);
        }
    }
}
