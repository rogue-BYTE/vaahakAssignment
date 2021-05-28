import React from 'react';
import {Formik, Form} from 'formik';
import Header from './Header.js'
import * as Yup from 'yup';

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
