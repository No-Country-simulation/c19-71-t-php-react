import { useRoutes, BrowserRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";
import { Home } from "./Pages/Home";
import UserProfile from "./Pages/UserProfile";
import { NotFound } from "./Pages/NotFound";
import Feed from "./Pages/Feed";
import UpdateProfile from "./Pages/UpdateProfile";
import CreatePost from "./Pages/CreatePost";
const AppRoutes = () => {
  const [user, setUser] = useState(null);
  const token = sessionStorage.getItem("authToken");
  console.log(
    `-------------------------------------------------- token ------------------------------------------------------------------------------------------`
  );

  useEffect(() => {
    if (!user) {
      console.log(`the user is logged out`);
    } else {
      console.log(`the user is logged in`);
    }
  }, [user]);
  //fetch user data
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
          console.log(`user data is : ${JSON.stringify(data)}`);
          setUser(data.user);
        })
        .catch((error) => {
          console.error("Error fetching user info:", error);
          setUser(null); // Reset user info if there's an error
        });
    }
  }, [token]);

  const routes = useRoutes([
    {
      path: "/",
      element: user ? <Feed user={user} setUser={setUser} /> : <Home />,
    },
    {
      path: "/profile",
      element: user ? <UserProfile user={user} setUser={setUser} /> : <Home />,
    },
    {
      path: "/updateProfile",
      element: user ? (
        <UpdateProfile user={user} setUser={setUser} />
      ) : (
        <Home />
      ),
    },
    {
      path: "/feed",
      element: user ? (
        <Feed user={user} setUser={setUser} />
      ) : (
        <Home user={user} />
      ),
    },
    {
      path: "/createPost",
      element: user ? <CreatePost user={user} setUser={setUser} /> : <Home />,
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
