import GoogleMapFieldInput from '@/components/popup/popups/edit-contact-dynamic/spacials/FieldInputComponents/GoogleMap';

const fieldInputSpacial = ({ register, errors, component }) => {
  if (component === 'MapLayout') {
    return <GoogleMapFieldInput register={register} errors={errors} />;
  }
};

export default fieldInputSpacial;
