import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Skeleton,
  Typography,
} from '@mui/material';
import { Img } from 'react-image';

import Logo from '@/assets/images/logo.png';

const ComingLanding = () => {
  return (
    <Container>
      <Paper
        elevation={3}
        sx={{
          height: '100svh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Box mb={2} padding={2} display="grid" gap={2} overflow="auto">
          <Img
            src={Logo}
            alt=""
            height="32px"
            loader={
              <Skeleton
                animation="wave"
                variant="rounded"
                width="120px"
                height="32px"
                sx={{ margin: 'auto' }}
              />
            }
            style={{ margin: 'auto' }}
          />
          <Typography variant="h5" textAlign="center">
            Tikcard Official Website
          </Typography>
          <Typography textAlign="center">พบกับเว็บไซต์ใหม่เร็วๆนี้</Typography>
          <Divider sx={{ marginY: 1 }} />
          <Typography textAlign="center">ตอนนี้คุณสามารถ</Typography>
          <Button
            variant="contained"
            size="small"
            fullWidth
            onClick={() => window.open('/tikcard', '_blank')}
          >
            ดูตัวอย่างนามบัตร
          </Button>
          <Typography textAlign="center">หรือ</Typography>
          <Button
            variant="contained"
            size="small"
            fullWidth
            onClick={() => window.open('/app/login', '_blank')}
          >
            เข้าสู่ระบบ
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default ComingLanding;
