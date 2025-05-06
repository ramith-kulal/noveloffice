import { BrowserRouter as Router, Routes, Route, Link, useLocation, matchPath } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider, useTheme } from '@mui/material/styles';
import {
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Box,
  Menu,
  MenuItem,
  useMediaQuery,
  styled,
} from '@mui/material';
import {
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  Menu as MenuIcon,
  Home as HomeIcon,
  CurrencyExchange as CurrencyExchangeIcon,
  Info as InfoIcon,
  ErrorOutline as ErrorOutlineIcon,
} from '@mui/icons-material';
import { useState } from 'react';
import Home from './pages/Home';
import ExchangeRates from './pages/ExchangeRates';
import About from './pages/About';
import NotFound from './pages/NotFound';
import ErrorBoundary from './components/ErrorBoundary';
import { CurrencyProvider } from './context/CurrencyContext';
import { ThemeProvider, useTheme as useCustomTheme } from './context/ThemeContext';
import { lightTheme, darkTheme } from '../src/utils/theme';
import type { MenuItemProps, ButtonProps } from '@mui/material';

// Extend MenuItemProps for NavMenuItem
interface NavMenuItemProps extends MenuItemProps {
  component?: React.ElementType;
  to?: string;
}

// Extend ButtonProps for NavButton
interface NavButtonProps extends ButtonProps {
  component?: React.ElementType;
  to?: string;
}

// Styled MenuItem for mobile menu
const NavMenuItem = styled(MenuItem)<NavMenuItemProps>(({ theme }) => ({
  color: theme.palette.text.primary,
  padding: '12px 24px',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
    transform: 'translateX(5px)',
  },
}));

// Styled Button for navbar with hover animation
const NavButton = styled(Button)<NavButtonProps>(({ theme }) => ({
  color: '#ffffff',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  borderRadius: '12px',
  padding: '8px 16px',
  marginRight: theme.spacing(1),
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
    transform: 'scale(1.05)',
    boxShadow: `0 4px 12px ${theme.palette.primary.main}33`,
  },
  [theme.breakpoints.down('sm')]: {
    padding: '6px 12px',
  },
}));

// Component to throw an error for testing ErrorBoundary
const ErrorTest: React.FC = () => {
  throw new Error('Test error for ErrorBoundary');
};

// Separate component to use useTheme safely
const ThemedAppContent: React.FC = () => {
  const { isDarkMode, toggleTheme } = useCustomTheme();
  const muiTheme = useTheme();
  const isMobile = useMediaQuery('(max-width:600px)');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const location = useLocation();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Hide navbar on /404 and unmatched routes
  const validRoutes = ['/', '/exchange-rates', '/about', '/error'];
  const isValidRoute = validRoutes.some((route) =>
    matchPath({ path: route, end: true }, location.pathname)
  );
  const showNavbar = isValidRoute;

  return (
    <MuiThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <ErrorBoundary>
        {showNavbar && (
          <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar sx={{ py: 1, paddingTop: '12px' }}>
              <Typography
                variant="h6"
                sx={{
                  flexGrow: 1,
                  fontWeight: 'bold',
                  letterSpacing: '0.5px',
                  color: '#ffffff',
                }}
              >
                Loan Calculator
              </Typography>
              {isMobile ? (
                <>
                  <IconButton color="inherit" onClick={handleMenu}>
                    <MenuIcon sx={{ color: '#ffffff' }} />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                      sx: {
                        borderRadius: '12px',
                        backgroundColor: isDarkMode
                          ? 'rgba(30, 30, 30, 0.95)'
                          : 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(8px)',
                      },
                    }}
                  >
                    <NavMenuItem onClick={handleClose} component={Link} to="/">
                      <HomeIcon sx={{ mr: 1 }} /> Home
                    </NavMenuItem>
                    <NavMenuItem onClick={handleClose} component={Link} to="/exchange-rates">
                      <CurrencyExchangeIcon sx={{ mr: 1 }} /> Exchange Rates
                    </NavMenuItem>
                    <NavMenuItem onClick={handleClose} component={Link} to="/about">
                      <InfoIcon sx={{ mr: 1 }} /> About
                    </NavMenuItem>
                    <NavMenuItem onClick={handleClose} component={Link} to="/error">
                      <ErrorOutlineIcon sx={{ mr: 1 }} /> Error
                    </NavMenuItem>
                  </Menu>
                </>
              ) : (
                <>
                  <NavButton component={Link} to="/" startIcon={<HomeIcon />}>
                    Home
                  </NavButton>
                  <NavButton component={Link} to="/exchange-rates" startIcon={<CurrencyExchangeIcon />}>
                    Exchange Rates
                  </NavButton>
                  <NavButton component={Link} to="/about" startIcon={<InfoIcon />}>
                    About
                  </NavButton>
                  <NavButton component={Link} to="/error" startIcon={<ErrorOutlineIcon />}>
                    Error
                  </NavButton>
                </>
              )}
              <IconButton
                sx={{
                  color: '#ffffff',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '50%',
                  p: 1,
                  '&:hover': {
                    backgroundColor: muiTheme.palette.primary.light,
                    transform: 'rotate(15deg)',
                  },
                  transition: 'all 0.3s ease'
                }}
                onClick={toggleTheme}
              >
                {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
            </Toolbar>
          </AppBar>
        )}
        <Box sx={{ mt: showNavbar ? 8 : 0 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/exchange-rates" element={<ExchangeRates />} />
            <Route path="/about" element={<About />} />
            <Route path="/error" element={<ErrorTest />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Box>
      </ErrorBoundary>
    </MuiThemeProvider>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <CurrencyProvider>
        <Router>
          <ThemedAppContent />
        </Router>
      </CurrencyProvider>
    </ThemeProvider>
  );
};

export default App;