export const deleteLastItem = function<T extends object> (object: T): T {
    let key = null;
    let newObject = { ...object };

    for (let k in object) {
        key = k;
    }

    delete newObject[key];
    return newObject;
}