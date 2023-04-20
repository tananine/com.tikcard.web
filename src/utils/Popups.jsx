import SwitchProfile from '@/components/popup/popups/switch-profile';
import AddContact from '@/components/popup/popups/add-contact';
import EditCard from '@/components/popup/popups/edit-card';
import EditContactDynamic from '@/components/popup/popups/edit-contact-dynamic';
import AddProfile from '@/components/popup/popups/AddProfile';

const Popups = () => {
  return (
    <>
      <SwitchProfile />
      <AddContact />
      <EditCard />
      <EditContactDynamic />
      <AddProfile />
    </>
  );
};

export default Popups;
