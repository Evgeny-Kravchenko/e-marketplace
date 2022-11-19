import React, { ReactElement } from 'react';
import Link from 'next/link';

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

  return (
    <HeaderAppBar position='sticky' elevation={3}>
      <HeaderContainer maxWidth='xl' disableGutters>
        <HeaderToolbar component='nav'>
          <HeaderLogo noWrap variant='h1' component={Link} href='/'>
            E-Marketplace
          </HeaderLogo>
          <HeaderNavSections>
            <CartItem badgeValue={orderCount} />

            <HeaderNavItem href='/login'>Login</HeaderNavItem>
          </HeaderNavSections>
        </HeaderToolbar>
      </HeaderContainer>
    </HeaderAppBar>
  );
};
