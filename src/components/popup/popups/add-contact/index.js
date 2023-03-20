import { useCallback, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addContactToggle } from 'stores/popup';
import { setAddContactListHeight } from 'stores/offset';
import PopupWrapper from 'components/popup/PopupWrapper';
import AddContactList from 'components/popup/popups/add-contact/AddContactList';
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Typography,
} from '@mui/material';

import useGet from 'hooks/axios/useGet';
import profileServicePath from 'data/jsons/services/profile.service.json';

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const ContactList = (appListData) => {
  return appListData?.map((app) => {
    return (
      <AddContactList
        key={app.id}
        id={app.id}
        name={app.name}
        defaultUri={app.defaultUri}
        androidUri={app.androidUri}
        iosUri={app.iosUri}
        imageIcon={app.imageIcon}
      />
    );
  });
};

const AddContact = () => {
  const [getAppListAction, getAppListLoading, getAppListData] = useGet(
    profileServicePath.getAppList
  );

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

  useEffect(() => {
    if (open) {
      getAppListAction();
    }
  }, [getAppListAction, open]);

  const addContactToggleHandler = useCallback(() => {
    dispatch(addContactToggle());
  }, [dispatch]);

  return (
    <PopupWrapper
      forwardedRef={addContactDrawerRef}
      open={open}
      onClose={addContactToggleHandler}
      onOpen={addContactToggleHandler}
      fullHeight
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
      {getAppListLoading || !getAppListData ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress disableShrink />
        </Box>
      ) : (
        <>
          <Divider sx={{ width: '60px', margin: 'auto' }} />
          {ContactList(getAppListData?.data)}
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
        </>
      )}
    </PopupWrapper>
  );
};

export default AddContact;
