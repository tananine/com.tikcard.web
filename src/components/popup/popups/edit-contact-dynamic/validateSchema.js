import { schema } from '@/components/popup/popups/edit-contact-dynamic/spacials/FieldInputComponents/GoogleMap';
import * as yup from 'yup';

export const schemaDefault = yup
  .object({
    data: yup.string().required('โปรดป้อนข้อมูล'),
  })
  .required();

export function validateSchema(typeLayout, component) {
  if (typeLayout !== 'spacial') {
    return schemaDefault;
  }

  if (component === 'googleMap') {
    return schema;
  }

  return yup.object({}).required();
}
