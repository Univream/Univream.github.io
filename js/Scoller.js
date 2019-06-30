(function(_) {
    if(!_) {
        return;
    }

    function Scoller(elementSelector) {
        $(elementSelector).on("mousewheel", function (evt){
            $(elementSelector)[0].scrollLeft -= evt.deltaY;
        });
    }

    _.Scroller = Scoller;
}(window))