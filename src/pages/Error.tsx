import { Container, Typography } from '@mui/material';

const Error: React.FC = () => {
  return (
    <Container>
      <Typography variant="h4">Error</Typography>
      <Typography>Something went wrong!</Typography>
    </Container>
  );
};

export default Error;