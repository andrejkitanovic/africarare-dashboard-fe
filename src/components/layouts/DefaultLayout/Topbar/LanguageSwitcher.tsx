import {
  Box,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
  SvgIcon,
} from "@mui/material";
import PopupState, { bindPopover, bindTrigger } from "material-ui-popup-state";
import React from "react";

// FLAGS:
import { ReactComponent as SRFlagSvg } from "assets/flags/serbia.svg";
import { ReactComponent as UKFlagSvg } from "assets/flags/united-kingdom.svg";
import { setLanguage, useLang } from "i18n";

export const languages = [
  {
    lang: "en",
    name: "English",
    flag: UKFlagSvg,
  },
  {
    lang: "sr",
    name: "Serbian",
    flag: SRFlagSvg,
  },
];

const LanguageSwitcher = () => {
  const lang = useLang();
  const currentLanguage = languages.find((x) => x.lang === lang);
  const CurrentFlag = currentLanguage!.flag;

  return (
    <PopupState variant="popover" popupId="language-switcher-popover">
      {(popupState: any) => (
        <Box>
          <IconButton size="large" sx={{ p: 1 }} {...bindTrigger(popupState)}>
            <SvgIcon
              sx={{
                borderRadius: "50%",
                minWidth: 28,
                width: 28,
                minHeight: 28,
                height: 28,
              }}
            >
              <CurrentFlag />
            </SvgIcon>
          </IconButton>
          <Popover
            BackdropProps={{
              invisible: true,
            }}
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <List>
              {languages.map(({ name, lang, flag: FlagSvg }) => (
                <ListItemButton
                  key={lang}
                  onClick={() => {
                    popupState.close();
                    setLanguage(lang as "sr" | "en");
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: 1,
                    }}
                  >
                    <SvgIcon
                      sx={{ borderRadius: "50%", width: 24, height: 24 }}
                    >
                      <FlagSvg />
                    </SvgIcon>
                  </ListItemIcon>
                  <ListItemText>{name}</ListItemText>
                </ListItemButton>
              ))}
            </List>
          </Popover>
        </Box>
      )}
    </PopupState>
  );
};

export default LanguageSwitcher;
