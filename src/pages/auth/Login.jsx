import { useEffect } from 'react';
import { Box, Container, Paper, TextField } from '@mui/material';
import Cookies from 'js-cookie';
import usePost from '@/hooks/axios/usePost';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import authServicePath from '@/data/jsons/services/auth.service.json';
import { useForm } from 'react-hook-form';

const Login = () => {
  const [loginAction, loginLoading] = usePost(authServicePath.login);

  const { register, handleSubmit } = useForm();

  const location = useLocation();

  useEffect(() => {
    Cookies.remove('authToken');
    delete axios.defaults.headers.common['Authorization'];
    delete axios.defaults.headers.common['profile'];
  }, []);

  const navigate = useNavigate();

  const login = async (form) => {
    const body = {
      email: form.email,
      password: form.password,
    };
    loginAction(body).then(async (res) => {
      Cookies.set('authToken', res.data.token);
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${res.data.token}`;
      const searchParams = new URLSearchParams(location.search);
      const redirect = searchParams.get('redirect');
      if (redirect) {
        navigate(redirect, { replace: true });
      } else {
        navigate('/app/profile', { replace: true });
      }
    });
  };

  return (
    <Container>
      <Paper elevation={3}>
        <Box
          sx={{
            padding: 2,
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            {...register('email')}
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            {...register('password')}
          />
          <LoadingButton
            variant="contained"
            color="secondary"
            size="large"
            fullWidth
            onClick={handleSubmit(login)}
            loading={loginLoading}
          >
            Login
          </LoadingButton>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
