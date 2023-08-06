import { saveAs } from 'file-saver';
import VCard from 'vcard-creator';

const addWithType = (name, data, type, vCardData) => {
  switch (type) {
    case 'number':
      vCardData.addPhoneNumber(data);
      break;
    case 'email':
      vCardData.addEmail(data);
      break;
    case 'link':
      vCardData.addSocial(
        data.includes('http://') || data.includes('https://')
          ? data
          : `https://${data}`,
        name
      );
      break;
    default:
      break;
  }
};

const saveVCard = (type, data, linkId) => {
  const vCardData = new VCard();

  vCardData.addNote('กดสร้างรายชื่อใหม่ เพื่อบันทึกลงสมุดรายชื่อของคุณ');

  if (type === 'landing') {
    vCardData.addName(data.info.name || 'ไม่มีชื่อ');
    data.info.company && vCardData.addCompany(data.info.company);
    data.info.job && vCardData.addJobtitle(data.info.job);

    vCardData.addURL(location.host + '/' + linkId);

    data.contacts.forEach((contact) => {
      addWithType(
        contact.ContactItem.name,
        contact.data,
        contact.ContactItem.type,
        vCardData
      );
    });

    const blob = new Blob([vCardData], { type: 'text/vcard' });
    saveAs(blob, data.info.name || 'TikCard Profile' + '.vcf');
  } else if (type === 'connection') {
    vCardData.addName(data.name || 'ไม่มีชื่อ');
    data.phone && vCardData.addPhoneNumber(data.phone);
    data.email && vCardData.addEmail(data.email);

    const blob = new Blob([vCardData], { type: 'text/vcard' });
    saveAs(blob, data.name || 'TikCard Profile' + '.vcf');
  } else {
    return;
  }
};

export default saveVCard;
