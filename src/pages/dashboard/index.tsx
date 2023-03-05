import { faBagShopping, faCartShopping, faShop, faUser } from "@fortawesome/free-solid-svg-icons";
import { requireCtv } from "../../common/authCtv";
import BoxInfor from "../../components/dashboard/BoxInfor";
import Main from "../../components/dashboard/layouts/Main";
import { prisma } from "../../server/db";

interface RootObject {
  allData: any;
}
const Dashboard: React.FC<RootObject> = (allData) => {
  return (
    <Main>
      <div className="bg-primary pb-12 pt-12">
        <div className="mx-auto w-full px-4 md:px-10">
          <div>
            <div className="flex flex-wrap">
              <BoxInfor
                name="Người Dùng"
                value={allData.allData[0]}
                icon={faUser}
                color="text-error"
              />
              <BoxInfor
                name="Sản Phẩm"
                value={allData.allData[1]}
                icon={faShop}
                color="text-info"
              />
              <BoxInfor
                name="Danh Mục"
                value={allData.allData[2]}
                icon={faBagShopping}
                color="text-warning"
              />
              <BoxInfor
                name="Tổng Đơn Hàng"
                value={allData.allData[3]}
                icon={faCartShopping}
                color="text-success"
              />
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
};

export default Dashboard;

export const getServerSideProps = requireCtv(async (ctx) => {
  const allData = JSON.parse(
    JSON.stringify(
      await prisma.$transaction([
        prisma.user.count(),
        prisma.product.count(),
        prisma.category.count(),
        prisma.order.count(),
      ])
    )
  );
  return { props: { allData } };
});
