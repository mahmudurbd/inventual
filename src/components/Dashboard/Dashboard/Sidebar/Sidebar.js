import * as React from 'react';
import './Sidebar.scss';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import RedeemSharpIcon from '@mui/icons-material/RedeemSharp';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import SellIcon from '@mui/icons-material/Sell';
import BarChartIcon from '@mui/icons-material/BarChart';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../../hooks/useAuth';


const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
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

export default function Sidebar() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const{user,logOut} = useAuth();
  let navigate = useNavigate();

  const handleLogOut = () => {
    logOut()
    .then(() => {
    navigate('/');
      
  })
  }
  
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline/>
      <AppBar position="fixed" open={open} sx={{marginBottom: '50px'}}>
        <Toolbar>
          <IconButton className='menu-icon'
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon/>
          </IconButton>
          <Typography className='dashboard-logo' variant="h6"  component="div">
            INVENTUAL DASHBOARD
            </Typography>
            <PersonIcon className='user-icon'/>
            {user.email && <span className='user-name'>{user.displayName}</span>}
            
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItemButton sx={{fontSize: '16px',padding: '8px 20px',fontWeight: '600'}}>
            <ListItemIcon>
                <DashboardIcon sx={{color: '#508CFC'}} />
            </ListItemIcon>
            Dashboard
          </ListItemButton>
          <ListItemButton sx={{fontSize: '16px',padding: '8px 20px',fontWeight: '600'}}>
            <ListItemIcon>
                <RedeemSharpIcon sx={{color: '#508CFC'}} />
            </ListItemIcon>
            Products
          </ListItemButton>
        </List>
        <Divider />
        <List>
          <ListItemButton sx={{fontSize: '16px',padding: '8px 20px',fontWeight: '600'}}>
            <ListItemIcon>
                <AutoGraphIcon sx={{color: '#508CFC'}} />
            </ListItemIcon>
            Analytics
          </ListItemButton>
          <ListItemButton sx={{fontSize: '16px',padding: '8px 20px',fontWeight: '600'}}>
            <ListItemIcon>
                <SellIcon sx={{color: '#508CFC'}} />
            </ListItemIcon>
            Sales
          </ListItemButton>
          <ListItemButton sx={{fontSize: '16px',padding: '8px 20px',fontWeight: '600'}}>
            <ListItemIcon>
                <BarChartIcon sx={{color: '#508CFC'}} />
            </ListItemIcon>
            Reports
          </ListItemButton>
        </List>
        <Divider />
        <List>
          <ListItemButton sx={{fontSize: '16px',padding: '8px 20px',fontWeight: '600'}}>
            <ListItemIcon>
                <ContactMailIcon sx={{color: '#508CFC'}} />
            </ListItemIcon>
            Mail
          </ListItemButton>
          <ListItemButton sx={{fontSize: '16px',padding: '8px 20px',fontWeight: '600'}}>
            <ListItemIcon>
                <DynamicFeedIcon sx={{color: '#508CFC'}} />
            </ListItemIcon>
            Feedback
          </ListItemButton>
          <ListItemButton sx={{fontSize: '16px',padding: '8px 20px',fontWeight: '600'}}>
            <ListItemIcon>
                <ChatBubbleIcon sx={{color: '#508CFC'}} />
            </ListItemIcon>
            Message
          </ListItemButton>
        </List>
        <Divider />
        <List>
          <ListItemButton onClick={handleLogOut} sx={{fontSize: '16px',padding: '8px 20px',fontWeight: '600'}}>
            <ListItemIcon>
                <LogoutIcon sx={{color: '#508CFC'}} />
            </ListItemIcon>
            Log Out
          </ListItemButton>
        </List>
      </Drawer>
      
    </Box>
  );
}
