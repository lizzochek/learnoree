export default {
  lowerCaseData: (obj) =>
    Object.keys(obj).reduce((accumulator, key) => {
      accumulator[key.charAt(0).toLowerCase() + key.slice(1)] = obj[key];
      return accumulator;
    }, {}),
  formatDataWithUnderscore: (obj) => {
    return Object.keys(obj).reduce((accumulator, key) => {
      const [prop, subProp] = key.split('_');
      accumulator[prop] = {
        ...accumulator[prop],
        [subProp]: obj[key],
      };
      return accumulator;
    }, {});
  },
};
