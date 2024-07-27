import UpdateUserDataForm from "../Components/user/UpdateUserDataForm";

function UpdateProfile() {
  return (
    <section className="w-[95%] px-4 py-4  mx-auto md:w-[70%]">
      <h1 className=" text-3xl font-semibold my-6 text-center text-[#575757]">
        Editar Perfil
      </h1>

      <UpdateUserDataForm />
    </section>
  );
}

export default UpdateProfile;
