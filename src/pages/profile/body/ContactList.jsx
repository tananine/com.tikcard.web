import { useCallback, useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Box, Switch, Typography } from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import CardList from '@/components/CardList';
import { useDispatch } from 'react-redux';
import { editContactDynamicToggle } from '@/stores/popup';
import {
  setEditContactDynamicChild,
  setEditContactDynamicData,
} from '@/stores/parse-data/editContactDynamic';

import usePut from '@/hooks/axios/usePut';
import profileServicePath from '@/data/jsons/services/profile.service.json';

import getUrlS3 from '@/functions/getUrlS3';

const ContactList = ({ contactId, contactItem, url, show }) => {
  const dispatch = useDispatch();

  const [showState, setShowState] = useState(show);

  const [toggleShowAction] = usePut(profileServicePath.contactToggleShow);

  const editContactDynamicToggleHandler = useCallback(() => {
    dispatch(setEditContactDynamicChild({ isChild: false }));
    dispatch(editContactDynamicToggle());
    dispatch(
      setEditContactDynamicData({
        contactId: contactId,
        contactItemId: contactItem.id,
        name: contactItem.name,
        imageIcon: contactItem.imageIcon,
        url: url,
        uri: {
          defaultUri: contactItem.defaultUri,
          androidUri: contactItem.androidUri,
          iosUri: contactItem.iosUri,
        },
      })
    );
  }, [dispatch, contactId, contactItem, url]);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: contactId });

  const toggleShow = (e) => {
    const body = {
      contactId: contactId,
    };
    toggleShowAction(body);
    setShowState((prev) => (prev === 'enable' ? 'disable' : 'enable'));
  };

  const opacityLevel = () => {
    if (showState !== 'enable') {
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
        }}
      >
        <Box display="flex" alignItems="center" gap={2}>
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
              <img
                src={getUrlS3(`theme-app-icon/${contactItem.imageIcon}`)}
                alt=""
                width="46px"
                height="46px"
              />
              <Box>
                <Typography variant="h3" lineHeight="26.5px">
                  {contactItem.name}
                </Typography>
                <Typography variant="caption" noWrap>
                  {url}
                </Typography>
              </Box>
            </Box>
          </Box>
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
