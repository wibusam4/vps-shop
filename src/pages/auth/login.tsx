import type { NextPage } from "next";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { swalError } from "../../until/swal";
import { toast } from "react-toastify";
import Link from "next/link";

interface RegisterData {
  email: string;
  password: string;
}

const Login: NextPage = () => {
  const [registerData, setRegisterData] = useState<RegisterData>({
    email: "",
    password: "",
  });
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    signIn("credentials", {
      ...registerData,
      callbackUrl: `${window.location.origin}/`,
      redirect: false,
    })
      .then((res) => {
        if (!res?.ok) {
          return swalError("Tên đăng nhập hoặc mật khẩu không đúng!");
        }
        toast("Đăng nhập thành công!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((err) => {});
  };

  return (
    <>
      <div className="flex min-h-screen flex-col">
        <div className="phone-3 artboard mx-auto flex items-center justify-center">
          <div className="w-full text-base-content">
            <h1 className="mb-2 p-2 text-center text-xl md:text-2xl">
              Đăng nhập đi nào!
            </h1>
            <div className="rounded bg-base-300  px-6 py-8 shadow-md shadow-white">
              <form onSubmit={handleSubmit}>
                <div className="card-body">
                  <div className="form-control">
                    <label className="label">Email:</label>
                    <input
                      className="input-bordered input w-full max-w-xs"
                      type="email"
                      name="email"
                      value={registerData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">Mật khẩu:</label>
                    <input
                      className="input-bordered input w-full max-w-xs"
                      type="password"
                      name="password"
                      value={registerData.password}
                      onChange={handleInputChange}
                    />
                  </div>
                  <label className="label">
                    <div className="link-hover label-text-alt link">
                      Quên mật khẩu
                    </div>
                  </label>
                  <div className="form-control mt-2">
                    <button className="btn-primary btn" type="submit">
                      Đăng Nhập
                    </button>
                  </div>
                  <div className="formt-control mt-2 flex justify-between font-medium text-lg">
                    <Link className="link-success link" href="/">
                      Trang Chủ
                    </Link>
                    <Link className="link-accent link" href="/auth/register">
                      Đăng kí
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
