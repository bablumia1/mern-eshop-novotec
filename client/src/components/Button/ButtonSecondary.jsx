const ButtonSecondary = ({ disabled, loading, text, onClick }) => {
  return (
    <button
      disabled={disabled}
      type="submit"
      className="w-full bg-gray-800 text-white rounded-md px-4 py-2 font-semibold hover-bg-gray-700 focus:outline-none mt-5"
      onClick={onClick}
    >
      {loading ? "Loading..." : text}
    </button>
  );
};

export default ButtonSecondary;
