import { useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  Paper,
  Skeleton,
  TextField,
  Typography,
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

import LinkIcon from '@mui/icons-material/Link';

const schema = yup
  .object({
    email: yup
      .string()
      .required('โปรดป้อนอีเมล')
      .email('โปรดป้อนอีเมล')
      .max(80, 'อีเมลที่คุณป้อนจะต้องมีความยาวไม่เกิน 80 อักขระ'),
    password: yup
      .string()
      .required('โปรดป้อนรหัสผ่าน')
      .min(6, 'รหัสผ่านที่คุณป้อนจะต้องมีความยาวอย่างน้อย 6 อักขระ')
      .max(28, 'รหัสผ่านที่คุณป้อนจะต้องมีความยาวไม่เกิน 28 อักขระ'),
  })
  .required();

const Login = () => {
  const [loginAction, loginLoading] = usePost(authServicePath.login, false);

  const currentUrl = window.location.href;
  const query =
    currentUrl.split('?').length >= 2 ? '?' + currentUrl.split('?')[1] : '';

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const location = useLocation();

  useEffect(() => {
    Cookies.remove('authToken');
    delete axios.defaults.headers.common['Authorization'];
    delete axios.defaults.headers.common['profile'];
    const email = searchParams.get('email');
    setValue('email', email);
  }, []);

  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const connectText = searchParams.get('connected');

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
          height: '100svh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Box overflow="auto">
          <Box mb={2} display="grid" gap={1}>
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
              style={{ margin: 'auto' }}
            />
            {connectText === 'true' && (
              <>
                <LinkIcon sx={{ marginX: 'auto' }} />
                <Typography textAlign="center" variant="body2">
                  เข้าสู่ระบบเพื่อเชื่อมต่อกับ{' '}
                  <Typography component="span" fontWeight={500}>
                    Tik Device
                  </Typography>{' '}
                  ในขั้นตอนถัดไป
                </Typography>
              </>
            )}
          </Box>
          <Box
            component="form"
            onSubmit={handleSubmit(login)}
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
              type="email"
              error={!!errors?.email}
              helperText={errors?.email?.message}
              {...register('email')}
            />
            <TextField
              label="รหัสผ่าน"
              variant="outlined"
              fullWidth
              type="password"
              error={!!errors?.password}
              helperText={errors?.password?.message}
              {...register('password')}
            />
            <LoadingButton
              variant="contained"
              color="secondary"
              size="large"
              fullWidth
              type="submit"
              loading={loginLoading}
            >
              เข้าสู่ระบบ
            </LoadingButton>
            <Button
              onClick={() =>
                navigate('/app/register' + query, { replace: true })
              }
            >
              สร้างบัญชีผู้ใช้
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
