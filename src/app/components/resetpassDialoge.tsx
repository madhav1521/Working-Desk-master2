import React, { useState } from 'react';
import {
  Button, TextField, Modal, Box, Alert, CircularProgress,
  InputAdornment, IconButton, LinearProgress, Chip,
} from '@mui/material';
import { Visibility, VisibilityOff, Lock } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useHistory } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { resetPassword } from '../services/auth.service';

const getPasswordStrength = (p: string) => {
  let s = 0;
  if (p.length >= 6) s++;
  if (p.length >= 10) s++;
  if (/[A-Z]/.test(p)) s++;
  if (/[0-9]/.test(p)) s++;
  if (/[^A-Za-z0-9]/.test(p)) s++;
  if (s <= 1) return { score: 20, label: 'Weak', color: '#f44336' };
  if (s === 2) return { score: 40, label: 'Fair', color: '#ff9800' };
  if (s === 3) return { score: 60, label: 'Good', color: '#2196f3' };
  if (s >= 4) return { score: Math.min(s * 20, 100), label: 'Strong', color: '#4caf50' };
  return { score: 100, label: 'Very Strong', color: '#388e3c' };
};

const StyledInput = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    height: '50px', width: '100%', borderRadius: '10px',
    transition: 'all 0.2s',
    '&:hover fieldset': { borderColor: '#1D7A8C' },
    '&.Mui-focused fieldset': { borderColor: '#1D7A8C', borderWidth: 2 },
  },
});

const ResetButton = styled(Button)({
  width: '100%', height: '50px',
  background: 'linear-gradient(135deg, #1D7A8C 0%, #146371 100%)',
  borderRadius: '25px', color: '#FFFFFF', fontSize: '16px', fontWeight: 700,
  marginTop: '8px', textTransform: 'none', transition: 'all 0.3s ease',
  '&:hover': {
    background: 'linear-gradient(135deg, #146371 0%, #0f4f5c 100%)',
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(29, 122, 140, 0.4)',
  },
  '&:disabled': { opacity: 0.7, transform: 'none' },
});

const modalStyle = {
  position: 'absolute' as const,
  top: '50%', left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', sm: 420 },
  bgcolor: 'background.paper',
  borderRadius: '20px',
  boxShadow: '0 24px 60px rgba(0,0,0,0.15)',
  p: 4, outline: 'none',
};

function Resetpass(props: { token?: string; open: boolean }) {
  const history = useHistory();
  const [formdata, setFormdata] = useState({ Password: '', CPassword: '' });
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const strength = formdata.Password ? getPasswordStrength(formdata.Password) : null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormdata((p) => ({ ...p, [name]: value }));
    setFieldErrors((p) => ({ ...p, [name]: '' }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!formdata.Password) errs.Password = 'Password is required';
    else if (formdata.Password.length < 6) errs.Password = 'Minimum 6 characters';
    if (!formdata.CPassword) errs.CPassword = 'Confirm password is required';
    else if (formdata.Password !== formdata.CPassword) errs.CPassword = "Passwords don't match";

    if (Object.keys(errs).length > 0) { setFieldErrors(errs); return; }
    if (!props.token) { setError('Reset token is missing. Please request a new reset link.'); return; }

    setLoading(true);
    setError('');
    try {
      await resetPassword(props.token, formdata.Password);
      toast.success('Password reset successfully! Please log in.', { position: 'top-center' });
      setTimeout(() => history.push('/'), 1500);
    } catch (err: any) {
      setError(err.message || 'Reset failed. The link may be expired.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal open={props.open} onClose={() => history.push('/')}>
        <Box sx={modalStyle} className="animate-scale-in">
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Box sx={{
              width: 56, height: 56, borderRadius: '50%',
              background: 'linear-gradient(135deg, #1D7A8C, #146371)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 12px',
            }}>
              <Lock sx={{ color: '#fff', fontSize: 28 }} />
            </Box>
            <h2 style={{ margin: 0, color: '#2c3e50', fontSize: '22px', fontWeight: 700 }}>
              Create New Password
            </h2>
            <p style={{ color: '#888', fontSize: '14px', marginTop: 6 }}>
              Your new password must be at least 6 characters
            </p>
          </Box>

          <form onSubmit={handleSubmit} noValidate>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {error && <Alert severity="error" sx={{ borderRadius: '10px' }}>{error}</Alert>}

              <Box>
                <StyledInput
                  fullWidth placeholder="New Password"
                  type={showPwd ? 'text' : 'password'}
                  name="Password" value={formdata.Password} onChange={handleChange}
                  error={!!fieldErrors.Password}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><Lock sx={{ color: '#1D7A8C' }} /></InputAdornment>,
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPwd((s) => !s)} edge="end" size="small">
                          {showPwd ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                {fieldErrors.Password && <p style={{ color: '#f44336', fontSize: '12px', margin: '4px 0 0 12px' }}>{fieldErrors.Password}</p>}
                {strength && formdata.Password && (
                  <Box sx={{ mt: 1 }}>
                    <LinearProgress variant="determinate" value={strength.score}
                      sx={{ borderRadius: '4px', height: '5px', bgcolor: '#e0e0e0',
                        '& .MuiLinearProgress-bar': { bgcolor: strength.color } }} />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 0.5 }}>
                      <Chip label={strength.label} size="small"
                        sx={{ height: '18px', fontSize: '11px', bgcolor: strength.color + '22', color: strength.color, fontWeight: 600 }} />
                    </Box>
                  </Box>
                )}
              </Box>

              <Box>
                <StyledInput
                  fullWidth placeholder="Confirm Password"
                  type={showConfirm ? 'text' : 'password'}
                  name="CPassword" value={formdata.CPassword} onChange={handleChange}
                  error={!!fieldErrors.CPassword}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><Lock sx={{ color: '#1D7A8C' }} /></InputAdornment>,
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowConfirm((s) => !s)} edge="end" size="small">
                          {showConfirm ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                {fieldErrors.CPassword && <p style={{ color: '#f44336', fontSize: '12px', margin: '4px 0 0 12px' }}>{fieldErrors.CPassword}</p>}
              </Box>

              <ResetButton type="submit" disabled={loading}>
                {loading ? <CircularProgress size={22} color="inherit" /> : 'Reset Password'}
              </ResetButton>

              <p style={{ textAlign: 'center', margin: 0 }}>
                <span onClick={() => history.push('/')}
                  style={{ color: '#1D7A8C', cursor: 'pointer', fontSize: '14px', fontWeight: 500 }}>
                  Back to Home
                </span>
              </p>
            </Box>
          </form>
        </Box>
      </Modal>
      <ToastContainer />
    </>
  );
}

export default Resetpass;
