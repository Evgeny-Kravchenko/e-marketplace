import { styled } from '@mui/material/styles';
import {
  FormControl,
  FormHelperText,
  formControlClasses,
  formHelperTextClasses,
} from '@mui/material';

interface StyleProps {
  placement: 'top' | 'bottom' | 'left' | 'right';
  required?: boolean;
}

export const StyledFormControl = styled(FormControl)<StyleProps>(
  ({ theme, placement }) => {
    return {
      [`&.${formControlClasses.root}`]: {
        width: '100%',
        justifyContent: 'space-between',
        gap: theme.spacing(1),
        lineHeight: 1,
        flexDirection: placement === 'right' || placement === 'left' ? 'row' : 'column',
      },
      '& label': {
        width: 'fit-content',
        fontSize: '1.4rem',
        opacity: 0.6,
        cursor: 'pointer',
        order: ({ placement }: StyleProps) => {
          if (placement === 'top' || placement === 'left') {
            return 1;
          }
          return 2;
        },
      },
      '& .MuiOutlinedInput-notchedOutline': {
        top: 0,
        borderRadius: 0,
        '& legend': {
          display: 'none',
          transition: 'none',
        },
      },
      '&>div': {
        flexGrow: 1,
        order: ({ placement }: StyleProps) => {
          if (placement === 'top' || placement === 'left') {
            return 2;
          }
          return 1;
        },
      },
      '& .MuiInputBase-root': {
        width: '100%',
      },
    };
  }
);

export const StyledHelperText = styled(FormHelperText)(({ theme }) => ({
  [`&.${formHelperTextClasses.root}`]: {
    fontSize: '1.4rem',
    order: 2,
  },
  [`&.${formHelperTextClasses.error}`]: {
    color: theme.palette.error.main,
  },
}));
