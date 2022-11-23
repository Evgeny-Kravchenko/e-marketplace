import { styled, Stack } from '@mui/material';

export const ContentContainer = styled('div')(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(2),
  gridTemplateColumns: '1fr',
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'repeat(6, 1fr)',
  },
}));

export const CardsContainer = styled(Stack)(({ theme }) => ({
  gridColumn: '1 / 2',
  [theme.breakpoints.up('md')]: {
    gridColumn: '1 / span 4',
  },
  [theme.breakpoints.up('lg')]: {
    gridColumn: '1 / span 5',
  },
}));

export const AsideContainer = styled('div')(({ theme }) => ({
  gridColumn: '1 / 2',
  [theme.breakpoints.up('md')]: {
    gridColumn: '5 / 7',
  },
  [theme.breakpoints.up('lg')]: {
    gridColumn: '6 / 7',
  },
}));
