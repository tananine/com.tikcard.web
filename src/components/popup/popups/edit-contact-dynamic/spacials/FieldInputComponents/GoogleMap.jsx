import { Box, TextField } from '@mui/material';
import * as yup from 'yup';

export const schema = yup
  .object({
    latitude: yup
      .number()
      .typeError('ต้องกรอกข้อมูลเป็นตัวเลข')
      .max(190, 'ต้องไม่เกิน 190')
      .min(-190, 'ต้องไม่น้อยกว่า -190')
      .required('โปรดป้อนข้อมูล'),
    longitude: yup
      .number()
      .max(190, 'ต้องไม่เกิน 190')
      .min(-190, 'ต้องไม่น้อยกว่า -190')
      .typeError('ต้องกรอกข้อมูลเป็นตัวเลข')
      .required('โปรดป้อนข้อมูล'),
    name: yup.string().trim().max(50, 'ชื่อต้องไม่เกิน 50 ตัวอักษร'),
    note: yup.string().trim().max(150, 'รายละเอียดต้องไม่เกิน 150 ตัวอักษร'),
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
