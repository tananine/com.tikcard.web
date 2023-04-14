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
import Cropper from 'react-easy-crop';
import { useState } from 'react';

const DialogCropImage = ({ image, open, closeHandler }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  return (
    <Dialog
      open={open}
      maxWidth="xl"
      PaperProps={{ sx: { margin: 2, width: '100%', borderRadius: 6 } }}
    >
      <DialogTitle>เปลี่ยนรูป</DialogTitle>
      <DialogContent>
        <Box
          width="100%"
          overflow="hidden"
          position="relative"
          borderRadius={6}
          sx={{ aspectRatio: '1' }}
        >
          <Cropper
            image="https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1910_1000"
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape="round"
            showGrid={false}
            onCropChange={setCrop}
            onZoomChange={setZoom}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeHandler}>ยกเลิก</Button>
        <Button>บันทึก</Button>
      </DialogActions>
    </Dialog>
  );
};

const ProfileImageHead = () => {
  const [editDialog, setEditDialog] = useState(false);
  const [coverImage, setCoverImage] = useState(null);
  const [mainProfileImage, setMainProfileImage] = useState(null);
  const [subProfileImage, setSubProfileImage] = useState(null);

  const openEditDialogHandler = () => {
    setEditDialog(true);
  };

  const closeEditDialogHandler = () => {
    setEditDialog(false);
  };

  const changeCoverImage = (e) => {
    setCoverImage(e.target.files[0]);
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
            left: 30,
            top: 160,
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
            left: 130,
            top: 240,
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
        image={coverImage}
        open={editDialog}
        closeHandler={closeEditDialogHandler}
      />
    </>
  );
};

export default ProfileImageHead;
