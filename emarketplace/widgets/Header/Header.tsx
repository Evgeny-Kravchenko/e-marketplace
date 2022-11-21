import React, { ReactElement, useMemo } from 'react';
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

import { useSignOut } from 'features/Auth/SignOut';
import { orderModel } from 'entities/order';
import { withBadge } from 'shared/hocs';
import { DropdownMenu, DropdownMenuItem } from 'shared/ui';

const CartItem = withBadge(() => (
  <HeaderNavItem
    href='/cart'
    sx={{ fontSize: '2rem', display: 'flex', alignItems: 'center' }}
  >
    Cart
  </HeaderNavItem>
));

const generateDropdownMenuItems = (
  signOut: () => Promise<undefined>
): DropdownMenuItem[] => {
  return [
    { id: 'profile', label: 'Profile', href: '/profile' },
    { id: 'orderHistory', label: 'Order History', href: '/order-history' },
    { id: 'logout', label: 'Logout', action: signOut },
  ];
};

export const Header = (): ReactElement => {
  const orderCount = orderModel.useOrderCount();
  const signOut = useSignOut();

  const { status, data: session } = useSession();

  const dropdownMenuItems = useMemo(() => {
    return generateDropdownMenuItems(signOut);
  }, [signOut]);

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
              <DropdownMenu label={session.user.name} items={dropdownMenuItems} />
            ) : (
              <HeaderNavItem href='/login'>Login</HeaderNavItem>
            )}
          </HeaderNavSections>
        </HeaderToolbar>
      </HeaderContainer>
    </HeaderAppBar>
  );
};
