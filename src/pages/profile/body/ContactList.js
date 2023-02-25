import { useCallback } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Box, Switch, Typography } from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import CardList from 'components/CardList';
import { useDispatch } from 'react-redux';
import { editContactDynamicToggle } from 'stores/popup';
import { setEditContactDynamicChild } from 'stores/parse-data/editContactDynamic';

import PhoneAPP from 'assets/images/phone.png';

const ContactList = ({ id }) => {
  const dispatch = useDispatch();

  const editContactDynamicToggleHandler = useCallback(() => {
    dispatch(setEditContactDynamicChild({ isChild: false }));
    dispatch(editContactDynamicToggle());
  }, [dispatch]);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });

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
          <Box display="flex" alignItems="center" flexGrow={1} gap={2}>
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
              sx={{ cursor: 'pointer' }}
              onClick={editContactDynamicToggleHandler}
            >
              <img src={PhoneAPP} alt="" width="46px" height="46px" />
              <Box>
                <Typography variant="h3" lineHeight="26.5px">
                  Phone
                </Typography>
                <Typography variant="caption">01 2345 6789</Typography>
              </Box>
            </Box>
          </Box>
          <Switch size="small" defaultChecked />
        </Box>
      </CardList>
    </>
  );
};

export default ContactList;
