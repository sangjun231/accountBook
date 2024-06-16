function ToggleButton({ children, ...props }) {
  return (
    <button
      className="w-full p-2 bg-gray-600 text-white border-none rounded cursor-pointer"
      {...props}
    >
      {children}
    </button>
  );
}
export default ToggleButton;
