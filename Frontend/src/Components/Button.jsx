function Button({ children, disabled, onClick }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="px-6 py-2 inline-block text-sm rounded-full bg-primary text-white font-semibold tracking-wide  disabled:cursor-not-allowed"
    >
      {children}
    </button>
  );
}

export default Button;
