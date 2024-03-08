import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { IconButton } from '@mui/material';

import {
    Home as HomeIcon,
    Sailing as SailingIcon,
    Flight as PlanesIcon,
    LocalShipping as ShipmentsIcon,
    Build as MaintenancesIcon,
    Group as CrewMembersIcon,
    AccountCircle,
    Cookie as CookieIcon
  } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

interface SidebarItem{
    name: string;
    icon: React.ElementType;
    link: string;
}

export default function NavLayout() {

  const primarySidebarItems: SidebarItem[]=[
    { name: 'Startpage', icon: HomeIcon, link: '/' }, 
    { name: 'Ships', icon: SailingIcon, link: '/ships' },
    { name: 'Planes', icon: PlanesIcon, link: '/planes' }
  ]
  
  const secondarySidebarItems: SidebarItem[]=[
    { name: 'Shipments', icon: ShipmentsIcon, link: '/shipments' },
    { name: 'Maintenances', icon: MaintenancesIcon, link: '/maintenances' },
    { name: 'Crew members', icon: CrewMembersIcon, link: '/crew-members' },
  ]

  return (
    <Box sx={{ display: 'flex'}}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} color={'primary'}>
        <Toolbar>
          <CookieIcon sx={{mr: 3.5}}/>
          <Typography variant="h6" noWrap component="div" aria-label='Cracker Menu'>
            Cracker
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto', ml: 1 }}>
          <List>
            {primarySidebarItems.map((item, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton component={Link} to={item.link}>
                  <ListItemIcon>
                    <item.icon/>
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {secondarySidebarItems.map((item, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton component={Link} to={item.link}>
                  <ListItemIcon>
                    <item.icon/>
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}