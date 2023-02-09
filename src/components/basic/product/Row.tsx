interface RowProps {
  title: string;
  value: string;
}

const Row: React.FC<RowProps> = ({ title, value }) => {
  return (
    <div className="flex w-full border border-black">
      <p className="w-[40%] p-2 md:w-1/6">{title}</p>
      <p className="border border-l-black p-2">{value}</p>
    </div>
  );
};

export default Row;
