// Loads map and prepares pop-up windows with marker data
function initMap() {
    let infowindow = new google.maps.InfoWindow();

    let uluru = {
        lat: 34.0522,
        lng: -118.2437
    };

    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: uluru
    });

    for (let key in locationsObject) {
        if(locationsObject.hasOwnProperty(key)) {
            addMarker(locationsObject[key]);
        }
    }

    function addMarker(location) {
        let marker = new google.maps.Marker({
            position: location.position,
            customInfo: location.title,
            descrip: location.description,
            index: location.index,
            map: map
        });
        marker.addListener('click', toggleBounce);
        attachImages(location);

        function attachImages(location) {
            let image;
            $.ajax({
                url: "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=670f68b5652539e20b8b1ed74da4ca5b&tags=" + location.flickrTag + "&per_page=5&page=1&format=json&nojsoncallback=1"
            })
                .done(function (success) {
                    if (success.photos) {
                        let photos = success.photos.photo;
                        let content = `<h2>${location.title}</h2> <br> <p>${location.description}</p> <br>  <h3>Images from Flickr</h3>`;
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
