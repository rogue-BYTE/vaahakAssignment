import React, {useRef} from 'react';
import {makeStyles, TextField} from '@material-ui/core';
import { Formik, Form, useField, useFormikContext }from 'formik';
import * as Yup from 'yup';

const useStyles = makeStyles(theme => ({
  form: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  field: {
    width: 75,
    height: 75,
    fontSize: 30,
    textAlign: 'center',
    margin: theme.spacing(1),
  }
}));

const validationSchema = Yup.object({
  digit1: Yup
  .string()
  .matches(/^[0-9]+$/, "Must be only digits")
  .min(1)
  .max(1),
  digit2: Yup
  .string()
  .matches(/^[0-9]+$/, "Must be only digits")
  .min(1)
  .max(1),
  digit3: Yup
  .string()
  .matches(/^[0-9]+$/, "Must be only digits")
  .min(1)
  .max(1),
  digit4: Yup
  .string()
  .matches(/^[0-9]+$/, "Must be only digits")
  .min(1)
  .max(1)
})

const OTPfieldWrapper = ({
  name,
  setOtp,
  ...otherProps
}) => {
  const [field, meta] = useField(name);
  const classes = useStyles()
  const configTextField = {
    ...field,
    ...otherProps,
    variant: 'filled'
  };

  if (meta && meta.touched && meta.error) {
    configTextField.error = true;
    configTextField.helperText = meta.error;
  }

  const Digit = {
    digit1: '',
    digit2: '',
    digit3: '',
    digit4: ''
  }
  const {submitForm} = useFormikContext();
  const handleChange = (e) => {
    const { maxLength, value, name } = e.target;
    const fieldIndex = name[name.length-1];

    if (value.length >= maxLength) {
      if (parseInt(fieldIndex, 10) < 4) {
        const nextSibling = document.querySelector(
          `input[name=digit${parseInt(fieldIndex, 10) + 1}]`
        );
        if (nextSibling !== null) {
          nextSibling.focus();
        }
      }
    }
    Digit[name] = value;
    if (name=='digit4') {
      if (formRef.current) {
        //console.log(Digit);
        setTimeout(formRef.current.handleSubmit(), 5000)
      }    
    }
}
  const formRef = useRef();
  return (
    <Formik
      initialValues={Digit}
      onSubmit={(Digit) => {
        console.log(Digit);
        setOtp(Digit);
        submitForm();
      }}
      validationSchema={validationSchema}
      innerRef={formRef}
    >
      <Form className={classes.form}>

          <input className={classes.field} maxLength={1} name="digit1" onChange={handleChange} />
          <input className={classes.field} maxLength={1} name="digit2" onChange={handleChange} />
          <input className={classes.field} maxLength={1} name="digit3" onChange={handleChange} />
          <input className={classes.field} maxLength={1} name="digit4" onChange={handleChange} />

        </Form>
    </Formik>
    
  );
}
export default OTPfieldWrapper;