const queryParser = (expression, valueObj) => {
  // To parse queires with params ({{param}}) we need to remove {{}}
  const templateMatcher = /{{\s?([^{}\s]*)\s?}}/g;
  const text = expression.replace(templateMatcher, (substring, value, index) => {
    value = valueObj[value];
    return value;
  });
  return text;
};

const lowerCaseData = (obj) =>
  Object.keys(obj).reduce((accumulator, key) => {
    accumulator[key.charAt(0).toLowerCase() + key.slice(1)] = obj[key];
    return accumulator;
  }, {});

module.exports = {
  queryParser,
  lowerCaseData,
};
