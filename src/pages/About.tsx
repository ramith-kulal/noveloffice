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
          Features
        </Typography>
        <List sx={{ mb: 3 }}>
          <ListItem>
            <ListItemText primary="EMI Calculation" secondary="Calculate monthly loan payments based on loan amount, interest rate, and term." />
          </ListItem>
          <ListItem>
            <ListItemText primary="Currency Conversion" secondary="View EMI and amortization schedules in your chosen currency using real-time or dummy exchange rates." />
          </ListItem>
          <ListItem>
            <ListItemText primary="Exchange Rates" secondary="Access live exchange rates with a customizable base currency and paginated table." />
          </ListItem>
          <ListItem>
            <ListItemText primary="Dark/Light Mode" secondary="Switch between themes for a comfortable user experience." />
          </ListItem>
          <ListItem>
            <ListItemText primary="Error Handling" secondary="Robust error boundaries ensure the app remains stable." />
          </ListItem>
        </List>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Tech Stack
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Frontend" secondary="React, TypeScript, Material UI" />
          </ListItem>
          <ListItem>
            <ListItemText primary="API" secondary="ExchangeRate-API for live currency rates" />
          </ListItem>
          <ListItem>
            <ListItemText primary="State Management" secondary="React Context API" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Routing" secondary="React Router" />
          </ListItem>
        </List>
      </Box>
    </Container>
  );
};

export default About;