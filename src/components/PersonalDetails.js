import React, {useState} from 'react';
//import PropTypes from 'prop-types';
import {Formik, Form, Field} from 'formik';
import Header from './Header';
import * as Yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import '../App.css'
import Textfield from './FormsUI/TextfieldWrapper';
import EditIcon from '@material-ui/icons/Edit';
import RateField from './FormsUI/RateField';


export const PersonalDetails = ({
  formData,
  setFormData,
  nextStep,
  prevStep
}) => {
  const [direction, setDirection] = useState('back');
  const classes = useStyles();

  return (
    <>
      <Header title='Place your Bid (2/4 step)' />
      <Formik
        initialValues={formData}
        onSubmit={values => {
          setFormData(values);
          console.log(values);
          direction === 'back' ? prevStep() : nextStep();
        }}
      >
        <Form className={classes.form}>
          
          <Textfield className={classes.field} name="number" label="Mobile Number*" />
          <label>
            <Field type="checkbox" name='getUpdates' />
            Get updates on Whatsapp
          </label>
          <Textfield className={classes.field} name="name" label="Enter your Name*" />
          <Textfield className={classes.field} name="remarks" label="Remarks(optional)" />
          <div>
            <Button
              type='submit'
              variant='contained'
              color='primary'
              onClick={() => setDirection('forward')}
              className={classes.button}
            >
              Verify via OTP
            </Button>
          </div>
        </Form>
      </Formik>
    </>
  );
};
