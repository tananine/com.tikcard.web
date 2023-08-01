import { useCallback, useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addContactToggle } from '@/stores/popup';
import { setAddContactListHeight } from '@/stores/offset';
import PopupWrapper from '@/components/popup/PopupWrapper';
import AddContactList from '@/components/popup/popups/add-contact/AddContactList';
import {
  Box,
  // Button,
  CircularProgress,
  Divider,
  Tab,
  Typography,
  Skeleton,
} from '@mui/material';
import { Img } from 'react-image';

import useGet from '@/hooks/axios/useGet';
import profileServicePath from '@/data/jsons/services/profile.service.json';

import phoneGrid from '@/assets/svg/phone-grid.svg';
import phoneBlock from '@/assets/svg/phone-block.svg';
import phoneSpacial from '@/assets/svg/phone-spacial.svg';

// import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { TabContext, TabList, TabPanel } from '@mui/lab';

const ContactList = (appListData, typeLayout) => {
  return appListData?.map((app) => {
    return (
      <AddContactList
        key={app.id}
        id={app.id}
        name={app.name}
        defaultUri={app.defaultUri}
        androidUri={app.androidUri}
        iosUri={app.iosUri}
        example={app.example}
        imageIcon={app.imageIcon}
        typeLayout={typeLayout}
        component={app.component}
      />
    );
  });
};

const AddContact = () => {
  const [getAppListAction, getAppListLoading, getAppListData] = useGet(
    profileServicePath.getAppList,
    true
  );

  const [gridList, setGridList] = useState([]);
  const [blockList, setBlockList] = useState([]);
  const [spacialList, setSpacialList] = useState([]);

  const [tabValue, setTabValue] = useState('grid');

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
      getAppListAction().then((res) => {
        setGridList(res.data.filter((item) => item.typeLayout === 'grid'));
        setBlockList(res.data.filter((item) => item.typeLayout === 'block'));
        setSpacialList(
          res.data.filter((item) => item.typeLayout === 'spacial')
        );
      });
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
        position="sticky"
        top={0}
        bgcolor="#ffffff"
        zIndex={9}
        paddingBottom={1.5}
      >
        <Typography variant="h3">เพิ่มข้อมูล</Typography>
      </Box>
      {getAppListLoading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress disableShrink />
        </Box>
      ) : (
        <>
          <TabContext value={tabValue}>
            <TabList
              onChange={tabChangeHandler}
              sx={{
                justifyContent: 'center',
                position: 'sticky',
                top: '-14px',
                backgroundColor: '#ffffff',
                zIndex: 1,
                paddingBottom: 1,
              }}
            >
              <Tab
                icon={
                  <Img
                    src={phoneGrid}
                    height={44}
                    loader={
                      <Skeleton
                        animation="wave"
                        variant="rounded"
                        width="26px"
                        height="44px"
                        sx={{ mb: '6px' }}
                      />
                    }
                    unloader={
                      <Skeleton
                        animation="wave"
                        variant="rounded"
                        width="26px"
                        height="44px"
                        sx={{ mb: '6px' }}
                      />
                    }
                  />
                }
                label="ตารางแอพ"
                value={'grid'}
              />
              <Tab
                icon={
                  <Img
                    src={phoneBlock}
                    height={44}
                    loader={
                      <Skeleton
                        animation="wave"
                        variant="rounded"
                        width="26px"
                        height="44px"
                        sx={{ mb: '6px' }}
                      />
                    }
                    unloader={
                      <Skeleton
                        animation="wave"
                        variant="rounded"
                        width="26px"
                        height="44px"
                        sx={{ mb: '6px' }}
                      />
                    }
                  />
                }
                label="โฟกัสบล็อค"
                value={'block'}
              />
              {/* <Tab // TODO Spacial tab is not ready
                icon={
                  <Img
                    src={phoneSpacial}
                    height={44}
                    loader={
                      <Skeleton
                        animation="wave"
                        variant="rounded"
                        width="26px"
                        height="44px"
                        sx={{ mb: '6px' }}
                      />
                    }
                    unloader={
                      <Skeleton
                        animation="wave"
                        variant="rounded"
                        width="26px"
                        height="44px"
                        sx={{ mb: '6px' }}
                      />
                    }
                  />
                }
                label="พิเศษ"
                value={'spacial'}
              /> */}
            </TabList>
            <TabPanel value={'grid'} sx={{ padding: 0 }}>
              {ContactList(gridList, 'grid')}
              <Divider sx={{ width: '60px', margin: 'auto' }} />
            </TabPanel>
            <TabPanel value={'block'} sx={{ padding: 0 }}>
              {ContactList(blockList, 'block')}
              <Divider sx={{ width: '60px', margin: 'auto' }} />
            </TabPanel>
            <TabPanel value={'spacial'} sx={{ padding: 0 }}>
              {ContactList(spacialList, 'spacial')}
              <Divider sx={{ width: '60px', margin: 'auto' }} />
            </TabPanel>
          </TabContext>
          <Box marginY={6} />
          {/* <Button // TODO Button 'ไม่พบตัวเลือกของคุณใช่ไหม'
            sx={{
              display: 'flex',
              marginX: 'auto',
              marginY: 2,
            }}
            endIcon={<InfoOutlinedIcon />}
          >
            ไม่พบตัวเลือกของคุณใช่ไหม
          </Button> */}
        </>
      )}
    </PopupWrapper>
  );
};

export default AddContact;
