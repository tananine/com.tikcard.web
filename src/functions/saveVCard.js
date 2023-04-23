import { saveAs } from 'file-saver';
import VCard from 'vcard-creator';

const saveVCard = (data) => {
  const vCardData = new VCard();

  vCardData
    .addName(data?.name)
    .addAddress(data?.address)
    .addRole(data?.position)
    .addCompany(data?.company)
    .addJobtitle(data?.work)
    .addNote(data?.bio);

  const blob = new Blob([vCardData], { type: 'text/vcard' });
  saveAs(blob, data?.name + '.vcf');
};

export default saveVCard;
