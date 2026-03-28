import React, { useState } from 'react';
import {
  Button, TextField, Grid, Box, Alert, CircularProgress,
  InputAdornment, IconButton, LinearProgress, Chip, FormControlLabel, Checkbox,
} from '@mui/material';
import {
  Visibility, VisibilityOff, Email as EmailIcon, Person, Phone, Lock,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/navbar';
import Titlecomp from '../components/titlecomponent';
import Subscribe1 from '../components/sunscribe1';
import SecondFooter from '../components/secondfooter';
import { register } from '../services/auth.service';
import { useAuth } from '../context/AuthContext';

// ─── Password strength ────────────────────────────────────────────────────────
const getPasswordStrength = (password: string): { score: number; label: string; color: string } => {
  let score = 0;
  if (password.length >= 6) score++;
  if (password.length >= 10) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { score: 20, label: 'Weak', color: '#f44336' };
  if (score === 2) return { score: 40, label: 'Fair', color: '#ff9800' };
  if (score === 3) return { score: 60, label: 'Good', color: '#2196f3' };
  if (score === 4) return { score: 80, label: 'Strong', color: '#4caf50' };
  return { score: 100, label: 'Very Strong', color: '#388e3c' };
};

// ─── Styled ───────────────────────────────────────────────────────────────────
const StyledInput = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    height: '52px',
    borderRadius: '12px',
    transition: 'all 0.2s',
    '&:hover fieldset': { borderColor: '#1D7A8C' },
    '&.Mui-focused fieldset': { borderColor: '#1D7A8C', borderWidth: 2 },
  },
  '& .MuiInputBase-input': { padding: '14px' },
});

const RegisterButton = styled(Button)({
  width: '100%',
  height: '52px',
  background: 'linear-gradient(135deg, #1D7A8C 0%, #146371 100%)',
  borderRadius: '26px',
  color: '#FFFFFF',
  fontSize: '17px',
  fontWeight: 700,
  marginTop: '12px',
  textTransform: 'none',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'linear-gradient(135deg, #146371 0%, #0f4f5c 100%)',
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 24px rgba(29, 122, 140, 0.35)',
  },
  '&:disabled': { opacity: 0.7, transform: 'none' },
});

const FormCard = styled(Box)(({ theme }) => ({
  background: '#fff',
  borderRadius: '20px',
  padding: '40px',
  boxShadow: '0 8px 40px rgba(0,0,0,0.08)',
  maxWidth: '680px',
  margin: '60px auto 40px',
  [theme.breakpoints.down('sm')]: {
    padding: '24px 16px',
    margin: '20px 16px',
  },
}));

