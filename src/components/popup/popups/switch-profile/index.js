import { useRef, useCallback, useEffect, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import Flicking from '@egjs/react-flicking';
import '@egjs/react-flicking/dist/flicking.css';
import { Perspective } from '@egjs/flicking-plugins';
import { useSelector, useDispatch } from 'react-redux';
import { switchProfileToggle } from 'stores/popup';
import PopupWrapper from 'components/popup/PopupWrapper';
import Profile from 'components/popup/popups/switch-profile/Profile';
import { LoadingButton } from '@mui/lab';
import { setPrimaryProfile, setSecondaryProfile } from 'stores/account';

import usePut from 'hooks/axios/usePut';
import profileServicePath from 'data/jsons/services/profile.service.json';

const ButtonStatus = (flickingMove, disableButton) => {
  if (flickingMove) {
    return <CircularProgress color="black" size={20} />;
  } else if (disableButton) {
    return 'กำลังใช้งาน';
  } else {
    return 'เลือก';
  }
};

const ProfileCard = (profiles, selectProfileId) => {
  return profiles.map((profile) => {
    const isSelect = selectProfileId === profile.profileId;

    return (
      <Box key={profile.profileId} width="70%" paddingTop={1}>
        <Profile
          profileName={profile.profileName}
          company={profile.company}
          isSelect={isSelect}
        />
      </Box>
    );
  });
};

const SwitchProfile = () => {
  const plugins = [new Perspective({ rotate: 0, scale: 0.3 })];
  const flickingRef = useRef();

  const [setPrimaryAction, setPrimaryLoading] = usePut(
    profileServicePath.setPrimaryProfile
  );
  const [setSecondaryAction, setSecondaryLoading] = usePut(
    profileServicePath.setSecondaryProfile
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
  const type = useSelector((state) => state.controller.profileInUse.profile);

  const isSelectHandler = useCallback(() => {
    if (profiles[indexFlicking]?.profileId === selectProfileId) {
      setDisableButton(true);
    } else {
      setDisableButton(false);
      setProfileId(profiles[indexFlicking]?.profileId);
    }
  }, [indexFlicking, profiles, selectProfileId]);

  const changeIndexToSelected = useCallback(() => {
    const select = profiles.findIndex(
      (item) => item.profileId === selectProfileId
    );
    if (flickingRef.current) {
      flickingRef.current.moveTo(select, 0);
    }
  }, [profiles, selectProfileId]);

  useEffect(() => {
    isSelectHandler();
  }, [isSelectHandler]);

  useEffect(() => {
    if (profiles.length > 0 && open) {
      changeIndexToSelected();
    }
  }, [changeIndexToSelected, profiles, open]);

  const dispatch = useDispatch();

  const switchProfileToggleHandler = useCallback(() => {
    dispatch(switchProfileToggle());
  }, [dispatch]);

  const setProfileHandler = useCallback(() => {
    if (type === 'primary') {
      setPrimaryAction({}, profileId).then(() => {
        dispatch(setPrimaryProfile(profileId));
        dispatch(switchProfileToggle());
      });
    } else if (type === 'secondary') {
      setSecondaryAction({}, profileId).then(() => {
        dispatch(setSecondaryProfile(profileId));
        dispatch(switchProfileToggle());
      });
    }
  }, [dispatch, setPrimaryAction, setSecondaryAction, profileId, type]);

  const flickingChanged = (e) => {
    setIndexFlicking(e.index);
  };

  return (
    <PopupWrapper
      open={open}
      onClose={switchProfileToggleHandler}
      onOpen={switchProfileToggleHandler}
    >
      <Flicking
        ref={flickingRef}
        onWillChange={flickingChanged}
        onMoveStart={() => setFlickingMove(true)}
        onMoveEnd={() => setFlickingMove(false)}
        plugins={plugins}
      >
        {ProfileCard(profiles, selectProfileId)}
      </Flicking>
      <LoadingButton
        variant="contained"
        fullWidth
        size="large"
        color="secondary"
        sx={{
          marginTop: 2,
        }}
        onClick={setProfileHandler}
        disabled={disableButton || flickingMove}
        loading={setPrimaryLoading}
      >
        {ButtonStatus(flickingMove, disableButton)}
      </LoadingButton>
    </PopupWrapper>
  );
};

export default SwitchProfile;
