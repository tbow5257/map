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

function viewModel() {
    var self = this;
    self.places = ko.observableArray(initMarkers);
    this.filter = ko.observable();
    this.visiblePlaces = ko.computed(function() {
        return this.places().filter(function(place) {
            if (!self.filter() || place.title.toLowerCase().indexOf(self.filter().toLowerCase()) !== -1)
                return place;
        });
    }, this);
};
// ko.applyBindings(myViewModel);
