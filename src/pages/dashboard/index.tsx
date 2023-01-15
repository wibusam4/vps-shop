import { faUser } from "@fortawesome/free-solid-svg-icons";
import type { NextPage } from "next";
import { useSession, signOut } from "next-auth/react";
import { requireAuth } from "../../common/authAdmin";
import BoxInfor from "../../components/dashboard/BoxInfor";
import Main from "../../components/dashboard/layouts/Main";

export const getServerSideProps = requireAuth(async (ctx) => {
  return { props: {} };
});

const Dashboard: NextPage = () => {
  const { data } = useSession();

  return (
    <Main>
      <div className="bg-primary pb-12 pt-12">
        <div className="mx-auto w-full px-4 md:px-10">
          <div>
            <div className="flex flex-wrap justify-center gap-x-10 gap-y-10">
              <BoxInfor
                name="Người Dùng"
                value={1123}
                icon={faUser}
                color="text-error"
              />
              <BoxInfor
                name="Danh Mục"
                value={1223}
                icon={faUser}
                color="text-info"
              />
              <BoxInfor
                name="Sản Phẩm"
                value={1323}
                icon={faUser}
                color="text-warning"
              />
              <BoxInfor
                name="Doanh Thu"
                value={1423}
                icon={faUser}
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
