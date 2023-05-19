import PopupWrapper from '@/components/popup/PopupWrapper';
import { Box, Button, Typography, Skeleton } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Img } from 'react-image';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import coverImage from '@/data/jsons/cover-image.json';

const CoverItem = ({ id, coverImage, selected, setSelected }) => {
  const isSelected = selected === id;

  return (
    <Box
      position="relative"
      height={180}
      marginBottom={2}
      sx={{
        borderBottomRightRadius: 60,
        cursor: 'pointer',
        overflow: 'hidden',
        boxShadow: isSelected && 'rgba(33, 35, 38, 0.4) 0px 10px 10px -10px',
      }}
      onClick={() => setSelected(id)}
    >
      {isSelected && (
        <Box
          sx={{
            position: 'absolute',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            paddingX: 1,
            borderRadius: '25px',
            margin: 1,
            boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
          }}
        >
          กำลังเลือกปกนี้
        </Box>
      )}
      <Img
        src={coverImage}
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
    </Box>
  );
};

const EditCoverImage = ({
  open,
  openEditCoverHandler,
  closeEditCoverHandler,
  coverIdSelected,
  colorIdSelected,
  setCoverImageData,
}) => {
  const [selected, setSelected] = useState(null);

  const [useColor, setUseColor] = useState(null);
  const [objectImage, setObjectImage] = useState(null);

  useEffect(() => {
    if (open) {
      setSelected(coverIdSelected);
      setUseColor(colorIdSelected);
      setObjectImage(
        coverImage.colors.find(
          (color) => color.id === parseInt(colorIdSelected)
        )?.objectImage
      );
    }
  }, [coverIdSelected, colorIdSelected, open]);

  const editProfileHeight = useSelector(
    (state) => state.layout.editProfileHeight
  );

  const setCoverImageDataHandler = (coverId, colorId) => {
    setCoverImageData(`json$${coverId || selected}$${colorId || useColor}`);
  };

  const listCover = () => {
    return coverImage.data.map((item) => {
      return (
        <CoverItem
          key={item.id}
          id={item.id}
          coverImage={item.coverImage[objectImage]}
          selected={selected}
          setSelected={setSelected}
        />
      );
    });
  };

  const changeColorHandler = (id, object) => {
    setUseColor(id);
    setObjectImage(object);
  };

  const colorLists = () => {
    return coverImage.colors.map((item) => {
      return (
        <Box
          key={item.id}
          width={42}
          height={42}
          borderRadius={2}
          bgcolor={item.color}
          border={useColor === item.id && '1px solid #858585'}
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ cursor: 'pointer' }}
          onClick={() => changeColorHandler(item.id, item.objectImage)}
        >
          {useColor === item.id && <CheckCircleIcon />}
        </Box>
      );
    });
  };

  const submitSelected = () => {
    setCoverImageDataHandler(selected, useColor);
    closeEditCoverHandler();
  };

  return (
    <PopupWrapper
      open={open}
      onOpen={openEditCoverHandler}
      onClose={closeEditCoverHandler}
    >
      <Box height={`calc(${editProfileHeight}px - 38px)`}>
        <Typography variant="h3" marginBottom={2}>
          เปลี่ยนปก
        </Typography>
        {listCover()}
        <Box
          position="sticky"
          bottom={0}
          paddingY={1}
          bgcolor="#ffffff"
          zIndex={2}
          marginTop={6}
        >
          <Box marginBottom={2} display="flex" gap={1}>
            {colorLists()}
          </Box>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            fullWidth
            onClick={submitSelected}
          >
            ใช้งาน
          </Button>
        </Box>
      </Box>
    </PopupWrapper>
  );
};

export default EditCoverImage;
