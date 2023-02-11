interface WarningProps {}

const Warning: React.FC<WarningProps> = () => {
  return (
    <div className="w-full md:pl-4 md:w-[33%]">
      <div className=" rounded bg-accent bg-opacity-10 h-full p-4">
        <h1 className="font-bold text-accent-focus">Lưu ý:</h1>
        <h1 className="font-medium text-accent-focus">-Kiểm tra đúng mã thẻ và serial</h1>
        <h1 className="font-medium text-accent-focus">-Thẻ nạp sẽ có chiết khấu vui lòng đọc kĩ</h1>
        <h1 className="font-medium text-accent-focus">-Không nạp spam nhiều lần, check trạng thái thẻ để biết thành công hay không</h1>
        <h1 className="font-medium text-accent-focus">-Nếu phát hiện cố tình spam nạp thẻ khóa tài khoản không cần lí do</h1>
      </div>
    </div>
  );
};

export default Warning;
