import * as React from 'react';
import {styled, CSSObject, Theme, useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiSwipeableDrawer, {SwipeableDrawerProps} from '@mui/material/SwipeableDrawer'
import KeyboardDoubleArrowRight from '@mui/icons-material/KeyboardDoubleArrowRight';
import IconButton from '@mui/material/IconButton';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import MuiDrawer from '@mui/material/Drawer';

// ** Type Import
import {Settings} from 'src/@core/context/settingsContext'
import {NavLink} from "../../../types";
import VerticalNavHeader from "../appBar/AppHeader";

interface Props {
  hidden: boolean
  navWidth: number
  settings: Settings
  navVisible: boolean
  children: NavLink
  setNavVisible: (value: boolean) => void
  saveSettings: (values: Settings) => void
}


const drawerWidth = 250;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 23px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 23px)`,
  },
});


const SwipeableDrawerDesktop = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    overflowX: 'hidden',
    transition: 'width .25s ease-in-out',
    '& ul': {
      listStyle: 'none'
    },
    '& .MuiListItem-gutters': {
      paddingLeft: 4,
      paddingRight: 4
    },
    '& .MuiDrawer-paper': {
      left: 'unset',
      right: 'unset',
      overflowX: 'hidden',
      transition: 'width .25s ease-in-out, box-shadow .25s ease-in-out'
    },
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const SwipeableDrawerMobile = styled(MuiSwipeableDrawer)<SwipeableDrawerProps>({
  overflowX: 'hidden',
  transition: 'width .25s ease-in-out',
  '& ul': {
    listStyle: 'none'
  },
  '& .MuiListItem-gutters': {
    paddingLeft: 4,
    paddingRight: 4
  },
  '& .MuiDrawer-paper': {
    left: 'unset',
    right: 'unset',
    overflowX: 'hidden',
    transition: 'width .25s ease-in-out, box-shadow .25s ease-in-out'
  }
})



export default function MiniDrawer(props: Props) {
  // ** Props
  const { hidden, children, navWidth, navVisible, setNavVisible } = props

  // ** Hook
  const theme = useTheme()
  const [open, setOpen] = React.useState(false);

  const handleDrawer = () => {
    setOpen(!open);
    setNavVisible(!navVisible);
  };

  // Drawer Props for Mobile & Tablet screens
  const MobileDrawer = () => (
    <SwipeableDrawerMobile
      open={navVisible}
      onOpen={() => setNavVisible(true)}
      onClose={() => setNavVisible(false)}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      sx={{
        width: navWidth,
        '& .MuiDrawer-paper': {
          borderRight: 0
        }
      }}
    >
      <Box display="flex" alignItems="center">
        <IconButton
          key='open'
          aria-label='Open drawer'
          color='primary'
          onClick={() => handleDrawer()}
        >
          {open ? <KeyboardDoubleArrowRight /> : <KeyboardDoubleArrowLeftIcon />}
        </IconButton>
        <VerticalNavHeader toggleNavVisibility={function (): void {
          throw new Error('Function not implemented.');
        }} {...props} />
      </Box>
      {children}
    </SwipeableDrawerMobile>
  )

  // Drawer Props for Desktop screens
  const DesktopDrawer = () => (
    <SwipeableDrawerDesktop
      className='layout-vertical-nav'
      variant={hidden ? 'temporary' : 'permanent'}
      open={open}
      PaperProps={{ sx: { width: navWidth } }}
      sx={{
        width: navWidth,
        '& .MuiDrawer-paper': {
          borderRight: 0,
          backgroundColor: theme.palette.background.default
        }
      }}
    >
      {children}
      <Box display="flex" justifyContent="flex-end">
        <IconButton
          key='close'
          aria-label='Close drawer'
          color='primary'
          onClick={() => handleDrawer()}
        >
          {open ? <KeyboardDoubleArrowLeftIcon /> : <KeyboardDoubleArrowRight />}
        </IconButton>
      </Box>
    </SwipeableDrawerDesktop>
  )

  return (
    <Box sx={{ display: 'flex' }}>
      {!hidden ? <DesktopDrawer /> : <MobileDrawer />}
    </Box>
  );
}
