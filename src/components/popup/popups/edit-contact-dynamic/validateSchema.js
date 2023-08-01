import { schema } from '@/components/popup/popups/edit-contact-dynamic/spacials/FieldInputComponents/GoogleMap';
import * as yup from 'yup';

export const schemaGrid = yup
  .object({
    data: yup
      .string()
      .trim()
      .required('โปรดป้อนข้อมูล')
      .max(250, 'ข้อมูลต้องไม่เกิน 250 ตัวอักษร'),
  })
  .required();

export const schemaBlock = yup
  .object({
    data: yup
      .string()
      .trim()
      .required('โปรดป้อนข้อมูล')
      .max(250, 'ข้อมูลต้องไม่เกิน 250 ตัวอักษร'),
    name: yup.string().trim().max(50, 'ชื่อต้องไม่เกิน 50 ตัวอักษร'),
    note: yup.string().trim().max(150, 'รายละเอียดต้องไม่เกิน 150 ตัวอักษร'),
  })
  .required();

export function validateSchema(typeLayout, component) {
  if (typeLayout !== 'Grid') {
    return schemaGrid;
  } else if (typeLayout !== 'Block') {
    return schemaBlock;
  }

  if (component === 'MapLayout') {
    return schema;
  }

  return yup.object({}).required();
}
