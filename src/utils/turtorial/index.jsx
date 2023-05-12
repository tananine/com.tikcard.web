import 'intro.js/introjs.css';
import '@/utils/turtorial/introjs.css';
import { Steps } from 'intro.js-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTutorialSuccess } from '@/stores/account';

const steps = {
  profilePage: [
    {
      title: 'Step 1',
      element: '#edit-profile-button',
      intro: 'เพิ่มข้อมูลหน้านามบัตร',
    },
    {
      title: 'Step 2',
      element: '#add-contact-button',
      intro: 'เพิ่มข้อมูลติดต่อคุณ',
    },
    {
      title: 'Step 3',
      element: '#preview-button',
      intro: 'ดูตัวอย่างที่ผู้ชมเห็น',
    },
    {
      title: 'Step 4',
      element: '#share-button-navigation',
      intro: 'ทุกอย่างเรียบร้อย แชร์นามบัตรให้คู่สนทนาของคุณได้ที่นี่',
    },
    {
      title: 'Tip',
      element: '#select-profile-card',
      intro: 'คุณสามารถมีนามบัตรกี่ใบก็ได้ เปลี่ยนหรือเพิ่มได้ที่นี่',
    },
  ],
};

const Tutorial = ({ step }) => {
  const tutorial = useSelector((state) => state.account.accountData.tutorial);

  const dispatch = useDispatch();

  const [isShow, setIsShow] = useState(false);

  const exit = () => {
    return;
  };

  const complete = () => {
    setIsShow(false);
    dispatch(setTutorialSuccess(step));
  };

  useEffect(() => {
    setIsShow(true);
  }, []);

  if (!tutorial[step]) {
    return (
      <>
        <Steps
          enabled={isShow}
          steps={steps[step]}
          initialStep={0}
          onExit={exit}
          onComplete={complete}
          options={{
            doneLabel: 'ปิด',
            nextLabel: 'ถัดไป',
            prevLabel: 'ก่อนหน้า',
            showBullets: false,
            exitOnOverlayClick: false,
            exitOnEsc: false,
            disableInteraction: true,
          }}
        />
      </>
    );
  }
};

export default Tutorial;
