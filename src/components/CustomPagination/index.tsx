import React from 'react';
// import Pagination from 'react-bootstrap/Pagination';
import { PaginationControl } from 'react-bootstrap-pagination-control';

import { IPage } from './../../utils/models';

const CutomPagination = ({ totalRecords, active, limit, onSetPageActive }: IPage): React.ReactElement => {
  return (
    <PaginationControl
      page={active}
      between={4}
      total={totalRecords}
      limit={limit}
      changePage={(page) => {
        onSetPageActive(page);
      }}
      ellipsis={2}
    />
  );
};

export default CutomPagination;
