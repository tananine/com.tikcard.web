import {
  Avatar,
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Divider,
  Skeleton,
} from '@mui/material';
import CardList from '@/components/CardList';
import { LoadingButton } from '@mui/lab';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Img } from 'react-image';
import dayjs from 'dayjs';

import useDelete from '@/hooks/axios/useDelete';
import profileServicePath from '@/data/jsons/services/profile.service.json';

const dayFormat = (date) => {
  return dayjs(date).format('ได้รับเมื่อ DD/MM/YYYY เวลา HH:mm');
};

const ConnectionItem = ({ data, removeConnection }) => {
  const [deleteConnectListAction, deleteConnectListLoading] = useDelete(
    profileServicePath.deleteConnectList,
    false
  );

  const [open, setOpen] = useState(false);

  const openDialogHandler = () => {
    setOpen(true);
  };

  const closeDialogHandler = () => {
    setOpen(false);
  };

  const deleteConnectList = () => {
    if (confirm('คุณต้องการจะลบใช่หรือไม่ ?')) {
      deleteConnectListAction(`${data.profileId}/${data.id}`).then(() => {
        removeConnection(data.id);
        setOpen(false);
        toast.success('ลบสำเร็จ');
      });
    }
  };

  return (
    <>
      <CardList
        onClick={openDialogHandler}
        sx={{ cursor: 'pointer', bgcolor: '#f7f7f7' }}
      >
        <Box display="flex" gap={2} flexGrow={1} alignItems="center">
          <Avatar sx={{ width: 46, height: 46 }}>
            <Img
              src={''}
              alt=""
              width="100%"
              height="100%"
              loader={
                <Skeleton
                  animation="wave"
                  variant="rounded"
                  width="100%"
                  height="100%"
                />
              }
              unloader={<Avatar />}
            />
          </Avatar>
          <Box>
            <Typography variant="h5" lineHeight="26.5px">
              {data.name}
            </Typography>
            <Typography variant="caption">
              {dayFormat(data.createdAt)}
            </Typography>
          </Box>
        </Box>
      </CardList>
      <Dialog
        open={open}
        maxWidth="xl"
        PaperProps={{ sx: { margin: 2, width: '100%', borderRadius: 6 } }}
      >
        <DialogTitle>ข้อมูลติดต่อ</DialogTitle>
        <DialogContent>
          <Typography mb={1}>ชื่อ : {data.name}</Typography>
          {data.phone && (
            <Typography mb={1}>เบอร์โทร : {data.phone}</Typography>
          )}
          {data.email && <Typography mb={1}>อีเมล : {data.email}</Typography>}
          {data.message && (
            <Typography mb={2}>ข้อความ : {data.message}</Typography>
          )}
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            บันทึก
          </Button>
          <Divider sx={{ marginTop: 2, marginBottom: 1 }} />
          <Typography textAlign="center" variant="caption">
            {dayFormat(data.createdAt)}
          </Typography>
        </DialogContent>
        <DialogActions>
          <LoadingButton
            onClick={deleteConnectList}
            loading={deleteConnectListLoading}
            variant="text"
            color="error"
          >
            ลบ
          </LoadingButton>
          <Button onClick={closeDialogHandler}>ปิด</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ConnectionItem;
