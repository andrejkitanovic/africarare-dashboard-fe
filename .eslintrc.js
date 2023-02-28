const fs = require("fs");
const path = require("path");

const restrictedPaths = [].map((pkg) =>
  fs
    .readdirSync(path.dirname(require.resolve(`${pkg.name}/package.json`)))
    .map((component) => ({
      name: `${pkg.name}/${component}`,
      message: `This loads CommonJS version of the package. To fix replace with: import { ${component} } from "${pkg.name}";`,
    }))
);

// TODO: Wait for https://github.com/facebook/create-react-app/pull/7036 to enable rules in react-scripts.

module.exports = {
  extends: [
    "eslint-config-react-app",
    // "plugin:testing-library/react",
    "plugin:jest-dom/recommended",
    "plugin:prettier/recommended",
  ],
  // plugins: ["testing-library", "jest-dom"],
  rules: {
    // "no-script-url": "warn",
    "jsx-a11y/anchor-is-valid": "warn",
    "no-restricted-imports": [
      "error",
      { paths: [].concat(...restrictedPaths) },
    ],
    "no-multiple-empty-lines": ["warn", { max: 1, maxBOF: 0, maxEOF: 0 }],
    "prettier/prettier": ["warn"],
    "sort-imports": [
      "warn",
      {
        ignoreCase: false,
        ignoreDeclarationSort: true, // don"t want to sort import lines, use eslint-plugin-import instead
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
        allowSeparatedGroups: true,
      },
    ],
    "import/order": [
      "warn",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          ["parent", "sibling"],
          "index",
          "object",
        ],
        pathGroups: [
          {
            pattern: "react",
            group: "builtin",
            position: "before",
          },
        ],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],
  },
  settings: {
    "import/resolver": {
      typescript: {
        project: "./tsconfig.json",
      },
    },
  },
  ignorePatterns: ["node_modules", "build", "src/generated-types"],
};
