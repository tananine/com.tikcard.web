import { useCallback } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import PopupWrapper from 'components/popup/PopupWrapper';
import { useSelector, useDispatch } from 'react-redux';
import { editContactDynamicToggle } from 'stores/popup';

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import PhoneAPP from 'assets/images/phone.png';

const EditContact = () => {
  const addContactListHeight = useSelector(
    (state) => state.layout.addContactListHeight
  );

  const isChild = useSelector((state) => state.editContactDynamic.isChild);

  const open = useSelector((state) => state.popup.editContactDynamicPopup);

  const dispatch = useDispatch();

  const editContactDynamicToggleHandler = useCallback(() => {
    dispatch(editContactDynamicToggle());
  }, [dispatch]);

  return (
    <PopupWrapper
      open={open}
      onClose={editContactDynamicToggleHandler}
      onOpen={editContactDynamicToggleHandler}
    >
      <Box
        height={isChild ? `calc(${addContactListHeight}px - 38px)` : 'auto'}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Box>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h2">Phone</Typography>
            <Button>ตัวอย่างเมื่อคลิก</Button>
          </Box>
          <Box textAlign="center" padding={2}>
            <img src={PhoneAPP} alt="" width="70px" height="70px" />
          </Box>
          <TextField label="เบอร์โทร" variant="outlined" fullWidth />
          <Button
            sx={{
              marginTop: 1,
              marginBottom: 4,
              display: 'flex',
              marginX: 'auto',
            }}
            endIcon={<InfoOutlinedIcon />}
          >
            คำแนะนำ
          </Button>
        </Box>
        <Box>
          <Button variant="contained" color="secondary" size="large" fullWidth>
            บันทึก
          </Button>
        </Box>
      </Box>
    </PopupWrapper>
  );
};

export default EditContact;
