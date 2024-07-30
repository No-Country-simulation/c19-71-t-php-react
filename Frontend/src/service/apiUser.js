import Swal from "sweetalert2";
export async function updateUserProfile({ userId, data, setUser }) {
  console.log(userId, data);
  const apiUrlFromEnv = import.meta.env.VITE_API_URL;
  const url = `${apiUrlFromEnv}/users/${userId}`;
  const token = sessionStorage.getItem("authToken");
  fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      Swal.fire({
        title: "Cambios realizados",

        icon: "success",
      });
      setUser(data);
    })
    .catch((error) => {
      console.error("Error:", error);
      Swal.fire({
        title: "Hubo un problema",

        icon: "error",
      });
    });
}
