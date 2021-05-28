import React from 'react';
import { useField }from 'formik';

const TextfieldWrapper = ({
  name,
  ...otherProps
}) => {
  const [field, meta] = useField(name);

  const configTextField = {
    ...field,
    ...otherProps,
  };

  if (meta && meta.touched && meta.error) {
    configTextField.error = true;
    configTextField.helperText = meta.error;
  }

  return (
    <input {...configTextField} />
  );
}
export default TextfieldWrapper;