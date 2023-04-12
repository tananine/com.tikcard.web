import { useCallback, useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addContactToggle } from '@/stores/popup';
import { setAddContactListHeight } from '@/stores/offset';
import PopupWrapper from '@/components/popup/PopupWrapper';
import AddContactList from '@/components/popup/popups/add-contact/AddContactList';
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Tab,
  Typography,
} from '@mui/material';

import useGet from '@/hooks/axios/useGet';
import profileServicePath from '@/data/jsons/services/profile.service.json';

import phoneGrid from '@/assets/svg/phone-grid.svg';
import phoneBlock from '@/assets/svg/phone-block.svg';

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { TabContext, TabList, TabPanel } from '@mui/lab';

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

  const [tabValue, setTabValue] = useState(1);

  const tabChangeHandler = (event, newValue) => {
    setTabValue(newValue);
  };

  const open = useSelector((state) => state.popup.addContactPopup);

  const addContactPopupRef = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    if (addContactPopupRef.current && open) {
      dispatch(
        setAddContactListHeight(addContactPopupRef.current.offsetHeight)
      );
    }
  }, [dispatch, open]);

  useEffect(() => {
    if (open && !getAppListData) {
      getAppListAction();
    }
  }, [getAppListAction, open]);

  const addContactToggleHandler = useCallback(() => {
    dispatch(addContactToggle());
  }, [dispatch]);

  return (
    <PopupWrapper
      forwardedRef={addContactPopupRef}
      open={open}
      onClose={addContactToggleHandler}
      onOpen={addContactToggleHandler}
      fullHeight
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        position="sticky"
        top={0}
        bgcolor="#ffffff"
        zIndex={9}
        paddingBottom={1.5}
      >
        <Typography variant="h3">เพิ่มข้อมูล</Typography>
        <Typography fontSize="14px">
          พบ {getAppListData?.data.length || 0} รายการ
        </Typography>
      </Box>
      {getAppListLoading || !getAppListData ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress disableShrink />
        </Box>
      ) : (
        <>
          <TabContext value={tabValue}>
            <TabList
              onChange={tabChangeHandler}
              sx={{ justifyContent: 'center' }}
            >
              <Tab icon={<img src={phoneGrid} />} label="ตารางแอพ" value={1} />
              <Tab
                icon={<img src={phoneBlock} />}
                label="โฟกัสบล็อค"
                value={2}
              />
            </TabList>
            <TabPanel value={1} sx={{ marginTop: 2, padding: 0 }}>
              {ContactList(getAppListData?.data)}
              <Divider sx={{ width: '60px', margin: 'auto' }} />
            </TabPanel>
          </TabContext>
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
