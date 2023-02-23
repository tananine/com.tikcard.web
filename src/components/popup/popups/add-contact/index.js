import { useCallback, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addContactToggle } from 'stores/popup';
import { setAddContactListHeight } from 'stores/offset';
import PopupWrapper from 'components/popup/PopupWrapper';
import AddContactList from 'components/popup/popups/add-contact/AddContactList';
import { Box, Button, Divider, Typography } from '@mui/material';

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const AddContact = () => {
  const open = useSelector((state) => state.popup.addContactPopup);

  const addContactDrawerRef = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    if (addContactDrawerRef.current && open) {
      dispatch(
        setAddContactListHeight(addContactDrawerRef.current.offsetHeight)
      );
    }
  }, [dispatch, open]);

  const addContactToggleHandler = useCallback(() => {
    dispatch(addContactToggle());
  }, [dispatch]);

  return (
    <PopupWrapper
      forwardedRef={addContactDrawerRef}
      open={open}
      onClose={addContactToggleHandler}
      onOpen={addContactToggleHandler}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        marginBottom={2}
        position="sticky"
        top={0}
        bgcolor="#ffffff"
        zIndex={9}
        paddingBottom={1.5}
      >
        <Typography variant="h3">เพิ่มข้อมูล</Typography>
        <Typography fontSize="14px">มีแล้ว 6 / 25</Typography>
      </Box>
      <Divider sx={{ width: '60px', margin: 'auto' }} />
      <AddContactList app="phone" />
      <AddContactList app="phone" />
      <AddContactList app="phone" />
      <AddContactList app="phone" />
      <AddContactList app="phone" />
      <AddContactList app="phone" />
      <AddContactList app="phone" />
      <AddContactList app="phone" />
      <AddContactList app="phone" />
      <Divider sx={{ width: '60px', margin: 'auto' }} />
      <Button
        sx={{
          display: 'flex',
          marginX: 'auto',
          marginY: 2,
        }}
        endIcon={<InfoOutlinedIcon />}
      >
        ไม่พบตัวเลือกของคุณใช่ไหม
      </Button>
    </PopupWrapper>
  );
};

export default AddContact;
