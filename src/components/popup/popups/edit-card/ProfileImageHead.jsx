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
  Slider,
} from '@mui/material';
import Cropper from 'react-easy-crop';
import { useState, useCallback } from 'react';
import getCropOutput from '@/functions/cropOutput';

import CollectionsIcon from '@mui/icons-material/Collections';

const ProfileImageHead = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [cacheImage, setCacheImage] = useState(null);
  const [type, setType] = useState(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const [mainProfileImage, setMainProfileImage] = useState(null);
  const [subProfileImage, setSubProfileImage] = useState(null);

  const openEditDialogHandler = () => {
    setOpenDialog(true);
  };

  const closeEditDialogHandler = () => {
    setOpenDialog(false);
  };

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const setZoomHandler = (e, newValue) => {
    setZoom(newValue);
  };

  const inputImage = (e, type) => {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCacheImage(e.target.files[0]);
    setType(type);
    openEditDialogHandler();
    e.target.value = null;
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const saveCropImage = async () => {
    try {
      const croppedImage = await getCropOutput(
        URL.createObjectURL(cacheImage),
        croppedAreaPixels
      );
      if (type === 'mainImage') {
        setMainProfileImage(croppedImage);
      } else if (type === 'subImage') {
        setSubProfileImage(croppedImage);
      }
    } catch (error) {
      console.error(error);
    }
    closeEditDialogHandler();
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
          sx={{
            borderBottomRightRadius: 60,
            cursor: 'pointer',
            overflow: 'hidden',
          }}
        >
          <img
            src="https://img.freepik.com/free-vector/minimal-white-gray-background-with-wavy-lines_1017-25099.jpg?w=2000"
            alt="cover image"
            width="100%"
            height="100%"
          />

          <CollectionsIcon
            variant="caption"
            sx={{ position: 'absolute', right: 6, top: 6 }}
          />
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
              {mainProfileImage ? (
                <img
                  src={mainProfileImage}
                  alt="รูปโพรไฟล์"
                  width="100%"
                  height="100%"
                />
              ) : (
                <Avatar />
              )}
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
              {subProfileImage ? (
                <img
                  src={subProfileImage}
                  alt="รูปบริษัท"
                  width="100%"
                  height="100%"
                />
              ) : (
                <Avatar />
              )}
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
              onCropComplete={onCropComplete}
            />
          </Box>
          <Slider
            value={zoom}
            onChange={setZoomHandler}
            min={1}
            max={3}
            step={0.1}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEditDialogHandler}>ยกเลิก</Button>
          <Button onClick={saveCropImage}>บันทึก</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProfileImageHead;
