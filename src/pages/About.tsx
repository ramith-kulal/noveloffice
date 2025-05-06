import { Container, Typography, Box, List, ListItem, ListItemText } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

const About: React.FC = () => {
  return (
    <Container sx={{ mt: 8, mb: 4 }}>
      <Typography
        variant="h4"
        sx={{ fontWeight: 'bold', mb: 4, textAlign: 'left', display: 'flex', alignItems: 'center' }}
      >
        <InfoIcon sx={{ mr: 1 }} /> About Loan Calculator
      </Typography>
      <Box sx={{ maxWidth: 800 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Purpose
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
          The Loan Calculator is a user-friendly web application designed to help users calculate loan EMIs (Equated Monthly Installments) and view amortization schedules in their preferred currency. It also provides live exchange rates to facilitate financial planning across different currencies.
        </Typography>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Project Context
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
          This application was developed as part of an assignment for Novel Office, showcasing the ability to build a modern, responsive web app with real-time data integration, intuitive UI, and robust error handling. The project demonstrates proficiency in frontend development and attention to user experience.
        </Typography>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Features
        </Typography>
        <List sx={{ mb: 3 }}>
          <ListItem>
            <ListItemText
              primary="EMI Calculation"
              secondary="Calculate monthly loan payments based on loan amount, interest rate, and term."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Currency Conversion"
              secondary="View EMI and amortization schedules in your chosen currency using real-time or dummy exchange rates."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Exchange Rates with Search"
              secondary="Access live exchange rates with a customizable base currency, paginated table, and a search bar to filter currencies."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Dark/Light Mode"
              secondary="Switch between themes with a modern navbar featuring intuitive icons and smooth transitions."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Enhanced Error Handling"
              secondary="Robust error boundaries and user-friendly error pages ensure stability and clear feedback."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Responsive Design"
              secondary="Optimized for both desktop and mobile devices with a collapsible navbar and adaptive layouts."
            />
          </ListItem>
        </List>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Tech Stack
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary="Frontend Framework"
              secondary="React with TypeScript for type-safe, component-based development."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="UI Library"
              secondary="Material UI for responsive, theme-aware components and styling."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="API Integration"
              secondary="Axios for fetching live exchange rates from ExchangeRate-API."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="State Management"
              secondary="React Context API for managing theme and currency state."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Routing"
              secondary="React Router for client-side navigation and page management."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Build Tool"
              secondary="Vite for fast development and optimized production builds."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Code Quality"
              secondary="ESLint and Prettier for consistent code style and error detection."
            />
          </ListItem>
        </List>
      </Box>
    </Container>
  );
};

export default About;