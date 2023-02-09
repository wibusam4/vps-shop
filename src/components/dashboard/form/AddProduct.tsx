import { Formik, Form, Field, FormikProps, useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { FormProduct } from "../../../model/Product.model";
import { Category } from "../../../model/Category.model";

const ProductSchema = Yup.object().shape({
  name: Yup.string().required("Không được để trống"),
  categoryId: Yup.string().required("Chọn danh mục"),
  price: Yup.string().required("Không được để trống"),
  cpu: Yup.string().required("Không được để trống"),
  ram: Yup.string().required("Không được để trống"),
  os: Yup.string().required("Không được để trống"),
  bandwidth: Yup.string().required("Không được để trống"),
  status: Yup.string().required("Không được để trống"),
});

export interface RootObject {
  categories: Category[];
}

const AddProduct: React.FC<RootObject> = ({ categories }) => {
  const router = useRouter();
  const addProduct = async (product: any) => {
    axios
      .post("/api/products", product)
      .then((response) => {
        router.replace(router.asPath);
        Swal.fire({
          text: "Thêm thành công",
          icon: "success",
        });
      })
      .catch((err) => {
        Swal.fire({ title: "Hãy chọn tên khác!", icon: "warning" });
      });
  };

  return (
    <div className="p-2">
      <Formik
        initialValues={{
          name: "",
          categoryId: categories[0]?.id ? categories[0].id : "a",
          price: 10000,
          cpu: 1,
          ram: 1,
          os: "Window Server 2012",
          bandwidth: "Unlimited",
          status: "ACTIVE",
        }}
        validationSchema={ProductSchema}
        onSubmit={(values) => {
          addProduct(values);
        }}
      >
        {(props: FormikProps<FormProduct>) => {
          const { touched, errors, values, handleChange } = props;
          return (
            <Form>
              <div className="form-control mb-4 w-full">
                <label className="label">
                  <span>Tên Sản Phẩm:</span>
                </label>
                <Field className="input-bordered input w-full" name="name" />
                {errors.name && touched.name ? (
                  <div className="alert alert-error mt-2 rounded p-2 text-base-100">
                    <div>
                      <span>{errors.name}</span>
                    </div>
                  </div>
                ) : null}

                <label className="label">
                  <span>Danh mục:</span>
                </label>

                <select
                  name="categoryId"
                  value={values.categoryId}
                  onChange={handleChange}
                  className="select-bordered select"
                >
                  {categories &&
                    categories.map((item: any) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                </select>
                {errors.categoryId && touched.categoryId ? (
                  <div className="alert alert-error mt-2 rounded p-2 text-base-100">
                    <div>
                      <span>{errors.categoryId}</span>
                    </div>
                  </div>
                ) : null}
                <label className="label">
                  <span>Giá:</span>
                </label>
                <Field
                  className="input-bordered input w-full"
                  name="price"
                  type="number"
                />
                {errors.price && touched.price ? (
                  <div className="alert alert-error mt-2 rounded p-2 text-base-100">
                    <div>
                      <span>{errors.price}</span>
                    </div>
                  </div>
                ) : null}
                <label className="label">
                  <span>CPU:</span>
                </label>
                <Field
                  className="input-bordered input w-full"
                  name="cpu"
                  type="number"
                />
                {errors.cpu && touched.cpu ? (
                  <div className="alert alert-error mt-2 rounded p-2 text-base-100">
                    <div>
                      <span>{errors.cpu}</span>
                    </div>
                  </div>
                ) : null}
                <label className="label">
                  <span>Ram:</span>
                </label>
                <Field
                  className="input-bordered input w-full"
                  name="ram"
                  type="number"
                />
                {errors.ram && touched.ram ? (
                  <div className="alert alert-error mt-2 rounded p-2 text-base-100">
                    <div>
                      <span>{errors.ram}</span>
                    </div>
                  </div>
                ) : null}
                <label className="label">
                  <span>OS(Hệ điều hành):</span>
                </label>
                <Field className="input-bordered input w-full" name="os" />
                {errors.os && touched.os ? (
                  <div className="alert alert-error mt-2 rounded p-2 text-base-100">
                    <div>
                      <span>{errors.os}</span>
                    </div>
                  </div>
                ) : null}
                <label className="label">
                  <span>Băng Thông:</span>
                </label>
                <Field
                  className="input-bordered input w-full"
                  name="bandwidth"
                />
                {errors.bandwidth && touched.bandwidth ? (
                  <div className="alert alert-error mt-2 rounded p-2 text-base-100">
                    <div>
                      <span>{errors.bandwidth}</span>
                    </div>
                  </div>
                ) : null}

                <label className="label">
                  <span>Trạng Thái:</span>
                </label>

                <Field
                  name="status"
                  as="select"
                  className="input-bordered input w-full"
                  default="Active"
                >
                  <option value="Active">Active</option>
                  <option value="InActive">InActive</option>
                </Field>
                {errors.status && touched.status ? (
                  <div className="alert alert-error mt-2 rounded p-2 text-base-100">
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

export default AddProduct;
