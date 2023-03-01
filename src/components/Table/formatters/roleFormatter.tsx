import { FormattedMessage } from "react-intl";

import { UserOrgTypeRoleType } from "api/user/types";

const roleLabels = {
  "portal-admin": <FormattedMessage id="ROLE.PORTAL_ADMIN" />,
  "land-owner": <FormattedMessage id="ROLE.LAND_OWNER" />,
};

export const roleFormatter = (
  value: UserOrgTypeRoleType | null | undefined
) => {
  if (value && roleLabels[value]) return roleLabels[value];
  return "-";
};
