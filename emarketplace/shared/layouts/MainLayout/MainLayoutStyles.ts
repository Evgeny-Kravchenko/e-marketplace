import { styled, Container } from '@mui/material';

export const LayoutContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  minHeight: '100vh',
}));

export const LayoutHeaderContainer = styled('div')(() => ({}));

export const LayoutContentContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
})) as typeof Container;

export const LayoutFooterContainer = styled('div')(({ theme }) => ({
  boxShadow: '0px -5px 6px -2px rgba(34, 60, 80, 0.2)',
}));
