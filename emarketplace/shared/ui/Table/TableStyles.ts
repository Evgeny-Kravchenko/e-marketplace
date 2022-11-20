import { styled, TableCell } from '@mui/material';

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontSize: '1.2rem',
  [theme.breakpoints.up('md')]: {
    fontSize: '1.6rem',
  },
}));
