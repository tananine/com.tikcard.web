import { useEffect, useState } from 'react';
import { Box, Container, Paper, TextField } from '@mui/material';
import Cookies from 'js-cookie';
import usePost from 'hooks/axios/usePost';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import authService from 'data/jsons/services/auth.service.json';

const Login = () => {
  const [loginAction, loginLoading] = usePost(authService.login);

  useEffect(() => {
    Cookies.remove('authToken');
    delete axios.defaults.headers.common['Authorization'];
  }, []);

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    const body = {
      email: email,
      password: password,
    };
    loginAction(body).then(async (res) => {
      Cookies.set('authToken', res.data.token);
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${res.data.token}`;
      navigate('/app/profile', { replace: true });
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <LoadingButton
            variant="contained"
            color="secondary"
            size="large"
            fullWidth
            onClick={login}
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
