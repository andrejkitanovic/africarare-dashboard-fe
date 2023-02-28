import { IconButton, IconButtonProps, Tooltip } from "@mui/material";
import { FC, ReactElement } from "react";

interface IIconButtonWithTooltip extends IconButtonProps {
  tooltipText: ReactElement | string;
}
const IconButtonWithTooltip: FC<IIconButtonWithTooltip> = ({
  children,
  tooltipText,
  ...rest
}) => {
  return (
    <Tooltip title={tooltipText}>
      <span>
        <IconButton {...rest}>{children}</IconButton>
      </span>
    </Tooltip>
  );
};

export default IconButtonWithTooltip;
