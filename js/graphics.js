function Graphic(window, T, element, path) {
    "use strict";
    if(!window || !T ||!T.Object3D) {
        console.error("Environment error");
        return;
    }
    if(!path || typeof path !== "string") {
        console.error("Supply a path");
        return;
    }

    function render() {
        requestAnimationFrame(render);
        if(molecule && molecule.rotation) {
            molecule.rotation.x = ((scrollPositionY + scrollPositionX) / 4000.0) || 0.0;
            molecule.rotation.y = ((scrollPositionY + scrollPositionX) / 2200.0) || 0.0;    
        }
        renderer.render(scene, camera);
    }

    var molecule, scrollPositionY, scrollPositionX;
    const scene = new T.Scene();
    const camera = new T.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 1000);
    const renderer = new T.WebGLRenderer({ alpha: true, antialias: true });
    const light = new T.PointLight(0xFFFFFF, 1, 100, 0.4);
    
    THREE.DRACOLoader.setDecoderPath( 'js/draco_decoders/' );
    THREE.DRACOLoader.setDecoderConfig( { type: 'js' } );
    const loader = new T.DRACOLoader();
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    element.appendChild(renderer.domElement);
    light.position.set(30, 50, 40);
    scene.add(light);

    camera.position.z = 22;

    loader.load(
        path,
        onDRCLoaded,
        function(xhr) {
            // console.log("Loading...");
        },
        function(err) {
            console.error(err);
        }
    );
    
    function onDRCLoaded(geometry) {
        geometry.computeVertexNormals();
        var material = new T.MeshLambertMaterial({color: 0xeeeeeee});
        var mesh = new T.Mesh( geometry, material );
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.rotation.x = 1.7;
        mesh.position.x = 3.4;
        molecule = mesh;
        scene.add( mesh );
        // Release the cached decoder module.
        THREE.DRACOLoader.releaseDecoderModule();
    }

    window.onscroll = function() {
        scrollPositionY = window.scrollY / 1.0;
        scrollPositionX = window.scrollX / 1.0;
    }

    window.onresize = function () {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    };
    render();
}