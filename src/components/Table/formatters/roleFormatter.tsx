import { FormattedMessage } from "react-intl";

import { UserOrgTypeRoleType } from "api/user/types";

const roleLabels = {
  "portal-admin": <FormattedMessage id="ROLE.PORTAL_ADMIN" />,
  "organisation-owner": <FormattedMessage id="ROLE.ORGANISATION_OWNER" />,
  "organisation-employee": <FormattedMessage id="ROLE.ORGANISATION_EMPLOYEE" />,
};

export const roleFormatter = (
  value: UserOrgTypeRoleType | null | undefined
) => {
  if (value && roleLabels[value]) return roleLabels[value];
  return "-";
};
