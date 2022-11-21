import { OutlinedInput, outlinedInputClasses, styled } from '@mui/material';

export const StyledInput = styled(OutlinedInput)(({ theme }) => ({
  [`.${outlinedInputClasses.root}`]: {
    width: '100%',
    backgroundColor: theme.palette.primary.light,
    borderRadius: 0,
    '&.MuiInputBase-root.Mui-disabled': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  [` .${outlinedInputClasses.input}`]: {
    height: 40,
    paddingLeft: theme.spacing(2),
    boxSizing: 'border-box',
    borderRadius: 0,
    fontSize: '1.4rem',
    '&::placeholder': {
      fontSize: '1.4rem',
    },
    '&:-webkit-autofill': {
      transitionDelay: '9999s',
      transitionProperty: 'background-color',
      boxShadow: 'none',
    },
  },
}));
