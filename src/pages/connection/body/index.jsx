import { useEffect } from 'react';
import { Typography, CircularProgress, Box } from '@mui/material';
import { useSelector } from 'react-redux';

import ProfileAccordion from '@/pages/connection/body/profileAccordion';

import useGet from '@/hooks/axios/useGet';
import profileServicePath from '@/data/jsons/services/profile.service.json';

const profileConnectionList = (profiles) => {
  return profiles?.map((profile) => {
    return <ProfileAccordion key={profile.id} data={profile} />;
  });
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

  useEffect(() => {
    if (profileActivationId) {
      getAllConnectListAction();
    }
  }, [getAllConnectListAction]);

  return (
    <>
      <Typography variant="h1" mb={2}>
        รายชื่อ
      </Typography>
      {getAllConnectListLoading ? (
        <Box display="flex" justifyContent="center" marginTop={4}>
          <CircularProgress disableShrink />
        </Box>
      ) : (
        profileConnectionList(getAllConnectListData?.data)
      )}
    </>
  );
};

export default ConnectionBody;
