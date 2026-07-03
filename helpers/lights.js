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

    _ShadowUtils.supportShadowCasting(pointLight);
    return [pointLight];
}

function createLightbulbLight() {
    const pointLight = new THREE.PointLight("hsl(55, 40%, 70%)", 20, 50);
    pointLight.position.set(7, 3, 3.25);

    _ShadowUtils.supportShadowCasting(pointLight);
    return [pointLight];
}

function createRectangularLEDLight() {
    const rectLight = new THREE.RectAreaLight("#eeeeee", 50, 0.6, 0.25);
    rectLight.position.set(8.75, 3.175, 10.5);
    rectLight.rotation.x = Math.PI * 1.5;

    return [rectLight];
}

function createWorldLight() {
    const ambientLight = new THREE.AmbientLight(WORLD_SKY_COLOR, 0.2);
    return [ambientLight];
}

function createWorldLight2() {
    const directionalLight = new THREE.DirectionalLight(WORLD_SKY_COLOR, 0.75);
    directionalLight.position.set(2.4, 2.4, -2.3);

    const dl_Helper = new THREE.DirectionalLightHelper(directionalLight, 1);
    return [directionalLight];
}