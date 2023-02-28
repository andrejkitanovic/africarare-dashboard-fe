import {
  Box,
  Button,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
  SvgIcon,
  Typography,
} from "@mui/material";
import PopupState, { bindPopover, bindTrigger } from "material-ui-popup-state";
import React from "react";

import { languages } from "components/layouts/DefaultLayout/Topbar/LanguageSwitcher";
import { setLanguage, useLang } from "i18n";

const LoginLanguageSwitcher = () => {
  const lang = useLang();
  const currentLanguage = languages.find((x) => x.lang === lang);
  const CurrentFlag = currentLanguage!.flag;

  return (
    <PopupState variant="popover" popupId="language-switcher-popover">
      {(popupState: any) => (
        <Box>
          <Button
            sx={{ px: 2, py: 1, border: "1px solid white" }}
            variant="contained"
            {...bindTrigger(popupState)}
            data-cy="language-switcher"
          >
            <SvgIcon
              sx={{
                borderRadius: "50%",
                minWidth: 28,
                width: 28,
                minHeight: 28,
                height: 28,
                mr: 1.5,
              }}
            >
              <CurrentFlag />
            </SvgIcon>
            <Typography variant="body2">{currentLanguage?.name}</Typography>
          </Button>
          <Popover
            BackdropProps={{
              invisible: true,
            }}
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
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

export default LoginLanguageSwitcher;
