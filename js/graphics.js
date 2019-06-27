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
            //molecule.rotation.x = scrollPositionY / 1000.0;
            molecule.rotation.y = (scrollPositionY / 2200.0) || 0.0;    
        }
        renderer.render(scene, camera);
    }

    var molecule, scrollPositionY;
    const scene = new T.Scene();
    const camera = new T.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 1000);
    const renderer = new T.WebGLRenderer({ alpha: true, antialias: true });
    const light = new T.PointLight(0xFFFFFF, 1, 100, 0.4);
    const loader = new T.OBJLoader();
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    element.appendChild(renderer.domElement);
    light.position.set(30, 50, 40);
    scene.add(light);

    camera.position.z = 35;

    loader.load(
        path,
        onOBJLoaded,
        function(xhr) {
            // console.log("Loading...");
        },
        function(err) {
            console.error(err);
        }
    );
    
    function onOBJLoaded(obj) {
        molecule = obj;
        obj.traverse( function( child ) {
            if ( child instanceof THREE.Mesh ) {
                // modify geometry for correct shadows and textures
                child.material = new THREE.MeshLambertMaterial({color: 0xeeeeee});
                child.geometry.computeFaceNormals();
                child.geometry.computeVertexNormals();
                child.geometry.normalsNeedUpdate = true;
            }
        });
        obj.rotation.x = 2;
        obj.position.x = 3.4;
        scene.add(obj);
    }

    window.onscroll = function() {
        scrollPositionY = window.scrollY / 1.0;
    }

    window.addEventListener('resize', () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    });
    render();
}