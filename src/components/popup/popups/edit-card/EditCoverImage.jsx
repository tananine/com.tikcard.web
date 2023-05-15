import PopupWrapper from '@/components/popup/PopupWrapper';
import { Box, Button, Typography } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import coverImage from '@/data/jsons/cover-image.json';

const CoverItem = ({ id, coverImage, selected, setCoverImageHandler }) => {
  return (
    <Box
      position="relative"
      height={180}
      marginBottom={2}
      sx={{
        borderBottomRightRadius: 60,
        cursor: 'pointer',
        overflow: 'hidden',
        boxShadow:
          selected === id && 'rgba(33, 35, 38, 0.4) 0px 10px 10px -10px',
      }}
      onClick={() => setCoverImageHandler(id, coverImage)}
    >
      <img src={coverImage} loading="lazy" alt="" width="100%" height="100%" />
    </Box>
  );
};

const EditCoverImage = ({
  open,
  openEditCoverHandler,
  closeEditCoverHandler,
  setCoverImage,
}) => {
  const [selected, setSelected] = useState(coverImage.data[0].id);

  const [useColor, setUseColor] = useState(coverImage.colors[0].id);
  const [objectImage, setObjectImage] = useState(
    coverImage.colors[0].objectImage
  );

  const editProfileHeight = useSelector(
    (state) => state.layout.editProfileHeight
  );

  const setCoverImageHandler = (id, imageUrl) => {
    setCoverImage(imageUrl);
    setSelected(id);
  };

  const listCover = () => {
    return coverImage.data.map((item) => {
      return (
        <CoverItem
          key={item.id}
          id={item.id}
          coverImage={item.coverImage[objectImage]}
          selected={selected}
          setCoverImageHandler={setCoverImageHandler}
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
          sx={{ cursor: 'pointer' }}
          onClick={() => changeColorHandler(item.id, item.objectImage)}
        />
      );
    });
  };

  const submitSelected = () => {
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
            ตกลง
          </Button>
        </Box>
      </Box>
    </PopupWrapper>
  );
};

export default EditCoverImage;
