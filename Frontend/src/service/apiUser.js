export async function updateUserProfile({ userId, data }) {
  console.log(userId, data);

  const url = `http://localhost:3000/users/${userId}`;
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
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
