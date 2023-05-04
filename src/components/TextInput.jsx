import { TextField } from '@mui/material';
import { forwardRef } from 'react';

const TextInput = forwardRef((props, ref) => {
  return <TextField inputRef={ref} {...props} />;
});

export default TextInput;
