import React, { Component, ErrorInfo } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { ErrorOutline as ErrorIcon, Refresh as RefreshIcon } from '@mui/icons-material';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null, errorInfo: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[ErrorBoundary]', error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <Box sx={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', minHeight: '50vh', textAlign: 'center', p: 4,
        }}>
          <Box sx={{
            width: 80, height: 80, borderRadius: '50%',
            background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3,
          }}>
            <ErrorIcon sx={{ color: '#fff', fontSize: 40 }} />
          </Box>

          <Typography variant="h5" fontWeight={700} color="#2c3e50" gutterBottom>
            Something went wrong
          </Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 400, mb: 3, lineHeight: 1.6 }}>
            An unexpected error occurred. Don't worry — your data is safe. Try refreshing the page.
          </Typography>

          {process.env.NODE_ENV === 'development' && this.state.error && (
            <Box sx={{
              background: '#fff3f3', border: '1px solid #ffcdd2', borderRadius: '12px',
              p: 2, mb: 3, maxWidth: 500, textAlign: 'left', overflow: 'auto',
            }}>
              <Typography variant="caption" color="error" sx={{ fontFamily: 'monospace', display: 'block' }}>
                {this.state.error.toString()}
              </Typography>
            </Box>
          )}

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              startIcon={<RefreshIcon />}
              onClick={() => window.location.reload()}
              sx={{
                background: 'linear-gradient(135deg, #1D7A8C, #146371)',
                borderRadius: '25px', px: 3, py: 1.2,
                textTransform: 'none', fontWeight: 600,
                '&:hover': { background: 'linear-gradient(135deg, #146371, #0f4f5c)' },
              }}
            >
              Refresh Page
            </Button>
            <Button
              variant="outlined"
              onClick={() => { window.location.href = '/'; }}
              sx={{
                borderRadius: '25px', px: 3, py: 1.2,
                textTransform: 'none', fontWeight: 600,
                borderColor: '#1D7A8C', color: '#1D7A8C',
                '&:hover': { borderColor: '#146371', bgcolor: '#f0f8fa' },
              }}
            >
              Go Home
            </Button>
          </Box>
        </Box>
      );
    }
    return this.props.children;
  }
}

// ─── Functional wrapper for inline error display ───────────────────────────────
export const ErrorMessage: React.FC<{ message: string; onRetry?: () => void }> = ({ message, onRetry }) => (
  <Box sx={{
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    py: 4, gap: 2, textAlign: 'center',
  }}>
    <ErrorIcon sx={{ color: '#f44336', fontSize: 48 }} />
    <Typography color="text.secondary">{message}</Typography>
    {onRetry && (
      <Button
        variant="outlined" size="small" onClick={onRetry} startIcon={<RefreshIcon />}
        sx={{
          borderRadius: '20px', textTransform: 'none',
          borderColor: '#1D7A8C', color: '#1D7A8C',
          '&:hover': { bgcolor: '#f0f8fa' },
        }}
      >
        Try Again
      </Button>
    )}
  </Box>
);

export default ErrorBoundary;
