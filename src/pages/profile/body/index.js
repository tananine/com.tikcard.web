import { useState, useCallback, useEffect } from 'react';
import { DndContext } from '@dnd-kit/core';
import { Box, CircularProgress, Divider, Typography } from '@mui/material';
import { SortableContext } from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import ContactList from 'pages/profile/body/ContactList';
import { useSelector, useDispatch } from 'react-redux';
import { setShowFooter, setHideFooter } from 'stores/offset';

import useGet from 'hooks/axios/useGet';
import profileService from 'data/jsons/services/profile.service.json';

const ProfileBody = () => {
  const dispatch = useDispatch();

  const handleDragEnd = useCallback(() => {
    dispatch(setShowFooter());
  }, []);

  const handleDragOver = useCallback(() => {
    dispatch(setHideFooter());
  }, []);

  const [items, setItems] = useState([]);

  const [getMyContactAction, getMyContactLoading, getMyContactData] = useGet(
    profileService.getMyContact
  );

  const profileId = useSelector(
    (state) => state.controller.profileInUse.profileId
  );
  const reloadContactList = useSelector((state) => state.reload.contactList);

  useEffect(() => {
    getMyContactAction().then((res) => {
      setItems(res.data);
    });
  }, [getMyContactAction, profileId, reloadContactList]);

  if (getMyContactLoading || !getMyContactData) {
    return (
      <Box
        position="absolute"
        top="50%"
        left="50%"
        sx={{ transform: 'translate(-50%, -50%)' }}
      >
        <CircularProgress disableShrink />
      </Box>
    );
  }

  return (
    <>
      <Typography variant="caption">ทั้งหมด 6</Typography>
      <Divider sx={{ width: '60px', margin: 'auto' }} />
      <DndContext
        modifiers={[restrictToVerticalAxis]}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
      >
        <SortableContext items={items}>
          {items.map((item) => (
            <ContactList
              key={item.id}
              contactId={item.id}
              contactItemId={item.contactItemId}
              name={item.ContactItem.name}
              data={item.urlUnique}
            />
          ))}
        </SortableContext>
      </DndContext>
      <Divider sx={{ width: '60px', margin: 'auto' }} />
      <Typography variant="caption" textAlign="end">
        6 / 25
      </Typography>
    </>
  );
};

export default ProfileBody;
