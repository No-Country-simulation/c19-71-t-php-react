import React, { useState } from "react";

export default function CreatePost({ user }) {
  const [description, setDescription] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [category, setCategory] = useState("politics"); // Default category
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = sessionStorage.getItem("authToken");
    /*    if (!token) {
      setError('User not authenticated');
      return;
    } */

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
      // Clear the form
      setDescription("");
      setImageURL("");
      setCategory("politics"); // Reset to default category
      setError(null);
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div className="flex align-middle justify-center">
      <form
        className="flex flex-col gap-5 items-center"
        onSubmit={handleSubmit}
      >
        <h2>Crea un post</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <input
          name="description"
          type="text"
          placeholder="descripcion"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          name="imageURL"
          type="text"
          placeholder="URL de la imagen"
          value={imageURL}
          onChange={(e) => setImageURL(e.target.value)}
        />
        <select
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
        <button type="submit">Crear</button>
      </form>
    </div>
  );
}
