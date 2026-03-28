import React, { useState } from 'react';
import {
  Button, TextField, Modal, Box, CircularProgress, InputAdornment, IconButton, Alert,
} from '@mui/material';
import { Visibility, VisibilityOff, Email as EmailIcon, Lock as LockIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { login, forgotPassword } from '../services/auth.service';
import { useAuth } from '../context/AuthContext';

// ─── Styled Components ────────────────────────────────────────────────────────
const CButton = styled(Button)(({ theme }) => ({
  height: '40px',
  width: '97px',
  fontSize: '17px',
  borderRadius: '20px',
  lineHeight: '24px',
  color: '#FFFFFF',
  border: '1px solid #FFFFFF',
  textTransform: 'capitalize',
  marginRight: '11px',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: '#FFFFFF',
    color: 'black',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  },
}));

const StyledInput = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    height: '50px',
    width: '100%',
    borderRadius: '10px',
    transition: 'all 0.2s ease',
    '&:hover fieldset': { borderColor: '#1D7A8C' },
    '&.Mui-focused fieldset': { borderColor: '#1D7A8C', borderWidth: '2px' },
  },
});

const LoginButton = styled(Button)({
  width: '100%',
  height: '50px',
  background: 'linear-gradient(135deg, #1D7A8C 0%, #146371 100%)',
  borderRadius: '25px',
  color: '#FFFFFF',
  fontSize: '16px',
  fontWeight: 600,
  marginTop: '8px',
  textTransform: 'none',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'linear-gradient(135deg, #146371 0%, #0f4f5c 100%)',
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(29, 122, 140, 0.4)',
  },
  '&:disabled': { opacity: 0.7, transform: 'none' },
});

const modalStyle = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', sm: 420 },
  bgcolor: 'background.paper',
  borderRadius: '20px',
  boxShadow: '0 24px 60px rgba(0,0,0,0.15)',
  p: 4,
  outline: 'none',
};

function Login(props: any) {
  const history = useHistory();
  const { setAuth } = useAuth();

  const [formdata, setFormdata] = useState({ Email: '', Password: '' });
  const [resetEmail, setResetEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState('');
  const [resetError, setResetError] = useState('');
  const [resetSuccess, setResetSuccess] = useState('');
  const [open, setOpen] = useState(false);
  const [forgotOpen, setForgotOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
    setFormError('');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formdata.Email || !formdata.Password) {
      setFormError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setFormError('');
    try {
      const result = await login(formdata);
      setAuth(result.user, result.token);
      setOpen(false);
      toast.success(`Welcome back, ${result.user.FirstName}!`, { position: 'top-center' });
      const { userTypeId } = result.user;
      if (userTypeId === 0) history.push('/history');
      else if (userTypeId === 1) history.push('/upcoming');
      else history.push('/srequest');
    } catch (err: any) {
      setFormError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail) {
      setResetError('Please enter your email address');
      return;
    }
    setResetLoading(true);
    setResetError('');
    setResetSuccess('');
    try {
      const result = await forgotPassword(resetEmail);
      setResetSuccess(result.message || 'Password reset link sent to your email!');
      toast.success('Reset email sent!', { position: 'top-center' });
    } catch (err: any) {
      setResetError(err.message || 'Failed to send reset email');
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <>
      <CButton
        className="login-btn"
        style={{ background: props.background }}
        onClick={() => setOpen(true)}
      >
        Login
      </CButton>

      {/* ─── Login Modal ─── */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={modalStyle}>
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Box sx={{
              width: 56, height: 56, borderRadius: '50%',
              background: 'linear-gradient(135deg, #1D7A8C, #146371)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 12px',
            }}>
              <LockIcon sx={{ color: '#fff', fontSize: 28 }} />
            </Box>
            <h2 style={{ margin: 0, color: '#2c3e50', fontSize: '24px', fontWeight: 700 }}>
              Welcome Back
            </h2>
            <p style={{ color: '#888', marginTop: 4, fontSize: '14px' }}>
              Sign in to your Helperland account
            </p>
          </Box>

          <form onSubmit={handleLogin} noValidate>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {formError && (
                <Alert severity="error" sx={{ borderRadius: '10px' }}>
                  {formError}
                </Alert>
              )}
              <StyledInput
                placeholder="Email address"
                name="Email"
                type="email"
                value={formdata.Email}
                onChange={handleChange}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon sx={{ color: '#1D7A8C' }} />
                    </InputAdornment>
                  ),
                }}
              />
              <StyledInput
                placeholder="Password"
                name="Password"
                type={showPassword ? 'text' : 'password'}
                value={formdata.Password}
                onChange={handleChange}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon sx={{ color: '#1D7A8C' }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword((s) => !s)} edge="end" size="small">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Box sx={{ textAlign: 'right', mt: -1 }}>
                <span
                  onClick={() => { setOpen(false); setForgotOpen(true); }}
                  style={{ color: '#1D7A8C', cursor: 'pointer', fontSize: '14px', fontWeight: 500 }}
                >
                  Forgot Password?
                </span>
              </Box>

              <LoginButton type="submit" disabled={loading}>
                {loading ? <CircularProgress size={22} color="inherit" /> : 'Sign In'}
              </LoginButton>

              <p style={{ textAlign: 'center', color: '#888', margin: '8px 0 0', fontSize: '14px' }}>
                Don't have an account?{' '}
                <Link to="/uregistration" style={{ color: '#1D7A8C', fontWeight: 600 }}
                  onClick={() => setOpen(false)}>
                  Create account
                </Link>
              </p>
            </Box>
          </form>
        </Box>
      </Modal>

      {/* ─── Forgot Password Modal ─── */}
      <Modal open={forgotOpen} onClose={() => { setForgotOpen(false); setResetError(''); setResetSuccess(''); }}>
        <Box sx={modalStyle}>
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <h2 style={{ margin: 0, color: '#2c3e50', fontSize: '22px', fontWeight: 700 }}>
              Reset Password
            </h2>
            <p style={{ color: '#888', fontSize: '14px', marginTop: 6 }}>
              Enter your email and we'll send you a reset link
            </p>
          </Box>

          <form onSubmit={handleForgotPassword} noValidate>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {resetError && <Alert severity="error" sx={{ borderRadius: '10px' }}>{resetError}</Alert>}
              {resetSuccess && <Alert severity="success" sx={{ borderRadius: '10px' }}>{resetSuccess}</Alert>}

              <StyledInput
                placeholder="Email address"
                type="email"
                value={resetEmail}
                onChange={(e) => { setResetEmail(e.target.value); setResetError(''); }}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon sx={{ color: '#1D7A8C' }} />
                    </InputAdornment>
                  ),
                }}
              />

              <LoginButton type="submit" disabled={resetLoading || !!resetSuccess}>
                {resetLoading ? <CircularProgress size={22} color="inherit" /> : 'Send Reset Link'}
              </LoginButton>

              <p style={{ textAlign: 'center', margin: 0 }}>
                <span
                  onClick={() => { setForgotOpen(false); setOpen(true); setResetError(''); setResetSuccess(''); }}
                  style={{ color: '#1D7A8C', cursor: 'pointer', fontSize: '14px', fontWeight: 500 }}
                >
                  Back to Login
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

export default Login;
