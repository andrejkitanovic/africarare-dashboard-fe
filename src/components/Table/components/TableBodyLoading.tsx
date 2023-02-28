import { Skeleton, TableBody, TableCell, TableRow } from "@mui/material";
import { HeaderGroup } from "react-table";

interface Props<T extends object> {
  rows: number;
  headerGroups: HeaderGroup<T>[];
}

const TableBodyLoading = <T extends object>({
  rows,
  headerGroups,
}: Props<T>) => {
  return (
    <TableBody>
      {Array.from({ length: rows }).map((_, ri) => (
        <TableRow key={ri}>
          {headerGroups.map((headerGroup) =>
            headerGroup.headers.map((_, ci) => (
              <TableCell key={ci} sx={{ height: 47 }}>
                <Skeleton />
              </TableCell>
            ))
          )}
          <TableCell sx={{ height: 47, width: 20 }}>
            <Skeleton />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default TableBodyLoading;
