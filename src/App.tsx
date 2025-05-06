import { BrowserRouter as Router, Routes, Route, Link, useLocation, matchPath } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
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
} from '@mui/material';
import { Brightness4, Brightness7, Menu as MenuIcon } from '@mui/icons-material';
import { useState } from 'react';
import Home from './pages/Home';
import ExchangeRates from './pages/ExchangeRates';
import About from './pages/About';
import NotFound from './pages/NotFound';
import ErrorBoundary from './components/ErrorBoundary';
import { CurrencyProvider } from './context/CurrencyContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { lightTheme, darkTheme } from '../src/utils/theme';

// Component to throw an error for testing ErrorBoundary
const ErrorTest: React.FC = () => {
  throw new Error('Test error for ErrorBoundary');
};

// Separate component to use useTheme safely
const ThemedAppContent: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();
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
            <Toolbar>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                Loan Calculator
              </Typography>
              {isMobile ? (
                <>
                  <IconButton color="inherit" onClick={handleMenu}>
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    PaperProps={{ sx: { borderRadius: '8px' } }}
                  >
                    <MenuItem onClick={handleClose} component={Link} to="/">
                      Home
                    </MenuItem>
                    <MenuItem onClick={handleClose} component={Link} to="/exchange-rates">
                      Exchange Rates
                    </MenuItem>
                    <MenuItem onClick={handleClose} component={Link} to="/about">
                      About
                    </MenuItem>
                    <MenuItem onClick={handleClose} component={Link} to="/error">
                      Error
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <>
                  <Button color="inherit" component={Link} to="/" sx={{ mr: 1, borderRadius: '8px' }}>
                    Home
                  </Button>
                  <Button color="inherit" component={Link} to="/exchange-rates" sx={{ mr: 1, borderRadius: '8px' }}>
                    Exchange Rates
                  </Button>
                  <Button color="inherit" component={Link} to="/about" sx={{ mr: 1, borderRadius: '8px' }}>
                    About
                  </Button>
                  <Button color="inherit" component={Link} to="/error" sx={{ mr: 1, borderRadius: '8px' }}>
                    Error
                  </Button>
                </>
              )}
              <IconButton color="inherit" onClick={toggleTheme}>
                {isDarkMode ? <Brightness7 /> : <Brightness4 />}
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