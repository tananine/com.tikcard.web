import { saveAs } from 'file-saver';
import VCard from 'vcard-creator';

const saveVCard = (data) => {
  const vCardData = new VCard();

  vCardData.addName(data.info.name || 'ไม่มีชื่อ');
  data.info.company && vCardData.addCompany(data.info.company);
  data.info.job && vCardData.addJobtitle(data.info.job);

  vCardData.addURL('http://192.168.1.13:5173/mt9KiZz');

  console.log(data);

  data.contacts.forEach((contact) => {
    vCardData.addSocial(
      contact.data.includes('https://')
        ? contact.data
        : `https://${contact.data}`,
      contact.ContactItem.name
    );
  });

  vCardData.addNote(
    '• กดสร้างรายชื่อใหม่ด้านล่างนี้เพื่อบันทึกลงสมุดรายชื่อของคุณ\n\nPowered by TikCard.me'
  );

  const blob = new Blob([vCardData], { type: 'text/vcard' });
  saveAs(blob, data.info.name + '.vcf');
};

export default saveVCard;
