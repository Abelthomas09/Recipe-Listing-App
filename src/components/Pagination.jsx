import React from 'react';
import { Pagination as MuiPagination, Box } from '@mui/material';

const Pagination = ({ total, page, setPage }) => {
  const totalPages = Math.ceil(total / 10);

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      <MuiPagination count={totalPages} page={page} onChange={handleChange} />
    </Box>
  );
};

export default Pagination;
