(function() {
    if(window.location.pathname) {
        var matches = window.location.pathname.match(/^\/(\w*)/);
    }
    else{
        console.error("Error while getting model name");
    }
    var graphicDIV = document.getElementById("graphic");
    Graphic(window, THREE, graphicDIV, `../graphics/${matches[1]}.obj`);
}());