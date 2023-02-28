const fs = require("fs");

// FUNCTIONS:
const findDuplicates = require("./findDuplicates");
const sortTranslations = require("./sortTranslations");
const syncTranslations = require("./syncTranslations");

// CONSTANTS:
const translationsDir = "src/translations";
const defaultTranslationsFileName = "en.json";
const defaultTranslationFile = `${translationsDir}/${defaultTranslationsFileName}`;

/**
 * Synchronize and sort all translations files
 */
function sortAndSyncTranslations() {
  let defaultTranslations = fs.readFileSync(defaultTranslationFile, "utf8");
  defaultTranslations = JSON.parse(defaultTranslations);

  // Get all file names from 'src/translations'
  fs.readdir(translationsDir, (err, files) => {
    if (err) throw err;

    try {
      // eslint-disable-next-line
      files.forEach((fileName) => {
        if (!fileName.endsWith(".json")) return true;

        const fileSrc = `${translationsDir}/${fileName}`;
        let translations = null;

        if (fileName === defaultTranslationsFileName) {
          translations = defaultTranslations;
        } else {
          let translationsFile = fs.readFileSync(fileSrc, "utf8");
          translationsFile = JSON.parse(translationsFile);
          translations = syncTranslations(
            defaultTranslations,
            translationsFile
          );
        }

        const sortedTranslations = sortTranslations(translations);
        findDuplicates(translations);

        const stringifiedTranslation = JSON.stringify(
          sortedTranslations,
          null,
          2
        );

        fs.writeFileSync(fileSrc, stringifiedTranslation);
      });

      // eslint-disable-next-line
      console.log("\x1b[32m", "Completed!");
    } catch (e) {
      // eslint-disable-next-line
      throw new Error(e);
    }
  });
}

sortAndSyncTranslations();
