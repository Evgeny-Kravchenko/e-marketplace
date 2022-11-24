import React, { ReactElement } from 'react';
import Link from 'next/link';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export interface DropdownMenuItem {
  id: string;
  label: string;
  href?: string;
  action?: () => void;
}

interface Props {
  label: string;
  items: DropdownMenuItem[];
}

export const DropdownMenu = ({ label, items }: Props): ReactElement => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (action?: () => void) => (): void => {
    setAnchorEl(null);
    if (typeof action === 'function') {
      action();
    }
  };

  return (
    <div>
      <Button
        disableElevation
        id='basic-button'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{ fontSize: '2rem', padding: 0, textTransform: 'none', fontWeight: 400 }}
        variant='contained'
        color='primary'
      >
        {label}
      </Button>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose()}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {items.map(({ id, label, href, action }) => (
          <MenuItem
            component={href ? Link : null}
            href={href}
            key={id}
            onClick={handleClose(action)}
            sx={{ width: '100%', fontSize: '1.4rem' }}
          >
            {label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};
