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
import Link from "next/link";
import Google from "../../components/basic/icon/Google";
import axios from "axios";
import { getStatusCode } from "../../until/statusCode";
import Swal from "sweetalert2";
import Auth from "../../components/basic/layouts/Auth";

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required("Không được để trống"),
  email: Yup.string().required("Không được để trống"),
  password: Yup.string().required("Không được để trống"),
});

const Register: React.FC = () => {
  const [theme, setTheme] = useState("emerald");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleRegister = async (value: FormAuth) => {
    setLoading(true);
    await axios
      .post("/api/auth/register", value)
      .then((response) => {
        Swal.fire({
          title: "Đăng kí thành công",
          icon: "success",
          showConfirmButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            router.push("/auth/login");
          }
        });
      })
      .catch((err) => {
        setLoading(false);
        if (err.response) swalError(getStatusCode(err.response.data.error));
      });
  };
  useEffect(() => {
    document
      ?.querySelector("html")
      ?.setAttribute("data-theme", getLocal("data-theme"));
    setTheme(getLocal("data-theme"));
  }, []);

  return (
    <Auth isLogin={false}>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
        }}
        validationSchema={RegisterSchema}
        onSubmit={(values) => {
          handleRegister(values);
        }}
      >
        {(props: FormikProps<FormAuth>) => {
          const { touched, errors } = props;
          return (
            <Form className="flex flex-col gap-4">
              <Field
                className="input mt-8 w-full"
                name="name"
                placeholder="User name"
              />
              <ErrorForm error={errors.name} isTouched={touched.name} />

              <Field
                className="input w-full"
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
                Đăng Kí
              </button>
            </Form>
          );
        }}
      </Formik>
    </Auth>
  );
};

export default Register;
