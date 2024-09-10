const Button = ({ name, onClick }) => {
  return (
    <button
      className="bg-indigo-500 rounded-md p-2 text-white"
      onClick={onClick}
    >
      {name}
    </button>
  );
};

export default Button;
