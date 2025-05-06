import { Container, Typography } from '@mui/material';

const NotFound: React.FC = () => {
  return (
    <Container>
      <Typography variant="h4">404 - Not Found</Typography>
      <Typography>Page not found!</Typography>
    </Container>
  );
};

export default NotFound;