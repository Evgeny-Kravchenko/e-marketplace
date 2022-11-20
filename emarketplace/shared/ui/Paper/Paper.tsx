import { styled, Paper as MuiPaper } from '@mui/material';
import { ReactElement } from 'react';

const StyledPaper = styled(MuiPaper)(({ theme }) => ({
  height: 'fit-content',
  padding: theme.spacing(2),
})) as typeof MuiPaper;

interface Props {
  children: ReactElement | ReactElement[];
}

export const Paper = ({ children }: Props): ReactElement => {
  return (
    <StyledPaper component='section' elevation={3}>
      {children}
    </StyledPaper>
  );
};
