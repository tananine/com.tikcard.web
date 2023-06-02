import { useRef, useCallback, useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import Flicking from '@egjs/react-flicking';
import '@egjs/react-flicking/dist/flicking.css';
import { useSelector, useDispatch } from 'react-redux';
import { switchProfileToggle, addProfileToggle } from '@/stores/popup';
import { reloadCurrentProfile } from '@/stores/reload';
import { setSwitchProfileHeight } from '@/stores/offset';
import PopupWrapper from '@/components/popup/PopupWrapper';
import Profile from '@/components/popup/popups/switch-profile/Profile';
import { LoadingButton } from '@mui/lab';
import { setPrimaryProfile, setSecondaryProfile } from '@/stores/account';

import usePut from '@/hooks/axios/usePut';
import useDelete from '@/hooks/axios/useDelete';
import profileServicePath from '@/data/jsons/services/profile.service.json';

import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import PersonIcon from '@mui/icons-material/Person';
import DeleteIcon from '@mui/icons-material/Delete';

import toast from 'react-hot-toast';

const ButtonStatus = (
  flickingMove,
  edit,
  isPrimaryProfile,
  isSecondaryProfile
) => {
  if (flickingMove) {
    return <CircularProgress color="black" size={20} />;
  } else if (edit && (isPrimaryProfile || isSecondaryProfile)) {
    return <>ไม่สามารถลบได้</>;
  } else if (edit) {
    return <>ลบ</>;
  } else {
    return <>เลือก</>;
  }
};

const ProfileCard = (
  profiles,
  selectProfileId,
  isScanDouble,
  primaryProfile,
  secondaryProfile
) => {
  return profiles.map((profile) => {
    const { profileId, profileImage, logoImage, cardName, name, company } =
      profile;

    const isSelect = selectProfileId === profile.profileId;

    const isPrimary = primaryProfile === profile.profileId;
    const isSecondary = secondaryProfile === profile.profileId;

    return (
      <Box key={profileId} width="80%" paddingTop={1} marginX={1}>
        <Profile
          profileImage={profileImage}
          logoImage={logoImage}
          cardName={cardName}
          name={name}
          company={company}
          isSelect={isSelect}
          isScanDouble={isScanDouble}
          isPrimary={isPrimary}
          isSecondary={isSecondary}
        />
      </Box>
    );
  });
};

const SwitchProfile = () => {
  const flickingRef = useRef();

  const [edit, setEdit] = useState(false);

  const editToggleHandler = useCallback(() => {
    setEdit((prev) => !prev);
  }, [setEdit]);

  const [setPrimaryAction, setPrimaryLoading] = usePut(
    profileServicePath.setPrimaryProfile,
    false
  );
  const [setSecondaryAction, setSecondaryLoading] = usePut(
    profileServicePath.setSecondaryProfile,
    false
  );
  const [removeProfileAction, removeProfileLoading] = useDelete(
    profileServicePath.getProfile,
    false
  );

  const isScanDouble = useSelector((state) => state.device.isScanDouble);
  const primaryProfile = useSelector(
    (state) => state.account.activation.primaryProfile
  );
  const secondaryProfile = useSelector(
    (state) => state.account.activation.secondaryProfile
  );

  const [profileId, setProfileId] = useState();
  const [indexFlicking, setIndexFlicking] = useState();
  const [disableButton, setDisableButton] = useState();
  const [flickingMove, setFlickingMove] = useState();

  const open = useSelector((state) => state.popup.switchProfilePopup);
  const profiles = useSelector((state) => state.account.profiles);
  const selectProfileId = useSelector(
    (state) => state.controller.profileInUse.profileId
  );
  const type = useSelector(
    (state) => state.controller.profileInUse.profileState
  );

  const isPrimaryProfile =
    profiles[indexFlicking]?.profileId === primaryProfile;
  const isSecondaryProfile =
    profiles[indexFlicking]?.profileId === secondaryProfile;

  const isSelectHandler = useCallback(() => {
    if (profiles[indexFlicking]?.profileId === selectProfileId) {
      setDisableButton(true);
    } else if ((isPrimaryProfile || isSecondaryProfile) && edit) {
      setDisableButton(true);
    } else {
      setDisableButton(false);
      setProfileId(profiles[indexFlicking]?.profileId);
    }
  }, [
    indexFlicking,
    profiles,
    selectProfileId,
    primaryProfile,
    secondaryProfile,
    edit,
  ]);

  const changeIndexToSelected = useCallback(() => {
    const select = profiles.findIndex(
      (item) => item.profileId === selectProfileId
    );
    if (flickingRef.current && select > -1) {
      flickingRef.current.moveTo(select, 0);
    }
  }, [profiles, selectProfileId]);

  useEffect(() => {
    isSelectHandler();
  }, [isSelectHandler]);

  useEffect(() => {
    if (profiles.length > 0 && open) {
      setEdit(false);
      changeIndexToSelected();
    }
  }, [changeIndexToSelected, profiles, open]);

  const dispatch = useDispatch();

  const switchProfileToggleHandler = useCallback(() => {
    dispatch(switchProfileToggle());
  }, [dispatch]);

  const addProfileToggleHandler = useCallback(() => {
    dispatch(addProfileToggle());
  }, [dispatch]);

  const setProfileHandler = useCallback(async () => {
    if (type === 'primary') {
      await setPrimaryAction({}, profileId).then(() => {
        dispatch(setPrimaryProfile(profileId));
        toast.success('เปลี่ยนสำเร็จ');
      });
    } else if (type === 'secondary') {
      await setSecondaryAction({}, profileId).then(() => {
        dispatch(setSecondaryProfile(profileId));
        toast.success('เปลี่ยนสำเร็จ');
      });
    }
    dispatch(switchProfileToggle());
  }, [dispatch, setPrimaryAction, setSecondaryAction, profileId, type]);

  const flickingChanged = (e) => {
    setIndexFlicking(e.index);
  };

  const switchProfilePopupRef = useRef();

  useEffect(() => {
    if (switchProfilePopupRef.current && open) {
      dispatch(
        setSwitchProfileHeight(switchProfilePopupRef.current.offsetHeight)
      );
    }
  }, [dispatch, open, switchProfilePopupRef]);

  const removeProfileHandler = useCallback(() => {
    if (confirm('คุณต้องการจะลบใช่หรือไม่ ?')) {
      removeProfileAction(profileId).then(() => {
        dispatch(reloadCurrentProfile());
        switchProfileToggleHandler();
        toast.success('ลบสำเร็จ');
      });
    }
  }, [removeProfileAction, profileId]);

  return (
    <PopupWrapper
      forwardedRef={switchProfilePopupRef}
      open={open}
      onClose={switchProfileToggleHandler}
      onOpen={switchProfileToggleHandler}
    >
      <Box
        marginBottom={1}
        display="flex"
        justifyContent="space-between"
        alignItems="baseline"
      >
        {edit ? (
          <Box display="flex" alignSelf="center" gap={0.5}>
            <DeleteIcon color="error" />
            <Typography variant="h4">เลือกลบนามบัตร</Typography>
          </Box>
        ) : (
          <Box display="flex" alignSelf="center" gap={0.5}>
            <PersonIcon />
            <Typography variant="h4">กระเป๋านามบัตร</Typography>
          </Box>
        )}
        {edit ? (
          <Button onClick={editToggleHandler} color="error">
            ยกเลิก
          </Button>
        ) : (
          <Button onClick={editToggleHandler}>ลบนามบัตร</Button>
        )}
      </Box>
      <Flicking
        ref={flickingRef}
        onChanged={flickingChanged}
        onMoveStart={() => setFlickingMove(true)}
        onMoveEnd={() => setFlickingMove(false)}
      >
        {ProfileCard(
          profiles,
          selectProfileId,
          isScanDouble,
          primaryProfile,
          secondaryProfile
        )}
        {selectProfileId && (
          <Box key={99} width="80%" paddingTop={1} marginX={1}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              border={4}
              borderColor="#f7f7f7"
              borderRadius={4}
              padding={3}
              height={212}
            >
              <Box display="inline" textAlign="center">
                <PersonAddAltRoundedIcon
                  sx={{ fontSize: 58, color: '#cfd4da' }}
                />
              </Box>
            </Box>
          </Box>
        )}
      </Flicking>
      {indexFlicking === profiles.length ? (
        <LoadingButton
          variant="contained"
          fullWidth
          size="large"
          color="secondary"
          loading={flickingMove}
          disabled={edit}
          sx={{
            marginTop: 2,
          }}
          onClick={addProfileToggleHandler}
        >
          เพิ่มนามบัตร
        </LoadingButton>
      ) : (
        <LoadingButton
          variant="contained"
          fullWidth
          size="large"
          color={edit ? 'error' : 'secondary'}
          sx={{
            marginTop: 2,
          }}
          onClick={edit ? removeProfileHandler : setProfileHandler}
          disabled={disableButton || flickingMove}
          loading={
            setPrimaryLoading || setSecondaryLoading || removeProfileLoading
          }
        >
          {ButtonStatus(
            flickingMove,
            edit,
            isPrimaryProfile,
            isSecondaryProfile
          )}
        </LoadingButton>
      )}
    </PopupWrapper>
  );
};

export default SwitchProfile;
