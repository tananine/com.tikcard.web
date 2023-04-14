import {
  Avatar,
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Input,
} from '@mui/material';
import { useState } from 'react';

const DialogCropImage = ({ open, closeHandler }) => {
  return (
    <Dialog
      open={open}
      maxWidth="xl"
      PaperProps={{ sx: { margin: 2, width: '100%', borderRadius: 6 } }}
    >
      <DialogTitle>เปลี่ยนรูป</DialogTitle>
      <DialogContent>ok</DialogContent>
      <DialogActions>
        <Button onClick={closeHandler}>ยกเลิก</Button>
        <Button>บันทึก</Button>
      </DialogActions>
    </Dialog>
  );
};

const ProfileImageHead = () => {
  const [editDialog, setEditDialog] = useState(false);

  const openEditDialogHandler = () => {
    setEditDialog(true);
  };

  const closeEditDialogHandler = () => {
    setEditDialog(false);
  };

  const changeCoverImage = (e) => {
    openEditDialogHandler();
    e.target.value = null;
  };

  const changeMainProfileImage = (e) => {
    openEditDialogHandler();
    e.target.value = null;
  };

  const changeSubProfileImage = (e) => {
    openEditDialogHandler();
    e.target.value = null;
  };

  return (
    <>
      <Input
        type="file"
        id="upload-cover"
        onInput={changeCoverImage}
        sx={{ display: 'none' }}
      />
      <Input
        type="file"
        id="upload-main-profile"
        onInput={changeMainProfileImage}
        sx={{ display: 'none' }}
      />
      <Input
        type="file"
        id="upload-sub-profile"
        onInput={changeSubProfileImage}
        sx={{ display: 'none' }}
      />
      <Box marginY={2}>
        <label htmlFor="upload-cover">
          <Box
            position="relative"
            height={180}
            bgcolor="#ced4da"
            sx={{ borderBottomRightRadius: 60, cursor: 'pointer' }}
          >
            <Typography
              variant="caption"
              sx={{ position: 'absolute', right: 6, top: 6 }}
            >
              เปลี่ยน
            </Typography>
          </Box>
        </label>
        <Box
          position="absolute"
          sx={{
            position: 'absolute',
            left: 40,
            top: 145,
          }}
        >
          <label htmlFor="upload-main-profile">
            <Avatar
              sx={{
                width: 140,
                height: 140,
                border: '4px solid white',
                cursor: 'pointer',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: '50%',
                  width: '100%',
                  textAlign: 'center',
                  transform: 'translateX(-50%)',
                }}
              >
                <Typography variant="caption">เปลี่ยน</Typography>
              </Box>
            </Avatar>
          </label>
        </Box>
        <Box
          sx={{
            position: 'absolute',
            left: 140,
            top: 225,
          }}
        >
          <label htmlFor="upload-sub-profile">
            <Avatar
              sx={{
                width: 60,
                height: 60,
                border: '4px solid white',
                cursor: 'pointer',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: '50%',
                  width: '100%',
                  textAlign: 'center',
                  transform: 'translateX(-50%)',
                }}
              >
                <Typography variant="caption">เปลี่ยน</Typography>
              </Box>
            </Avatar>
          </label>
        </Box>
      </Box>
      <DialogCropImage
        open={editDialog}
        closeHandler={closeEditDialogHandler}
      />
    </>
  );
};

export default ProfileImageHead;
