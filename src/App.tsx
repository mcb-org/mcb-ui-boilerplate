import type { FC } from "react";
import { BrowserRouter, useRoutes } from "react-router-dom";
import routes from "~react-pages";

const Routes = () => {
  return useRoutes(routes);
};

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
};

export default App;
