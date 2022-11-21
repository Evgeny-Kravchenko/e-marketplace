import React, { ReactElement } from 'react';

import { StyledPageTitle } from './PageTitleStyles';

interface Props {
  children: string;
}

export const PageTitle = ({ children }: Props): ReactElement => {
  return <StyledPageTitle variant='h1'>{children}</StyledPageTitle>;
};
