function Button({ children, disabled, ...props }) {
  return (
    <button
      className={`w-full p-2 bg-blue-500 text-white border-none rounded cursor-pointer mb-2 
        ${disabled ? "bg-gray-400 cursor-not-allowed" : ""}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
