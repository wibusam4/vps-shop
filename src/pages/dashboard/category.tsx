import React, { useState } from "react";
import { requireAuth } from "../../common/authAdmin";
import Main from "../../components/dashboard/layouts/Main";
import { prisma } from "../../server/db";
import { Formik, Form, Field, FormikProps, useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

const CategorySchema = Yup.object().shape({
  name: Yup.string().required("Không được để trống"),
  status: Yup.string().required("Chọn option"),
});

interface ISignUpForm {
  name: string;
  status: string;
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
  categories: Category[];
}

export const getServerSideProps = requireAuth(async (ctx) => {
  const categories = JSON.parse(
    JSON.stringify(await prisma.category.findMany())
  );

  return { props: { categories } };
});

const Category: React.FC<RootObject> = (categories) => {
  const router = useRouter();

  const setCategory = (data: any) => {
    formik.values.name = data.name;
    formik.values.status = data.status;
    formik.setFieldValue("id", data.id);
  };

  const handelDelete = async (category: any) => {
    Swal.fire({
      title: `Bạn muốn xóa ID: ${category.id}`,
      icon: "question",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete("/api/categories", { data: { id: category.id } }).then(() => {
          router.push(router.asPath)
          Swal.fire({
            text: "Xóa thành công",
            icon: "success",
          });
        });
      }
    });
  };
  const formik = useFormik({
    initialValues: {
      id: "",
      name: "",
      status: "",
    },
    validationSchema: CategorySchema,
    onSubmit: (values) => {
      Swal.fire({
        title: `Bạn muốn sửa thông tin ID: ${values.id}`,
        icon: "question",
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .put("/api/categories", values)
            .then((respone) => {
              router.push(router.asPath);
              Swal.fire({
                title: "Sửa Thành Công",
              });
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    },
  });

  const addCategory = async (values: any) => {
    axios
      .post("/api/categories", values)
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
          <div className="w-full border md:w-[47%]">
            <div className="w-full bg-secondary-focus p-6 font-bold text-white">
              Thêm Danh Mục
            </div>

            <div className="p-4">
              <Formik
                initialValues={{
                  name: "",
                  status: "",
                }}
                validationSchema={CategorySchema}
                onSubmit={(values) => {
                  addCategory(values);
                }}
              >
                {(props: FormikProps<ISignUpForm>) => {
                  const { touched, errors, handleChange } = props;
                  return (
                    <Form>
                      <div className="form-control mb-4 w-full">
                        <label className="label">
                          <span className="label-text">Tên Danh Mục:</span>
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
                          <span className="label-text">Trạng Thái:</span>
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
          <div className="w-full border md:w-[47%]">
            <div className="w-full bg-accent-focus p-6 font-bold text-white">
              Sửa Danh Mục - ID: {formik.values.id ?? ""}
            </div>
            <div className="p-4">
              <form onSubmit={formik.handleSubmit} className="w-full">
                <label className="label">
                  <span className="label-text">Tên Danh Mục:</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  className="input-bordered input w-full"
                />
                {formik.errors.name && formik.touched.name ? (
                  <div className="alert alert-error mt-2 rounded p-2 text-white">
                    <div>
                      <span>{formik.errors.name}</span>
                    </div>
                  </div>
                ) : null}
                <label className="label">
                  <span className="label-text">Trạng Thái:</span>
                </label>
                <input
                  id="status"
                  name="status"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.status}
                  className="input-bordered input w-full"
                />
                {formik.errors.status && formik.touched.status ? (
                  <div className="alert alert-error mt-2 rounded p-2 text-white">
                    <div>
                      <span>{formik.errors.status}</span>
                    </div>
                  </div>
                ) : null}
                <button className="btn-secondary btn mt-2" type="submit">
                  Sửa
                </button>
              </form>
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
                  <th>Slug</th>
                  <th>Status</th>
                  <th>CreatedAt</th>
                  <th>UpdatedAt</th>
                  <th>Thao Tác</th>
                </tr>
              </thead>
              <tbody>
                {categories &&
                  categories?.categories.map((category: any) => (
                    <tr
                      key={category.id}
                      onClick={() => {
                        setCategory(category);
                      }}
                    >
                      <th>{category.id}</th>
                      <td>{category.name}</td>
                      <td>{category.slug}</td>
                      <td>{category.status}</td>
                      <td>{category.createdAt}</td>
                      <td>{category.updatedAt}</td>
                      <td className="flex gap-x-2">
                        <button
                          onClick={() => {
                            handelDelete(category);
                          }}
                          className="btn-accent btn"
                        >
                          Xóa
                        </button>
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
export default Category;
