/**
 * Sort translations by its keys (ASC)
 * (default sort algorithm - a > b)
 * @param translations - object with translations
 */
module.exports = function sortTranslations(translations) {
  return Object.keys(translations)
    .sort()
    .reduce((returnObj, key) => {
      if (translations[key] && typeof translations[key] === "object") {
        returnObj[key] = sortTranslations(translations[key]);
      } else {
        returnObj[key] = translations[key];
      }

      return returnObj;
    }, {});
};
