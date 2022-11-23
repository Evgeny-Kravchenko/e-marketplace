import React, { ReactElement } from 'react';
import { Typography, Stack } from '@mui/material';

import { Paper } from 'shared/ui';

interface Props {
  title: string;
  children: ReactElement;
  renderAdditional?: () => ReactElement;
}

export const OrderPlacementCard = ({
  title,
  children,
  renderAdditional,
}: Props): ReactElement => {
  return (
    <Paper>
      <Stack spacing={2}>
        <Typography variant='h3' sx={{ fontSize: '2rem' }}>
          {title}
        </Typography>
        {children}
        {renderAdditional && renderAdditional()}
      </Stack>
    </Paper>
  );
};
