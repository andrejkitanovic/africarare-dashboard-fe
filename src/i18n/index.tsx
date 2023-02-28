import dayjs from "dayjs";
import React, { FC, createContext, useContext } from "react";

import { WithChildren } from "utils/types";

require("dayjs/locale/en");
require("dayjs/locale/sr");

const I18N_CONFIG_KEY = process.env.REACT_APP_I18N_CONFIG_KEY || "i18nConfig";

type Props = {
  selectedLang: "en" | "sr";
};
const initialState: Props = {
  selectedLang: "sr",
};

function getConfig(): Props {
  const ls = localStorage.getItem(I18N_CONFIG_KEY);
  if (ls) {
    try {
      return JSON.parse(ls) as Props;
    } catch (er) {
      console.error(er);
    }
  }
  return initialState;
}

// Side effect
export function setLanguage(lang: "en" | "sr") {
  const config = getConfig();

  if (config.selectedLang === lang) return;

  localStorage.setItem(I18N_CONFIG_KEY, JSON.stringify({ selectedLang: lang }));
  window.location.reload();
}

const I18nContext = createContext<Props>(initialState);

const useLang = () => {
  return useContext(I18nContext).selectedLang;
};

const LangaugeProvider: FC<WithChildren> = ({ children }) => {
  const lang = getConfig();
  dayjs.locale(lang.selectedLang);
  return <I18nContext.Provider value={lang}>{children}</I18nContext.Provider>;
};

export { LangaugeProvider, useLang };
