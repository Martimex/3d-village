import * as THREE from "three";
import GUI from "lil-gui";
import { OrbitControls, TextGeometry } from "three/examples/jsm/Addons.js";
import { FontLoader } from "three/examples/jsm/Addons.js";
import _Create from "./helpers/create.js";
import _LOAD from "./helpers/load.js";
import _LIGHTS from "./helpers/lights.js";

// HOOK FOR HTML CANVAS ELEMENT
const CANVAS_EL = document.querySelector('canvas#webgl-canvas');
	
// USED TO TWEAK THE ISSUE WITH INTERNAL THREEJS COLOR MANAGEMENT
const GUI_GLOBALS = {
	color: "#59a1f3",
};

const APP_GLOBALS = {
	isLeftKeyPressed: false,
	isRightKeyPressed: false,
	rotationProgress: 0,
	keyUseTimestamp: 0,
	isIntroShown: true
}

	
// GLOBAL OBJECT USED TO HANDLE WINDOW RESIZING
const SIZES = {
	WIDTH: window.innerWidth,
	HEIGHT: window.innerHeight,
	updateAspect: function() { return this.WIDTH / this.HEIGHT }
}
	
// Adjust canvas size when resizing the window
window.addEventListener("resize", () => {
	SIZES.WIDTH = window.innerWidth;
	SIZES.HEIGHT = window.innerHeight;
	camera.aspect = SIZES.updateAspect();
	camera.updateProjectionMatrix();
	renderer.setSize(SIZES.WIDTH, SIZES.HEIGHT);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
	
// Toggle fullscreen mode on double click
window.addEventListener('dblclick', () => {
	if(APP_GLOBALS.isIntroShown) { handleCloseIntro(); }
	const fullScreenEl = document.fullscreenElement || document.webkitFullscreenElement;
	if(!fullScreenEl) {
		if(CANVAS_EL.requestFullscreen) CANVAS_EL.requestFullscreen();
		else if(CANVAS_EL.webkitRequestFullscreen) CANVAS_EL.webkitRequestFullscreen();
	} else {
		if(document.exitFullscreen) document.exitFullscreen();
		else if(document.webkitExitFullscreen) document.webkitExitFullscreen();
	}
});




// Add scrolling listener to handle manual camera movement (circular around the scene)

document.body.addEventListener('keyup', (event) => {
	if(event.key === "ArrowLeft") { APP_GLOBALS.isLeftKeyPressed = false; }
	else if(event.key ===  "ArrowRight") { APP_GLOBALS.isRightKeyPressed = false; }
})

document.body.addEventListener('keydown', (event) => {
	if(event.key === "ArrowLeft") { 
		if(APP_GLOBALS.isIntroShown) { handleCloseIntro(); }
		if(!APP_GLOBALS.isLeftKeyPressed) { APP_GLOBALS.keyUseTimestamp = (event.timeStamp / 1000).toFixed(2); }
		APP_GLOBALS.isLeftKeyPressed = true;
	}
	else if(event.key ===  "ArrowRight") { 
		if(APP_GLOBALS.isIntroShown) { handleCloseIntro(); }
		if(!APP_GLOBALS.isRightKeyPressed) { APP_GLOBALS.keyUseTimestamp = (event.timeStamp / 1000).toFixed(2); }
		APP_GLOBALS.isRightKeyPressed = true; 
	}
})

function handleCloseIntro() {
	APP_GLOBALS.isIntroShown = false;
	const [introEl, pulsingElements] = [document.querySelector("#instruction-layer"), document.querySelectorAll("._PULSE")];
	pulsingElements.forEach(el => el.classList.remove("_PULSE"));
	introEl.classList.add("_FADEOUT");

	/* introEl.style.display = "none"; */
}


// Loaders

const matcapTexture = _LOAD.textMatcap();
const fontLoader = new FontLoader();
const text_Size = 0.75;
fontLoader.load("./fonts/Bruno_Ace_SC_Regular.json",
	(font) => {
		const textGeometry = new TextGeometry(
			"M-DEV",
			{
				font: font,
				size: text_Size,
				depth: 0.2,
				curveSegments: 12,
				bevelEnabled: true,
				bevelThickness: 0.03,
				bevelSize: 0.02,
				bevelOffset: 0,
				bevelSegments: 5,
			}
		);
		textGeometry.center();
		/* const textMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture, color: "#ccc" }); */
		const textMaterial = new THREE.MeshStandardMaterial({ color: "#ccc" });
		const text = new THREE.Mesh(textGeometry, textMaterial);
		text.position.x = 9;
		text.position.z = 11/* .5 */;
		text.position.y = text_Size;
		scene.add(text);
	}
)

	
// Initialize the scene and groups
const scene = new THREE.Scene();
scene.background = new THREE.Color("hsl(300, 60%, 1%)");

const floor_Group = new THREE.Group();   scene.add(floor_Group);
const house1_Group = new THREE.Group();  scene.add(house1_Group);
const house2_Group = new THREE.Group();  scene.add(house2_Group);
const fence_Group = new THREE.Group();   scene.add(fence_Group);
const lamp_Group = new THREE.Group();    scene.add(lamp_Group);
const sidewalk_Group = new THREE.Group(); scene.add(sidewalk_Group);
const ladder_Group = new THREE.Group();  scene.add(ladder_Group);
const garden_Group = new THREE.Group();  scene.add(garden_Group);
const well_Group = new THREE.Group();    scene.add(well_Group);
const buckets_Group = new THREE.Group(); scene.add(buckets_Group);
const trees_Group = new THREE.Group();    scene.add(trees_Group);
const toilet_Group = new THREE.Group();  scene.add(toilet_Group);
const lane_Group = new THREE.Group();    scene.add(lane_Group);
const solidwall_Group = new THREE.Group(); scene.add(solidwall_Group);
const stones_Group = new THREE.Group(); scene.add(stones_Group);
const bush_Group = new THREE.Group(); scene.add(bush_Group);
const minifence_Group = new THREE.Group(); scene.add(minifence_Group);
const pool_Group = new THREE.Group();    scene.add(pool_Group);
const sandbox_Group = new THREE.Group(); scene.add(sandbox_Group);

// Create a shape and add it to the scene
_Create.ground(floor_Group);
_Create.house1(house1_Group);
_Create.house2(house2_Group);
_Create.fence(fence_Group);
_Create.lamp(lamp_Group);
_Create.sidewalk(sidewalk_Group);
_Create.ladder(ladder_Group);
_Create.garden(garden_Group);
_Create.well(well_Group);
_Create.buckets(buckets_Group);
_Create.trees(trees_Group);
_Create.toilet(toilet_Group);
_Create.lane(lane_Group);
_Create.solidwall(solidwall_Group);
_Create.stones(stones_Group);
_Create.bush(bush_Group);
_Create.minifence(minifence_Group);
_Create.pool(pool_Group);
_Create.sandbox(sandbox_Group);


// Lights
/* const ambientLight = new THREE.AmbientLight(0x86cdff, 1); */
/* Good ambient light colors: 0x8666cc, 0x86cdff  */
scene.add(..._LIGHTS._worldLight);
scene.add(..._LIGHTS._worldLight2);
scene.add(..._LIGHTS.lamp_pointLight);
scene.add(..._LIGHTS.lightbulb_pointLight);
scene.add(..._LIGHTS.rectangularLED_rectLight);

const camera = new THREE.PerspectiveCamera(75, SIZES.WIDTH / SIZES.HEIGHT, 1, 200);
camera.position.z = 20; // Initially put camera backwards to create some distance between the camera and object
camera.position.y = 4;
scene.add(camera);
	
const renderer = new THREE.WebGLRenderer({
	canvas: CANVAS_EL
});
	
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
renderer.setSize(SIZES.WIDTH, SIZES.HEIGHT);
renderer.render(scene, camera);
	
// Set up and further use timer for precise animation regardless of device frame rate
const timer = new THREE.Timer();

// FORMULA
// camera position z =  IP + (Math.cos([elapsedTime|rotationProgress] [*|/] SP) * DIS);
/**
	@param IP: initial point, but it is added to the DIS and the addition of two forms an initial point
	@param SP: speed, how fast the animation goes
	@param DIS: distance, what is the travelling range on on side of animation (its like średnica koła)
*/ 

const loop = () => {
	timer.update();
    const elapsedTime = timer.getElapsed();

	if(APP_GLOBALS.isRightKeyPressed) {
		APP_GLOBALS.rotationProgress += 0.01;
		camera.position.z = 0 + (Math.cos((APP_GLOBALS.rotationProgress) * 1.10) * 20);
		camera.position.x = 0 + (Math.sin((APP_GLOBALS.rotationProgress) * 1.10) * 20);
	} 

	else if(APP_GLOBALS.isLeftKeyPressed) {
		APP_GLOBALS.rotationProgress -= 0.01;
		camera.position.z = 0 + (Math.cos((APP_GLOBALS.rotationProgress) * 1.10) * 20);
		camera.position.x = 0 + (Math.sin((APP_GLOBALS.rotationProgress) * 1.10) * 20);
	}

	camera.lookAt(new THREE.Vector3());

	renderer.render(scene, camera);
	window.requestAnimationFrame(loop);
}
	
loop();