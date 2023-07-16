import { useCallback, useRef } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import '@egjs/react-flicking/dist/flicking.css';
import Flicking from '@egjs/react-flicking';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { reloadGetActivation } from '@/stores/reload';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Img } from 'react-image';
import { LoadingButton } from '@mui/lab';

import usePost from '@/hooks/axios/usePost';
import usePut from '@/hooks/axios/usePut';
import profileServicePath from '@/data/jsons/services/profile.service.json';

import Logo from '@/assets/images/logo.png';
import WelcomeImage from '@/assets/images/welcome.png';
import BuildUpImage from '@/assets/images/build-up.png';
import BlogImage from '@/assets/images/blog.png';

const schema = yup
  .object({
    cardName: yup
      .string()
      .required('โปรดป้อนชื่อเรียกนามบัตร')
      .max(50, 'ต้องมีความยาวไม่เกิน 50 อักขระ'),
    name: yup.string().max(50, 'ต้องมีความยาวไม่เกิน 50 อักขระ'),
  })
  .required();

const Welcome = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: yupResolver(schema) });

  const [addProfileAction, addProfileLoading] = usePost(
    profileServicePath.getProfile,
    false
  );
  const [setPrimaryAction, setPrimaryLoading] = usePut(
    profileServicePath.setPrimaryProfile,
    false
  );

  const flickingRef = useRef();

  const pageNext = useCallback(() => {
    flickingRef.current.next();
  }, [flickingRef]);

  const pageBack = useCallback(() => {
    flickingRef.current.prev();
  }, [flickingRef]);

  const dispatch = useDispatch();

  const save = (form) => {
    const body = {
      cardName: form.cardName,
      name: form.name,
    };
    addProfileAction(body).then((res) => {
      const profileId = res.data.returnData.id;
      setPrimaryAction({}, profileId).then(() => {
        dispatch(reloadGetActivation());
      });
    });
  };

  const onMoveEndHandler = (e) => {};

  return (
    <Flicking
      ref={flickingRef}
      align="prev"
      circular={true}
      disableOnInit
      onMoveEnd={onMoveEndHandler}
    >
      <Box
        width="100%"
        height="100vh"
        padding={4}
        textAlign="center"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Box textAlign="center" mb={6}>
          <Img src={Logo} alt="" height="38px" />
        </Box>
        <Box>
          <Typography variant="h1">ยินดีต้อนรับ</Typography>
          <Typography variant="h4">สร้างนามบัตรแรกกันเลย</Typography>
          <Img src={WelcomeImage} alt="" width="100%" />
        </Box>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          fullWidth
          sx={{ marginBottom: 8 }}
          onClick={pageNext}
        >
          ถัดไป
        </Button>
      </Box>
      <Box
        width="100%"
        height="100vh"
        padding={4}
        textAlign="center"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Box>
          <Typography variant="h4" marginBottom={2}>
            นามบัตรนี้ใช้สำหรับ
          </Typography>
          <TextField
            label="ชื่อเรียกนามบัตร"
            variant="outlined"
            fullWidth
            InputLabelProps={{ shrink: true }}
            error={errors?.cardName ? true : false}
            helperText={errors?.cardName?.message}
            {...register('cardName')}
          />
          <Typography variant="caption" marginTop={1} textAlign="start">
            เช่น ส่วนตัว, ธุรกิจ, งานออนไลน์ หรือ อื่นๆ
          </Typography>
          <Typography variant="caption" marginTop={1}>
            สามารถแก้ไขได้ในภายหลัง
          </Typography>
        </Box>
        <Img src={BuildUpImage} alt="" width="100%" />
        <Button
          variant="contained"
          color="secondary"
          size="large"
          fullWidth
          sx={{ marginBottom: 8 }}
          onClick={handleSubmit(pageNext)}
        >
          ถัดไป
        </Button>
      </Box>
      <Box
        width="100%"
        height="100vh"
        padding={4}
        textAlign="center"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Box>
          <Typography variant="h5" marginBottom={1}>
            ใกล้เสร็จแล้ว
          </Typography>
          <Typography variant="h4" marginBottom={2}>
            ใส่ข้อมูลเพิ่มซักหน่อย
          </Typography>
          <TextField
            label="ชื่อ - นามสกุล"
            variant="outlined"
            fullWidth
            InputLabelProps={{ shrink: true }}
            error={errors?.name ? true : false}
            helperText={errors?.name?.message}
            {...register('name')}
          />
          <Typography variant="caption" marginTop={1}>
            สามารถแก้ไขได้ในภายหลัง
          </Typography>
        </Box>
        <Img src={BlogImage} alt="" width="100%" />
        <Box>
          <Box height={45}>
            {!addProfileLoading && !setPrimaryLoading && (
              <Box display="flex" gap={2} justifyContent="center">
                <Button onClick={handleSubmit(pageBack)}>กลับ</Button>
                <Button onClick={handleSubmit(save)}>ข้าม</Button>
              </Box>
            )}
          </Box>
          <LoadingButton
            onClick={handleSubmit(save)}
            variant="contained"
            color="secondary"
            size="large"
            fullWidth
            sx={{ marginTop: 2, marginBottom: 8 }}
            loading={addProfileLoading || setPrimaryLoading}
          >
            บันทึก
          </LoadingButton>
        </Box>
      </Box>
    </Flicking>
  );
};

export default Welcome;
