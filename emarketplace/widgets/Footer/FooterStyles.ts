import { styled, Container } from '@mui/system';

export const FooterContainer = styled('footer')(({ theme }) => ({
  padding: `${theme.spacing(1)} 0`,
  backgroundColor: theme.palette.primary.light,
}));

export const FooterContent = styled(Container)(() => ({})) as typeof Container;
