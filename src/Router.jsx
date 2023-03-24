import { Routes, Route } from 'react-router-dom';

import App from '@/App';
import Landing from '@/Landing';

const Router = () => {
  return (
    <Routes>
      <Route path="/app/:page" element={<App />} />
      <Route path="/:linkId" element={<Landing />} />
    </Routes>
  );
};

export default Router;
