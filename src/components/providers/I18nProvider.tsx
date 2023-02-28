import React from "react";
import { IntlProvider } from "react-intl";

import { useLang } from "i18n";
import enMessages from "translations/en.json";
import srMessages from "translations/sr.json";
import fallbackTranslations from "utils/translations/fallbackTranslations";
import "components/forms/yupErrorMessages";

export const allMessages = {
  en: enMessages,
  sr: srMessages,
};

export function I18nProvider({ children }: any) {
  const locale = useLang();

  // in case there is untranslated message, fallback it to english
  const messages = fallbackTranslations(allMessages[locale], enMessages);

  return (
    <IntlProvider locale={locale} messages={messages}>
      {children}
    </IntlProvider>
  );
}
