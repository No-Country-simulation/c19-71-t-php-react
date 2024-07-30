import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "./Avatar";
import Comment from "./Comment";
export default function Post({ isInsideProfile, data, currentUser }) {
  const {
    imageURL,
    userIdsWhoLiked,
    description,
    createdAt: date,
    category,
    userId,
    _id: id,
  } = data;
  const navigate = useNavigate();

  const [comments, setComments] = useState();
  const [authorUser, setAuthorUser] = useState();
  const formRef = useRef(null);

  function getTranslatedCategory(category) {
    const translations = [
      { filterField: "all", value: "Todas" },
      { filterField: "politics", value: "Política" },
      { filterField: "sports", value: "Deporte" },
      { filterField: "movies", value: "Cine" },
      { filterField: "music", value: "Música" },
      { filterField: "science", value: "Ciencia" },
      { filterField: "fashion", value: "Moda" },
      { filterField: "travel", value: "Viaje" },
      { filterField: "astrology", value: "Astrología" },
      { filterField: "cooking", value: "Cocina" },
      { filterField: "weather", value: "Clima" },
    ];

    const translation = translations.find(
      (item) => item.filterField === category
    );
    return translation ? translation.value : "Categoría no encontrada";
  }

  useEffect(() => {
    async function fetchUserData() {
      const apiUrl = `http://localhost:3000/users/${userId}`;
      try {
        const response = await fetch(apiUrl); // Replace with your actual API endpoint
        const data = await response.json();
        console.log(data);
        setAuthorUser(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
        // Handle errors gracefully, e.g., display an error message to the user
      }
    }

    fetchUserData(); // Call the function to fetch posts on component mount
  }, []);

  async function fetchComments() {
    const apiUrl = `http://localhost:3000/comments/${id}`;
    try {
      const response = await fetch(apiUrl); // Replace with your actual API endpoint
      const data = await response.json();
      console.log(data);
      setComments(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
      // Handle errors gracefully, e.g., display an error message to the user
    }
  }
  useEffect(() => {
    fetchComments(); // Call the function to fetch posts on component mount
  }, []);

  const dialogRef = useRef(null);

  function getPublicationDate(dateString) {
    const date = new Date(dateString);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      throw new Error("Invalid date");
    }
    const now = new Date();
    const diff = now - date; // difference in milliseconds
    // console.log(`the diff is ${diff}`);
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days > 0) {
      return `hace ${days} d`;
    } else if (hours > 0) {
      return `hace ${hours} h`;
    } else {
      return `hace ${minutes} min`;
    }
  }

  function clickOutsideToClose(e) {
    console.log(`event listener running`);
    const modal = dialogRef.current;
    if (e.target === modal) {
      modal.close();
      //no need to removeEventListener, it closes itself
    }
  }

  const postComment = async (e) => {
    e.preventDefault();

    const token = sessionStorage.getItem("authToken");
    const form = formRef.current;
    const input = form.elements.comment;
    try {
      const response = await fetch("http://localhost:3000/comments", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          comment: input.value,

          userId: currentUser._id,
          postId: id,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create post");
      }

      const data = await response.json();
      console.log("Post created:", data);
      form.reset();
      fetchComments();
      // Clear the form
    } catch (err) {
      console.error(err);
    }
  };

  function openModal() {
    const modal = dialogRef.current;
    modal.showModal();
    modal.addEventListener("click", clickOutsideToClose);
  }

  const commentsStyle = "flex items-center gap-4 p-6";

  function goToAuthorUserProfile() {
    navigate("/profile", { state: { authorUser } });
  }

  async function toggleLikePost(action) {
    const token = sessionStorage.getItem("authToken");
    const baseURL = "http://localhost:3000/posts";
    const endpoint = `${baseURL}/${action}`;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId: id,
          userId: currentUser,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${action} post`);
      }

      const data = await response.json();
      console.log(
        `${action.charAt(0).toUpperCase() + action.slice(1)} dado !:`,
        data
      );
    } catch (err) {
      console.error(err);
      console.log(`${action} no dado`);
    }
  }

  return (
    <div>
      <dialog ref={dialogRef}>
        <div className="flex">
          <img
            src={imageURL}
            alt=""
            className="  h-[90vh] border-2 border-solid border-black "
          />
          <ul className="flex flex-col justify-between w-[500px]">
            <div>
              <div className="border-b-2">
                <div
                  className={`${commentsStyle} ${
                    !isInsideProfile && "cursor-pointer"
                  }`}
                  onClick={goToAuthorUserProfile}
                >
                  <Avatar imageUrl={authorUser?.avatar} />{" "}
                  <p>
                    {authorUser?.username}{" "}
                    <b>#{getTranslatedCategory(category)}</b>
                  </p>
                </div>
                <p className={`${commentsStyle} pt-0`}>{description}</p>
              </div>
              {comments?.map((comment) => (
                <Comment
                  className={commentsStyle}
                  key={comment._id}
                  date={comment.createdAt}
                  getPublicationDate={getPublicationDate}
                  message={comment.comment}
                  authorId={comment.userId}
                />
              ))}
            </div>
            <form
              ref={formRef}
              onSubmit={postComment}
              className="flex px-3 gap-5"
            >
              <input
                type="text"
                name="comment"
                autoComplete="off"
                placeholder="Agrega un comentario"
              />
              <button type="submit">Publicar</button>
            </form>
          </ul>
        </div>
      </dialog>
      <div className="flex flex-col gap-3 py-20">
        {!isInsideProfile && (
          <div
            className="flex gap-3 items-center cursor-pointer"
            onClick={goToAuthorUserProfile}
          >
            <Avatar imageUrl={authorUser?.avatar} />
            <p className="font-bold flex gap-2">
              {authorUser?.username}
              <span>•</span>
              <span className="font-normal">
                {getPublicationDate(date)}
              </span>{" "}
              <span>#{getTranslatedCategory(category)}</span>
            </p>
          </div>
        )}
        <div
          className="w-[468px] h-[585px] border-2 border-solid border-black bg-black flex items-center justify-center"
          onClick={openModal}
        >
          <img src={imageURL} alt="" className="  bg-white max-h-full   " />
        </div>
        <div className="flex gap-10">
          <span className="text-red-500">Likes: {userIdsWhoLiked.length}</span>
          <button onClick={() => toggleLikePost("like")}>+</button>
          <button onClick={() => toggleLikePost("dislike")}>-</button>
        </div>
      </div>
    </div>
  );
}
