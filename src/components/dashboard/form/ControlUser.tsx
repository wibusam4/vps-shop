import axios from "axios";
import { Field, Form, Formik, FormikProps } from "formik";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { FormControl, User } from "../../../model/User.model";
import ErrorForm from "./Error";

const UserSchema = Yup.object().shape({
  id: Yup.string().required("Không được để trống"),
  money: Yup.string().required("Không được để trống"),
  description: Yup.string().required("Không được để trống"),
});

interface RootObject {
  description?: string;
  user: User;
}

const ControlUser: React.FC<RootObject> = ({ user }) => {
  const router = useRouter();

  const editUser = async (data: any) => {
    axios
      .post("/api/users", data)
      .then((respone) => {
        router.push(router.asPath);
        Swal.fire({
          title: "Sửa Thành Công",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="p-2">
      <Formik
        initialValues={{
          id: user.id as any,
          money: 0,
          description: ""
        }}
        validationSchema={UserSchema}
        onSubmit={(values) => {
          editUser(values);
        }}
      >
        {(props: FormikProps<FormControl>) => {
          const { touched, errors } = props;
          return (
            <Form>
              <div className="form-control mb-4 w-full">
                <label className="label">
                  <span className="text-black">ID:</span>
                </label>
                <Field
                  name="id"
                  className="input-bordered input w-full"
                ></Field>
                <ErrorForm error={errors.id} isTouched={touched.id} />
                <label className="label">
                  <span className="text-black">Số tiền:</span>
                </label>
                <Field
                  name="money"
                  type="number"
                  className="input-bordered input w-full"
                ></Field>
                <ErrorForm error={errors.money} isTouched={touched.money} />
                <label className="label">
                  <span className="text-black">Nội dung:</span>
                </label>
                <Field
                  name="description"
                  className="input-bordered input w-full"
                ></Field>
                <ErrorForm
                  error={errors.description}
                  isTouched={touched.description}
                />
                <button className="btn-secondary btn mt-2" type="submit">
                  Thao tác
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default ControlUser;
