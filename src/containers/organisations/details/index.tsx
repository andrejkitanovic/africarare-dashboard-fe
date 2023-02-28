import { BusinessCenter as BusinessCenterIcon } from "@mui/icons-material";
import { Paper } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { FormattedMessage } from "react-intl";
import { useParams } from "react-router-dom";

import { getSingleOrganisation } from "api/organisations";
import { organisationsKeys } from "api/organisations/queries";
import { UsersType } from "api/users/types";
import { QueryParamsType } from "api/utils";
import TableHeader from "components/Table/components/TableHeader";
import UsersTable from "containers/users/UsersTable";

import OrganisationUsersHeader from "./OrganisationUsersHeader/OrganisationUsersHeader";

const OrganisationDetails = () => {
  const { organisationId } = useParams<{ organisationId: string }>();

  const { data: organisation } = useQuery(
    organisationsKeys.details(organisationId),
    async () => {
      const { data: res } = await getSingleOrganisation(organisationId);
      return res.data;
    }
  );

  const organisationFilter: QueryParamsType<UsersType> = {
    organisation: organisationId,
  };
  return (
    <>
      <Paper>
        <TableHeader
          icon={BusinessCenterIcon}
          label={
            <FormattedMessage
              id="ORGANISATIONS.DETAILS.HEADER"
              values={{ organisationName: organisation?.name }}
            />
          }
        ></TableHeader>
      </Paper>

      <Paper sx={{ mt: 2 }}>
        <OrganisationUsersHeader additionalFilters={organisationFilter} />
        <UsersTable additionalFilters={organisationFilter} />
      </Paper>
    </>
  );
};

export default OrganisationDetails;
