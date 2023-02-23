import { Routes, Route } from 'react-router-dom';

import App from 'App';

const Router = () => {
  return (
    <Routes>
      <Route path="/app/:page" element={<App />} />
    </Routes>
  );
};

export default Router;
