import { useEffect } from 'react';
import { Typography, CircularProgress, Box, Divider } from '@mui/material';
import { useSelector } from 'react-redux';

import ProfileAccordion from '@/pages/connection/body/profileAccordion';

import useGet from '@/hooks/axios/useGet';
import profileServicePath from '@/data/jsons/services/profile.service.json';

const profileConnectionList = (
  profiles,
  profileActivationId,
  primaryProfile,
  secondaryProfile
) => {
  const primaryProfileData = profiles?.find(
    (item) => item.id === primaryProfile
  );
  const secondaryProfileData = profiles?.find(
    (item) => item.id === secondaryProfile
  );

  const dataWithOutPrimarySecondary = profiles?.filter(
    (item) => item.id !== primaryProfile && item.id !== secondaryProfile
  );

  return (
    <>
      {primaryProfileData && (
        <>
          <Typography variant="body2" mb={1}>
            นามบัตร 1
          </Typography>
          <ProfileAccordion data={primaryProfileData} />
        </>
      )}
      {secondaryProfileData && (
        <>
          <Typography variant="body2" mt={2} mb={1}>
            นามบัตร 2
          </Typography>
          <ProfileAccordion data={secondaryProfileData} />
        </>
      )}
      {dataWithOutPrimarySecondary?.length > 0 && (
        <>
          <Typography variant="body2" mt={5} mb={1}>
            นามบัตรอื่น
          </Typography>
          {dataWithOutPrimarySecondary?.map((profile) => {
            return <ProfileAccordion key={profile.id} data={profile} />;
          })}
        </>
      )}
    </>
  );
};

const ConnectionBody = () => {
  const [
    getAllConnectListAction,
    getAllConnectListLoading,
    getAllConnectListData,
  ] = useGet(profileServicePath.getAllConnectList);

  const profileActivationId = useSelector(
    (state) => state.controller.profileInUse.profileId
  );

  const primaryProfile = useSelector(
    (state) => state.account.activation.primaryProfile
  );
  const secondaryProfile = useSelector(
    (state) => state.account.activation.secondaryProfile
  );

  useEffect(() => {
    if (profileActivationId) {
      getAllConnectListAction();
    }
  }, [getAllConnectListAction]);

  return (
    <>
      <Typography variant="h1" mb={2}>
        สมุดรายชื่อ
      </Typography>
      {getAllConnectListLoading ? (
        <Box display="flex" justifyContent="center" marginTop={4}>
          <CircularProgress disableShrink />
        </Box>
      ) : (
        profileConnectionList(
          getAllConnectListData?.data,
          profileActivationId,
          primaryProfile,
          secondaryProfile
        )
      )}
    </>
  );
};

export default ConnectionBody;
