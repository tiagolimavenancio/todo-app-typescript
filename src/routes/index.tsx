import { BrowserRouter, Routes as Switch, Route, Navigate } from 'react-router-dom';
import { Home } from 'pages/Home';

export const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Switch>
    </BrowserRouter>
  );
};
