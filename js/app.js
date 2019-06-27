(function() {
    if(window.location.pathname) {
        var matches = window.location.pathname.match(/^\/(\w*)/);
    }
    else{
        console.error("Error while getting model name");
    }

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
    Graphic(window, THREE, graphicDIV, `../graphics/${matches[1]}.drc`);
}());