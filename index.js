$(document).ready(function() {
    var trigger = $('.hamburger'),
        overlay = $('.overlay'),
        isClosed = false;

    trigger.click(function() {
        hamburger_cross();
    });

    function hamburger_cross() {

        if (isClosed == true) {
            overlay.hide();
            trigger.removeClass('is-open');
            trigger.addClass('is-closed');
            isClosed = false;
        } else {
            overlay.show();
            trigger.removeClass('is-closed');
            trigger.addClass('is-open');
            isClosed = true;
        }
    }

    $('[data-toggle="offcanvas"]').click(function() {
        $('#wrapper').toggleClass('toggled');
    });
});

var Location = function(position, title, flickrTag) {
    var self = this;
    self.position = ko.observable(position);
    self.title = ko.observable(title);
    self.flickrTag = ko.observable(flickrTag);
    self.show = ko.observable(true);
    return self;
};

var myViewModel = {
    search: ko.observable(''),
    list: ko.observableArray([{
        museum: new Location(nationalHistory.position, nationalHistory.title, nationalHistory.flickrTag)
    }, {
        museum: new Location(contemporaryArts.position, contemporaryArts.title, contemporaryArts.flickrTag)
    }, {
        museum: new Location(hammer.position, hammer.title, hammer.flickrTag)
    }, {
        museum: new Location(getty.position, getty.title, getty.flickrTag)
    }, {
        museum: new Location(iceCream.position, iceCream.title, iceCream.flickrTag)
    }])
    // list: ko.observableArray(initMarkers)
};

myViewModel.markers = ko.dependentObservable(function() {
    var self = this;
    var search = self.search().toLowerCase();
    return ko.utils.arrayFilter(markers, function(marker) {
        if (marker.customInfo.toLowerCase().indexOf(search) >= 0) {
            console.log(myViewModel.list()[marker.index]);
            marker.setVisible(true);
            return myViewModel.list()[marker.index].museum.show(true);
        } else {
            marker.setVisible(false);
            return myViewModel.list()[marker.index].museum.show(false);
        }
    });
}, myViewModel);

ko.applyBindings(myViewModel);
