import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';
import { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import toast from 'react-hot-toast';

import usePost from '@/hooks/axios/usePost';
import profileServicePath from '@/data/jsons/services/profile.service.json';

const Lead = ({ isPreview, profileId }) => {
  const { register, handleSubmit } = useForm();

  const [openForm, setOpenForm] = useState(false);
  const [isSend, setIsSend] = useState(false);
  const timeoutRef = useRef(null);

  const [sendContactAction, sendContactLoading] = usePost(
    profileServicePath.sendContact
  );

  const openFormHandler = () => {
    setOpenForm(true);
    clearTimeout(timeoutRef.current);
  };
  const closeFormHandler = () => {
    setOpenForm(false);
  };

  useEffect(() => {
    if (!isPreview) {
      timeoutRef.current = setTimeout(() => {
        setOpenForm(true);
      }, 3500);

      return () => {
        clearTimeout(timeoutRef.current);
      };
    }
  }, []);

  const sendContact = (form) => {
    const body = {
      profileId: profileId,
      name: form.name,
      phone: form.phone,
      email: form.email,
      message: form.message,
    };
    sendContactAction(body).then((res) => {
      setOpenForm(false);
      setIsSend(true);
      toast.success('ส่งสำเร็จ');
    });
  };

  return (
    <>
      <Button
        variant="contained"
        fullWidth
        size="large"
        onClick={openFormHandler}
      >
        ฝากข้อมูลติดต่อ
      </Button>
      <Dialog
        open={openForm}
        maxWidth="xl"
        PaperProps={{ sx: { margin: 2, width: '100%', borderRadius: 6 } }}
      >
        <DialogTitle>ข้อมูลติดต่อของคุณ</DialogTitle>
        <DialogContent>
          <TextField
            label="ชื่อ"
            variant="outlined"
            fullWidth
            InputLabelProps={{ shrink: true }}
            sx={{ marginTop: 1 }}
            {...register('name')}
          />
          <TextField
            label="เบอร์โทร"
            variant="outlined"
            fullWidth
            InputLabelProps={{ shrink: true }}
            sx={{ marginTop: 2 }}
            {...register('phone')}
          />
          <TextField
            label="อีเมล"
            variant="outlined"
            fullWidth
            InputLabelProps={{ shrink: true }}
            sx={{ marginTop: 2 }}
            {...register('email')}
          />
          <TextField
            label="ข้อความ"
            variant="outlined"
            fullWidth
            InputLabelProps={{ shrink: true }}
            sx={{ marginTop: 2 }}
            {...register('message')}
          />
          {isSend && (
            <Typography
              mt={2}
              textAlign="center"
              color="green"
              fontWeight={500}
            >
              ได้รับข้อมูลติดต่อของคุณแล้ว
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeFormHandler} disabled={sendContactLoading}>
            ปิด
          </Button>
          <LoadingButton
            onClick={handleSubmit(sendContact)}
            loading={sendContactLoading}
          >
            {isSend ? 'ส่งอีกครั้ง' : 'ส่ง'}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Lead;
