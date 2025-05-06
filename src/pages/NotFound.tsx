import { Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <Container
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      <Typography variant="h1" sx={{ fontWeight: 'bold', mb: 2, fontSize: { xs: '3rem', sm: '5rem' } }}>
        404
      </Typography>
      <Typography variant="h5" sx={{ mb: 4, color: 'text.secondary' }}>
        Oops! The page you're looking for doesn't exist.
      </Typography>
      <Button
        component={Link}
        to="/"
        variant="contained"
        sx={{ borderRadius: '8px', px: 4, py: 1.5 }}
      >
        Go to Home
      </Button>
    </Container>
  );
};

export default NotFound;