import {
  Box,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import type { Dispatch, FC, SetStateAction } from "react";
import { Task } from "../types/types";

interface PaginationCmpProps {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  rowsPerPage: number;
  setRowsPerPage: Dispatch<SetStateAction<number>>;
  tasks: Task[];
}

const PaginationCmp: FC<PaginationCmpProps> = ({
  currentPage,
  setCurrentPage,
  rowsPerPage,
  setRowsPerPage,
  tasks,
}) => {
  const totalPages = Math.ceil(tasks.length / rowsPerPage);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event: SelectChangeEvent<number>) => {
    setRowsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mt={2}
      px={2}
    >
      <Box display="flex" alignItems="center">
        <Typography variant="body2" mr={1}>
          Rows per page:
        </Typography>
        <Select
          value={rowsPerPage}
          onChange={handleChangeRowsPerPage}
          size="small"
        >
          {[2, 5, 10, 25, 50].map((opt) => (
            <MenuItem key={opt} value={opt}>
              {opt}
            </MenuItem>
          ))}
        </Select>
      </Box>

      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handleChangePage}
        color="primary"
        shape="rounded"
      />
    </Box>
  );
};

export default PaginationCmp;
