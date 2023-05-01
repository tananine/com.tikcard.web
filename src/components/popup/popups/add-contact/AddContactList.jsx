import { useCallback } from 'react';
import CardList from '@/components/CardList';
import { Box, Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch } from 'react-redux';
import { editContactDynamicToggle } from '@/stores/popup';
import {
  setEditContactDynamicChild,
  setEditContactDynamicData,
} from '@/stores/parse-data/editContactDynamic';

const AddContactList = ({
  id,
  name,
  defaultUri,
  androidUri,
  iosUri,
  imageIcon,
  typeLayout,
}) => {
  const dispatch = useDispatch();

  const editContactDynamicToggleHandler = useCallback(() => {
    dispatch(
      setEditContactDynamicData({
        contactItemId: id,
        name: name,
        imageIcon: imageIcon,
        uri: {
          defaultUri: defaultUri,
          androidUri: androidUri,
          iosUri: iosUri,
        },
        typeLayout: typeLayout,
      })
    );
    dispatch(setEditContactDynamicChild({ isChild: true }));
    dispatch(editContactDynamicToggle());
  }, [dispatch, id, name, defaultUri, androidUri, iosUri, imageIcon]);

  return (
    <>
      <CardList
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          border:
            typeLayout === 'block' ? '1px solid #c2c2c2' : '1px solid #ffffff',
        }}
        onClick={editContactDynamicToggleHandler}
      >
        <Box display="flex" gap={1} alignItems="center">
          <img src={imageIcon} alt="" width="34px" height="34px" />
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
