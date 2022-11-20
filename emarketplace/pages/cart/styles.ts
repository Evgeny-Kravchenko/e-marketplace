import { styled, Typography } from '@mui/material';

export const ShoppingCartPageTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  fontSize: '2.5rem',
  fontWeight: theme.typography.fontWeightMedium,
  [theme.breakpoints.up('md')]: {
    fontSize: '3rem',
  },
}));

export const ShoppingCartContentContainer = styled('div')(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(2),
  gridTemplateColumns: 'repeat(1, 1fr)',
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'repeat(4, 1fr)',
  },
}));

export const ShoppingCartTableContainer = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    gridColumn: '1 / span 3',
  },
}));

export const ShoppingCartCheckoutContainer = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    gridColumn: '4 / span',
  },
}));
