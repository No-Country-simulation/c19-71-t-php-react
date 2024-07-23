const fakeData = [
  {
    _id: "1",
    image: "sample.jpg",
  },

  {
    _id: "2",
    image: "sample.jpg",
  },

  {
    _id: "3",
    image: "sample.jpg",
  },

  {
    _id: "4",
    image: "sample.jpg",
  },

  {
    _id: "5",
    image: "sample.jpg",
  },

  {
    _id: "6",
    image: "sample.jpg",
  },

  {
    _id: "7",
    image: "sample.jpg",
  },

  {
    _id: "8",
    image: "sample.jpg",
  },
];

function UserPublication() {
  return (
    <ul className=" grid grid-cols-2 gap-2 md:grid-cols-3 p-2">
      {fakeData?.length !== 0 ? (
        fakeData.map((data) => (
          <li key={data._id}>
            <img
              src={`/img/${data.image}`}
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
