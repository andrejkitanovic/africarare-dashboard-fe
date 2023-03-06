import {
  KeyboardArrowDown,
  KeyboardArrowRight,
  Search as SearchIcon,
} from "@mui/icons-material";
import { Grid, InputAdornment, Stack, TextField } from "@mui/material";
import React, { FC, useCallback } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { CellProps } from "react-table";

import { getExperiences } from "api/experiences";
import { experiencesKeys } from "api/experiences/queries";
import { ExperiencesType } from "api/experiences/types";
import { FeaturesType } from "api/features/types";
import { LevelsType } from "api/levels/types";
import { hasPermissions } from "components/stores/UserStore";
import Table, { TableColumn } from "components/Table";
import useRemoteTableLogic from "components/Table/useRemoteTableLogic";
import { useModal } from "utils/hooks/useModal";

import DeleteExperienceModal from "./components/ExperienceModal/DeleteExperienceModal";
import EditExperienceModal from "./components/ExperienceModal/EditExperienceModal";
import NewExperienceFeatureModal from "./components/FeatureModal/NewExperienceFeatureModal";
import NewLevelFeatureModal from "./components/FeatureModal/NewLevelFeatureModal";
import DeleteLevelModal from "./components/LevelModal/DeleteLevelModal";
import NewLevelModal from "./components/LevelModal/NewLevelModal";
import ExperiencesActionsFormatter from "./formatters/ExperiencesActionsFormatter";
import { FeatureFormatter } from "./formatters/FeaturesFormatter";
import LevelActtionsFormatter from "./formatters/LevelActionsFormatter";
import { useExperiencesFilter } from "./useExperiencesFilter";

interface IExperiencesTable {
  landId: string;
}

