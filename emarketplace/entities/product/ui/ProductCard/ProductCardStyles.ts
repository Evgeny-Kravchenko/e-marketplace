import { styled, Typography, Button } from '@mui/material';
import Link from 'next/link';

export const ProductCardContainer = styled(Link)(({ theme }) => ({
  height: '100%',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  boxShadow: theme.shadows[3],
  borderRadius: 5,
  overflow: 'hidden',
  color: 'initial',
  textDecoration: 'none',
  transition: '0.2s',
  '&:hover': {
    boxShadow: theme.shadows[6],
    '& img': {
      transform: 'scale(1.05)',
    },
  },
}));

export const ProductCardImageContainer = styled('div')(() => ({
  width: '100%',
  aspectRatio: '1 / 1',
  overflow: 'hidden',
  position: 'relative',
  '& img': {
    transition: '0.2s',
    objectFit: 'cover',
  },
}));

export const ProductCardInfoContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  flexGrow: 1,
  padding: theme.spacing(2),
}));

export const ProductCardName = styled(Typography)(({ theme }) => ({
  fontSize: '2.5rem',
  textAlign: 'center',
  marginBottom: theme.spacing(2),
}));

export const ProductCardDescription = styled(Typography)(({ theme }) => ({
  display: '-webkit-box',
  marginBottom: theme.spacing(2),
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  fontSize: '1.8rem',
  overflow: 'hidden',
}));

export const ProductCardPrice = styled(Typography)(({ theme }) => ({
  fontSize: '1.6rem',
  marginBottom: theme.spacing(2),
}));
