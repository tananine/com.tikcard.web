import 'intro.js/introjs.css';
import '@/utils/turtorial/introjs.css';
import { Steps } from 'intro.js-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTutorialSuccess } from '@/stores/account';
import { pushTutorialQue, removeTutorialQue } from '@/stores/controller';

import usePut from '@/hooks/axios/usePut';
import authServicePath from '@/data/jsons/services/auth.service.json';

import profilePageJSON from '@/data/jsons/tutorials/profilePage.json';
import profileScanJSON from '@/data/jsons/tutorials/profileScan.json';

const steps = {
  profilePage: profilePageJSON,
  profileScan: profileScanJSON,
};

const Tutorial = ({ step, delay }) => {
  const tutorial = useSelector((state) => state.account.accountData.tutorial);
  const tutorialQue = useSelector((state) => state.controller.tutorialQue);
  const dispatch = useDispatch();

  const [isShow, setIsShow] = useState(false);

  const isTutorialToShow = !tutorial[step];

  const [successTutorialDataAction] = usePut(
    authServicePath.successTutorial,
    false
  );

  const exit = () => {
    return;
  };

  const complete = () => {
    const body = {
      tutorial: step,
    };
    successTutorialDataAction(body);
    dispatch(setTutorialSuccess(step));
    setIsShow(false);
    dispatch(removeTutorialQue(step));
  };

  useEffect(() => {
    if (tutorialQue[0] === step) {
      setIsShow(true);
    }
  }, [tutorialQue]);

  useEffect(() => {
    if (isTutorialToShow) {
      setTimeout(() => {
        dispatch(pushTutorialQue(step));
      }, delay || 0);
    }
  }, []);

  if (isTutorialToShow) {
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
