import { useRoutes, BrowserRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";
import { Home } from "./Pages/Home";
import { MyProfile } from "./Pages/MyProfile";
import { NotFound } from "./Pages/NotFound";
import Feed from "./Pages/Feed";
import UpdateProfile from "./Pages/UpdateProfile";
import CreatePost from "./Pages/CreatePost";
const AppRoutes = () => {
  const [user, setUser] = useState(null);
  let token = sessionStorage.getItem("authToken");

  useEffect(() => {
    if (token) {
      // Fetch user info using the token (assuming you have an API endpoint for this)
      fetch("http://localhost:3000/users/auth", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(`data from response is : ${JSON.stringify(data)}`);
          console.log(
            `user data is : ${JSON.stringify(data.authData.user[0])}`
          );
          setUser(data.authData.user[0]);
        })
        .catch((error) => {
          console.error("Error fetching user info:", error);
          setUser(null); // Reset user info if there's an error
        });
    }
  }, [token]);
  token = 'asdf' /////JFGT
  const routes = useRoutes([
    { path: "/", element: <Home /> },
    {
      path: "/myProfile",
      element: token ? <MyProfile user={user} /> : <Home />,
    },
    {
      path: "/updateProfile",
      element: token ? <UpdateProfile user={user} /> : <Home />,
    },
    { path: "/feed", element: token ? <Feed /> : <Home user={user} /> },
    {
      path: "/createPost",
      element: token ? <CreatePost user={user} /> : <Home />,
    },
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
