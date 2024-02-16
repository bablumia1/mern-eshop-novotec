const Textarea = ({
  name,
  id,
  placeholder,
  value,
  onChange,
  rows,
  label,
  error,
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2">
        <textarea
          id={id}
          name={name}
          rows={rows}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
            error ? "ring-red-500" : "ring-gray-300"
          } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
        />
      </div>
      {error && (
        <p className="mt-2 text-sm font-semibold text-red-500">{error}</p>
      )}
    </div>
  );
};

export default Textarea;
