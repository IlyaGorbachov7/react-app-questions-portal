import * as React from 'react';
import TablePagination from '@mui/material/TablePagination';
//https://stackoverflow.com/questions/75538207/remove-pagination-text-from-muis-tablepagination-component-that-shows-the-rows
//https://mui.com/material-ui/api/table-pagination/
//https://stackoverflow.com/questions/51412731/material-ui-remove-rows-per-page-in-the-component-tablepagination
//https://github.com/mui/material-ui/blob/v5.11.16/docs/data/material/components/table/EnhancedTable.tsx
export default function TablePaginationDemo({page, setPage, rowsPerPage, setRowsPerPage, totalRecords}) {

    const handleChangePage = (event,newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        debugger
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <TablePagination
            rowsPerPageOptions={[]}
            component="div"
            labelRowsPerPage="none"
            count={totalRecords}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{ "& .MuiTablePagination-displayedRows": { display: "none" }
            }}
        />
    );
}