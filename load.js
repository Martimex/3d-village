import * as THREE from "three";

const loadingManager = new THREE.LoadingManager();
const textureLoader = new THREE.TextureLoader(loadingManager);

const loaderEl = document.getElementById(`loader`);
const progressBarEl = document.getElementById(`progress-bar`);
const [progressNowEl, progressMaxEl] = [document.getElementById(`progress-now`), document.getElementById(`progress-max`)];
const instructionEl = document.getElementById(`instruction-layer`);

loadingManager.onStart = (url, loaded, total) => {

}

loadingManager.onProgress = (url, loaded, total) => {
    /* console.log(`item ${index} of ${total}`); */
    progressBarEl.value = (loaded / total) * 100;
    progressMaxEl.textContent = total;
    progressNowEl.textContent = loaded;
}

loadingManager.onLoad = () => { 
    loaderEl.classList.add("_FADEOUT-2");
    instructionEl.classList.remove('hidden');
}

export default {
    textMatcap: () => {
        const matcapTexture = textureLoader.load("../matcaps/_WEBP/1.webp");
        matcapTexture.colorSpace = THREE.SRGBColorSpace;
        return matcapTexture;
    },
    getGroundTextures: () => {
        const alphaMap = textureLoader.load("../textures/ground/_WEBP/alpha.webp");
        const armMap = textureLoader.load("../textures/ground/_WEBP/brown_mud_leaves_01_arm_1k.webp");
        const colorMap = textureLoader.load("../textures/ground/_WEBP/brown_mud_leaves_01_diff_1k.webp");
        const heightMap = textureLoader.load("../textures/ground/_WEBP/brown_mud_leaves_01_disp_1k.webp");
        const normalMap = textureLoader.load("../textures/ground/_WEBP/brown_mud_leaves_01_nor_gl_1k.webp");

        armMap.repeat.set(8, 8); armMap.wrapS = THREE.RepeatWrapping; armMap.wrapT = THREE.RepeatWrapping;
        colorMap.repeat.set(8, 8); colorMap.wrapS = THREE.RepeatWrapping; colorMap.wrapT = THREE.RepeatWrapping;
        colorMap.colorSpace = THREE.SRGBColorSpace;
        heightMap.repeat.set(8, 8); heightMap.wrapS = THREE.RepeatWrapping; heightMap.wrapT = THREE.RepeatWrapping;
        normalMap.repeat.set(8, 8); normalMap.wrapS = THREE.RepeatWrapping; normalMap.wrapT = THREE.RepeatWrapping;
    
        return { alphaMap, armMap, colorMap, heightMap, normalMap };
    },
    getSolidWallTextures: () => {
        const armMap = textureLoader.load("../textures/solidwall/_WEBP/cracked_concrete_02_arm_1k.webp");
        const colorMap = textureLoader.load("../textures/solidwall/_WEBP/cracked_concrete_02_diff_1k.webp");
        colorMap.colorSpace = THREE.SRGBColorSpace;
        const normalMap = textureLoader.load("../textures/solidwall/_WEBP/cracked_concrete_02_nor_gl_1k.webp");

        armMap.repeat.set(1.5, 0.85); armMap.wrapS = THREE.RepeatWrapping; armMap.wrapT = THREE.RepeatWrapping;
        colorMap.repeat.set(1.5, 0.85); colorMap.wrapS = THREE.RepeatWrapping; colorMap.wrapT = THREE.RepeatWrapping;
        normalMap.repeat.set(1.5, 0.85); normalMap.wrapS = THREE.RepeatWrapping; normalMap.wrapT = THREE.RepeatWrapping;

        return { armMap, colorMap, normalMap };
    },
    getHouse1Textures: () => {
        return {
            walls: getWalls(),
            roof: getRoof(),
            door: getDoor(),
        }

        function getWalls() {
            const armMap = textureLoader.load("../textures/house1/walls/_WEBP/brown_planks_08_arm_1k.webp");
            const colorMap = textureLoader.load("../textures/house1/walls/_WEBP/brown_planks_08_diff_1k.webp");
            colorMap.colorSpace = THREE.SRGBColorSpace;
            const normalMap = textureLoader.load("../textures/house1/walls/_WEBP/brown_planks_08_nor_gl_1k.webp");

            return {armMap, colorMap, normalMap}
        }

        function getRoof() {
            /* TODO */
            const armMap = textureLoader.load("../textures/house1/roof/_WEBP/grey_roof_tiles_arm_1k.webp");
            const colorMap = textureLoader.load("../textures/house1/roof/_WEBP/grey_roof_tiles_diff_1k.webp");
            colorMap.colorSpace = THREE.SRGBColorSpace;
            const normalMap = textureLoader.load("../textures/house1/roof/_WEBP/grey_roof_tiles_nor_gl_1k.webp");

            colorMap.repeat.set(6, 2);
            colorMap.wrapS = THREE.RepeatWrapping;
            colorMap.wrapT = THREE.RepeatWrapping;
            
            armMap.repeat.set(6, 2);
            armMap.wrapS = THREE.RepeatWrapping;
            armMap.wrapT = THREE.RepeatWrapping;
            
            normalMap.repeat.set(6, 2);
            normalMap.wrapS = THREE.RepeatWrapping;
            normalMap.wrapT = THREE.RepeatWrapping;

            return {armMap, colorMap, normalMap}
        }

        function getDoor() {
            const alphaMap = textureLoader.load("../textures/_shared/door_universal/_WEBP/alpha.webp");
            const aoMap = textureLoader.load("../textures/_shared/door_universal/_WEBP/ambientOcclusion.webp");
            const colorMap = textureLoader.load("../textures/house1/door/_WEBP/color5.webp");
            colorMap.colorSpace = THREE.SRGBColorSpace;
            const metalnessMap = textureLoader.load("../textures/_shared/door_universal/_WEBP/metalness.webp");
            const normalMap = textureLoader.load("../textures/_shared/door_universal/_WEBP/normal.webp");
            const heightMap = textureLoader.load("../textures/_shared/door_universal/_WEBP/height.webp");
            const roughnessMap = textureLoader.load("../textures/_shared/door_universal/_WEBP/roughness.webp");

            return {alphaMap, aoMap, colorMap, heightMap, metalnessMap, normalMap, roughnessMap};
        }
    },
    getLadderTextures: () => {
        return {
            sides: getSides(),
            steps: getSteps()
        }

        function getSteps() {
            const armMap = textureLoader.load("../textures/ladder/_WEBP/weathered_brown_planks_arm_1k.webp");
            const colorMap = textureLoader.load("../textures/ladder/_WEBP/weathered_brown_planks_diff_1k.webp");
            colorMap.colorSpace = THREE.SRGBColorSpace;
            const normalMap = textureLoader.load("../textures/ladder/_WEBP/weathered_brown_planks_nor_gl_1k.webp");

            armMap.repeat.set(3, 1);
            armMap.wrapS = THREE.RepeatWrapping;
            armMap.wrapT = THREE.RepeatWrapping;

            colorMap.repeat.set(3, 1);
            colorMap.wrapS = THREE.RepeatWrapping;
            colorMap.wrapT = THREE.RepeatWrapping;

            normalMap.repeat.set(3, 1);
            normalMap.wrapS = THREE.RepeatWrapping;
            normalMap.wrapT = THREE.RepeatWrapping;

            return {armMap, colorMap, normalMap};
        }

        function getSides() {
            const armMap = textureLoader.load("../textures/ladder/_WEBP/weathered_brown_planks_arm_1k.webp");
            const colorMap = textureLoader.load("../textures/ladder/_WEBP/weathered_brown_planks_diff_1k.webp");
            colorMap.colorSpace = THREE.SRGBColorSpace;
            const normalMap = textureLoader.load("../textures/ladder/_WEBP/weathered_brown_planks_nor_gl_1k.webp");

            armMap.repeat.set(1, 1);
            armMap.wrapS = THREE.RepeatWrapping;
            armMap.wrapT = THREE.RepeatWrapping;

            colorMap.repeat.set(1, 10);
            colorMap.wrapS = THREE.RepeatWrapping;
            colorMap.wrapT = THREE.RepeatWrapping;

            normalMap.repeat.set(1, 1);
            normalMap.wrapS = THREE.RepeatWrapping;
            normalMap.wrapT = THREE.RepeatWrapping;

            return {armMap, colorMap, normalMap};
        }
    },
    getSandboxTextures: () => {
        return {
            surface: getSurface(),
            mound: getMound(),
            frames: getFrames()
        };

        function getSurface() {
            const armMap = textureLoader.load("../textures/sandbox/_WEBP/playground_sand_arm_1k.webp");
            const colorMap = textureLoader.load("../textures/sandbox/_WEBP/playground_sand_diff_1k.webp");
            /* colorMap.colorSpace = THREE.SRGBColorSpace; */
            const normalMap = textureLoader.load("../textures/sandbox/_WEBP/playground_sand_nor_gl_1k.webp");

            return { armMap, colorMap, normalMap};
        }

        function getMound() {
            const armMap = textureLoader.load("../textures/sandbox/_WEBP/playground_sand_arm_1k.webp");
            const colorMap = textureLoader.load("../textures/sandbox/_WEBP/playground_sand_diff_1k.webp");
            /* colorMap.colorSpace = THREE.SRGBColorSpace; */
            const normalMap = textureLoader.load("../textures/sandbox/_WEBP/playground_sand_nor_gl_1k.webp");

            armMap.repeat.set(3, 1);
            armMap.wrapS = THREE.RepeatWrapping;
            armMap.wrapT = THREE.RepeatWrapping;

            colorMap.repeat.set(3, 1);
            colorMap.wrapS = THREE.RepeatWrapping;
            colorMap.wrapT = THREE.RepeatWrapping;

            normalMap.repeat.set(3, 1);
            normalMap.wrapS = THREE.RepeatWrapping;
            normalMap.wrapT = THREE.RepeatWrapping;

            return { armMap, colorMap, normalMap};
        }

        function getFrames() {
            const armMap = textureLoader.load("../textures/sandbox/_WEBP/exterior_wall_cladding_03_arm_1k.webp");
            const colorMap = textureLoader.load("../textures/sandbox/_WEBP/exterior_wall_cladding_03_diff_1k.webp");
            const normalMap = textureLoader.load("../textures/sandbox/_WEBP/exterior_wall_cladding_03_nor_gl_1k.webp");

            armMap.repeat.set(0.225, 0.225);
            armMap.wrapS = THREE.RepeatWrapping;
            armMap.wrapT = THREE.RepeatWrapping;

            colorMap.repeat.set(0.225, 0.225);
            colorMap.wrapS = THREE.RepeatWrapping;
            colorMap.wrapT = THREE.RepeatWrapping;

            normalMap.repeat.set(0.225, 0.225);
            normalMap.wrapS = THREE.RepeatWrapping;
            normalMap.wrapT = THREE.RepeatWrapping;

            return { armMap, colorMap, normalMap };
        }

    },
    getBucketsTextures: () => {
        return {
            woodenPart: getWoodenPart(),
            metalicPart: getMetalicPart()
        }

        function getWoodenPart() {
            const armMap = textureLoader.load("../textures/buckets/_WEBP/wood_cabinet_worn_long_arm_1k.webp");
            const colorMap = textureLoader.load("../textures/buckets/_WEBP/wood_cabinet_worn_long_diff_1k.webp");
            colorMap.colorSpace = THREE.SRGBColorSpace;
            const normalMap = textureLoader.load("../textures/buckets/_WEBP/wood_cabinet_worn_long_nor_gl_1k.webp");

            return { armMap, colorMap, normalMap };
        }

        function getMetalicPart() {
            const roughMap = textureLoader.load("../textures/buckets/_WEBP/Metal062C_1K-JPG_Roughness.webp");
            const metalMap = textureLoader.load("../textures/buckets/_WEBP/Metal062C_1K-JPG_Metalness.webp")
            const colorMap = textureLoader.load("../textures/buckets/_WEBP/Metal062C_1K-JPG_Color.webp");
            colorMap.colorSpace = THREE.SRGBColorSpace;
            const normalMap = textureLoader.load("../textures/buckets/_WEBP/Metal062C_1K-JPG_NormalGL.webp");

            roughMap.minFilter = THREE.LinearMipMapNearestFilter;
            metalMap.minFilter = THREE.LinearMipMapNearestFilter;
            colorMap.minFilter = THREE.LinearMipMapNearestFilter;
            normalMap.minFilter = THREE.LinearMipMapNearestFilter;

            return { roughMap, metalMap, colorMap, normalMap };
        }
    },
    getWellTextures: () => {
        const armMap = textureLoader.load("../textures/well/_WEBP/plastered_stone_wall_arm_1k.webp");
        const colorMap = textureLoader.load("../textures/well/_WEBP/plastered_stone_wall_diff_1k.webp");
        /* colorMap.colorSpace = THREE.SRGBColorSpace; */
        const normalMap = textureLoader.load("../textures/well/_WEBP/plastered_stone_wall_nor_gl_1k.webp");

        armMap.repeat.set(1, 0.33);
        armMap.wrapT = THREE.RepeatWrapping;

        colorMap.repeat.set(1, 0.33);
        colorMap.wrapT = THREE.RepeatWrapping;

        normalMap.repeat.set(1, 0.33);
        normalMap.wrapT = THREE.RepeatWrapping;

        return { armMap, colorMap, normalMap };
    },
    getMinifenceTextures: () => {
        const armMap = textureLoader.load("../textures/minifence/_WEBP/rosewood_veneer1_arm_1k.webp");
        const colorMap = textureLoader.load("../textures/minifence/_WEBP/rosewood_veneer1_diff_1k.webp");
        colorMap.colorSpace = THREE.SRGBColorSpace;
        const normalMap = textureLoader.load("../textures/minifence/_WEBP/rosewood_veneer1_nor_gl_1k.webp");

        return { armMap, colorMap, normalMap };
    },
    getFenceTextures: () => {
        const armMap = textureLoader.load("../textures/_shared/fine_grained_wood/_WEBP/fine_grained_wood_arm_1k.webp");
        const colorMap = textureLoader.load("../textures/_shared/fine_grained_wood/_WEBP/fine_grained_wood_col_1k.webp");
        colorMap.colorSpace = THREE.SRGBColorSpace;
        const normalMap = textureLoader.load("../textures/_shared/fine_grained_wood/_WEBP/fine_grained_wood_nor_gl_1k.webp");

        return { armMap, colorMap, normalMap };
    },
    getGardenTextures: () => {
        return {
            ground: getGround(),
            divider: getDivider(),
            plants: getPlants()
        };

        function getGround() {
            const armMap = textureLoader.load("../textures/garden/ground/_WEBP/dirt_arm_1k.webp");
            const colorMap = textureLoader.load("../textures/garden/ground/_WEBP/dirt_diff_1k.webp");
            colorMap.colorSpace = THREE.SRGBColorSpace;
            const normalMap = textureLoader.load("../textures/garden/ground/_WEBP/dirt_nor_gl_1k.webp");
        
            return { armMap, colorMap, normalMap };
        }

        function getDivider() {
            const armMap = textureLoader.load("../textures/_shared/fine_grained_wood/_WEBP/fine_grained_wood_arm_1k.webp");
            const colorMap = textureLoader.load("../textures/_shared/fine_grained_wood/_WEBP/fine_grained_wood_col_1k.webp");
            colorMap.colorSpace = THREE.SRGBColorSpace;
            const normalMap = textureLoader.load("../textures/_shared/fine_grained_wood/_WEBP/fine_grained_wood_nor_gl_1k.webp");

            return { armMap, colorMap, normalMap };
        }
        
        function getPlants() {
            const aoMap = textureLoader.load("../textures/garden/plants/_WEBP/Sponge001_1K-JPG_AmbientOcclusion.webp");
            const roughMap = textureLoader.load("../textures/garden/plants/_WEBP/Sponge001_1K-JPG_Roughness.webp");
            const colorMap = textureLoader.load("../textures/garden/plants/_WEBP/Sponge001_1K-JPG_Color.webp");
            /* colorMap.colorSpace = THREE.SRGBColorSpace; */
            const normalMap = textureLoader.load("../textures/garden/plants/_WEBP/Sponge001_1K-JPG_NormalGL.webp");

            return { aoMap, roughMap, colorMap, normalMap };
        }

    },
    getTreesTextures() {
        return {
            trunk: getTrunk(),
            leaves: getLeaves()
        }

        function getTrunk() {
            const armMap = textureLoader.load("../textures/trees/trunk/_WEBP/pine_bark_arm_1k.webp");
            const colorMap = textureLoader.load("../textures/trees/trunk/_WEBP/pine_bark_diff_1k.webp");
            colorMap.colorSpace = THREE.SRGBColorSpace;
            const normalMap = textureLoader.load("../textures/trees/trunk/_WEBP/pine_bark_nor_gl_1k.webp");

            return { armMap, colorMap, normalMap };
        }

        function getLeaves() {

            const dynamicLoaders = {
                arm: async function() { 
                    const clonedARMTexture = await textureLoader.load("../textures/trees/leaves/_WEBP/forest_leaves_03_arm_1k.webp", (texture) => cloneTexture(texture));
                    return clonedARMTexture;
                },
                color: async function() {
                    const clonedColorTexture = await textureLoader.load("../textures/trees/leaves/_WEBP/forest_leaves_03_diff_1k.webp", (texture) => cloneTexture(texture));
                    clonedColorTexture.colorSpace = THREE.SRGBColorSpace;
                    return clonedColorTexture;
                },
                normal: async function() {
                    const clonedNormalTexture = await textureLoader.load("../textures/trees/leaves/_WEBP/forest_leaves_03_nor_gl_1k.webp", (texture) => cloneTexture(texture));
                    return clonedNormalTexture;
                }

            }

            function cloneTexture(texture) {
                const clonedTexture = texture.clone();
                clonedTexture.needsUpdate = true;
                texture.wrapS = THREE.RepeatWrapping;
                texture.wrapT = THREE.RepeatWrapping;
                return clonedTexture;
            }

            return { dynamicLoaders };
        }

    },
    getPoolTextures() {
        return {
            cover: getCover(),
            water: getWater()
        };

        function getCover() {
            const armMap = textureLoader.load("../textures/pool/cover/_WEBP/painted_concrete_arm_1k.webp");
            const colorMap = textureLoader.load("../textures/pool/cover/_WEBP/painted_concrete_diff_1k.webp");
            colorMap.colorSpace = THREE.SRGBColorSpace;
            const normalMap = textureLoader.load("../textures/pool/cover/_WEBP/painted_concrete_nor_gl_1k.webp");

            return { armMap, colorMap, normalMap };
        }

        function getWater() {

            return {};
        }
    },
    getToiletTextures() {
        return {
            building: getBuilding(),
            roof: getRoof(),
            door: getDoor()
        }

        function getBuilding() {
            const armMap = textureLoader.load("../textures/_shared/blue_metal_plate/_WEBP/blue_metal_plate_arm_1k.webp");
            const colorMap = textureLoader.load("../textures/_shared/blue_metal_plate/_WEBP/blue_metal_plate_diff_1k.webp");
            colorMap.colorSpace = THREE.SRGBColorSpace;
            const normalMap = textureLoader.load("../textures/_shared/blue_metal_plate/_WEBP/blue_metal_plate_nor_gl_1k.webp");
            
            return { armMap, colorMap, normalMap };
        }

        function getRoof() {
            const armMap = textureLoader.load("../textures/_shared/blue_metal_plate/_WEBP/blue_metal_plate_arm_1k.webp");
            const colorMap = textureLoader.load("../textures/_shared/blue_metal_plate/_WEBP/blue_metal_plate_diff_1k.webp");
            colorMap.colorSpace = THREE.SRGBColorSpace;
            const normalMap = textureLoader.load("../textures/_shared/blue_metal_plate/_WEBP/blue_metal_plate_nor_gl_1k.webp");

            armMap.repeat.set(1, 0.33);
            armMap.wrapT = THREE.RepeatWrapping;

            colorMap.repeat.set(1, 0.33);
            colorMap.wrapT = THREE.RepeatWrapping;

            normalMap.repeat.set(1, 0.33);
            normalMap.wrapT = THREE.RepeatWrapping;

            return { armMap, colorMap, normalMap };
        }

        function getDoor() {
            const alphaMap = textureLoader.load("../textures/_shared/door_universal/_WEBP/alpha.webp");
            const aoMap = textureLoader.load("../textures/_shared/door_universal/_WEBP/ambientOcclusion.webp");
            const colorMap = textureLoader.load("../textures/toilet/door/_WEBP/color1.webp");
            /* colorMap.colorSpace = THREE.SRGBColorSpace; */
            const metalnessMap = textureLoader.load("../textures/_shared/door_universal/_WEBP/metalness.webp");
            const normalMap = textureLoader.load("../textures/_shared/door_universal/_WEBP/normal.webp");
            const heightMap = textureLoader.load("../textures/_shared/door_universal/_WEBP/height.webp");
            const roughnessMap = textureLoader.load("../textures/_shared/door_universal/_WEBP/roughness.webp");

            return {alphaMap, aoMap, colorMap, heightMap, metalnessMap, normalMap, roughnessMap};
        }
    },
    getLampTextures() {
        return {
            base: getBase(),
            pole: getPole(),
            lightbulb: getLightbulb()
        }

        function getBase() {

            const armMap = textureLoader.load("../textures/lamp/base/_WEBP/rock_01_arm_1k.webp");
            const colorMap = textureLoader.load("../textures/lamp/base/_WEBP/rock_01_diff_1k.webp");
            colorMap.colorSpace = THREE.SRGBColorSpace;
            const normalMap = textureLoader.load("../textures/lamp/base/_WEBP/rock_01_nor_gl_1k.webp");

            armMap.repeat.set(4, 2);
            armMap.wrapS = THREE.RepeatWrapping;
            armMap.wrapT = THREE.RepeatWrapping;

            colorMap.repeat.set(4, 2);
            colorMap.wrapS = THREE.RepeatWrapping;
            colorMap.wrapT = THREE.RepeatWrapping;


            normalMap.repeat.set(4, 2);
            normalMap.wrapS = THREE.RepeatWrapping;
            normalMap.wrapT = THREE.RepeatWrapping;

            return { armMap, colorMap, normalMap };
        }

        function getPole() {

            const armMap = textureLoader.load("../textures/lamp/pole/_WEBP/corrugated_iron_02_arm_1k.webp");
            const colorMap = textureLoader.load("../textures/lamp/pole/_WEBP/corrugated_iron_02_diff_1k.webp");
            colorMap.colorSpace = THREE.SRGBColorSpace;
            const normalMap = textureLoader.load("../textures/lamp/pole/_WEBP/corrugated_iron_02_nor_gl_1k.webp");

            armMap.repeat.set(2, 1);
            armMap.wrapS = THREE.RepeatWrapping;

            colorMap.repeat.set(2, 1);
            colorMap.wrapS = THREE.RepeatWrapping;


            normalMap.repeat.set(2, 1);
            normalMap.wrapS = THREE.RepeatWrapping;

            return { armMap, colorMap, normalMap };
        }

        function getLightbulb() {

            return {};
        }
    },
    getBushTextures() {
        const aoMap = textureLoader.load("../textures/bush/_WEBP/Grass003_1K-JPG_AmbientOcclusion.webp")
        const roughMap = textureLoader.load("../textures/bush/_WEBP/Grass003_1K-JPG_Roughness.webp");
        const colorMap = textureLoader.load("../textures/bush/_WEBP/Grass003_1K-JPG_Color.webp");
        colorMap.colorSpace = THREE.SRGBColorSpace;
        const normalMap = textureLoader.load("../textures/bush/_WEBP/Grass003_1K-JPG_NormalGL.webp");

        return { aoMap, roughMap, colorMap, normalMap };
    },
    getStonesTextures() {

        const armMap = textureLoader.load("../textures/stones/_WEBP/mossy_rock_arm_1k.webp");
        const colorMap = textureLoader.load("../textures/stones/_WEBP/mossy_rock_diff_1k.webp");
        colorMap.colorSpace = THREE.SRGBColorSpace;
        const normalMap = textureLoader.load("../textures/stones/_WEBP/mossy_rock_nor_gl_1k.webp");

        armMap.repeat.set(2, 1);
        armMap.wrapS = THREE.RepeatWrapping;

        colorMap.repeat.set(2, 1);
        colorMap.wrapS = THREE.RepeatWrapping;

        normalMap.repeat.set(2, 1);
        normalMap.wrapS = THREE.RepeatWrapping;


        return { armMap, colorMap, normalMap };
    },
    getHouse2Textures() {

        return {
            walls: getWalls(),
            extraWall: getExtraWall(),
            roof: getRoof(),
            stairs: getStairs(),
            door: getDoor(),
            door2: getDoor2(),
            lightBulb: getLightBulb(),
            rectangularLED: getRectangularLED()
        }

        function getWalls() {
            const armMap = textureLoader.load("../textures/_shared/exterior_wall_cladding_02/_WEBP/exterior_wall_cladding_02_arm_1k.webp");
            const colorMap = textureLoader.load("../textures/_shared/exterior_wall_cladding_02/_WEBP/exterior_wall_cladding_02_diff_1k.webp");
            colorMap.colorSpace = THREE.SRGBColorSpace;
            const normalMap = textureLoader.load("../textures/_shared/exterior_wall_cladding_02/_WEBP/exterior_wall_cladding_02_nor_gl_1k.webp");

/*             armMap.repeat.set(3, 1);
            armMap.wrapS = THREE.RepeatWrapping;

            colorMap.repeat.set(3, 1);
            colorMap.wrapS = THREE.RepeatWrapping;

            normalMap.repeat.set(3, 1);
            normalMap.wrapS = THREE.RepeatWrapping; */

            return { armMap, colorMap, normalMap };
        }

        function getExtraWall() {
            const armMap = textureLoader.load("../textures/_shared/exterior_wall_cladding_02/_WEBP/exterior_wall_cladding_02_arm_1k.webp");
            const colorMap = textureLoader.load("../textures/_shared/exterior_wall_cladding_02/_WEBP/exterior_wall_cladding_02_diff_1k.webp");
            colorMap.colorSpace = THREE.SRGBColorSpace;
            const normalMap = textureLoader.load("../textures/_shared/exterior_wall_cladding_02/_WEBP/exterior_wall_cladding_02_nor_gl_1k.webp");

/*             armMap.repeat.set(1.5, 1);
            armMap.wrapS = THREE.RepeatWrapping;

            colorMap.repeat.set(1.5, 1);
            colorMap.wrapS = THREE.RepeatWrapping;

            normalMap.repeat.set(1.5, 1);
            normalMap.wrapS = THREE.RepeatWrapping; */

            return { armMap, colorMap, normalMap };
        }

        function getRoof() {
            const armMap = textureLoader.load("../textures/house2/roof/_WEBP/bitumen_arm_1k.webp");
            const colorMap = textureLoader.load("../textures/house2/roof/_WEBP/bitumen_diff_1k.webp");
            colorMap.colorSpace = THREE.SRGBColorSpace;
            const normalMap = textureLoader.load("../textures/house2/roof/_WEBP/bitumen_nor_gl_1k.webp");

            colorMap.repeat.set(0.125, 0.125);
            colorMap.wrapS = THREE.RepeatWrapping;
            colorMap.wrapT = THREE.RepeatWrapping;
            
            armMap.repeat.set(0.125, 0.125);
            armMap.wrapS = THREE.RepeatWrapping;
            armMap.wrapT = THREE.RepeatWrapping;
            
            normalMap.repeat.set(0.125, 0.125);
            normalMap.wrapS = THREE.RepeatWrapping;
            normalMap.wrapT = THREE.RepeatWrapping;

        
            return { armMap, colorMap, normalMap };
        }

        function getStairs() {
            const [repeatXModifier, repeatYModifier] = [0.18, 0.27];

            const armMap = textureLoader.load("../textures/house2/stairs/_WEBP/plank_flooring_04_arm_1k.webp");
            const colorMap = textureLoader.load("../textures/house2/stairs/_WEBP/plank_flooring_04_diff_1k.webp");
            colorMap.colorSpace = THREE.SRGBColorSpace;
            const normalMap = textureLoader.load("../textures/house2/stairs/_WEBP/plank_flooring_04_nor_gl_1k.webp"); 
            
            colorMap.repeat.set(repeatXModifier, repeatYModifier);
            colorMap.wrapS = THREE.RepeatWrapping;
            colorMap.wrapT = THREE.RepeatWrapping;
            
            armMap.repeat.set(repeatXModifier, repeatYModifier);
            armMap.wrapS = THREE.RepeatWrapping;
            armMap.wrapT = THREE.RepeatWrapping;
            
            normalMap.repeat.set(repeatXModifier, repeatYModifier);
            normalMap.wrapS = THREE.RepeatWrapping;
            normalMap.wrapT = THREE.RepeatWrapping;

            return { armMap, colorMap, normalMap };
        }

        function getDoor() {
            const alphaMap = textureLoader.load("../textures/_shared/door_universal/_WEBP/alpha.webp");
            const aoMap = textureLoader.load("../textures/_shared/door_universal/_WEBP/ambientOcclusion.webp");
            const colorMap = textureLoader.load("../textures/house2/door/_WEBP/color8.webp");
            colorMap.colorSpace = THREE.SRGBColorSpace;
            const metalnessMap = textureLoader.load("../textures/_shared/door_universal/_WEBP/metalness.webp");
            const normalMap = textureLoader.load("../textures/_shared/door_universal/_WEBP/normal.webp");
            const heightMap = textureLoader.load("../textures/_shared/door_universal/_WEBP/height.webp");
            const roughnessMap = textureLoader.load("../textures/_shared/door_universal/_WEBP/roughness.webp");

            return {alphaMap, aoMap, colorMap, heightMap, metalnessMap, normalMap, roughnessMap};
        }

        function getDoor2() {
            const alphaMap = textureLoader.load("../textures/_shared/door_universal/_WEBP/alpha.webp");
            const aoMap = textureLoader.load("../textures/_shared/door_universal/_WEBP/ambientOcclusion.webp");
            const colorMap = textureLoader.load("../textures/house2/door2/_WEBP/color9.webp");
            colorMap.colorSpace = THREE.SRGBColorSpace;
            const metalnessMap = textureLoader.load("../textures/_shared/door_universal/_WEBP/metalness.webp");
            const normalMap = textureLoader.load("../textures/_shared/door_universal/_WEBP/normal.webp");
            const heightMap = textureLoader.load("../textures/_shared/door_universal/_WEBP/height.webp");
            const roughnessMap = textureLoader.load("../textures/_shared/door_universal/_WEBP/roughness.webp");

            return {alphaMap, aoMap, colorMap, heightMap, metalnessMap, normalMap, roughnessMap};
        }

        function getLightBulb() {
            const armMap = textureLoader.load("../textures/_shared/fine_grained_wood/_WEBP/fine_grained_wood_arm_1k.webp");
            const colorMap = textureLoader.load("../textures/_shared/fine_grained_wood/_WEBP/fine_grained_wood_col_1k.webp");
            colorMap.colorSpace = THREE.SRGBColorSpace;
            const normalMap = textureLoader.load("../textures/_shared/fine_grained_wood/_WEBP/fine_grained_wood_nor_gl_1k.webp");

            return { armMap, colorMap, normalMap };
        }

        function getRectangularLED() {
            const armMap = textureLoader.load("../textures/house2/rectangularLED/_WEBP/corrugated_iron_arm_1k.webp");
            const colorMap = textureLoader.load("../textures/house2/rectangularLED/_WEBP/corrugated_iron_diff_1k.webp");
            colorMap.colorSpace = THREE.SRGBColorSpace;
            const normalMap = textureLoader.load("../textures/house2/rectangularLED/_WEBP/corrugated_iron_nor_gl_1k.webp");

            return { armMap, colorMap, normalMap };
        }

    },

    getLaneTextures() {
        const alphaMap = textureLoader.load("../textures/_shared/_alphas/_WEBP/alpha.webp");

        const armMap = textureLoader.load("../textures/lane/_WEBP/wood_chip_path_arm_1k.webp");
        const colorMap = textureLoader.load("../textures/lane/_WEBP/wood_chip_path_diff_1k.webp");
        colorMap.colorSpace = THREE.SRGBColorSpace;
        const normalMap = textureLoader.load("../textures/lane/_WEBP/wood_chip_path_nor_gl_1k.webp"); 

        /* alphaMap.repeat.set(1, 4);
        alphaMap.wrapS = THREE.RepeatWrapping;
        alphaMap.wrapT = THREE.RepeatWrapping; */

        armMap.repeat.set(1, 4);
        armMap.wrapS = THREE.RepeatWrapping;
        armMap.wrapT = THREE.RepeatWrapping;

        colorMap.repeat.set(1, 4);
        colorMap.wrapS = THREE.RepeatWrapping;
        colorMap.wrapT = THREE.RepeatWrapping;


        normalMap.repeat.set(1, 4);
        normalMap.wrapS = THREE.RepeatWrapping;
        normalMap.wrapT = THREE.RepeatWrapping;

        return { alphaMap, armMap, colorMap, normalMap };
    },

    getSideWalkTextures() {
        return {
            sidewalk1: getSideWalk1(),
            sidewalk2: getSidewalk2(),
            sidewalkCircle: getSidewalkCircle()
        }

        function getSideWalk1() {
            const alphaMap = textureLoader.load("../textures/_shared/_alphas/_WEBP/alpha.webp");
            const armMap = textureLoader.load("../textures/_shared/rocky_terrain_02/_WEBP/rocky_terrain_02_arm_1k.webp");
            const colorMap = textureLoader.load("../textures/_shared/rocky_terrain_02/_WEBP/rocky_terrain_02_diff_1k.webp");
            colorMap.colorSpace = THREE.SRGBColorSpace;
            const normalMap = textureLoader.load("../textures/_shared/rocky_terrain_02/_WEBP/rocky_terrain_02_nor_gl_1k.webp"); 

            armMap.repeat.set(1, 2);
            armMap.wrapS = THREE.RepeatWrapping;
            armMap.wrapT = THREE.RepeatWrapping;

            colorMap.repeat.set(1, 2);
            colorMap.wrapS = THREE.RepeatWrapping;
            colorMap.wrapT = THREE.RepeatWrapping;

            normalMap.repeat.set(1, 2);
            normalMap.wrapS = THREE.RepeatWrapping;
            normalMap.wrapT = THREE.RepeatWrapping;

            return { alphaMap, armMap, colorMap, normalMap };

        }

        function getSidewalk2() {

            const alphaMap = textureLoader.load("../textures/_shared/_alphas/_WEBP/alpha.webp");
            const armMap = textureLoader.load("../textures/_shared/rocky_terrain_02/_WEBP/rocky_terrain_02_arm_1k.webp");
            const colorMap = textureLoader.load("../textures/_shared/rocky_terrain_02/_WEBP/rocky_terrain_02_diff_1k.webp");
            colorMap.colorSpace = THREE.SRGBColorSpace;
            const normalMap = textureLoader.load("../textures/_shared/rocky_terrain_02/_WEBP/rocky_terrain_02_nor_gl_1k.webp"); 

            armMap.repeat.set(1, 3);
            armMap.wrapS = THREE.RepeatWrapping;
            armMap.wrapT = THREE.RepeatWrapping;

            colorMap.repeat.set(1, 3);
            colorMap.wrapS = THREE.RepeatWrapping;
            colorMap.wrapT = THREE.RepeatWrapping;

            normalMap.repeat.set(1, 3);
            normalMap.wrapS = THREE.RepeatWrapping;
            normalMap.wrapT = THREE.RepeatWrapping;

            return { alphaMap, armMap, colorMap, normalMap };

        }

        function getSidewalkCircle() {

            const alphaMap = textureLoader.load("../textures/ground/_WEBP/alpha.webp");
            const armMap = textureLoader.load("../textures/_shared/rocky_terrain_02/_WEBP/rocky_terrain_02_arm_1k.webp");
            const colorMap = textureLoader.load("../textures/_shared/rocky_terrain_02/_WEBP/rocky_terrain_02_diff_1k.webp");
            colorMap.colorSpace = THREE.SRGBColorSpace;
            const normalMap = textureLoader.load("../textures/_shared/rocky_terrain_02/_WEBP/rocky_terrain_02_nor_gl_1k.webp"); 

            armMap.repeat.set(2, 2);
            armMap.wrapS = THREE.RepeatWrapping;
            armMap.wrapT = THREE.RepeatWrapping;

            colorMap.repeat.set(2, 2);
            colorMap.wrapS = THREE.RepeatWrapping;
            colorMap.wrapT = THREE.RepeatWrapping;

            normalMap.repeat.set(2, 2);
            normalMap.wrapS = THREE.RepeatWrapping;
            normalMap.wrapT = THREE.RepeatWrapping;

            return { alphaMap, armMap, colorMap, normalMap };
        }

    }
};