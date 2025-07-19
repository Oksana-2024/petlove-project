import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import type { ChangeEvent } from "react";

interface IPaginationButtons {
  page: number;
  totalPages: number;
  onPageChange: (e: ChangeEvent<unknown>, page: number) => void;
}

export default function PaginationButtons({
  page,
  totalPages,
  onPageChange,
}: IPaginationButtons) {
  return (
    <Stack spacing={8}>
      <Pagination
        onChange={onPageChange}
        count={totalPages}
        showFirstButton
        showLastButton
        page={page}
        siblingCount={0}
        boundaryCount={0}
        variant="outlined"
        sx={{
          "& .MuiPagination-ul": {
            flexWrap: "nowrap",
            alignItems: "center",
            height: "40px",
            gap: "8px",
          },
          "& .MuiPaginationItem-root.MuiPaginationItem-root.Mui-selected": {
            border: "1px solid transparent",
            background: "var(--main-bg)",
            color: "var(--second-color)",
          },
          "& .MuiButtonBase-root": {
            width: "40px",
            height: "40px",
            margin: "0 1px",
            padding: "0",
            borderRadius: "100px",
          },
        }}
      />
    </Stack>
  );
}
