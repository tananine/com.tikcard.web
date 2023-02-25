import { useCallback } from 'react';
import CardList from 'components/CardList';
import { Box, Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch } from 'react-redux';
import { editContactDynamicToggle } from 'stores/popup';
import { setEditContactDynamicData } from 'stores/parse-data/editContactDynamic';

import PhoneAPP from 'assets/images/phone.png';

const AddContactList = ({ name }) => {
  const dispatch = useDispatch();

  const editContactDynamicToggleHandler = useCallback(() => {
    dispatch(setEditContactDynamicData({ isChild: true }));
    dispatch(editContactDynamicToggle());
  }, [dispatch]);

  return (
    <>
      <CardList
        sx={{ display: 'flex', justifyContent: 'space-between' }}
        onClick={editContactDynamicToggleHandler}
      >
        <Box display="flex" gap={1} alignItems="center">
          <img src={PhoneAPP} alt="" width="34px" height="34px" />
          <Typography variant="h4">{name}</Typography>
        </Box>
        <Button startIcon={<AddIcon />} variant="contained" size="small">
          เพิ่ม
        </Button>
      </CardList>
    </>
  );
};

export default AddContactList;
