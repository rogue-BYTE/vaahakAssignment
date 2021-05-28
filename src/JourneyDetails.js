import React, {useState}from 'react';
import {Formik, Form } from 'formik';
import Header from './Header';
import * as Yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Textfield from './FormsUI/Textfield';
import Select from './FormsUI/Select';

const useStyles = makeStyles(theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: theme.spacing(4),
  },
  button: {
    backgroundColor: 'blue',
    color: 'white',
    margin: theme.spacing(1),
    width: 300
  },
  field: {
    margin: theme.spacing(1),
    width: 175
  },
  fullWidthField: {
    margin: theme.spacing(1),
    width: 350,
  },
  dropDown: {
    margin: theme.spacing(1),
    width: 350
  }
}));

const validationSchema = Yup.object().shape({
  source: Yup
    .string()
    .required('Source is required'),
  destination: Yup
    .string()
    .required('Destination is required'),
  vehicleType: Yup
    .string()
    .required('Please select a Vehicle Type'),
  numPassengers: Yup.number()
    .integer()
    .required('Please select the number of passengers')
    .when("vehicleType", (vehicleType) => {
      if (vehicleType=='SUV')
        return Yup.number().integer().max(6, 'Capacity is 6').min(1);
      else
        return Yup.number().integer().max(4, 'Capacity is 4').min(1);
    })
});

export const JourneyDetails = ({ formData, setFormData, nextStep }) => {
  const classes = useStyles();
  const vehicles = {0: 'Sedan', 1: 'SUV', 2: 'HatchBack'};

  return (
    <div>
      <Header title='Place you Bid (Step 1/4)'></Header>
      <Formik
        initialValues={formData}
        onSubmit={values => {
          setFormData(values);
          console.log(values)
          nextStep();
        }}
        validationSchema={validationSchema}
      >
        <Form className={classes.form}>
          <div>
            <Textfield className={classes.field} name="source" label="Source*" />
            <Textfield className={classes.field} name="destination" label="Destination*" />
          </div>
          <Select className={classes.dropDown} name="vehicleType" label="Type of Vehicle*" options={vehicles}/>
          <Textfield className={classes.fullWidthField} name="numPassengers" label="Number of Passengers*" />
          <Button className={classes.button} variant='contained' type="submit">Enter Bid Details</Button>
        </Form>
      </Formik>
    </div>
  );
};
