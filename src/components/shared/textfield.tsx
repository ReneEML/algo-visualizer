const TextField = ({value, onChange, label}: any) => {
  return (
    <div className="px-3 mb-6 md:mb-0 justify-start">
      <label className="block uppercase tracking-wide text-slate-50 text-xs font-bold mb-2">
        {label}
      </label>
      <input
        className="bg-gray-200 text-gray-700 border border-slate-50 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
        type="number"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default TextField;
