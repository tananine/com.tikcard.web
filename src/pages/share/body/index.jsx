import { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import copy from 'copy-to-clipboard';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import useGet from '@/hooks/axios/useGet';
import profileServicePath from '@/data/jsons/services/profile.service.json';

import { QRCodeSVG } from 'qrcode.react';

import toast from 'react-hot-toast';

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

  const copyClipboard = () => {
    copy(link);
    toast.success('คัดลอกลิงค์');
  };

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
              onClick={copyClipboard}
            >
              {link}
            </Button>
          </Box>
        </>
      )}
    </>
  );
};

export default ShareBody;