const ExperiencesTable: FC<IExperiencesTable> = ({ landId }) => {
  const intl = useIntl();

  const { filters, searchField } = useExperiencesFilter({
    filter: [
      {
        field: "land",
        operator: "is",
        value: landId,
      },
    ],
  });

  const { data, status, sortOptions, paginationOptions } = useRemoteTableLogic(
    experiencesKeys.listFiltered(filters),
    getExperiences,
    filters
  );

  // EXPERIECNE
  const {
    isOpen: isAddLevelOpen,
    handleClose: handleCloseAddLevel,
    handleOpen: handleOpenAddLevel,
    context: addLevelContext,
  } = useModal<ExperiencesType>();
  const {
    isOpen: isAddFeatureOpen,
    handleClose: handleCloseAddFeature,
    handleOpen: handleOpenAddFeature,
    context: addFeatureContext,
  } = useModal<ExperiencesType>();
  const {
    isOpen: isEditOpen,
    handleClose: handleCloseEdit,
    handleOpen: handleOpenEdit,
    context: editContext,
  } = useModal<ExperiencesType>();
  const {
    isOpen: isOpenDelete,
    handleClose: handleCloseDelete,
    handleOpen: handleOpenDelete,
    context: deleteContext,
  } = useModal<ExperiencesType>();

  // LEVEL
  const {
    isOpen: isOpenDeleteLevel,
    handleClose: handleCloseDeleteLevel,
    handleOpen: handleOpenDeleteLevel,
    context: deleteLevelContext,
  } = useModal<LevelsType>();
  const {
    isOpen: isAddLevelFeatureOpen,
    handleClose: handleCloseAddLevelFeature,
    handleOpen: handleOpenAddLevelFeature,
    context: addLevelFeatureContext,
  } = useModal<LevelsType>();

  const columns: TableColumn<ExperiencesType>[] = [
    {
      accessor: "levels",
      Header: intl.formatMessage({ id: "EXPERIENCES.TABLE.LEVELS" }),
      Aggregated: ({ value, row }: CellProps<ExperiencesType>) => {
        return (
          <Stack
            direction="row"
            alignItems="center"
            spacing={0.5}
            {...row.getToggleRowExpandedProps()}
          >
            <>
              {value?.length}
              {row.isExpanded ? <KeyboardArrowDown /> : <KeyboardArrowRight />}
            </>
          </Stack>
        );
      },
      Cell: ({ row }: CellProps<any>) => <>{"#" + (row.index + 1)}</>,
    },
    {
      accessor: "name",
      Header: intl.formatMessage({ id: "EXPERIENCES.TABLE.NAME" }),
    },
    {
      //@ts-expect-error
      accessor: "scene",
      Header: intl.formatMessage({ id: "EXPERIENCES.TABLE.SCENE" }),
    },
    {
      accessor: "features",
      Header: intl.formatMessage({ id: "EXPERIENCES.TABLE.FEATURES" }),
      Cell: ({ value }: CellProps<ExperiencesType>) => (
        <Stack direction="row" sx={{ flexWrap: "wrap" }}>
          {value.map((feature: FeaturesType, i: number) => (
            <FeatureFormatter type={feature.type} sx={{ mr: 0.5, mb: 0.5 }} />
          ))}
        </Stack>
      ),
    },
    {
      id: "actions",
      Header: intl.formatMessage({ id: "GLOBAL.ACTIONS" }),
      Aggregated: (cell: CellProps<ExperiencesType>) => (
        <ExperiencesActionsFormatter
          {...cell}
          handleOpenAddLevel={handleOpenAddLevel}
          handleOpenAddFeature={handleOpenAddFeature}
          handleOpenEdit={handleOpenEdit}
          handleOpenDelete={handleOpenDelete}
        />
      ),
      Cell: (cell: CellProps<LevelsType>) => (
        <LevelActtionsFormatter
          {...cell}
          handleOpenAddFeature={handleOpenAddLevelFeature}
          handleOpenEdit={() => {}}
          handleOpenDelete={handleOpenDeleteLevel}
        />
      ),
      align: "right",
    },
  ];

  const getSubRows = useCallback(
    (experienceRow: ExperiencesType) =>
      experienceRow.levels ? (experienceRow.levels as any[]) : [],
    []
  );

  return (
    <>
      <Grid container sx={{ pt: 1, px: 2 }}>
        <Grid item sm={4} xs={12}>
          <TextField
            fullWidth
            label={<FormattedMessage id="GLOBAL.SEARCH" />}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            helperText={<FormattedMessage id="EXPERIENCES.TABLE.SEARCH_BY" />}
            {...searchField}
          />
        </Grid>
      </Grid>
      <Table
        data={data}
        columns={columns}
        sort={sortOptions}
        pagination={paginationOptions}
        status={status}
        getSubRows={getSubRows}
      />
      {/* EXPERIENCE */}
      {hasPermissions("write:levels") && (
        <NewLevelModal
          isOpen={isAddLevelOpen}
          handleClose={handleCloseAddLevel}
          experience={addLevelContext}
        />
      )}
      {hasPermissions("write:features") && (
        <NewExperienceFeatureModal
          isOpen={isAddFeatureOpen}
          handleClose={handleCloseAddFeature}
          experience={addFeatureContext}
        />
      )}
      {hasPermissions("update:experiences") && (
        <EditExperienceModal
          isOpen={isEditOpen}
          handleClose={handleCloseEdit}
          experience={editContext}
        />
      )}
      {hasPermissions("delete:experiences") && (
        <>
          <DeleteExperienceModal
            isOpen={isOpenDelete}
            handleClose={handleCloseDelete}
            experience={deleteContext}
          />
        </>
      )}
      {/* LEVEL */}
      {hasPermissions("write:features") && (
        <NewLevelFeatureModal
          isOpen={isAddLevelFeatureOpen}
          handleClose={handleCloseAddLevelFeature}
          level={addLevelFeatureContext}
        />
      )}
      {hasPermissions("delete:levels") && (
        <>
          <DeleteLevelModal
            isOpen={isOpenDeleteLevel}
            handleClose={handleCloseDeleteLevel}
            level={deleteLevelContext}
          />
        </>
      )}
    </>
  );
};

export default ExperiencesTable;
