import { styled, Typography } from '@mui/material';

export const StyledPageTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  fontSize: '2.5rem',
  fontWeight: theme.typography.fontWeightMedium,
  [theme.breakpoints.up('md')]: {
    fontSize: '3rem',
  },
}));
