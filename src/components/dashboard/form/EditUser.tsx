import { Field, Form, Formik, FormikProps } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { User, FormUser } from "../../../model/User.model";

const UserSchema = Yup.object().shape({
  id: Yup.string().required("Không được để trống"),
  role: Yup.string().required("Không được để trống"),
  status: Yup.string().required("Không được để trống"),
});

interface RootObject {
  user: User;
}

const EditUser: React.FC<RootObject> = ({ user }) => {
  const router = useRouter();

  const editUser = async (user: any) => {
    axios
      .put("/api/users", user)
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
          role: user.role,
          status: user.status,
        }}
        validationSchema={UserSchema}
        onSubmit={(values) => {
          editUser(values);
        }}
      >
        {(props: FormikProps<FormUser>) => {
          const { touched, errors } = props;
          return (
            <Form>
              <div className="form-control">
                <label className="input-group">
                  <span className="bg-warning p-1 font-medium">
                    Sửa thông tin: {user.name}
                  </span>
                </label>
              </div>
              <div className="form-control mb-4 w-full">
                <label className="label">
                  <span className="text-black">Chức Vụ:</span>
                </label>
                <Field
                  name="role"
                  as="select"
                  className="input-bordered input w-full"
                  default="CTV"
                >
                  <option value="USER">USER</option>
                  <option value="CTV">CTV</option>
                  <option value="ADMIN">ADMIN</option>
                </Field>
                {errors.role && touched.role ? (
                  <div className="alert alert-error mt-2 rounded p-2 text-white">
                    <div>
                      <span>{errors.role}</span>
                    </div>
                  </div>
                ) : null}

                <label className="label">
                  <span className="text-black">Trạng Thái:</span>
                </label>

                <Field
                  name="status"
                  as="select"
                  className="input-bordered input w-full"
                  default="ACTIVE"
                >
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="INACTIVE">INACTIVE</option>
                </Field>
                {errors.status && touched.status ? (
                  <div className="alert alert-error mt-2 rounded p-2 text-white">
                    <div>
                      <span>{errors.status}</span>
                    </div>
                  </div>
                ) : null}
                <button className="btn-secondary btn mt-2" type="submit">
                  Sửa
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default EditUser;
