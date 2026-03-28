import React from 'react';
import { Skeleton, Box, Card, CardContent, Grid } from '@mui/material';

// ─── Table row skeleton ───────────────────────────────────────────────────────
export const TableRowSkeleton: React.FC<{ rows?: number; cols?: number }> = ({ rows = 5, cols = 5 }) => (
  <>
    {Array.from({ length: rows }).map((_, i) => (
      <Box key={i} sx={{ display: 'flex', gap: 2, p: '14px 16px', borderBottom: '1px solid #f0f0f0', alignItems: 'center' }}>
        <Skeleton variant="circular" width={42} height={42} sx={{ flexShrink: 0 }} />
        {Array.from({ length: cols - 1 }).map((__, j) => (
          <Skeleton key={j} variant="text" sx={{ flex: 1, height: 22, borderRadius: '6px' }} />
        ))}
      </Box>
    ))}
  </>
);

// ─── Card grid skeleton ───────────────────────────────────────────────────────
export const CardGridSkeleton: React.FC<{ count?: number }> = ({ count = 6 }) => (
  <Grid container spacing={3}>
    {Array.from({ length: count }).map((_, i) => (
      <Grid item xs={12} sm={6} md={4} key={i}>
        <Card sx={{ borderRadius: '16px', overflow: 'hidden' }}>
          <Skeleton variant="rectangular" height={160} />
          <CardContent>
            <Skeleton variant="text" width="70%" height={24} sx={{ mb: 1 }} />
            <Skeleton variant="text" width="50%" height={18} sx={{ mb: 0.5 }} />
            <Skeleton variant="text" width="40%" height={18} />
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
);

// ─── Profile skeleton ─────────────────────────────────────────────────────────
export const ProfileSkeleton: React.FC = () => (
  <Box sx={{ p: 3 }}>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
      <Skeleton variant="circular" width={80} height={80} />
      <Box sx={{ flex: 1 }}>
        <Skeleton variant="text" width="60%" height={28} sx={{ mb: 1 }} />
        <Skeleton variant="text" width="40%" height={20} />
      </Box>
    </Box>
    {Array.from({ length: 4 }).map((_, i) => (
      <Box key={i} sx={{ mb: 2 }}>
        <Skeleton variant="text" width="30%" height={18} sx={{ mb: 0.5 }} />
        <Skeleton variant="rectangular" height={52} sx={{ borderRadius: '12px' }} />
      </Box>
    ))}
  </Box>
);

// ─── Booking card skeleton ────────────────────────────────────────────────────
export const BookingCardSkeleton: React.FC<{ count?: number }> = ({ count = 3 }) => (
  <Box>
    {Array.from({ length: count }).map((_, i) => (
      <Box key={i} sx={{
        display: 'flex', gap: 2, p: 2.5, mb: 2,
        border: '1px solid #e8e8e8', borderRadius: '16px', alignItems: 'center',
      }}>
        <Skeleton variant="circular" width={52} height={52} sx={{ flexShrink: 0 }} />
        <Box sx={{ flex: 1 }}>
          <Skeleton variant="text" width="55%" height={22} sx={{ mb: 0.5 }} />
          <Skeleton variant="text" width="40%" height={18} sx={{ mb: 0.5 }} />
          <Skeleton variant="text" width="30%" height={18} />
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Skeleton variant="rectangular" width={75} height={32} sx={{ borderRadius: '16px' }} />
          <Skeleton variant="rectangular" width={75} height={32} sx={{ borderRadius: '16px' }} />
        </Box>
      </Box>
    ))}
  </Box>
);

// ─── Page loading overlay ─────────────────────────────────────────────────────
export const PageLoader: React.FC<{ message?: string }> = ({ message = 'Loading...' }) => (
  <Box sx={{
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    justifyContent: 'center', minHeight: '60vh', gap: 2,
  }}>
    <Box sx={{
      width: 60, height: 60, borderRadius: '50%',
      background: 'linear-gradient(135deg, #1D7A8C, #146371)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      animation: 'pulse 1.5s ease-in-out infinite',
    }}>
      <span style={{ fontSize: 24 }}>🏠</span>
    </Box>
    <p style={{ color: '#888', fontSize: '15px', margin: 0 }}>{message}</p>
    <style>{`@keyframes pulse { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.1);opacity:0.8} }`}</style>
  </Box>
);

// ─── Inline spinner ───────────────────────────────────────────────────────────
export const InlineLoader: React.FC<{ size?: number }> = ({ size = 24 }) => (
  <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
    <Box sx={{
      width: size, height: size, borderRadius: '50%',
      border: '3px solid #e0e0e0',
      borderTopColor: '#1D7A8C',
      animation: 'spin 0.8s linear infinite',
    }} />
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </Box>
);

export default TableRowSkeleton;
