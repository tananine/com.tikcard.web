import { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Typography } from '@mui/material';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import WifiOffIcon from '@mui/icons-material/WifiOff';
import DownloadIcon from '@mui/icons-material/Download';
import ShareIcon from '@mui/icons-material/Share';

import useGet from '@/hooks/axios/useGet';
import profileServicePath from '@/data/jsons/services/profile.service.json';

import { QRCodeSVG } from 'qrcode.react';

const ShareBody = () => {
  const [link, setLink] = useState('');

  const [getLinkAction, getLinkLoading, getLinkData] = useGet(
    profileServicePath.getLink
  );

  useEffect(() => {
    getLinkAction().then((res) => {
      setLink('info.vickq.com/' + res.data.linkId);
    });
  }, [getLinkAction]);

  return (
    <>
      {getLinkLoading || !getLinkData ? (
        <Box display="flex" justifyContent="center" marginTop={4}>
          <CircularProgress disableShrink />
        </Box>
      ) : (
        <>
          <Box textAlign="center">
            <QRCodeSVG value={link} />
          </Box>
          <Typography variant="h2" textAlign="center">
            QR Code ของฉัน
          </Typography>
          <Box marginTop={2} display="flex" flexDirection="column" gap={1}>
            <Button
              variant="contained"
              fullWidth
              endIcon={<ContentCopyIcon />}
              sx={{ marginBottom: 2, justifyContent: 'space-between' }}
            >
              {link}
            </Button>
            <Button
              variant="contained"
              fullWidth
              startIcon={<WifiOffIcon />}
              sx={{ justifyContent: 'flex-start' }}
            >
              QR Code แบบไม่ใช้อินเตอร์เน็ต
            </Button>
            <Button
              variant="contained"
              fullWidth
              startIcon={<DownloadIcon />}
              sx={{ justifyContent: 'flex-start' }}
            >
              บันทึกลงเครื่อง
            </Button>
            <Button
              variant="contained"
              fullWidth
              startIcon={<ShareIcon />}
              sx={{ justifyContent: 'flex-start' }}
            >
              แชร์
            </Button>
          </Box>
        </>
      )}
    </>
  );
};

export default ShareBody;
