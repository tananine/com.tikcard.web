import { useState, useCallback, useEffect } from 'react';
import { DndContext } from '@dnd-kit/core';
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Typography,
} from '@mui/material';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import ContactList from '@/pages/profile/body/ContactList';
import { useSelector, useDispatch } from 'react-redux';
import { setShowFooter, setHideFooter } from '@/stores/offset';
import { addContactToggle } from '@/stores/popup';
import { Img } from 'react-image';

import useGet from '@/hooks/axios/useGet';
import usePut from '@/hooks/axios/usePut';
import profileServicePath from '@/data/jsons/services/profile.service.json';

import SuccessImage from '@/assets/images/success.png';

const ProfileBody = () => {
  const [items, setItems] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const dispatch = useDispatch();

  const [sortContactAction] = usePut(profileServicePath.sortContact, false);

  const getIndex = useCallback(
    (id) => {
      return items
        .map((item) => {
          return item.id;
        })
        .indexOf(id);
    },
    [items]
  );
  const activeIndex = activeId ? getIndex(activeId) : -1;

  const handleDragStart = useCallback(
    ({ active }) => {
      dispatch(setHideFooter());
      if (!active) {
        return;
      }
      setActiveId(active.id);
    },
    [dispatch]
  );

  const handleDragEnd = useCallback(
    ({ over }) => {
      dispatch(setShowFooter());
      setActiveId(null);
      if (over) {
        const overIndex = getIndex(over.id);
        if (activeIndex !== overIndex) {
          setItems((items) => arrayMove(items, activeIndex, overIndex));
          const body = {
            contactId: items[activeIndex].id,
            afterContactId:
              activeIndex > overIndex
                ? items[overIndex - 1]?.id
                : items[overIndex]?.id,
          };
          sortContactAction(body).catch(() => {
            setItems((items) => arrayMove(items, overIndex, activeIndex));
          });
        }
      }
    },
    [dispatch, activeIndex, getIndex, items, sortContactAction]
  );

  const [getMyContactAction, getMyContactLoading] = useGet(
    profileServicePath.getMyContact,
    true
  );

  const profileActivationId = useSelector(
    (state) => state.controller.profileInUse.profileId
  );
  const reloadContactList = useSelector((state) => state.reload.contactList);

  useEffect(() => {
    setItems([]);
    if (profileActivationId) {
      getMyContactAction().then((res) => {
        setItems(res.data);
      });
    }
  }, [getMyContactAction, profileActivationId, reloadContactList]);

  const addContactToggleHandler = useCallback(() => {
    dispatch(addContactToggle());
  }, [dispatch]);

  if (getMyContactLoading) {
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

  if (items.length === 0) {
    return (
      <Box marginTop={2} textAlign="center">
        <Typography>นามบัตรนี้ยังไม่มีข้อมูลติดต่อของคุณ</Typography>
        <Button
          variant="text"
          fontWeight={600}
          sx={{ margin: 2 }}
          onClick={addContactToggleHandler}
        >
          เพิ่มข้อมูลติดต่อ
        </Button>
        <Img src={SuccessImage} alt="" width="100%" />
      </Box>
    );
  }

  return (
    <>
      <Box pl={1} pr={2} display="flex" justifyContent="space-between">
        <Typography variant="caption">จัดเรียง</Typography>
        <Divider sx={{ width: '60px', margin: 'auto' }} />
        <Typography variant="caption">ซ่อน</Typography>
      </Box>
      <DndContext
        modifiers={[restrictToVerticalAxis]}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items}>
          {items.map((item) => (
            <ContactList
              key={item.id}
              contactId={item.id}
              contactItem={item.ContactItem}
              dataItem={item}
              show={item.show}
            />
          ))}
        </SortableContext>
      </DndContext>
      <Box height={50} />
    </>
  );
};

export default ProfileBody;
