import { Routes, Route } from 'react-router-dom';

import App from 'App';
import ViewIndex from 'ViewIndex';

const Router = () => {
  return (
    <Routes>
      <Route path="/app/:page" element={<App />} />
      <Route path="/:linkId" element={<ViewIndex />} />
    </Routes>
  );
};

export default Router;
