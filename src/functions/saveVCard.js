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

const saveVCard = (data, linkId) => {
  const vCardData = new VCard();

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

  vCardData.addNote(
    '• กดสร้างรายชื่อใหม่ด้านล่างนี้เพื่อบันทึกลงสมุดรายชื่อของคุณ\n\nPowered by TikCard.me'
  );

  const blob = new Blob([vCardData], { type: 'text/vcard' });
  saveAs(blob, data.info.name || 'TikCard Profile' + '.vcf');
};

export default saveVCard;
