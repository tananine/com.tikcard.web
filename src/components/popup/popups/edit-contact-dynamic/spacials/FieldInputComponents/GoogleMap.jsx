import { Box, TextField } from '@mui/material';
import * as yup from 'yup';

export const schema = yup
  .object({
    latitude: yup.string().required('โปรดป้อนข้อมูล'),
    longitude: yup.string().required('โปรดป้อนข้อมูล'),
  })
  .required();

const GoogleMapFieldInput = ({ register, errors }) => {
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <TextField
        label="ชื่อ"
        variant="outlined"
        fullWidth
        InputLabelProps={{ shrink: true }}
        {...register('name')}
      />
      <TextField
        label="ละติจูด"
        variant="outlined"
        fullWidth
        InputLabelProps={{ shrink: true }}
        error={errors?.latitude ? true : false}
        helperText={errors?.latitude?.message}
        {...register('latitude')}
      />
      <TextField
        label="ลองจิจูด"
        variant="outlined"
        fullWidth
        InputLabelProps={{ shrink: true }}
        error={errors?.longitude ? true : false}
        helperText={errors?.longitude?.message}
        {...register('longitude')}
      />
      <TextField
        label="รายละเอียด"
        fullWidth
        InputLabelProps={{ shrink: true }}
        {...register('note')}
      />
    </Box>
  );
};

export default GoogleMapFieldInput;
