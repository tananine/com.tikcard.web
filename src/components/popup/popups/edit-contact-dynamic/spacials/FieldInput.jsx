import { useEffect } from 'react';

import GoogleMapFieldInput from '@/components/popup/popups/edit-contact-dynamic/spacials/FieldInputComponents/GoogleMap';

const fieldInputSpacial = ({ open, register, errors, setValue, component }) => {
  if (component === 'googleMap') {
    useEffect(() => {
      if (open) {
        setValue('lat', '');
        setValue('lng', '');
      }
    }, [open]);
    return <GoogleMapFieldInput register={register} errors={errors} />;
  }
};

export default fieldInputSpacial;
