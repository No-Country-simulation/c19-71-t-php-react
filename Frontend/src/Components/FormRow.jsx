function FormRow({ label, error, children, expand }) {
  return (
    <div className={`flex flex-col gap-2 ${expand ? "col-span-full" : ""}`}>
      {label && (
        <label
          htmlFor={children.props.id}
          className=" text-lg font-semibold text-[#575757]"
        >
          {label}
        </label>
      )}

      {children}

      {error && (
        <p className=" px-2 py-1 rounded-lg text-center text-sm font-semibold text-red-600 bg-red-200">
          {error}
        </p>
      )}
    </div>
  );
}

export default FormRow;
