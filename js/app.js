(function() {
    if(window.location.pathname) {
        var matches = window.location.pathname.match(/^\/(\w*)/);
    }
    else{
        console.error("Error while getting model name");
    }

    Scroller("html, body");

    const isARCompatible = (function () {
        try {
            var a = document.createElement("a");
            return a.relList.supports("ar");
        }
        catch(err) {
            if (err instanceof TypeError) {
                return false;
            }
        }
    }());

    if(isARCompatible) {
        $("#MoleculeAR").css("display", "inline-block");
    }
    
    var graphicDIV = document.getElementById("graphic");
    if(graphicDIV) {
        Graphic(window, THREE, graphicDIV, `../graphics/${matches[1]}.drc`);
    }



    function Scroller(elementSelector) {
        $(elementSelector).on("mousewheel", function (evt){
            $(elementSelector)[0].scrollLeft -= evt.deltaY;
        });
    }
}());