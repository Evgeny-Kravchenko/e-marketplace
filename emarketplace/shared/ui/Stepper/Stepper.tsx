import React, { ReactElement } from 'react';

import {
  Stepper as MuiStepper,
  Step,
  StepLabel,
  StepIconProps,
  Box,
} from '@mui/material';
import Check from '@mui/icons-material/Check';

import { QontoConnector, QontoStepIconRoot } from './StepperStyles';

interface Props {
  activeStep: number;
  steps: string[];
}

export function QontoStepIcon(props: StepIconProps): ReactElement {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check
          sx={{
            color: (theme) => (active || completed ? '#784af4' : theme.palette.grey[500]),
          }}
        />
      ) : (
        <Box
          sx={{
            width: 7,
            height: 7,
            borderRadius: '50%',
            background: (theme) => (active ? '#784af4' : theme.palette.grey[500]),
          }}
        />
      )}
    </QontoStepIconRoot>
  );
}

export const Stepper = ({ activeStep, steps }: Props): ReactElement => {
  return (
    <MuiStepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />}>
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel
            StepIconComponent={QontoStepIcon}
            sx={{ '& .MuiStepLabel-label': { fontSize: '1.4rem' } }}
          >
            {label}
          </StepLabel>
        </Step>
      ))}
    </MuiStepper>
  );
};
