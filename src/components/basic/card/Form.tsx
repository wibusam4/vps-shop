import axios from "axios";
import { Field, Form, Formik, FormikProps } from "formik";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { Card } from "../../../model/Card.model";

const CardSchema = Yup.object().shape({
  serial: Yup.string().required("Không được để trống"),
  code: Yup.string().required("Không được để trống"),
});


const FormCard = () => {
  const router = useRouter();
  const handelSubmit = async (card: any) => {};

  return (
    <div className="p-2 w-full md:w-[67%] border border-black">
      <Formik
        initialValues={{
          serial: "",
          code: "",
        }}
        validationSchema={CardSchema}
        onSubmit={(values) => {
          //handelSubmit(values);
        }}
      >
        {(props: FormikProps<Card>) => {
          const { touched, errors } = props;
          return (
            <Form>
              <div className="form-control mb-4 w-full">
                <label className="label">
                  <span className="text-black">Serial:</span>
                </label>
                <Field className="input-bordered input w-full" name="serial" />
                {errors.serial && touched.serial ? (
                  <div className="alert alert-error mt-2 rounded p-2 text-white">
                    <div>
                      <span>{errors.serial}</span>
                    </div>
                  </div>
                ) : null}

                <label className="label">
                  <span className="text-black">Mã Thẻ:</span>
                </label>

                <Field className="input-bordered input w-full" name="code" />
                {errors.code && touched.code ? (
                  <div className="alert alert-error mt-2 rounded p-2 text-white">
                    <div>
                      <span>{errors.code}</span>
                    </div>
                  </div>
                ) : null}
                <button className="btn-secondary btn mt-2" type="submit">
                  Nạp Ngay
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default FormCard;
