import { requireAdmin } from "../../common/authAdmin";
import Main from "../../components/dashboard/layouts/Main";
import { prisma } from "../../server/db";
import axios from "axios";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import moment from "moment";
import { formatPrices } from "../../until";
import { Transaction } from "../../model/Transaction.model";
import { useEffect, useState } from "react";

export interface RootObject {
  transUser: Transaction[];
}
const Transaction: React.FC<RootObject> = ({ transUser }) => {
  const router = useRouter();
  const [transaction, setTransaction] = useState(transUser);
  const [transactionTerm, setTransactionTerm] = useState(transUser);
  useEffect(() => {
    setTransaction(transUser);
    setTransactionTerm(transUser);
  }, [transUser]);
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    filteredData(event.target.value);
  };

  const filteredData = (value: string) => {
    setTransaction(
      transactionTerm.filter((item) => item.user.email.includes(value))
    );
  };

  const handelDelete = async (transaction: any) => {
    Swal.fire({
      title: `Bạn muốn xóa ID: ${transaction.id}`,
      icon: "question",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete("/api/transaction", { data: { id: transaction.id } })
          .then(() => {
            router.push(router.asPath);
            Swal.fire({
              text: "Xóa thành công",
              icon: "success",
            });
          })
          .catch((error) => {
            Swal.fire({
              text: error,
            });
          });
      }
    });
  };

  return (
    <Main>
      <div className="flex flex-col gap-y-4 p-6">
        <div className="flex flex-wrap justify-between gap-y-4 gap-x-4">
          <div className="form-control">
            <label className="input-group">
              <span>Search</span>
              <input
                type="text"
                placeholder="info@site.com"
                className="input-bordered input focus:outline-none"
                onChange={handleSearch}
              />
            </label>
          </div>
        </div>
        <div>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Tài Khoản</th>
                  <th>Tiền Cũ</th>
                  <th>Số tiền</th>
                  <th>Tiền Mới</th>
                  <th>Nội dung</th>
                  <th>Ngày Tạo</th>
                  <th>Ngày Sửa</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody className="border">
                {transaction &&
                  transaction?.map((tran: any, index) => (
                    <tr key={tran.id}>
                      <th className="py-2">{index}</th>
                      <td className="py-2">{tran.user.email}</td>
                      <td className="py-2 font-medium text-primary-focus">
                        {formatPrices(tran.oldMoney)}
                      </td>
                      <td
                        className={`${
                          tran.money > 0 ? `text-warning-content` : `text-error`
                        } py-2 font-medium`}
                      >
                        {formatPrices(tran.money)}
                      </td>
                      <td className="py-2 font-medium text-secondary-focus">
                        {formatPrices(tran.newMoney)}
                      </td>
                      <td className="py-2">{tran.description}</td>
                      <td className="py-2">
                        {moment(tran.createdAt).format("DD-MM-YYYY")}
                      </td>
                      <td className="py-2">
                        {moment(tran.createdAt).format("DD-MM-YYYY")}
                      </td>
                      <td className="py-2">
                        <button
                          onClick={() => {
                            handelDelete(tran);
                          }}
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

export default Transaction;

export const getServerSideProps = requireAdmin(async (ctx) => {
  const transUser = JSON.parse(
    JSON.stringify(
      await prisma.transUser.findMany({
        include: {
          user: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      })
    )
  );
  return { props: { transUser } };
});
