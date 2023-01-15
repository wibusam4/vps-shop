import axios from "axios";
import React, { useState } from "react";
import { swalError } from "../../until/swal";
import { useRouter } from "next/router";
import { getStatusCode } from "../../until/statusCode";

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const [registerData, setRegisterData] = useState<RegisterData>({
    name: "",
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await axios
      .post("/api/auth/register", registerData)
      .then((response) => {
        router.push("/auth/login");
      })
      .catch((err) => {
        if (err.response) swalError(getStatusCode(err.response.data.error));
      });
  };

  return (
    <>
      <div className="bg-grey-lighter flex min-h-screen flex-col">
        <div className="container mx-auto flex max-w-sm flex-1 flex-col items-center justify-center px-2">
          <div className="w-full rounded bg-white px-6 py-8 text-black shadow-md">
            <form onSubmit={handleSubmit}>
              <label>
                Name:
                <input
                  className="border-grey-light mb-4 block w-full rounded border p-3"
                  type="text"
                  name="name"
                  value={registerData.name}
                  onChange={handleInputChange}
                />
              </label>
              <br />
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
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
