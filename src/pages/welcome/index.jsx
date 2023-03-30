import { Box } from '@mui/material';
import '@egjs/react-flicking/dist/flicking.css';
import Flicking from '@egjs/react-flicking';

const Welcome = () => {
  return (
    <Box height="100vh">
      <Flicking align="prev" circular={true}>
        <Box width="100vw">สร้างนามบัตรแรกกันเลย</Box>
        <Box width="100vw">นามบัตรนี้ใช้สำหรับ</Box>
        <Box width="100vw">ใส่ข้อมูลซักหน่อย (ข้าม)</Box>
      </Flicking>
    </Box>
  );
};

export default Welcome;
