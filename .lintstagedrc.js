module.exports = {
  "*.{js,jsx}": ["eslint . --fix", "npm run test:staged"],
  "*.{ts,tsx}": [() => "tsc", "eslint . --fix", "npm run test:staged"],
  "src/translations/*.json": [
    "npm run validate-translations",
    "npm run sync-sort-translations",
    "git add src/translations/sr.json",
  ],
};
