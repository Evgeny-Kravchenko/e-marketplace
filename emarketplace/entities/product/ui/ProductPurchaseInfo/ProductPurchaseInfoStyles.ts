import { styled, Paper, List, ListItem, ListItemText } from '@mui/material';

export const ProductPurchaseInfoContainer = styled(Paper)(({ theme }) => ({
  height: 'fit-content',
  padding: theme.spacing(2),
})) as typeof Paper;

export const ProductPurchaseInfoList = styled(List)(({ theme }) => ({
  padding: 0,
}));

export const ProductPurchaseInfoItem = styled(ListItem)(({ theme }) => ({
  padding: 0,
}));

export const ProductPurchaseInfoItemText = styled(ListItemText)(({ theme }) => ({
  '& .MuiTypography-root': {
    fontSize: '1.8rem',
    fontWeight: theme.typography.fontWeightMedium,
  },
  '&:nth-child(2) .MuiTypography-root': {
    textAlign: 'right',
  },
}));
