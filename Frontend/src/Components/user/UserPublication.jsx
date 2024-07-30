import Post from "../Post";
function UserPublication({ posts, currentUser }) {
  console.log(`posts is: ${JSON.stringify(posts)}`);
  return (
    <ul className=" grid grid-cols-2 gap-2 md:grid-cols-3 p-2">
      {posts.length > 0 ? (
        posts.map((post) => (
          <li key={post._id}>
            <Post
              isInsideProfile={true}
              data={post}
              currentUser={currentUser}
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
