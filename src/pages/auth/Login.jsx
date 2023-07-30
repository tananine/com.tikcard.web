import { useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  Paper,
  Skeleton,
  TextField,
} from '@mui/material';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Img } from 'react-image';

import authServicePath from '@/data/jsons/services/auth.service.json';

import usePost from '@/hooks/axios/usePost';

import Logo from '@/assets/images/logo.png';

const schema = yup
  .object({
    email: yup.string().required('โปรดป้อนอีเมล').email('โปรดป้อนอีเมล'),
    password: yup
      .string()
      .required('โปรดป้อนรหัสผ่าน')
      .min(6, 'รหัสผ่านที่คุณป้อนจะต้องมีความยาวอย่างน้อย 6 อักขระ'),
  })
  .required();

const Login = () => {
  const [loginAction, loginLoading] = usePost(authServicePath.login, false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

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
      <Paper
        elevation={3}
        sx={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Box textAlign="center" mb={6}>
          <Img
            src={Logo}
            alt=""
            height="32px"
            loader={
              <Skeleton
                animation="wave"
                variant="rounded"
                width="120px"
                height="32px"
                sx={{ margin: 'auto' }}
              />
            }
          />
        </Box>
        <Box
          sx={{
            padding: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <TextField
            label="อีเมล"
            variant="outlined"
            fullWidth
            error={errors?.email ? true : false}
            helperText={errors?.email?.message}
            {...register('email')}
          />
          <TextField
            label="รหัสผ่าน"
            variant="outlined"
            fullWidth
            type="password"
            error={errors?.password ? true : false}
            helperText={errors?.password?.message}
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
            เข้าสู่ระบบ
          </LoadingButton>
          <Button onClick={() => navigate('/app/register', { replace: true })}>
            สร้างบัญชีผู้ใช้
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
