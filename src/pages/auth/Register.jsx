import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Container,
  Paper,
  Skeleton,
  TextField,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Img } from 'react-image';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from 'react-hot-toast';

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
    confirmPassword: yup
      .string()
      .required('โปรดยืนยันรหัสผ่าน')
      .oneOf([yup.ref('password'), null], 'รหัสผ่านไม่ตรงกัน'),
  })
  .required();

const Register = () => {
  const navigate = useNavigate();

  const currentUrl = window.location.href;
  const query =
    currentUrl.split('?').length >= 2 ? '?' + currentUrl.split('?')[1] : '';

  const [registerAction, registerLoading] = usePost(
    authServicePath.register,
    false
  );

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const registerFunction = async (form) => {
    const body = {
      email: form.email,
      password: form.password,
    };
    registerAction(body).then(async (res) => {
      navigate('/app/login' + query, { replace: true });
      toast.success('สร้างบัญชีผู้ใช้สำเร็จแล้ว');
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
        <Box paddingX={2} paddingTop={6} display="grid" gap={2} overflow="auto">
          <Box textAlign="center">
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
          <Typography textAlign="center" variant="h5">
            สร้างบัญชีผู้ใช้
          </Typography>
          <Box display="grid" gap={2}>
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
            <TextField
              label="ยืนยันรหัสผ่าน"
              variant="outlined"
              fullWidth
              type="password"
              error={errors?.confirmPassword ? true : false}
              helperText={errors?.confirmPassword?.message}
              {...register('confirmPassword')}
            />
          </Box>
          <Box display="grid" gap={2} marginBottom={12}>
            <LoadingButton
              variant="contained"
              color="secondary"
              size="large"
              fullWidth
              onClick={handleSubmit(registerFunction)}
              loading={registerLoading}
            >
              สร้างบัญชี
            </LoadingButton>
            <Button
              onClick={() => navigate('/app/login' + query, { replace: true })}
            >
              เข้าสู่ระบบ
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;
