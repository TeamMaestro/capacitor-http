export function strMapToJson(strMap) {
  return JSON.stringify(strMapToObj(strMap));
}

export function strMapToObj(strMap) {
  let obj = Object.create(null);
  for (let [k, v] of strMap) {
    obj[k] = v;
  }
  return obj;
}
