function Button({ children, disabled, onClick, isForm }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`inline-block rounded-full bg-primary text-white font-semibold tracking-wide  disabled:cursor-not-allowed ${
        isForm ? " text-base px-8 py-2" : "text-sm px-6 py-2"
      }`}
    >
      {children}
    </button>
  );
}

export default Button;
