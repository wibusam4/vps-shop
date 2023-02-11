import { requireAdmin } from "../../common/authAdmin";
import Main from "../../components/dashboard/layouts/Main";
import axios from "axios";
import Swal from "sweetalert2";
import { prisma } from "../../server/db";
import { User } from "../../model/User.model";
import Modal from "../../components/dashboard/Modal";
import EditUser from "../../components/dashboard/form/EditUser";
import { useRouter } from "next/router";
import { getBageStatus } from "../../until";

interface RootObject {
  users: User[];
}
const User: React.FC<RootObject> = ({ users }) => {
  const router = useRouter();
  const handleDeleteUser = async (id: any) => {
    Swal.fire({
      title: `Bạn muốn xóa user ID: ${id} `,
      icon: "question",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`/api/users`, { data: { id } }).then(() => {
          router.push(router.asPath);
          Swal.fire({
            title: "Xóa thành công",
            icon: "success",
          });
        });
      }
    });
  };

  return (
    <Main>
      <div className="flex flex-col gap-y-4 p-10">
        <div>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Money</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Thao Tác</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <th>{user.id}</th>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.money}</td>
                    <td>{user.role}</td>
                    <td><div className={getBageStatus(user.status)}>{user.status}</div></td>
                    <td className="flex gap-x-2">
                      <Modal id={user.id} name="Sửa">
                        <EditUser user={user} />
                      </Modal>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="btn-accent btn"
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Main>
  );
};
export default User;

export const getServerSideProps = requireAdmin(async (ctx) => {
  const users = JSON.parse(JSON.stringify(await prisma.user.findMany()));
  return { props: { users } };
});
