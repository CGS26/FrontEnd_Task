import React, { useRef, useState } from 'react';
import { useTableData } from '../hooks/useTableData';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
  
  FormControlLabel,
  Checkbox,
  Button,
  Menu,
  MenuItem,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@mui/styles';

type ColumnKey = 'id' | 'title' | 'body';

const useStyles = makeStyles({
  tableContainer: {
    overflowY: 'auto',
    marginTop: '20px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', 
  },
  tableCell: {
    padding: '16px',
    fontSize: '14px',
    fontWeight: '500',
    borderBottom: '1px solid #ddd', 
    textAlign: 'left',
  },
  headerCell: {
    fontWeight: '700',
    backgroundColor: '#f5f5f5',
    color: '#333',
    fontSize: '16px',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  loadingWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    flexDirection: 'column',
  },
  loader: {
    marginRight: '10px',
  },
  searchWrapper: {
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchInput: {
    marginRight: '20px',
    width: '300px',
  },
  columnMenuButton: {
    padding: '8px 16px',
    // backgroundColor: '#1976d2',
    color: '#1976d2',
    
    marginLeft: 'auto',  
  },
  columnMenu: {
    minWidth: '200px',
  },
});

const TableComponent = () => {
  const classes = useStyles();
  const { data, isLoading, isFetchingNextPage, fetchNextPage } = useTableData();
  const observer = useRef<any>(null);
  const { t } = useTranslation();

  const [columns, setColumns] = useState({
    id: true,
    title: true,
    body: true,
  });
  const [columnMenuAnchor, setColumnMenuAnchor] = useState<null | HTMLElement>(null);

 
  const toggleColumnVisibility = (column: ColumnKey) => {
    setColumns((prev) => ({ ...prev, [column]: !prev[column] }));
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



  if (isLoading) {
    return (
      <div className={classes.loadingWrapper}>
        <CircularProgress size={50} className={classes.loader} />
        <Typography variant="h6">{t('loading')}</Typography>
      </div>
    );
  }

  return (
    <div>
      <div className={classes.searchWrapper}>
    
        <Button
          aria-controls="column-menu"
          aria-haspopup="true"
          onClick={(e) => setColumnMenuAnchor(e.currentTarget)}
          className={classes.columnMenuButton}
        >
          {t('columns')}
        </Button>
        <Menu
          id="column-menu"
          anchorEl={columnMenuAnchor}
          open={Boolean(columnMenuAnchor)}
          onClose={() => setColumnMenuAnchor(null)}
          className={classes.columnMenu}
        >
          {['id', 'title', 'body'].map((col) => (
            <MenuItem key={col}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={columns[col as ColumnKey]} 
                    onChange={() => toggleColumnVisibility(col as ColumnKey)} 
                    color="primary"
                  />
                }
                label={t(col)}
              />
            </MenuItem>
          ))}
        </Menu>
      </div>

      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.id && <TableCell className={`${classes.tableCell} ${classes.headerCell}`}>{t('id')}</TableCell>}
              {columns.title && <TableCell className={`${classes.tableCell} ${classes.headerCell}`}>{t('title')}</TableCell>}
              {columns.body && <TableCell className={`${classes.tableCell} ${classes.headerCell}`}>{t('body')}</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
       
                   {data?.pages.map((page, index) => (
           <React.Fragment key={index}>
               {page.map((post: any, i: number) => (
                 <TableRow key={post.id} ref={i === page.length - 1 ? lastRowRef : null}>
                  <TableCell>{post.id}</TableCell>
                   <TableCell>{post.title}</TableCell>
                   <TableCell>{post.body}</TableCell>
                 </TableRow>))}
                 </React.Fragment> ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TableComponent;
