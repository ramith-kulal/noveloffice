import { Component, ReactNode } from 'react';
import { Container, Typography, Button, Box, Alert } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage: string | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false, errorMessage: null };

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, errorMessage: error.message };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, errorMessage: null });
    window.location.href = '/';
  };

  handleRetry = () => {
    this.setState({ hasError: false, errorMessage: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <Container sx={{ mt: 8, textAlign: 'center', py: 4 }}>
          <ErrorIcon color="error" sx={{ fontSize: 80, mb: 2 }} />
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
            Oops! Something Went Wrong
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
            An unexpected error occurred. Please try again or return to the homepage.
          </Typography>
          {process.env.NODE_ENV === 'development' && this.state.errorMessage && (
            <Alert severity="error" sx={{ mb: 3, mx: 'auto', maxWidth: 600 }}>
              Debug: {this.state.errorMessage}
            </Alert>
          )}
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button
              variant="contained"
              onClick={this.handleRetry}
              sx={{ borderRadius: '8px', px: 4 }}
            >
              Retry
            </Button>
            <Button
              variant="outlined"
              onClick={this.handleReset}
              sx={{ borderRadius: '8px', px: 4 }}
            >
              Go to Homepage
            </Button>
          </Box>
        </Container>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;