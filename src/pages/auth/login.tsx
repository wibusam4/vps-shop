import type { NextPage } from "next";
import { signIn } from "next-auth/react";
import { swalError } from "../../until/swal";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { FormAuth } from "../../model/User.model";
import { Field, Form, Formik, FormikProps } from "formik";
import ErrorForm from "../../components/dashboard/form/Error";
import { useEffect, useState } from "react";
import { getLocal } from "../../until";

const LoginSchema = Yup.object().shape({
  email: Yup.string().required("Không được để trống"),
  password: Yup.string().required("Không được để trống"),
});

const Login: NextPage = () => {
  const [theme, setTheme] = useState("emerald");
  const router = useRouter();
  const handleSubmit = async (value: FormAuth) => {
    signIn("credentials", {
      ...value,
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
          closeOnClick: true,
          theme: "light",
        });
        router.push("/auth/login");
      })
      .catch((err) => {});
  };
  useEffect(() => {
    document
      ?.querySelector("html")
      ?.setAttribute("data-theme", getLocal("data-theme"));
    setTheme(getLocal("data-theme"));
  }, []);
   return (
    <>
      <div className="flex min-h-screen flex-col">
        <div className="phone-3 artboard mx-auto flex items-center justify-center">
          <div className="w-full text-base-content">
            <h1 className="mb-2 p-2 text-center text-xl md:text-2xl">
              Đăng nhập đi nào!
            </h1>
            <div className="rounded bg-base-300  px-6 py-8 shadow-md shadow-white">
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                }}
                validationSchema={LoginSchema}
                onSubmit={(values) => {
                  handleSubmit(values);
                }}
              >
                {(props: FormikProps<FormAuth>) => {
                  const { touched, errors } = props;
                  return (
                    <Form>
                      <div className="form-control mb-4 w-full">
                        <label className="label">
                          <span>Email:</span>
                        </label>
                        <Field
                          className="input-bordered input w-full"
                          name="email"
                        />
                        <ErrorForm
                          error={errors.email}
                          isTouched={touched.email}
                        />
                        <label className="label">
                          <span >Mật khẩu:</span>
                        </label>
                        <Field
                          className="input-bordered input w-full"
                          name="password"
                          type="password"
                        />
                        <ErrorForm
                          error={errors.password}
                          isTouched={touched.password}
                        />
                        <button
                          className="btn-secondary btn mt-4"
                          type="submit"
                        >
                          Đăng Nhập
                        </button>
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
