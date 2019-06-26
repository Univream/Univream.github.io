(function() {

    var graphicAsset = "fulleren";
    var graphicDIV = document.getElementById("graphic");
    Graphic(window, THREE, graphicDIV, `../graphics/${graphicAsset}.obj`);
}());