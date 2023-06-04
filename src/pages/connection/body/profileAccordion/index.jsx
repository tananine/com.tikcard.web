import { useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Avatar,
  Box,
  Badge,
  Skeleton,
} from '@mui/material';
import { Img } from 'react-image';

import ConnectionItem from '@/pages/connection/body/profileAccordion/ConnectionItem';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import profile1sim from '@/assets/svg/profile-1-sim.svg';
import profile2sim from '@/assets/svg/profile-2-sim.svg';

const ConnectionList = (connections, increaseAmountDestroy) => {
  const [list, setList] = useState(connections);

  const removeConnection = (id) => {
    setList((prev) => {
      return prev.filter((item) => item.id !== id);
    });
    increaseAmountDestroy();
  };

  if (!list.length) {
    return (
      <Typography textAlign="center" variant="body2">
        ไม่มีรายชื่อ
      </Typography>
    );
  }

  return list.map((connection) => {
    return (
      <ConnectionItem
        key={connection.id}
        data={connection}
        removeConnection={removeConnection}
      />
    );
  });
};

const ProfileAccordion = ({ data, role }) => {
  const [amountDestroy, setAmountDestroy] = useState(0);

  const increaseAmountDestroy = () => {
    setAmountDestroy((prev) => (prev += 1));
  };

  const dataLength = data.Connections.length - amountDestroy;

  const statusActivate = () => {
    if (role === 'equal') {
      return (
        <Box display="flex" gap={0.3}>
          <img src={profile1sim} height="16px" />
          <img src={profile2sim} height="16px" />
        </Box>
      );
    } else if (role === 'primary') {
      return <img src={profile1sim} height="16px" />;
    } else if (role === 'secondary') {
      return <img src={profile2sim} height="16px" />;
    }
  };

  return (
    <Accordion
      disableGutters
      sx={{
        boxShadow: 'none',
        border: '1px solid #e7e7e7',
        borderRadius: '25px !important',
        marginBottom: 1,
        '&:before': {
          display: 'none',
        },
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Box display="flex" gap={2} alignItems="center">
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            badgeContent={
              data.Info.logoImage && (
                <Avatar
                  sx={{ width: 26, height: 26, border: '2px solid #ffffff' }}
                >
                  <Img
                    src={data.Info.logoImage}
                    alt=""
                    width="100%"
                    height="100%"
                    loader={
                      <Skeleton
                        animation="wave"
                        variant="rounded"
                        width="100%"
                        height="100%"
                      />
                    }
                    unloader={
                      <Skeleton
                        animation="wave"
                        variant="rounded"
                        width="100%"
                        height="100%"
                      />
                    }
                  />
                </Avatar>
              )
            }
          >
            <Avatar sx={{ width: 46, height: 46 }}>
              <Img
                src={data.Info.profileImage}
                alt=""
                width="100%"
                height="100%"
                loader={
                  <Skeleton
                    animation="wave"
                    variant="rounded"
                    width="100%"
                    height="100%"
                  />
                }
                unloader={
                  <Skeleton
                    animation="wave"
                    variant="rounded"
                    width="100%"
                    height="100%"
                  />
                }
              />
            </Avatar>
          </Badge>
          <Box>
            <Box display="flex" gap={0.6} alignItems="center">
              {role && statusActivate()}
              <Typography variant="h5">{data.name}</Typography>
            </Box>
            <Typography variant="caption" fontWeight={500}>
              {dataLength} รายชื่อ
            </Typography>
          </Box>
        </Box>
      </AccordionSummary>
      <AccordionDetails sx={{ paddingX: 2, paddingTop: 1, paddingBottom: 1 }}>
        {ConnectionList(data.Connections, increaseAmountDestroy)}
      </AccordionDetails>
    </Accordion>
  );
};

export default ProfileAccordion;
