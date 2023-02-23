import { useCallback } from 'react';
import PopupWrapper from 'components/popup/PopupWrapper';
import { useSelector, useDispatch } from 'react-redux';
import { editCardToggle } from 'stores/popup';
import { Box, Button, TextField } from '@mui/material';
import ProfileImageHead from 'components/popup/popups/edit-card/ProfileImageHead';

const EditCard = () => {
  const open = useSelector((state) => state.popup.editCardPopup);

  const dispatch = useDispatch();

  const editCardToggleHandler = useCallback(() => {
    dispatch(editCardToggle());
  }, [dispatch]);

  return (
    <PopupWrapper
      open={open}
      onClose={editCardToggleHandler}
      onOpen={editCardToggleHandler}
    >
      <Box height="100vh" paddingY={1}>
        <TextField label="ชื่อนามบัตร" variant="outlined" fullWidth />
        <ProfileImageHead />
        <Box marginTop={4} display="flex" flexDirection="column" gap={2}>
          <TextField label="ชื่อ" variant="outlined" fullWidth />
          <TextField label="อาชีพ" variant="outlined" fullWidth />
          <TextField label="บริษัท" variant="outlined" fullWidth />
          <TextField label="ตำแหน่ง" variant="outlined" fullWidth />
          <TextField label="ที่อยู่" variant="outlined" fullWidth />
          <TextField
            label="เกี่ยวกับฉัน"
            variant="outlined"
            fullWidth
            multiline
            rows={3}
          />
        </Box>
        <Box
          paddingY={1}
          marginTop={8}
          position="sticky"
          bottom={0}
          zIndex={9}
          bgcolor="#ffffff"
        >
          <Button variant="contained" fullWidth size="large" color="secondary">
            บันทึก
          </Button>
        </Box>
      </Box>
    </PopupWrapper>
  );
};

export default EditCard;
