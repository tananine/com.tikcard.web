import { Box, Button, Typography } from '@mui/material';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import WifiOffIcon from '@mui/icons-material/WifiOff';
import DownloadIcon from '@mui/icons-material/Download';
import ShareIcon from '@mui/icons-material/Share';

import QRCode from 'assets/images/qr-code.png';

const ShareBody = () => {
  return (
    <>
      <Box textAlign="center">
        <img src={QRCode} alt="" width="180px" height="180px" />
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
          app.vickq.com/xEQlrnej
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
  );
};

export default ShareBody;
