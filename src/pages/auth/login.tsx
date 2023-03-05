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
import Auth from "../../components/basic/layouts/Auth";
const LoginSchema = Yup.object().shape({
  email: Yup.string().required("Không được để trống"),
  password: Yup.string().required("Không được để trống"),
});

const Login: NextPage = () => {
  const [theme, setTheme] = useState("emerald");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async (value: FormAuth) => {
    setLoading(true);
    signIn("credentials", {
      ...value,
      callbackUrl: `${window.location.origin}/`,
      redirect: false,
    })
      .then((res) => {
        setLoading(false);
        if (!res?.ok) {
          return swalError("Tên đăng nhập hoặc mật khẩu không đúng!");
        }
        toast("Đăng nhập thành công!", {
          position: "top-right",
          autoClose: 2000,
          closeOnClick: true,
          theme: "light",
        });
        router.push("/");
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
    <Auth isLogin={true}>
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
            <Form className="flex flex-col gap-4">
              <Field
                className="input mt-8 w-full"
                name="email"
                placeholder="Email"
              />
              <ErrorForm error={errors.email} isTouched={touched.email} />

              <Field
                className="input w-full"
                name="password"
                type="password"
                placeholder="Mật khẩu"
              />
              <ErrorForm error={errors.password} isTouched={touched.password} />
              <button
                className={`btn-primary btn mt-4 hover:scale-105 ${
                  loading ? "loading" : ""
                }`}
                type="submit"
              >
                Đăng Nhập
              </button>
            </Form>
          );
        }}
      </Formik>
    </Auth>
  );
};

export default Login;
