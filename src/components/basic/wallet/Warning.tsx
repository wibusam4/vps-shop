interface WarningProps {}

const Warning: React.FC<WarningProps> = () => {
  return (
    <div className="w-full sm:max-w-[60%]">
      <div className=" h-full rounded bg-accent bg-opacity-10 p-4">
        <h1 className="font-bold text-accent-focus">Lưu ý:</h1>
        <h1 className="font-medium text-accent-focus">
          -Kiểm tra đúng số điện thoại
        </h1>
        <h1 className="font-medium text-accent-focus">
          -Kiểm tra đúng người nhận
        </h1>
        <h1 className="font-medium text-accent-focus">
          -Kiểm tra đúng nội dung chuyển
        </h1>
      </div>
    </div>
  );
};

export default Warning;
