import { Routes, Route } from 'react-router-dom';

import App from '@/App';
import Landing from '@/Landing';
import Scanner from '@/Scanner';

const Router = () => {
  return (
    <Routes>
      <Route path="/app/:page" element={<App />} />
      <Route path="/scan/:scannerId" element={<Scanner />} />
      <Route path="/:linkId" element={<Landing />} />
    </Routes>
  );
};

export default Router;
