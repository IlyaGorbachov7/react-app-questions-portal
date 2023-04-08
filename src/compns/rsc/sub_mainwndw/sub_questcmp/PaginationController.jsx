import 'bootstrap/dist/css/bootstrap.min.css';

import React, {useState} from 'react';
import {PaginationControl} from 'react-bootstrap-pagination-control';

export const PaginationController = ({
                                         page, setPage, totalRecord, limitRecordView,
                                     }) => {

    return <PaginationControl
        page={page}
        between={3}
        total={totalRecord}
        limit={limitRecordView}
        changePage={(page) => {
            setPage(page);
            console.log(page)
        }}
        ellipsis={1}
    />
}