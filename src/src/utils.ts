export function strMapToJson(strMap: Map<any, any>) {
    return JSON.stringify(strMapToObj(strMap));
}

export function strMapToObj(strMap: any) {
    let obj = Object.create(null);
    for (let [k, v] of strMap) {
        obj[k] = v;
    }
    return obj;
}