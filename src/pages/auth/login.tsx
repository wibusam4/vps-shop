import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { swalError } from "../../until/swal";
import { toast } from "react-toastify";
interface RegisterData {
  email: string;
  password: string;
}

const Login: NextPage = () => {
  const [registerData, setRegisterData] = useState<RegisterData>({
    email: "",
    password: "",
  });

  const { data: session, status } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/");
    }
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
        toast("🦄 Đăng nhập thành công!", {
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
      <div className="bg-grey-lighter flex min-h-screen flex-col">
        <div className="container mx-auto flex max-w-sm flex-1 flex-col items-center justify-center px-2">
          <div className="w-full rounded bg-white px-6 py-8 text-black shadow-md">
            <form onSubmit={handleSubmit}>
              <label>
                Email:
                <input
                  className="border-grey-light mb-4 block w-full rounded border p-3"
                  type="email"
                  name="email"
                  value={registerData.email}
                  onChange={handleInputChange}
                />
              </label>
              <br />
              <label>
                Password:
                <input
                  className="border-grey-light mb-4 block w-full rounded border p-3"
                  type="password"
                  name="password"
                  value={registerData.password}
                  onChange={handleInputChange}
                />
              </label>
              <br />
              <button
                className="hover:bg-green-dark my-1 w-full rounded bg-green-500 py-3 text-center text-white focus:outline-none"
                type="submit"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
