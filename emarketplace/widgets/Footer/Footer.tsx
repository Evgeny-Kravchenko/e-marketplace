import React, { ReactElement } from 'react';

import { Typography } from '@mui/material';

import { FooterContainer, FooterContent } from './FooterStyles';

export const Footer = (): ReactElement => {
  return (
    <FooterContainer>
      <FooterContent maxWidth='xl'>
        <Typography variant='body2' align='center' color='primary.contrastText'>
          Copyright © 2022 E-Markeplace
        </Typography>
      </FooterContent>
    </FooterContainer>
  );
};
