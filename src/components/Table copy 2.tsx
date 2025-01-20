import React, { useRef } from 'react';
import { useTableData } from '../hooks/useTableData';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useTableStore } from '../store/Store';

const TableComponent = () => {
  const { data, isLoading, isFetchingNextPage, fetchNextPage } = useTableData();
  const observer = useRef<any>(null);
  const { t } = useTranslation();

  const { page, rowsPerPage, setPage, setRowsPerPage } = useTableStore();

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); 
  };

  const lastRowRef = (node: any) => {
    if (isFetchingNextPage) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchNextPage();
      }
    });
    if (node) observer.current.observe(node);
  };

  if (isLoading) return <div>Loading...</div>;

  const flattenedData = data?.pages.flat() || [];
  const paginatedData = flattenedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t('id')}</TableCell>
              <TableCell>{t('title')}</TableCell>
              <TableCell>{t('body')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((post: any, i: number) => (
              <TableRow key={post.id} ref={i === paginatedData.length - 1 ? lastRowRef : null}>
                <TableCell>{post.id}</TableCell>
                <TableCell>{post.title}</TableCell>
                <TableCell>{post.body}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={flattenedData.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25,50,100]}
      />
    </>
  );
};

export default TableComponent;
