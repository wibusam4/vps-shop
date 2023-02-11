import { useSession } from "next-auth/react";

interface InforProps {
  wallet: string;
  name: string;
  image: string;
}

const Infor: React.FC<InforProps> = ({ wallet, name, image }) => {
  const { data: session } = useSession();
  return (
    <div className="flex flex-col sm:flex-row border border-black p-2 items-center w-full sm:min-w-[40%]">
      <div className="w-[100px] h-[100px] flex items-center">
        <img
          src={image}
          alt="Nạp ví momo"
          className="aspect-[1/1] object-cover rounded-full"
        />
      </div>
      <div className="w-full px-4">
        <div className="flex flex-col gap-y-2 h-full items-center mt-4 sm:items-start sm:mt-0">
          <h1 className="text-base font-medium">
            Số điện thoại: <span className="italic text-accent">{wallet}</span>
          </h1>
          <h1 className="text-base font-medium">
            Tên người nhận:{" "}
            <span className="italic text-primary-content">{name}</span>
          </h1>
          <h1 className="text-base font-medium">
            Nội dung:{" "}
            <span className="italic text-accent-focus">{`vps_${session?.user.name}`}</span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Infor;
