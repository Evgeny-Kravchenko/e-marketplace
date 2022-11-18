import { styled, Container, AppBar, Toolbar, Typography } from '@mui/material';
import Link from 'next/link';

export const HeaderContainer = styled(Container)(() => ({}));

export const HeaderAppBar = styled(AppBar)(() => ({}));

export const HeaderToolbar = styled(Toolbar)(() => ({
  justifyContent: 'space-between',
})) as typeof Toolbar;

export const HeaderLogo = styled(Typography)(({ theme }) => ({
  marginRight: 2,
  fontWeight: 700,
  letterSpacing: '.2rem',
  color: theme.palette.primary.contrastText,
  textDecoration: 'none',
  fontSize: '2.5rem',
  [theme.breakpoints.up('md')]: {
    fontSize: '3rem',
  },
})) as typeof Typography;

export const HeaderNavSections = styled('div')(() => ({
  display: 'flex',
  gap: '1rem',
}));

export const HeaderNavItem = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  textDecoration: 'none',
  fontSize: '1.8rem',
  [theme.breakpoints.up('md')]: {
    fontSize: '2rem',
  },
}));
