import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import InfoIcon from '@mui/icons-material/Info';
import ErrorIcon from '@mui/icons-material/Error';
import { Link } from 'react-router-dom';

interface NavItem {
  text: string;
  path: string;
  icon: React.ReactNode;
}

const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems: NavItem[] = [
    { text: 'Home', path: '/', icon: <HomeIcon /> },
    { text: 'Exchange Rates', path: '/exchange-rates', icon: <CurrencyExchangeIcon /> },
    { text: 'About', path: '/about', icon: <InfoIcon /> },
    { text: 'Error', path: '/error', icon: <ErrorIcon /> },
  ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Loan Calculator
      </Typography>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.text} component={Link} to={item.path}>
            {item.icon}
            <ListItemText primary={item.text} sx={{ ml: 1 }} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Loan Calculator
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Button
                key={item.text}
                color="inherit"
                component={Link}
                to={item.path}
                startIcon={item.icon}
              >
                {item.text}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box sx={{ height: '64px' }} /> {/* Spacer for fixed AppBar */}
    </Box>
  );
};

export default Navbar;