import { useCallback, useRef } from 'react';
import { Box, Button, Typography } from '@mui/material';
import '@egjs/react-flicking/dist/flicking.css';
import Flicking from '@egjs/react-flicking';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { reloadLayoutsIndex } from '@/stores/reload';
import TextInput from '@/components/TextInput';

import usePost from '@/hooks/axios/usePost';
import usePut from '@/hooks/axios/usePut';
import profileServicePath from '@/data/jsons/services/profile.service.json';

const Welcome = () => {
  const { register, handleSubmit } = useForm();

  const [addProfileAction] = usePost(profileServicePath.getProfile, false);
  const [setPrimaryAction] = usePut(
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
    };
    addProfileAction(body).then((res) => {
      const profileId = res.data.returnData.id;
      setPrimaryAction({}, profileId).then(() => {
        dispatch(reloadLayoutsIndex());
      });
    });
  };

  return (
    <Flicking ref={flickingRef} align="prev" circular={true} disableOnInit>
      <Box width="100%" height="100vh" padding={4} textAlign="center">
        <Typography>ยินดีต้อนรับ</Typography>
        <Typography>สร้างนามบัตรแรกกันเลย</Typography>
        <Button onClick={pageNext}>ถัดไป</Button>
      </Box>
      <Box width="100%" height="100vh" padding={4} textAlign="center">
        นามบัตรนี้ใช้สำหรับ
        <TextInput
          label="ชื่อนามบัตร"
          variant="outlined"
          fullWidth
          InputLabelProps={{ shrink: true }}
          {...register('cardName')}
        />
        <Button onClick={pageNext}>ถัดไป</Button>
      </Box>
      <Box width="100%" height="100vh" padding={4} textAlign="center">
        <Box>ใส่ข้อมูลซักหน่อย</Box>
        <Button onClick={pageBack}>กลับ</Button>
        <Button>ข้าม</Button>
        <Button onClick={handleSubmit(save)}>บันทึก</Button>
      </Box>
    </Flicking>
  );
};

export default Welcome;
