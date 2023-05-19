import { Box, TextField } from '@mui/material';
import * as yup from 'yup';

export const schema = yup
  .object({
    lat: yup.string().required('โปรดป้อนข้อมูล'),
    lng: yup.string().required('โปรดป้อนข้อมูล'),
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
        error={errors?.lat ? true : false}
        helperText={errors?.lat?.message}
        {...register('lat')}
      />
      <TextField
        label="ลองจิจูด"
        variant="outlined"
        fullWidth
        InputLabelProps={{ shrink: true }}
        error={errors?.lng ? true : false}
        helperText={errors?.lng?.message}
        {...register('lng')}
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
