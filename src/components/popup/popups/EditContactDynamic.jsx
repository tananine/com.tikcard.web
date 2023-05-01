import { useCallback, useEffect } from 'react';
import { Box, Button, Divider, TextField, Typography } from '@mui/material';
import PopupWrapper from '@/components/popup/PopupWrapper';
import { useSelector, useDispatch } from 'react-redux';
import { addContactToggle, editContactDynamicToggle } from '@/stores/popup';
import { reloadContactList } from '@/stores/reload';
import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';

import GridLayout from '@/components/layoutContact/GridLayout';
import BlockLayout from '@/components/layoutContact/BlockLayout';

import openAppUri from '@/functions/openAppUri';

import usePost from '@/hooks/axios/usePost';
import usePut from '@/hooks/axios/usePut';
import useDelete from '@/hooks/axios/useDelete';
import profileServicePath from '@/data/jsons/services/profile.service.json';

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import toast from 'react-hot-toast';

const EditContact = () => {
  const { register, handleSubmit, setValue, getValues, watch } = useForm();
  watch();

  const [addContactAction, addContactLoading] = usePost(
    profileServicePath.contactData
  );
  const [updateContactAction, updateContactLoading] = usePut(
    profileServicePath.contactData
  );
  const [deleteContactAction, deleteContactLoading] = useDelete(
    profileServicePath.contactData
  );

  const addContactListHeight = useSelector(
    (state) => state.layout.addContactListHeight
  );

  const appData = {
    contactId: useSelector((state) => state.editContactDynamic.data.contactId),
    contactItemId: useSelector(
      (state) => state.editContactDynamic.data.contactItemId
    ),
    name: useSelector((state) => state.editContactDynamic.data.name),
    dataItem: useSelector((state) => state.editContactDynamic.data.dataItem),
    imageIcon: useSelector((state) => state.editContactDynamic.data.imageIcon),
    uri: useSelector((state) => state.editContactDynamic.data.uri),
    typeLayout: useSelector(
      (state) => state.editContactDynamic.data.typeLayout
    ),
  };

  const isChild = useSelector((state) => state.editContactDynamic.isChild);

  const open = useSelector((state) => state.popup.editContactDynamicPopup);

  const dispatch = useDispatch();

  useEffect(() => {
    if (open) {
      setValue('name', appData.dataItem?.name);
      setValue('data', appData.dataItem?.data);
      setValue('note', appData.dataItem?.note);
    }
  }, [setValue, appData.data, open]);

  const editContactDynamicToggleHandler = useCallback(() => {
    dispatch(editContactDynamicToggle());
  }, [dispatch]);

  const closePopupHandler = () => {
    dispatch(editContactDynamicToggle());
    dispatch(reloadContactList());
  };

  const save = (form) => {
    const body = {
      contactId: appData.contactId,
      contactItemId: appData.contactItemId,
      name: form.name,
      data: form.data,
      note: form.note,
    };
    if (appData.contactId) {
      return updateContactAction(body).then(() => {
        closePopupHandler();
        toast.success('แก้ไขสำเร็จ');
      });
    }
    return addContactAction(body).then(() => {
      closePopupHandler();
      dispatch(addContactToggle());
      toast.success('เพิ่มสำเร็จ');
    });
  };

  const deleteContact = () => {
    deleteContactAction(appData.contactId).then(() => {
      closePopupHandler();
      toast.success('ลบสำเร็จ');
    });
  };

  const goContact = () => {
    if (getValues('data')) {
      openAppUri(
        appData.uri.defaultUri,
        appData.uri.androidUri,
        appData.uri.iosUri,
        getValues('data')
      );
    } else {
      alert('กรุณากรอกข้อมูลติดต่อ');
    }
  };

  const layoutContact = () => {
    if (appData.typeLayout === 'grid') {
      return (
        <Box width={70} marginY={2} marginX="auto">
          <GridLayout imageIcon={appData.imageIcon} title={appData.name} />
        </Box>
      );
    } else if (appData.typeLayout === 'block') {
      return (
        <Box marginY={2}>
          <BlockLayout
            title={appData.name}
            imageIcon={appData.imageIcon}
            name={getValues('name')}
            note={getValues('note')}
          />
        </Box>
      );
    }
  };

  const fieldInput = () => {
    if (appData.typeLayout === 'grid') {
      return (
        <TextField
          label={appData.name}
          variant="outlined"
          fullWidth
          InputLabelProps={{ shrink: true }}
          {...register('data')}
        />
      );
    } else if (appData.typeLayout === 'block') {
      return (
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="ชื่อ"
            variant="outlined"
            fullWidth
            InputLabelProps={{ shrink: true }}
            {...register('name')}
          />
          <TextField
            label={appData.name}
            variant="outlined"
            fullWidth
            InputLabelProps={{ shrink: true }}
            {...register('data')}
          />
          <TextField
            label="รายละเอียด"
            fullWidth
            InputLabelProps={{ shrink: true }}
            {...register('note')}
          />
        </Box>
      );
    }
  };

  return (
    <PopupWrapper
      open={open}
      onClose={editContactDynamicToggleHandler}
      onOpen={editContactDynamicToggleHandler}
    >
      <Box
        height={isChild ? `calc(${addContactListHeight}px - 38px)` : 'auto'}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Box>
          <Box
            display="flex"
            justifyContent="space-between"
            position="sticky"
            top={0}
            bgcolor="#ffffff"
            zIndex={2}
          >
            <Typography variant="h2">{appData.name}</Typography>
            <Button onClick={goContact}>ตัวอย่างเมื่อคลิก</Button>
          </Box>
          {layoutContact()}
          <Divider sx={{ marginBottom: 2 }}>
            <Button
              sx={{
                display: 'flex',
                marginLeft: 'auto',
              }}
              endIcon={<InfoOutlinedIcon />}
            >
              ดูวิธีใส่ข้อมูล {appData.name}
            </Button>
          </Divider>

          {fieldInput()}
        </Box>
        {appData.contactId && (
          <Box textAlign="center">
            <LoadingButton
              variant="text"
              color="error"
              sx={{ marginY: 2 }}
              onClick={deleteContact}
              loading={deleteContactLoading}
            >
              ลบ
            </LoadingButton>
          </Box>
        )}
        <Box
          position="sticky"
          bottom={0}
          paddingY={1}
          bgcolor="#ffffff"
          zIndex={2}
        >
          <LoadingButton
            variant="contained"
            color="secondary"
            size="large"
            fullWidth
            onClick={handleSubmit(save)}
            loading={addContactLoading || updateContactLoading}
          >
            บันทึก
          </LoadingButton>
        </Box>
      </Box>
    </PopupWrapper>
  );
};

export default EditContact;
