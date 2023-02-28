/**
 * Sort translations by its keys (ASC)
 * (default sort algorithm - a > b)
 * @param translations - object with translations
 */
module.exports = function findDuplicates(translations) {
  const valuesMap = new Map();
  Object.values(translations).forEach((value) => {
    if (typeof value === "string") {
      const count = valuesMap.has(value) ? valuesMap.get(value) + 1 : 1;
      valuesMap.set(value, count);
    }
  });

  valuesMap.forEach((value, label) => {
    if (value >= 3) {
      console.log(
        "\x1b[33m",
        `Label ${label} occures ${value} times, replace it with global variable`
      );
    }
  });
};
