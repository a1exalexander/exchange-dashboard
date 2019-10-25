const has = Object.prototype.hasOwnProperty;

export default (obj, key) => {
  return has.call(obj, key);
};
