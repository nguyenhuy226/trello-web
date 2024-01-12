import { useState } from "react";
import { validate } from "../utils/Validate";

export const useForm = (rules, initialValues = {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setError] = useState({});

  const _validate = () => {
    const errorObject = validate(rules, values);
    setError(errorObject);
    return Object.keys(errorObject).length === 0;
  };

  const register = (name) => {
    return {
      error: errors[name],
      value: values[name] || "",
      onChange: (ev) =>
        setValues({
          ...values,
          [name]: ev.target.value,
        }),
    };
  };
  const reset = () => {
    setValues({});
  };
  return {
    values,
    reset,
    errors,
    register,
    validate: _validate,
  };
};
