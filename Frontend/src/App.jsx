import { useRoutes, BrowserRouter } from "react-router-dom";
import "./App.css";
import { Home } from "./Pages/Home";
import { MyProfile } from "./Pages/MyProfile";
import { NotFound } from "./Pages/NotFound";
import Feed from "./Pages/Feed";

const AppRoutes = () => {
  const routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/myProfile", element: <MyProfile /> },
    { path: "/feed", element: <Feed /> },
    { path: "/*", element: <NotFound /> },
  ]);
  return routes;
};

const App = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
