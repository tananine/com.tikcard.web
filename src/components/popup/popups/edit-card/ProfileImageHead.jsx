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

const ProfileImageHead = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [cacheImage, setCacheImage] = useState(null);
  const [type, setType] = useState(null);

  const openEditDialogHandler = () => {
    setOpenDialog(true);
  };

  const closeEditDialogHandler = () => {
    setOpenDialog(false);
  };

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const inputImage = (e, type) => {
    setCacheImage(e.target.files[0]);
    setType(type);
    openEditDialogHandler();
    e.target.value = null;
  };

  return (
    <>
      <Input
        type="file"
        id="upload-main-profile"
        sx={{ display: 'none' }}
        onChange={(e) => inputImage(e, 'mainImage')}
      />
      <Input
        type="file"
        id="upload-sub-profile"
        sx={{ display: 'none' }}
        onChange={(e) => inputImage(e, 'subImage')}
      />
      <Box marginY={2}>
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
      <Dialog
        open={openDialog}
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
              image={cacheImage && URL.createObjectURL(cacheImage)}
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
          <Button onClick={closeEditDialogHandler}>ยกเลิก</Button>
          <Button>บันทึก</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProfileImageHead;
