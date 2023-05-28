import { useCallback } from 'react';
import CardList from '@/components/CardList';
import { Box, Button, Typography, Skeleton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch } from 'react-redux';
import { editContactDynamicToggle } from '@/stores/popup';
import {
  setEditContactDynamicChild,
  setEditContactDynamicData,
} from '@/stores/parse-data/editContactDynamic';
import { Img } from 'react-image';

import phoneGrid from '@/assets/svg/phone-grid.svg';
import phoneBlock from '@/assets/svg/phone-block.svg';
import phoneSpacial from '@/assets/svg/phone-spacial.svg';

const AddContactList = ({
  id,
  name,
  defaultUri,
  androidUri,
  iosUri,
  imageIcon,
  typeLayout,
  component,
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
        component: component,
      })
    );
    dispatch(setEditContactDynamicChild({ isChild: true }));
    dispatch(editContactDynamicToggle());
  }, [dispatch, id, name, defaultUri, androidUri, iosUri, imageIcon]);

  const iconTypeContact = () => {
    switch (typeLayout) {
      case 'grid':
        return phoneGrid;
      case 'block':
        return phoneBlock;
      case 'spacial':
        return phoneSpacial;
      default:
        return null;
    }
  };

  return (
    <>
      <CardList
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
        onClick={editContactDynamicToggleHandler}
      >
        <Box display="flex" gap={1} alignItems="center">
          <Img
            src={iconTypeContact()}
            height={34}
            loader={
              <Skeleton
                animation="wave"
                variant="rounded"
                width="20px"
                height="34px"
              />
            }
            unloader={
              <Skeleton
                animation="wave"
                variant="rounded"
                width="20px"
                height="34px"
              />
            }
          />
          <Img
            src={imageIcon}
            alt=""
            width="34px"
            height="34px"
            loader={
              <Skeleton
                animation="wave"
                variant="rounded"
                width="34px"
                height="34px"
              />
            }
            unloader={
              <Skeleton
                animation="wave"
                variant="rounded"
                width="34px"
                height="34px"
              />
            }
          />
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
