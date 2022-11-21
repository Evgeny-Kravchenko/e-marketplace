import React, { ReactElement } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

import { Typography } from '@mui/material';

import {
  HeaderContainer,
  HeaderAppBar,
  HeaderToolbar,
  HeaderLogo,
  HeaderNavSections,
  HeaderNavItem,
} from './HeaderStyles';

import { orderModel } from 'entities/order';
import { withBadge } from 'shared/hocs';

const CartItem = withBadge(() => <HeaderNavItem href='/cart'>Cart</HeaderNavItem>);

export const Header = (): ReactElement => {
  const orderCount = orderModel.useOrderCount();

  const { status, data: session } = useSession();

  return (
    <HeaderAppBar position='sticky' elevation={3}>
      <HeaderContainer maxWidth='xl' disableGutters>
        <HeaderToolbar component='nav'>
          <HeaderLogo noWrap variant='h1' component={Link} href='/'>
            E-Marketplace
          </HeaderLogo>
          <HeaderNavSections>
            <CartItem badgeValue={orderCount} />
            {status === 'loading' && (
              <Typography
                variant='h5'
                sx={{ fontSize: '2rem', display: 'flex', alignItems: 'center' }}
              >
                Loading...
              </Typography>
            )}
            {session?.user && status !== 'loading' ? (
              <Typography
                variant='h5'
                sx={{ fontSize: '2rem', display: 'flex', alignItems: 'center' }}
              >
                {session.user.name}
              </Typography>
            ) : (
              <HeaderNavItem href='/login'>Login</HeaderNavItem>
            )}
          </HeaderNavSections>
        </HeaderToolbar>
      </HeaderContainer>
    </HeaderAppBar>
  );
};
