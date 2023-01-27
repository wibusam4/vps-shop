import React from "react";
import { requireAuth } from "../../common/authAdmin";
import Main from "../../components/dashboard/layouts/Main";
import { prisma } from "../../server/db";
import { Formik, Form, Field, FormikProps, useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

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

interface IProduct {
  name: string;
  categoryId: number;
  price: number;
  cpu: number;
  ram: number;
  os: string;
  bandwidth: string;
  status: string;
}

export interface Product {
  id: number;
  categoryId: number;
  name: string;
  price: number;
  cpu: number;
  ram: number;
  os: string;
  bandwidth: string;
  status: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface Category {
  id: number;
  name: string;
  slug: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface RootObject {
  products: Product[];
  category: Category[];
}

export const getServerSideProps = requireAuth(async (ctx) => {
  const products = JSON.parse(
    JSON.stringify(
      await prisma.product.findMany({ include: { category: true } })
    )
  );
  const category = JSON.parse(JSON.stringify(await prisma.category.findMany()));
  return { props: { category, products } };
});

const Product: React.FC<RootObject> = (data) => {

  const router = useRouter();

  const addProduct = async (product: any) => {
    axios
      .post("/api/products", product)
      .then((response) => {
        router.replace(router.asPath);
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Main>
      <div className="flex flex-col gap-y-4 p-10">
        <div className="flex flex-wrap justify-between gap-y-4 gap-x-4">
          <div className="collapse w-full border md:w-[47%]">
            <input type="checkbox" className="peer" />
            <div className="w-full bg-secondary p-6 font-bold text-white collapse-title  peer-checked:bg-secondary peer-checked:text-secondary-content">
            Thêm Sản Phẩm 
            </div>
            <div className="border-t collapse-content peer-checked:bg-secondary-content">
              <div className="w-full text-black">
                <div className="p-4">
                  <Formik
                    initialValues={{
                      name: "",
                      categoryId: 1,
                      price: 10000,
                      cpu: 1,
                      ram: 0,
                      os: "Window Server 2012",
                      bandwidth: "",
                      status: "",
                    }}
                    validationSchema={ProductSchema}
                    onSubmit={(values) => {
                      console.log(values);

                      addProduct(values);
                    }}
                  >
                    {(props: FormikProps<IProduct>) => {
                      const { touched, errors } = props;
                      return (
                        <Form>
                          <div className="form-control mb-4 w-full">
                            <label className="label">
                              <span className="text-black">Tên Sản Phẩm:</span>
                            </label>
                            <Field
                              className="input-bordered input w-full"
                              name="name"
                            />
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

                            <select className="select-bordered select">
                              {data.category &&
                                data.category.map((item: any) => (
                                  <option key={item.id} value={item.id}>
                                    {item.name}
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
                              <span className="text-black">
                                OS(Hệ điều hành):
                              </span>
                            </label>
                            <Field
                              className="input-bordered input w-full"
                              name="os"
                            />
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
                            <button
                              className="btn-secondary btn mt-2"
                              type="submit"
                            >
                              Thêm
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
        </div>
        <div>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Danh Mục</th>
                  <th>Giá</th>
                  <th>Cpu</th>
                  <th>Ram</th>
                  <th>OS</th>
                  <th>Băng Thông</th>
                  <th>Slug</th>
                  <th>Status</th>
                  <th>CreatedAt</th>
                  <th>UpdatedAt</th>
                  <th>Thao Tác</th>
                </tr>
              </thead>
              <tbody>
                {data.products &&
                  data.products.map((product: any) => (
                    <tr key={product.id}>
                      <th>{product.id}</th>
                      <td>{product.name}</td>
                      <td>{product.category.name}</td>
                      <td>{product.price}</td>
                      <td>{product.cpu}</td>
                      <td>{product.ram}</td>
                      <td>{product.os}</td>
                      <td>{product.bandwidth}</td>
                      <td>{product.slug}</td>
                      <td>{product.status}</td>
                      <td>{product.createdAt}</td>
                      <td>{product.updatedAt}</td>
                      <td className="flex gap-x-2">
                        <button className="btn-accent btn">Xóa</button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Main>
  );
};
export default Product;
