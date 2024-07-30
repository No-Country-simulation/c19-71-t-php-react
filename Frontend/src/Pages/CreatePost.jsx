import React, { useState } from "react";
import Swal from "sweetalert2";
import { Sidebar } from "../Components/Sidebar";
export default function CreatePost({ user, setUser }) {
  const [description, setDescription] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [category, setCategory] = useState("politics"); // Default category

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = sessionStorage.getItem("authToken");

    try {
      const response = await fetch("http://localhost:3000/posts", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description,
          imageURL,
          category,
          userId: user._id,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create post");
      }

      const data = await response.json();
      console.log("Post created:", data);
      Swal.fire({
        title: "Post creada",

        icon: "success",
      });
      // Clear the form
      setDescription("");
      setImageURL("");
      setCategory("politics"); // Reset to default category
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: err.message,

        icon: "error",
      });
    }
  };
  const inputStyle = "border-2 border-black rounded p-2";
  return (
    <div>
      <Sidebar setUser={setUser}/>
         <div className="flex align-middle justify-center">
     
     <form className="grid gap-10 items-center py-10" onSubmit={handleSubmit}>
       <h2 className="font-bold text-2xl">Crea un post</h2>

       <input
         className={inputStyle}
         name="description"
         type="text"
         required
         placeholder="descripcion"
         value={description}
         onChange={(e) => setDescription(e.target.value)}
       />
       <input
         name="imageURL"
         className={inputStyle}
         type="text"
         placeholder="URL de la imagen"
         value={imageURL}
         required
         onChange={(e) => setImageURL(e.target.value)}
       />
       <select
         required
         className={inputStyle}
         name="category"
         value={category}
         onChange={(e) => setCategory(e.target.value)}
       >
         <option value="politics">Política</option>
         <option value="sports">Deporte</option>
         <option value="movies">Cine</option>
         <option value="music">Música</option>
         <option value="science">Ciencia</option>
         <option value="fashion">Moda</option>
         <option value="travel">Viaje</option>
         <option value="astrology">Astrología</option>
         <option value="cooking">Cocina</option>
         <option value="weather">Clima</option>
       </select>

       <button type="submit" className={inputStyle}>
         Crear
       </button>
     </form>
   </div>
    </div>
   
  );
}
