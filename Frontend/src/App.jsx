import { useRoutes, BrowserRouter } from "react-router-dom";
import "./App.css";
import { Home } from "./Pages/Home";
import { MyProfile } from "./Pages/MyProfile";
import { NotFound } from "./Pages/NotFound";
import Feed from "./Pages/Feed";

const AppRoutes = () => {
 // const token = sessionStorage.getItem("authToken")
  const token ='autorizado' // para poder navegar sin usuasrio y contraseña. IMPORTANTE BORRAR PARA PRODUCCION
  const routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/myProfile", element: token? <MyProfile /> : <Home /> },
    { path: "/feed", element: token? <Feed /> : <Home />  },
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
