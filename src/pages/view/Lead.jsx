import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from '@mui/material';
import { useEffect, useState, useRef } from 'react';

const Lead = ({ isPreview }) => {
  const [openForm, setOpenForm] = useState(false);
  const timeoutRef = useRef(null);

  const openFormHandler = () => {
    setOpenForm(true);
    clearTimeout(timeoutRef.current);
  };
  const closeFormHandler = () => {
    setOpenForm(false);
  };

  useEffect(() => {
    if (!isPreview) {
      timeoutRef.current = setTimeout(() => {
        setOpenForm(true);
      }, 3500);

      return () => {
        clearTimeout(timeoutRef.current);
      };
    }
  }, []);

  return (
    <>
      <Button
        variant="contained"
        fullWidth
        size="large"
        onClick={openFormHandler}
      >
        ฝากข้อมูลติดต่อ
      </Button>
      <Dialog
        open={openForm}
        maxWidth="xl"
        PaperProps={{ sx: { margin: 2, width: '100%', borderRadius: 6 } }}
      >
        <DialogTitle>ข้อมูลติดต่อกลับของคุณ</DialogTitle>
        <DialogContent>
          <TextField
            label="ชื่อ"
            variant="outlined"
            fullWidth
            InputLabelProps={{ shrink: true }}
            sx={{ marginTop: 1 }}
          />
          <TextField
            label="เบอร์โทร"
            variant="outlined"
            fullWidth
            InputLabelProps={{ shrink: true }}
            sx={{ marginTop: 2 }}
          />
          <TextField
            label="อีเมล"
            variant="outlined"
            fullWidth
            InputLabelProps={{ shrink: true }}
            sx={{ marginTop: 2 }}
          />
          <TextField
            label="ข้อความ"
            variant="outlined"
            fullWidth
            InputLabelProps={{ shrink: true }}
            sx={{ marginTop: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeFormHandler}>ปิด</Button>
          <Button>ส่ง</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Lead;
