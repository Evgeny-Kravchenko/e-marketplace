import React, { ReactElement, ComponentType } from 'react';

import { Badge, styled, badgeClasses } from '@mui/material';

const StyledBadge = styled(Badge)(() => {
  return {
    [`&.${badgeClasses.root}`]: {},
    [`& .${badgeClasses.badge}`]: {
      width: 'fit-content',
      padding: 0,
      minWidth: 20,
      height: 20,
      left: -35,
      top: '50%',
      fontSize: '1rem',
      borderRadius: '50%',
    },
  };
});

interface withBadgeProps {
  badgeValue: number | string;
}

export const withBadge = function <T>(
  Component: ComponentType<T>
): ComponentType<T & withBadgeProps> {
  return ({ badgeValue, ...rest }: T & withBadgeProps): ReactElement => {
    const restParams: unknown = { ...rest };

    return (
      <StyledBadge
        badgeContent={badgeValue}
        color='error'
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Component {...(restParams as T)} />
      </StyledBadge>
    );
  };
};
