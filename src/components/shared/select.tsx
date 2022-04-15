export interface Option {
  value: any;
  label: string;
  selected: boolean;
}

export const Select = ({
  value,
  onChange,
  label,
  options,
}: {
  value: any;
  onChange: (e: any) => void;
  label: string;
  options: Option[];
}) => (
  <div className="px-3 mb-6 md:mb-0">
    <label className="block uppercase tracking-wide text-slate-50 text-xs font-bold mb-2">
      {label}
    </label>
    <div className="relative">
      <select
        className="bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        onChange={onChange}
        value={value}
      >
        {options.map((item) => (
          <option key={`algo_item_${item.label}`} value={item.value}>{item.label}</option>
        ))}
      </select>
    </div>
  </div>
);
