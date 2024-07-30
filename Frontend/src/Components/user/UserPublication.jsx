function UserPublication({ posts }) {
  return (
    <ul className=" grid grid-cols-2 gap-2 md:grid-cols-3 p-2">
      {posts ? (
        posts.map((post) => (
          <li key={post._id}>
            <img
              src={post.imageURL}
              className="w-full h-[100%] object-cover block"
            />
          </li>
        ))
      ) : (
        <p className="col-span-3 text-center mt-4 text-lg  font-medium">
          Aún no hay publicaciones.
        </p>
      )}
    </ul>
  );
}

export default UserPublication;
