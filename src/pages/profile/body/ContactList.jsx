import { useCallback, useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Box, Switch, Typography, Skeleton, Divider } from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import CardList from '@/components/CardList';
import { useDispatch } from 'react-redux';
import { editContactDynamicToggle } from '@/stores/popup';
import {
  setEditContactDynamicChild,
  setEditContactDynamicData,
} from '@/stores/parse-data/editContactDynamic';
import { Img } from 'react-image';

import usePut from '@/hooks/axios/usePut';
import profileServicePath from '@/data/jsons/services/profile.service.json';

import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const ContactList = ({ contactId, contactItem, dataItem, show }) => {
  const dispatch = useDispatch();

  const [showState, setShowState] = useState(show);

  const [toggleShowAction] = usePut(
    profileServicePath.contactToggleShow,
    false
  );

  const editContactDynamicToggleHandler = useCallback(() => {
    dispatch(setEditContactDynamicChild({ isChild: false }));
    dispatch(editContactDynamicToggle());
    dispatch(
      setEditContactDynamicData({
        contactId: contactId,
        contactItemId: contactItem.id,
        name: contactItem.name,
        example: contactItem.example,
        imageIcon: contactItem.imageIcon,
        dataItem: {
          name: dataItem.name,
          data: dataItem.data,
          note: dataItem.note,
          latitude: dataItem.latitude,
          longitude: dataItem.longitude,
        },
        uri: {
          defaultUri: contactItem.defaultUri,
          androidUri: contactItem.androidUri,
          iosUri: contactItem.iosUri,
        },
        typeLayout: contactItem.typeLayout,
        component: contactItem.component,
        inputType: contactItem.inputType,
      })
    );
  }, [dispatch, contactId, contactItem, dataItem]);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: contactId });

  const toggleShow = (e) => {
    const body = {
      contactId: contactId,
    };
    toggleShowAction(body);
    setShowState((prev) => (prev === 'enable' ? 'disable' : 'enable'));
  };

  const isShowState = showState === 'enable';

  const opacityLevel = () => {
    if (!isShowState) {
      return 0.3;
    }
    return 1;
  };

  const typeContact = () => {
    switch (dataItem.ContactItem.typeLayout) {
      case 'grid':
        return (
          <>
            <Divider orientation="vertical" sx={{ marginRight: 1 }} />
            <Box display="flex" gap={0.3}>
              <Box
                width={12}
                height={12}
                border="1px solid #b8b8b8"
                borderRadius={1}
              />
              <Box
                width={12}
                height={12}
                border="1px solid #b8b8b8"
                borderRadius={1}
              />
              <Box
                width={12}
                height={12}
                border="1px solid #b8b8b8"
                borderRadius={1}
              />
            </Box>
            <Divider
              orientation="vertical"
              sx={{ marginLeft: 1, marginRight: 1 }}
            />
            ตาราง
          </>
        );
      case 'block':
        return (
          <>
            <Divider orientation="vertical" sx={{ marginRight: 1 }} />
            <Box
              width={41}
              height={12}
              border="1px solid #b8b8b8"
              borderRadius={1}
            />
            <Divider
              orientation="vertical"
              sx={{ marginLeft: 1, marginRight: 1 }}
            />
            บล็อค
          </>
        );
      case 'spacial':
        return <>พิเศษ</>;
      default:
        return <></>;
    }
  };

  const typeContactLayoutStyle = () => {
    switch (dataItem.ContactItem.typeLayout) {
      case 'grid':
        return { bgcolor: '#ffffff', border: '0.5px solid #cecece' };
      case 'block':
        return { bgcolor: '#f7f7f7', border: '0.5px solid #ffffff' };
      case 'spacial':
        return { bgcolor: '#f7f7f7', border: '0.5px solid #ffffff' };
      default:
        return {};
    }
  };

  return (
    <>
      <CardList
        forwardedRef={setNodeRef}
        sx={{
          ...typeContactLayoutStyle(),
          transform: CSS.Transform.toString(transform),
          transition,
        }}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <Box
            display="flex"
            alignItems="center"
            flexGrow={1}
            gap={2}
            overflow="hidden"
          >
            <Box
              {...attributes}
              {...listeners}
              height="46px"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              sx={{ cursor: 'grab', touchAction: 'none' }}
            >
              <DragIndicatorIcon sx={{ color: '#b2b2b2' }} />
            </Box>
            <Box
              display="flex"
              gap={1.5}
              alignItems="center"
              width="100%"
              sx={{ cursor: 'pointer', opacity: opacityLevel }}
              onClick={editContactDynamicToggleHandler}
            >
              <Img
                src={contactItem.imageIcon}
                alt=""
                width="46px"
                height="46px"
                loader={
                  <Skeleton
                    animation="wave"
                    variant="rounded"
                    width={46}
                    height={46}
                  />
                }
                unloader={
                  <Skeleton
                    animation="wave"
                    variant="rounded"
                    width={46}
                    height={46}
                  />
                }
              />
              <Box display="grid" alignContent="center">
                <Typography
                  variant="h3"
                  lineHeight="26.5px"
                  marginBottom={0.5}
                  sx={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {contactItem.name}
                </Typography>
                <Typography
                  variant="caption"
                  display="flex"
                  alignItems="center"
                >
                  แสดงผลแบบ&nbsp;&nbsp;&nbsp;{typeContact()}
                </Typography>
              </Box>
            </Box>
          </Box>
          {!isShowState && <VisibilityOffIcon sx={{ fontSize: 16 }} />}
          <Switch
            size="small"
            defaultChecked={show === 'enable'}
            onChange={toggleShow}
          />
        </Box>
      </CardList>
    </>
  );
};

export default ContactList;
