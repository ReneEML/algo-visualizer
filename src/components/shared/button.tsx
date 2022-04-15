const Button = ({ text, onClick }: any) => (
  <button
    className="shadow bg-indigo-500 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
    type="button"
    onClick={onClick}
  >
    {text}
  </button>
);

export default Button;
