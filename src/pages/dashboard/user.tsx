import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { requireAuth } from "../../common/authAdmin";
import Main from "../../components/dashboard/layouts/Main";
import Input from "../../components/Input";
import axios from "axios";
import Swal from "sweetalert2";

export const getServerSideProps = requireAuth(async (ctx) => {
  return { props: {} };
});

const User: NextPage = () => {
  const [data, setData] = useState<any[]>([]);
  const [user, setUser] = useState<any>();

  const getAllUsers = async () => {
    try {
      const response = await axios.get("/api/users/all");
      setData(response.data.message);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteUser = (id: any) => {
    Swal.fire({
      title: `Xóa userID: ${id} `,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đúng, xóa nó!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUser(id);
      }
    });
  };
  const deleteUser = async (id: any) => {
    try {
      await axios.delete(`/api/users/${id}`).then(() => {
        getAllUsers();
        Swal.fire({
          title: "Xóa thành công",
        });
        
      });
    } catch (error) {}
  };
  const handleSetUser = (users: any) => {
    setUser(users);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <Main>
      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      {user && (
        <label htmlFor="my-modal-4" className="modal cursor-pointer">
          <label className="modal-box relative" htmlFor="">
            <h3 className="mb-2 text-lg font-bold">
              Sửa Thông Tin -{" "}
              <span className="font-semibold">User ID : {user.id}</span>
            </h3>
            <hr className="mb-2" />
            <form action="">
              <Input value={user.name} placeholder="Name" />
              <Input value={user.email} placeholder="Email" />
              <Input value={user.role} placeholder="Role" />
              <Input value={user.status} placeholder="Status" />
            </form>
          </label>
        </label>
      )}
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
                {data.map((item) => (
                  <tr key={item.id}>
                    <th>{item.id}</th>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.money}</td>
                    <td>{item.role}</td>
                    <td>{item.status}</td>
                    <td className="flex gap-x-2">
                      <label
                        onClick={() => handleSetUser(item)}
                        htmlFor="my-modal-4"
                        className="btn-secondary btn"
                      >
                        Sửa
                      </label>
                      <button
                        onClick={() => handleDeleteUser(item.id)}
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
