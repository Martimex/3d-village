export default {
    supportShadowCasting: (obj) => enableShadowCasting(obj),
    supportShadowReceiving: (obj) => enableShadowReceiving(obj),
}

function enableShadowCasting(light_or_objects) {
    const passedObjects = _convertToArray(light_or_objects);
    passedObjects.forEach(obj => { obj.castShadow = true; })
}

function enableShadowReceiving(objects) {
    const passedObjects = _convertToArray(objects);
    passedObjects.forEach(obj => { obj.receiveShadow = true; })
}

function _convertToArray(input) { return Array.isArray(input) ? input : [input]; }