import { DragIndicator } from "@mui/icons-material";
import {
  Checkbox,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
  PopoverProps,
  Stack,
  Typography,
  alpha,
} from "@mui/material";
import React, { ReactElement, useMemo } from "react";
import { FormattedMessage } from "react-intl";

interface TableColumnsPopoverProps extends PopoverProps {
  fields: { value: string; label: string | ReactElement; display: boolean }[];
  setFields: (fields: string[]) => void;
}

const TableColumnsPopover = ({
  fields,
  setFields,

  ...rest
}: TableColumnsPopoverProps) => {
  const disableToggle = useMemo(() => {
    if (fields && fields.filter((field) => field.display).length === 1) {
      return true;
    }

    return false;
  }, [fields]);

  const toggleField = (value: string) => {
    const temporaryFields = fields.map((field) => {
      if (field.value === value) {
        return {
          ...field,
          display: !field.display,
        };
      }

      return field;
    });

    setFields(
      temporaryFields
        .filter((field) => field.display)
        .map((field) => field.value)
    );
  };

  return (
    <Popover {...rest}>
      <Stack
        sx={{
          px: 2,
          py: 1.5,
          backgroundColor: (t) => alpha(t.palette.secondary.main, 0.6),
        }}
      >
        <Typography fontWeight="600">
          <FormattedMessage
            id="TABLE.COLUMNS.TITLE"
            values={{
              displayedColumns: fields.filter((field) => field.display).length,
              totalColumns: fields.length,
            }}
          />
        </Typography>
      </Stack>
      <Divider />
      <List disablePadding sx={{ minWidth: "250px" }}>
        {fields.map((field) => (
          <ListItem
            key={field.value}
            secondaryAction={
              <IconButton edge="end" aria-label="comments">
                <DragIndicator />
              </IconButton>
            }
            disablePadding
          >
            <ListItemButton
              onClick={() => toggleField(field.value)}
              disabled={disableToggle && field.display}
            >
              <ListItemIcon sx={{ minWidth: "30px" }}>
                <Checkbox edge="start" checked={field.display} disableRipple />
              </ListItemIcon>
              <ListItemText
                primary={field.label}
                sx={{
                  ".MuiTypography-root": {
                    fontWeight: "500",
                    fontSize: "15px",
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Popover>
  );
};

export default TableColumnsPopover;
