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
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import usePost from '@/hooks/axios/usePost';
import profileServicePath from '@/data/jsons/services/profile.service.json';

const schema = yup
  .object()
  .shape(
    {
      name: yup.string().required('โปรดป้อนชื่อ'),
      phone: yup.string().when('email', {
        is: (val) => !val || val === '',
        then: () => yup.string().required('โปรดป้อนเบอร์โทรหรืออีเมล'),
      }),
      email: yup.string().when('phone', {
        is: (val) => !val || val === '',
        then: () => yup.string().required('โปรดป้อนเบอร์โทรหรืออีเมล'),
      }),
    },
    ['phone', 'email']
  )
  .required();

const Lead = ({ isPreview, profileId }) => {
  const {
    register,
    formState: { errors },
    clearErrors,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [openForm, setOpenForm] = useState(false);
  const [isSend, setIsSend] = useState(false);
  const timeoutRef = useRef(null);

  const [sendContactAction, sendContactLoading] = usePost(
    profileServicePath.sendContact,
    false
  );

  const openFormHandler = () => {
    if (isPreview) {
      return alert(
        'ผู้ชมสามารถส่งข้อมูลติดต่อไปยังเจ้าของนามบัตรได้ (ดูข้อมูลติดต่อทั้งหมดในหน้าสมุดรายชื่อ)'
      );
    }
    clearErrors();
    setOpenForm(true);
    clearTimeout(timeoutRef.current);
  };
  const closeFormHandler = () => {
    setOpenForm(false);
  };

  useEffect(() => {
    if (!isPreview) {
      timeoutRef.current = setTimeout(() => {
        // setOpenForm(true); // TODO: setTimeout open Lead form
      }, 500);

      return () => {
        clearTimeout(timeoutRef.current);
      };
    }
  }, []);

  const sendContact = (form) => {
    const body = {
      profileId: profileId,
      name: form.name,
      phone: form.phone || null,
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
        <DialogContent sx={{ paddingX: 1.5 }}>
          <TextField
            label={
              <>
                ชื่อ{' '}
                <Typography component="span" color="red">
                  *
                </Typography>
              </>
            }
            variant="outlined"
            fullWidth
            InputLabelProps={{ shrink: true }}
            sx={{ marginTop: 1 }}
            error={!!errors?.name}
            helperText={errors?.name?.message}
            {...register('name')}
          />
          <TextField
            label="เบอร์โทร (อย่างหนึ่ง)"
            variant="outlined"
            fullWidth
            type="tel"
            InputLabelProps={{ shrink: true }}
            sx={{ marginTop: 2 }}
            error={!!(errors?.phone && errors?.email)}
            helperText={
              errors?.phone && errors?.email && errors?.phone?.message
            }
            {...register('phone')}
          />
          <TextField
            label="อีเมล (อย่างหนึ่ง)"
            variant="outlined"
            fullWidth
            type="email"
            InputLabelProps={{ shrink: true }}
            sx={{ marginTop: 2 }}
            error={!!(errors?.email && errors?.phone)}
            helperText={
              errors?.phone && errors?.email && errors?.email?.message
            }
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
