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
  Card,
  Skeleton,
} from '@mui/material';
import Cropper from 'react-easy-crop';
import Resizer from '@/functions/resizer';
import { useState, useCallback } from 'react';
import getCropOutput from '@/functions/cropOutput';
import { Img } from 'react-image';

import CollectionsIcon from '@mui/icons-material/Collections';

import EditCoverImage from '@/components/popup/popups/edit-card/EditCoverImage';

import splitCoverImage from '@/functions/getCoverImage';

const ProfileImageHead = ({
  profileImage,
  setProfileImage,
  logoImage,
  setLogoImage,
  coverImageData,
  setCoverImageData,
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [cacheImage, setCacheImage] = useState(null);
  const [type, setType] = useState(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const [openEditCover, setOpenEditCover] = useState(false);

  const openEditCoverHandler = () => {
    setOpenEditCover(true);
  };

  const closeEditCoverHandler = () => {
    setOpenEditCover(false);
  };

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

    try {
      const file = e.target.files[0];
      Resizer.imageFileResizer(
        file,
        800,
        800,
        'JPEG',
        100,
        0,
        (uri) => {
          setCacheImage(uri);
        },
        'base64'
      );
    } catch (error) {
      console.error('Failed to resize image:', error);
    }

    setType(type);
    openEditDialogHandler();
    e.target.value = null;
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const saveCropImage = async () => {
    try {
      const croppedImage = await getCropOutput(cacheImage, croppedAreaPixels);
      if (type === 'profileImage') {
        setProfileImage(croppedImage);
      } else if (type === 'logoImage') {
        setLogoImage(croppedImage);
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
        id="upload-profile-image"
        sx={{ display: 'none' }}
        onChange={(e) => inputImage(e, 'profileImage')}
      />
      <Input
        type="file"
        id="upload-logo-image"
        sx={{ display: 'none' }}
        onChange={(e) => inputImage(e, 'logoImage')}
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
          onClick={openEditCoverHandler}
        >
          <Img
            src={
              coverImageData &&
              splitCoverImage(
                coverImageData.coverImage,
                coverImageData.colorCoverImage
              )
            }
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
            unloader={
              <Skeleton
                animation="wave"
                variant="rounded"
                width="100%"
                height="100%"
              />
            }
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
          <label htmlFor="upload-profile-image">
            <Box sx={{ border: '4px solid white', borderRadius: '50%' }}>
              <Avatar
                sx={{
                  width: 130,
                  height: 130,
                  cursor: 'pointer',
                  boxShadow:
                    'rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em',
                }}
              >
                <Img
                  src={profileImage}
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
                  unloader={<Typography variant="body2">เพิ่มรูป</Typography>}
                />
              </Avatar>
            </Box>
          </label>
        </Box>
        <Box
          sx={{
            position: 'absolute',
            left: 130,
            top: 240,
            border: '2px solid white',
            borderRadius: '50%',
          }}
        >
          <label htmlFor="upload-logo-image">
            <Avatar
              sx={{
                width: 52,
                height: 52,
                cursor: 'pointer',
                boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 2px 0px',
              }}
            >
              <Img
                src={logoImage}
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
                unloader={<Typography variant="caption">เพิ่มรูป</Typography>}
              />
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
        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', height: '80vh' }}
        >
          <Box
            maxWidth="100%"
            flexGrow={1}
            overflow="hidden"
            position="relative"
            borderRadius={6}
            sx={{ aspectRatio: '1' }}
            margin="auto"
          >
            <Cropper
              image={cacheImage}
              crop={crop}
              zoom={zoom}
              aspect={1}
              cropShape="round"
              showGrid={false}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
            />
          </Box>
          <Card variant="outlined" sx={{ marginTop: 2, paddingX: 4 }}>
            <Typography textAlign="center">ซูม</Typography>
            <Slider
              value={zoom}
              onChange={setZoomHandler}
              min={1}
              max={3}
              step={0.1}
            />
          </Card>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEditDialogHandler}>ยกเลิก</Button>
          <Button onClick={saveCropImage}>บันทึก</Button>
        </DialogActions>
      </Dialog>
      <EditCoverImage
        open={openEditCover}
        openEditCoverHandler={closeEditCoverHandler}
        closeEditCoverHandler={closeEditCoverHandler}
        coverIdSelected={coverImageData?.coverImage}
        colorIdSelected={coverImageData?.colorCoverImage}
        setCoverImageData={setCoverImageData}
      />
    </>
  );
};

export default ProfileImageHead;
