import { Field } from "formik";
import { ChangeEvent, ChangeEventHandler } from "react";

interface InputProps {
  field: any;
  form: any;
}
const Input: React.FC<InputProps> = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => {
  return (
    <div>
      <input type="text" {...field} {...props} />
      {touched[field.name] && errors[field.name] && (
        <div className="error">{errors[field.name]}</div>
      )}
    </div>
  );
};

export default Input;
