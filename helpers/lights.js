import * as THREE from "three";
import GUI from "lil-gui";
import { RectAreaLightHelper } from 'three/addons/helpers/RectAreaLightHelper.js';
import _ShadowUtils from "./shadows.js";

const WORLD_SKY_COLOR = 0x8666cc; /* 0x86cdff or 0x8666cc */

export default {
    lamp_pointLight: createLampLight(),
    lightbulb_pointLight: createLightbulbLight(),
    rectangularLED_rectLight: createRectangularLEDLight(),
    _worldLight: createWorldLight(),
    _worldLight2: createWorldLight2()
};

function createLampLight() {
    const pointLight = new THREE.PointLight("hsl(177, 90%, 90%)", 65, 100);
    pointLight.position.set( -2.1, 5.3, 2.9 );
    /* const pl_Helper = new THREE.PointLightHelper( pointLight, 1 ); */
/*  const gui = new GUI();
    gui.add(pointLight.position, "x").min(-10).max(10).step(0.1);
    gui.add(pointLight.position, "y").min(-10).max(10).step(0.1);
    gui.add(pointLight.position, "z").min(-10).max(10).step(0.1); */

    _ShadowUtils.supportShadowCasting(pointLight);
    return [pointLight/* , pl_Helper */];
}

function createLightbulbLight() {
    const pointLight = new THREE.PointLight("hsl(55, 40%, 70%)", 20, 50);
    pointLight.position.set(7, 3, 3.25);
    /* const pl_Helper = new THREE.PointLightHelper(pointLight, 1); */

    _ShadowUtils.supportShadowCasting(pointLight);
    return [pointLight/* , pl_Helper */];
}

function createRectangularLEDLight() {
    const rectLight = new THREE.RectAreaLight("#eeeeee", 50, 0.6, 0.25);
    rectLight.position.set(8.75, 3.175, 10.5);
    rectLight.rotation.x = Math.PI * 1.5;
    /* const rl_Helper = new RectAreaLightHelper( rectLight ); */

    return [rectLight/* , rl_Helper */];
}

function createWorldLight() {
    const ambientLight = new THREE.AmbientLight(WORLD_SKY_COLOR, 0.2);
    return [ambientLight];
}

function createWorldLight2() {
    const directionalLight = new THREE.DirectionalLight(WORLD_SKY_COLOR, 0.75);
    directionalLight.position.set(2.4, 2.4, -2.3);
/*     const gui = new GUI();
    gui.add(directionalLight.position, "x").min(-10).max(10).step(0.1);
    gui.add(directionalLight.position, "y").min(-10).max(10).step(0.1);
    gui.add(directionalLight.position, "z").min(-10).max(10).step(0.1); */

    const dl_Helper = new THREE.DirectionalLightHelper(directionalLight, 1);
    return [directionalLight/* , dl_Helper */];
}