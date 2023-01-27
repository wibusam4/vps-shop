interface InputProps {
  value: string;
  placeholder?: string
}

const Input: React.FC<InputProps> = ({ value,  placeholder}) => {
  return (
    <div className="form-control mb-4 flex flex-row gap-x-4 items-center">
      <label htmlFor="" className="font-bold min-w-[20%]">{placeholder}: </label>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        className="input-bordered input-secondary input w-full max-w-xs"
      />
    </div>
  );
};

export default Input;
