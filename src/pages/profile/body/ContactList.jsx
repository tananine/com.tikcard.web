import { useCallback, useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Box, Switch, Typography, Skeleton } from '@mui/material';
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

  return (
    <>
      <CardList
        forwardedRef={setNodeRef}
        sx={{
          transform: CSS.Transform.toString(transform),
          transition,
          border:
            dataItem.ContactItem.typeLayout === 'block'
              ? '1px solid #c2c2c2'
              : '1px solid #ffffff',
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
              gap={2}
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
                <Typography variant="h3" lineHeight="26.5px">
                  {contactItem.name}
                </Typography>
                <Typography variant="caption" noWrap>
                  {dataItem.data}
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
