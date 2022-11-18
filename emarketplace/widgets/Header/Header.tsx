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

export const Header = (): ReactElement => {
  return (
    <HeaderAppBar position='sticky' elevation={3}>
      <HeaderContainer maxWidth='xl' disableGutters>
        <HeaderToolbar component='nav'>
          <HeaderLogo noWrap variant='h1' component={Link} href='/'>
            E-Marketplace
          </HeaderLogo>
          <HeaderNavSections>
            <HeaderNavItem href='/cart'>Cart</HeaderNavItem>
            <HeaderNavItem href='/login'>Login</HeaderNavItem>
          </HeaderNavSections>
        </HeaderToolbar>
      </HeaderContainer>
    </HeaderAppBar>
  );
};
