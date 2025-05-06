import { Container, Typography, Button, Box } from '@mui/material';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';
import { Fade } from '@mui/material';

const NotFound: React.FC = () => {
  return (
    <Fade in timeout={800}>
      <Container
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          py: 4,
        }}
      >
        <SentimentDissatisfiedIcon
          color="error"
          sx={{ fontSize: { xs: 80, md: 120 }, mb: 2 }}
        />
        <Typography
          variant="h1"
          sx={{
            fontWeight: 'bold',
            fontSize: { xs: '3rem', md: '6rem' },
            color: 'text.primary',
            mb: 1,
          }}
        >
          404
        </Typography>
        <Typography
          variant="h5"
          sx={{
            color: 'text.secondary',
            mb: 4,
            maxWidth: 600,
            px: 2,
          }}
        >
          Oops! The page you're looking for doesn't exist or has been moved.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<HomeIcon />}
          component={Link}
          to="/"
          sx={{
            borderRadius: '8px',
            px: 4,
            py: 1.5,
            fontSize: '1.1rem',
            textTransform: 'none',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            '&:hover': {
              boxShadow: '0 6px 16px rgba(0,0,0,0.3)',
              transform: 'translateY(-2px)',
            },
            transition: 'all 0.3s ease',
          }}
        >
          Go Home
        </Button>
      </Container>
    </Fade>
  );
};

export default NotFound;