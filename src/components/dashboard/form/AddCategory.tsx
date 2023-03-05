import { Formik, Form, Field, FormikProps } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { FormCategory } from "../../../model/Category.model";

const CategorySchema = Yup.object().shape({
  name: Yup.string().required("Không được để trống"),
  status: Yup.string().required("Không được để trống"),
});



const AddCategory: React.FC = () => {
  const router = useRouter();
  const addCategory = async (category: any) => {
    axios
      .post("/api/categories", category)
      .then((response) => {
        router.replace(router.asPath);
        Swal.fire({
          text: "Thêm thành công",
          icon: "success",
        });
      })
      .catch((err) => {});
  };

  return (
    <div className="p-2">
      <Formik
        initialValues={{
          name: "",
          status: "ACTIVE",
        }}
        validationSchema={CategorySchema}
        onSubmit={(values) => {
          addCategory(values);
        }}
      >
        {(props: FormikProps<FormCategory>) => {
          const { touched, errors  } = props;
          return (
            <Form>
              <div className="form-control">
                <label className="input-group">
                  <span className="bg-warning p-1 font-medium">
                    Thêm danh mục
                  </span>
                </label>
              </div>
              <div className="form-control mb-4 w-full">
                <label className="label">
                  <span className="text-black">Tên Danh Mục:</span>
                </label>
                <Field className="input-bordered input w-full" name="name" />
                {errors.name && touched.name ? (
                  <div className="alert alert-error mt-2 rounded p-2 text-white">
                    <div>
                      <span>{errors.name}</span>
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
                  Thêm
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default AddCategory;
