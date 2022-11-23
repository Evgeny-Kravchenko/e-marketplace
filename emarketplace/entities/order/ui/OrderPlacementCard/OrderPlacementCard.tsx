import React, { ReactElement } from 'react';
import Link from 'next/link';
import { Typography, Link as MuiLink } from '@mui/material';

import { Paper } from 'shared/ui';

interface Props {
  title: string;
  children: ReactElement;
  href: string;
}

export const OrderPlacementCard = ({ title, children, href }: Props): ReactElement => {
  return (
    <Paper>
      <Typography variant='h3' sx={{ fontSize: '2rem' }}>
        {title}
      </Typography>
      {children}
      <MuiLink component={Link} href={href} sx={{ display: 'block', mt: 2 }}>
        Edit
      </MuiLink>
    </Paper>
  );
};
