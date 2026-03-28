import api, { BASE_URL, getErrorMessage } from './api';

export interface LoginPayload {
  Email: string;
  Password: string;
}

export interface RegisterPayload {
  FirstName: string;
  LastName: string;
  Email: string;
  Mobile: string;
  Password: string;
  ConfirmPassword: string;
  userTypeId?: number;
}

export interface AuthUser {
  id: number;
  FirstName: string;
  LastName: string;
  Email: string;
  Mobile?: string;
  userTypeId: number;
  status: string;
  [key: string]: unknown;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token: string;
  user: AuthUser;
}

// ─── Persist session ─────────────────────────────────────────────────────────
export const saveSession = (token: string, user: AuthUser) => {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
};

export const clearSession = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  // Legacy key cleanup
  localStorage.removeItem('Email');
  localStorage.removeItem('userTypeId');
};

export const getStoredUser = (): AuthUser | null => {
  try {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const getToken = (): string | null => localStorage.getItem('token');

export const isAuthenticated = (): boolean => !!getToken();

// ─── Auth API calls ──────────────────────────────────────────────────────────
export const login = async (payload: LoginPayload): Promise<AuthResponse> => {
  try {
    const { data } = await api.post<AuthResponse>('/auth/login', payload);
    saveSession(data.token, data.user);
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const register = async (payload: RegisterPayload): Promise<AuthResponse> => {
  try {
    const { data } = await api.post<AuthResponse>('/auth/register', payload);
    saveSession(data.token, data.user);
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const forgotPassword = async (Email: string): Promise<{ success: boolean; message: string }> => {
  try {
    // Try new API first
    const { data } = await api.post('/auth/forgot-password', { Email });
    return data;
  } catch {
    // Fallback to legacy endpoint
    const res = await fetch(`${BASE_URL}/account/forgotpassword/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ Email }),
    });
    const text = await res.json();
    if (!res.ok) throw new Error(text);
    return { success: true, message: text };
  }
};

export const resetPassword = async (token: string, NewPassword: string): Promise<{ success: boolean; message: string }> => {
  try {
    const { data } = await api.post('/auth/reset-password', { token, NewPassword });
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const logout = () => {
  clearSession();
  window.location.href = '/';
};

export const getMe = async (): Promise<AuthUser> => {
  const { data } = await api.get('/users/me');
  return data.user;
};
