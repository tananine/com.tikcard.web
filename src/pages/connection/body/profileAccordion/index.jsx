import { useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Avatar,
  Box,
  Badge,
} from '@mui/material';

import ConnectionItem from '@/pages/connection/body/profileAccordion/ConnectionItem';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
              <Avatar
                sx={{ width: 26, height: 26, border: '2px solid #ffffff' }}
                src={data.Info.logoImage}
              />
            }
          >
            <Avatar
              sx={{ width: 46, height: 46 }}
              src={data.Info.profileImage}
            />
          </Badge>
          <Box>
            <Typography variant="h5">{data.name}</Typography>
            <Typography variant="caption" fontWeight={500}>
              {dataLength} รายชื่อ
            </Typography>
            {role && (
              <Box display="flex" alignItems="center" gap={1}>
                <Box
                  sx={{
                    borderRadius: '50%',
                    backgroundColor: 'lightgreen',
                    width: '6px',
                    height: '6px',
                  }}
                />
                <Typography variant="caption">
                  ใช้งานในนามบัตร {role === 'primary' ? 1 : 2}
                </Typography>
              </Box>
            )}
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
