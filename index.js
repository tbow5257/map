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

var myViewModel = {
    search: ko.observable(''),
    list: ko.observableArray(initMarkers),
};

myViewModel.markers = ko.dependentObservable(function() {
    var self = this;
    var search = self.search().toLowerCase();
    if(markers.length > 0) {
    }
    return ko.utils.arrayFilter(markers, function(marker) {
        if (marker.customInfo.toLowerCase().indexOf(search) >= 0) {
            marker.setVisible(true);
        } else {
            marker.setVisible(false);
            // setAllMap();
        }
    });
}, myViewModel);

ko.applyBindings(myViewModel);
