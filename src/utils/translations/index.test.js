import fallbackTranslations from "./fallbackTranslations";

const enTranslations = {
  "HEADER.TITLE": "English title",
  "HEADER.DESCRIPTION": "English description",
  DASHBOARD: {
    TITLE: "English dashboard title",
    DESCRIPTION: "English dashboard description",
  },
};

test("should fallback null values", () => {
  const noTranslations = {
    "HEADER.TITLE": "Norwegian title",
    "HEADER.DESCRIPTION": null,
    DASHBOARD: {
      TITLE: "Norwegian dashboard title",
      DESCRIPTION: "Norwegian dashboard description",
    },
  };

  const srWithFallback = {
    "HEADER.TITLE": "Norwegian title",
    "HEADER.DESCRIPTION": "English description",
    DASHBOARD: {
      TITLE: "Norwegian dashboard title",
      DESCRIPTION: "Norwegian dashboard description",
    },
  };

  const fallback = fallbackTranslations(noTranslations, enTranslations);
  expect(fallback).toStrictEqual(srWithFallback);
});

test("should fallback nested null values", () => {
  const srTranslations = {
    "HEADER.TITLE": "Norwegian title",
    "HEADER.DESCRIPTION": "Norwegian description",
    DASHBOARD: {
      TITLE: null,
      DESCRIPTION: "Norwegian dashboard description",
    },
  };

  const srWithFallbackTranslations = {
    "HEADER.TITLE": "Norwegian title",
    "HEADER.DESCRIPTION": "Norwegian description",
    DASHBOARD: {
      TITLE: "English dashboard title",
      DESCRIPTION: "Norwegian dashboard description",
    },
  };

  const fallback = fallbackTranslations(srTranslations, enTranslations);
  expect(fallback).toStrictEqual(srWithFallbackTranslations);
});

test("should not fallback values if they are not null", () => {
  const srTranslations = {
    "HEADER.TITLE": "Norwegian title",
    "HEADER.DESCRIPTION": "random",
    DASHBOARD: {
      TITLE: "Norwegian dashboard title",
      DESCRIPTION: "Norwegian dashboard description",
    },
  };

  const fallback = fallbackTranslations(srTranslations, enTranslations);
  expect(fallback).toStrictEqual(srTranslations);
});
