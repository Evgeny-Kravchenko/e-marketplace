import { styled, Link as MuiLink, List, ListItem, ListItemText } from '@mui/material';

export const ProductDetailsContainer = styled('main')(() => ({}));

export const ProductDetailsLink = styled(MuiLink)(({ theme }) => ({
  display: 'block',
  marginBottom: theme.spacing(2),
}));

export const ProductDetailsContent = styled('div')(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(2),
  gridTemplateColumns: '1fr',
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: '2fr 1fr',
  },
  [theme.breakpoints.up('lg')]: {
    gridTemplateColumns: '2fr 1fr 1fr',
  },
}));

export const ProductDetailsImageContainer = styled('figure')(({ theme }) => ({
  position: 'relative',
  height: 300,
  margin: 0,
  '& img': {
    objectFit: 'cover',
    objectPosition: 'center center',
  },
  [theme.breakpoints.up('md')]: {
    height: 400,
  },
  [theme.breakpoints.up('lg')]: {
    height: 500,
  },
}));

export const ProductDetailsInfoContainer = styled(List)(() => ({}));

export const ProductDetailsInfoItem = styled(ListItem)(({ theme }) => ({
  gap: theme.spacing(2),
}));

export const ProductDetailsInfoItemText = styled(ListItemText)(({ theme }) => ({
  '& .MuiTypography-root': {
    fontSize: '1.6rem',
    fontWeight: theme.typography.fontWeightMedium,
    [theme.breakpoints.up('md')]: {
      fontSize: '1.8rem',
    },
  },
}));
