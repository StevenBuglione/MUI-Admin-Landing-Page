import React, {ReactNode} from 'react';

import { styled } from '@mui/material/styles';
import MuiAppBar, { AppBarProps } from '@mui/material/AppBar';
import MuiToolbar, { ToolbarProps } from '@mui/material/Toolbar';

import { Settings } from 'src/@core/context/settingsContext';
import VerticalNavHeader from '../navigation/VerticalNavHeader';

interface Props {
  hidden: boolean;
  settings: Settings;
  toggleNavVisibility: () => void;
  saveSettings: (values: Settings) => void;
  verticalAppBarContent?: (props?: any) => ReactNode;
}

const AppBar = styled(MuiAppBar)<AppBarProps>(({ theme }) => ({
  width: '100%',
  transition: 'none',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(0, 6),
  color: theme.palette.text.primary,
  minHeight: theme.mixins.toolbar.minHeight,
  zIndex: 1400,
  display: 'flex',
  flexDirection: 'row',
  position: 'fixed'
}));

const Toolbar = styled(MuiToolbar)<ToolbarProps>(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  width: '100%',
  borderBottomLeftRadius: 10,
  borderBottomRightRadius: 10,
  padding: `${theme.spacing(0)} !important`,
  minHeight: `${theme.mixins.toolbar.minHeight}px !important`,
  transition:
    'padding .25s ease-in-out, box-shadow .25s ease-in-out, backdrop-filter .25s ease-in-out, background-color .25s ease-in-out'
}));

const LayoutAppBar = (props: Props) => {
  // ** Props
  const { verticalAppBarContent: userVerticalAppBarContent, hidden } = props;

  // @ts-ignore
  return (
    <AppBar elevation={0} color='default' className='layout-navbar' position='static'>
      <Toolbar>
        {hidden ? null :(
          <VerticalNavHeader
            {...props}
            hidden={hidden}
          />
        )}
        {(userVerticalAppBarContent && userVerticalAppBarContent(props)) || null}
      </Toolbar>
    </AppBar>
  );
};

export default LayoutAppBar;
