import Box from '@mui/material/Box';
import NavLayout from "./NavLayout.tsx";
import { Outlet } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';

export default function MainLayout() {
  return (
    <Box sx={{ display: 'flex' }}>
      <NavLayout />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}