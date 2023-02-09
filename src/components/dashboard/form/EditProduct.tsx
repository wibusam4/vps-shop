import { Formik, Form, Field, FormikProps } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { Product, FormProduct } from "../../../model/Product.model";
import { Category } from "../../../model/Category.model";

const ProductSchema = Yup.object().shape({
  id: Yup.string().required("Không được để trống"),
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
  product: Product;
  categories: Category[];
}

const EditProduct: React.FC<RootObject> = ({ product, categories }) => {
  const router = useRouter();
  const editProduct = async (product: any) => {
    axios
      .put("/api/products", product)
      .then((response) => {
        router.replace(router.asPath);
        Swal.fire({
          text: "Sửa thành công",
          icon: "success",
        });
      })
      .catch((err) => {});
  };
  return (
    <div className="p-2">
      <Formik
        initialValues={{
          id: product.id as any,
          name: product.name,
          categoryId: product.categoryId,
          price: product.price,
          cpu: product.cpu,
          ram: product.ram,
          os: product.os,
          bandwidth: product.bandwidth,
          status: product.status,
        }}
        validationSchema={ProductSchema}
        onSubmit={(values) => {
          editProduct(values);
        }}
      >
        {(props: FormikProps<FormProduct>) => {
          const { touched, errors, values, handleChange } = props;
          return (
            <Form>
              <div className="form-control mb-4 w-full">
                <div className="hidden">
                <label className="label">
                  <span className="text-black">ID:</span>
                </label>
                <Field className="input-bordered input w-full" name="id" />
                {errors.id && touched.id ? (
                  <div className="alert alert-error mt-2 rounded p-2 text-white">
                    <div>
                      <span>{errors.id}</span>
                    </div>
                  </div>
                ) : null}
                </div>
                <label className="label">
                  <span className="text-black">Tên Sản Phẩm:</span>
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
                  <span className="text-black">Danh mục:</span>
                </label>

                <select
                  name="categoryId"
                  value={values.categoryId}
                  onChange={handleChange}
                  className="select-bordered select"
                >
                  {categories.map((category: any) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {errors.categoryId && touched.categoryId ? (
                  <div className="alert alert-error mt-2 rounded p-2 text-white">
                    <div>
                      <span>{errors.categoryId}</span>
                    </div>
                  </div>
                ) : null}
                <label className="label">
                  <span className="text-black">Giá:</span>
                </label>
                <Field
                  className="input-bordered input w-full"
                  name="price"
                  type="number"
                />
                {errors.price && touched.price ? (
                  <div className="alert alert-error mt-2 rounded p-2 text-white">
                    <div>
                      <span>{errors.price}</span>
                    </div>
                  </div>
                ) : null}
                <label className="label">
                  <span className="text-black">CPU:</span>
                </label>
                <Field
                  className="input-bordered input w-full"
                  name="cpu"
                  type="number"
                />
                {errors.cpu && touched.cpu ? (
                  <div className="alert alert-error mt-2 rounded p-2 text-white">
                    <div>
                      <span>{errors.cpu}</span>
                    </div>
                  </div>
                ) : null}
                <label className="label">
                  <span className="text-black">Ram:</span>
                </label>
                <Field
                  className="input-bordered input w-full"
                  name="ram"
                  type="number"
                />
                {errors.ram && touched.ram ? (
                  <div className="alert alert-error mt-2 rounded p-2 text-white">
                    <div>
                      <span>{errors.ram}</span>
                    </div>
                  </div>
                ) : null}
                <label className="label">
                  <span className="text-black">OS(Hệ điều hành):</span>
                </label>
                <Field className="input-bordered input w-full" name="os" />
                {errors.os && touched.os ? (
                  <div className="alert alert-error mt-2 rounded p-2 text-white">
                    <div>
                      <span>{errors.os}</span>
                    </div>
                  </div>
                ) : null}
                <label className="label">
                  <span className="text-black">Băng Thông:</span>
                </label>
                <Field
                  className="input-bordered input w-full"
                  name="bandwidth"
                />
                {errors.bandwidth && touched.bandwidth ? (
                  <div className="alert alert-error mt-2 rounded p-2 text-white">
                    <div>
                      <span>{errors.bandwidth}</span>
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
                  default="Active"
                >
                  <option value="Active">Active</option>
                  <option value="InActive">InActive</option>
                </Field>
                {errors.status && touched.status ? (
                  <div className="alert alert-error mt-2 rounded p-2 text-white">
                    <div>
                      <span>{errors.status}</span>
                    </div>
                  </div>
                ) : null}
                <button className="btn-accent btn mt-2" type="submit">
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

export default EditProduct;
