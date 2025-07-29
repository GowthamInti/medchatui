import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import Login from '../Login';
import { AuthContext } from '../../auth/AuthContext';

// Mock auth context
const mockAuthContext = {
  user: null,
  login: jest.fn(),
  register: jest.fn(),
  loading: false,
};

const LoginWrapper = ({ children, contextValue = mockAuthContext }) => (
  <BrowserRouter>
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  </BrowserRouter>
);

describe('Login Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders login form by default', () => {
    render(
      <LoginWrapper>
        <Login />
      </LoginWrapper>
    );

    expect(screen.getByText('Welcome back')).toBeInTheDocument();
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  test('toggles between login and register forms', async () => {
    const user = userEvent.setup();
    
    render(
      <LoginWrapper>
        <Login />
      </LoginWrapper>
    );

    // Click toggle to register
    await user.click(screen.getByText("Don't have an account? Sign up"));
    
    expect(screen.getByText('Create account')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument();

    // Click toggle back to login
    await user.click(screen.getByText("Already have an account? Sign in"));
    
    expect(screen.getByText('Welcome back')).toBeInTheDocument();
    expect(screen.queryByLabelText('Email')).not.toBeInTheDocument();
  });

  test('submits login form with valid data', async () => {
    const user = userEvent.setup();
    mockAuthContext.login.mockResolvedValue({ success: true });

    render(
      <LoginWrapper>
        <Login />
      </LoginWrapper>
    );

    await user.type(screen.getByLabelText('Username'), 'testuser');
    await user.type(screen.getByLabelText('Password'), 'password123');
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(mockAuthContext.login).toHaveBeenCalledWith('testuser', 'password123');
    });
  });

  test('displays error message on login failure', async () => {
    const user = userEvent.setup();
    mockAuthContext.login.mockResolvedValue({ 
      success: false, 
      error: 'Invalid credentials' 
    });

    render(
      <LoginWrapper>
        <Login />
      </LoginWrapper>
    );

    await user.type(screen.getByLabelText('Username'), 'testuser');
    await user.type(screen.getByLabelText('Password'), 'wrongpassword');
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
    });
  });

  test('toggles password visibility', async () => {
    const user = userEvent.setup();
    
    render(
      <LoginWrapper>
        <Login />
      </LoginWrapper>
    );

    const passwordInput = screen.getByLabelText('Password');
    const toggleButton = screen.getByRole('button', { name: '' }); // Eye icon button

    expect(passwordInput).toHaveAttribute('type', 'password');

    await user.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'text');

    await user.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  test('redirects when user is already authenticated', () => {
    const authenticatedContext = {
      ...mockAuthContext,
      user: { token: 'test-token' }
    };

    render(
      <LoginWrapper contextValue={authenticatedContext}>
        <Login />
      </LoginWrapper>
    );

    // Component should redirect, so login form should not be visible
    expect(screen.queryByText('Welcome back')).not.toBeInTheDocument();
  });
});