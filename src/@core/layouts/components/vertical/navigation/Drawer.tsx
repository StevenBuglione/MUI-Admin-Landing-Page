import * as React from 'react';
import { styled,  Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import KeyboardDoubleArrowRight from '@mui/icons-material/KeyboardDoubleArrowRight';
import IconButton from '@mui/material/IconButton';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';


// ** Type Import
import {Settings} from 'src/@core/context/settingsContext'
import {NavLink} from "../../../types";

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
  width: `calc(${theme.spacing(7)} + 25px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 25px)`,
  },
});


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
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

export default function MiniDrawer(props: Props) {
  const {  children} = props

  const [open, setOpen] = React.useState(false);

  const handleDrawer = () => {
    if(open == true){
      setOpen(false)
    }else{
      setOpen(true)
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer variant="permanent" open={open}>
        {children}
        <IconButton
          key='close'
          aria-label='Close drawer'
          color='primary'
          onClick={() => handleDrawer()}
        >
          {open ? <KeyboardDoubleArrowRight /> : <KeyboardDoubleArrowLeftIcon />}
        </IconButton>
      </Drawer>
    </Box>
  );
}

