var Location = function (position, title, flickrTag, index) {
    var self = this;
    self.position = ko.observable(position);
    self.title = ko.observable(title);
    self.flickrTag = ko.observable(flickrTag);
    self.show = ko.observable(true);
    self.index = index;
    return self;
};

//Viewmodel for sidebar list
var myViewModel = {
    search: ko.observable(''),
    list: ko.observableArray([{
        museum: new Location(nationalHistory.position, nationalHistory.title, nationalHistory.flickrTag, nationalHistory.index)
    }, {
        museum: new Location(contemporaryArts.position, contemporaryArts.title, contemporaryArts.flickrTag, contemporaryArts.index)
    }, {
        museum: new Location(hammer.position, hammer.title, hammer.flickrTag, hammer.index)
    }, {
        museum: new Location(getty.position, getty.title, getty.flickrTag, getty.index)
    }, {
        museum: new Location(iceCream.position, iceCream.title, iceCream.flickrTag, iceCream.index)
    }])
    // list: ko.observableArray(initMarkers)
};

var infoWindow;

//Checks search bar for input and filters sidebar list in accordance
myViewModel.markers = ko.dependentObservable(function () {
    var self = this;
    var search = self.search().toLowerCase();
    return ko.utils.arrayFilter(markers, function (marker) {
        if (marker.customInfo.toLowerCase().indexOf(search) >= 0) {
            marker.setVisible(true);
            return myViewModel.list()[marker.index].museum.show(true);
        } else {
            marker.setVisible(false);
            return myViewModel.list()[marker.index].museum.show(false);
        }
    });
}, myViewModel);

//Clicking on a marker on list launches marker on map
myViewModel.clickaction = ko.dependentObservable(function () {
    varself = this;
    self.markerClick = function (data) {
        google.maps.event.trigger(markers[data], 'click');
    }
});


ko.applyBindings(myViewModel);