function UserRegistration() {
  const history = useHistory();
  const { setAuth } = useAuth();

  const [formdata, setFormdata] = useState({
    FirstName: '', LastName: '', Email: '', Mobile: '',
    Password: '', ConfirmPassword: '',
  });
  const [userType, setUserType] = useState(0); // 0 = customer, 1 = SP
  const [accepted, setAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState('');

  const strength = formdata.Password ? getPasswordStrength(formdata.Password) : null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormdata((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
    setServerError('');
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!formdata.FirstName.trim()) errs.FirstName = 'First name is required';
    if (!formdata.LastName.trim()) errs.LastName = 'Last name is required';
    if (!formdata.Email.trim()) {
      errs.Email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formdata.Email)) {
      errs.Email = 'Enter a valid email address';
    }
    if (!formdata.Mobile.trim()) errs.Mobile = 'Mobile number is required';
    if (!formdata.Password) {
      errs.Password = 'Password is required';
    } else if (formdata.Password.length < 6) {
      errs.Password = 'Password must be at least 6 characters';
    }
    if (!formdata.ConfirmPassword) {
      errs.ConfirmPassword = 'Please confirm your password';
    } else if (formdata.Password !== formdata.ConfirmPassword) {
      errs.ConfirmPassword = 'Passwords do not match';
    }
    if (!accepted) errs.terms = 'You must accept the privacy policy';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setServerError('');
    try {
      const result = await register({ ...formdata, userTypeId: userType });
      setAuth(result.user, result.token);
      toast.success('Account created successfully! Welcome to Helperland!', { position: 'top-center' });
      setTimeout(() => {
        if (userType === 0) history.push('/history');
        else history.push('/upcoming');
      }, 1200);
    } catch (err: any) {
      setServerError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet><title>Create Account – Helperland</title></Helmet>
      <Navbar />

      <div style={{ background: 'linear-gradient(180deg, #f0f8fa 0%, #ffffff 100%)', minHeight: '80vh' }}>
        <Titlecomp heading="Create Your Account" />

        <FormCard>
          {/* Account type selector */}
          <Box sx={{ display: 'flex', gap: 1.5, mb: 3, p: 1, background: '#f5f5f5', borderRadius: '12px' }}>
            {[
              { label: 'Customer', value: 0, icon: '🏠' },
              { label: 'Service Provider', value: 1, icon: '🧹' },
            ].map((t) => (
              <Box
                key={t.value}
                onClick={() => setUserType(t.value)}
                sx={{
                  flex: 1, py: 1.5, px: 2, borderRadius: '10px', cursor: 'pointer',
                  textAlign: 'center', transition: 'all 0.2s',
                  background: userType === t.value ? '#1D7A8C' : 'transparent',
                  color: userType === t.value ? '#fff' : '#666',
                  fontWeight: 600, fontSize: '14px',
                  boxShadow: userType === t.value ? '0 4px 12px rgba(29,122,140,0.3)' : 'none',
                }}
              >
                {t.icon} {t.label}
              </Box>
            ))}
          </Box>

          <form onSubmit={handleSubmit} noValidate>
            {serverError && (
              <Alert severity="error" sx={{ mb: 2, borderRadius: '10px' }}>{serverError}</Alert>
            )}

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <StyledInput
                  fullWidth label="First Name" name="FirstName"
                  value={formdata.FirstName} onChange={handleChange}
                  error={!!errors.FirstName} helperText={errors.FirstName}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><Person sx={{ color: '#1D7A8C' }} /></InputAdornment>,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <StyledInput
                  fullWidth label="Last Name" name="LastName"
                  value={formdata.LastName} onChange={handleChange}
                  error={!!errors.LastName} helperText={errors.LastName}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><Person sx={{ color: '#1D7A8C' }} /></InputAdornment>,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <StyledInput
                  fullWidth label="Email Address" name="Email" type="email"
                  value={formdata.Email} onChange={handleChange}
                  error={!!errors.Email} helperText={errors.Email}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><EmailIcon sx={{ color: '#1D7A8C' }} /></InputAdornment>,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <StyledInput
                  fullWidth label="Mobile Number" name="Mobile"
                  value={formdata.Mobile} onChange={handleChange}
                  error={!!errors.Mobile} helperText={errors.Mobile}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><Phone sx={{ color: '#1D7A8C' }} /></InputAdornment>,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <StyledInput
                  fullWidth label="Password" name="Password"
                  type={showPwd ? 'text' : 'password'}
                  value={formdata.Password} onChange={handleChange}
                  error={!!errors.Password} helperText={errors.Password}
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
                {strength && formdata.Password && (
                  <Box sx={{ mt: 1 }}>
                    <LinearProgress
                      variant="determinate" value={strength.score}
                      sx={{
                        borderRadius: '4px', height: '6px',
                        bgcolor: '#e0e0e0',
                        '& .MuiLinearProgress-bar': { bgcolor: strength.color, borderRadius: '4px' },
                      }}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 0.5 }}>
                      <Chip label={strength.label} size="small"
                        sx={{ height: '20px', fontSize: '11px', bgcolor: strength.color + '22', color: strength.color, fontWeight: 600 }} />
                    </Box>
                  </Box>
                )}
              </Grid>
              <Grid item xs={12}>
                <StyledInput
                  fullWidth label="Confirm Password" name="ConfirmPassword"
                  type={showConfirm ? 'text' : 'password'}
                  value={formdata.ConfirmPassword} onChange={handleChange}
                  error={!!errors.ConfirmPassword} helperText={errors.ConfirmPassword}
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
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox checked={accepted} onChange={(e) => { setAccepted(e.target.checked); setErrors((p) => ({ ...p, terms: '' })); }} sx={{ color: '#1D7A8C', '&.Mui-checked': { color: '#1D7A8C' } }} />}
                  label={<span style={{ fontSize: '14px', color: '#555' }}>I agree to the <span role="link" style={{ color: '#1D7A8C', cursor: 'pointer', textDecoration: 'underline' }}>Privacy Policy</span> and <span role="link" style={{ color: '#1D7A8C', cursor: 'pointer', textDecoration: 'underline' }}>Terms of Service</span></span>}
                />
                {errors.terms && <Alert severity="error" sx={{ mt: 0.5, py: 0, borderRadius: '8px' }}>{errors.terms}</Alert>}
              </Grid>
            </Grid>

            <RegisterButton type="submit" disabled={loading}>
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Create Account'}
            </RegisterButton>

            <p style={{ textAlign: 'center', color: '#888', marginTop: '16px', fontSize: '14px' }}>
              Already have an account?{' '}
              <a href="/" style={{ color: '#1D7A8C', fontWeight: 600 }}>Sign in</a>
            </p>
          </form>
        </FormCard>
      </div>

      <Subscribe1 />
      <SecondFooter />
      <ToastContainer />
    </>
  );
}

export default UserRegistration;
