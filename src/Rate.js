import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import Header from './Header';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import * as Yup from 'yup';
import RateField from './FormsUI/RateField';

const useStyles = makeStyles(theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Trebuchet MS',
  },
  button: {
    backgroundColor: 'blue',
    color: 'white',
    margin: theme.spacing(1),
    width: 350
  },
  editButton: {
    backgroundColor: 'white',
    border: 'none',
    color: 'blue',
    fontSize: 15
  },
  rateField: {
    padding: '10px 10px 10px 10px',
    margin: 10,
    width: 150,
    height: 75,
    fontSize: 50,
    textAlign: 'center',
    border: 'none'
  },
  labelTag: {
    fontSize: 50
  },
  details: {
    borderBottom: '0.1px solid #eaeaea',
    width: 350,
    padding: '30px 10px 30px 10px'
  },
  detailsTitle: {
    color: 'grey',
    fontSize: 10,
    fontStyle: 'italic',
    textAlign: 'left',
    padding: '0px 0px 10px 0px'
  },
  detailsContent: {
    fontSize: 15,
    display: 'flex',
    fontStyle: 'bold',
    justifyContent: 'space-between'
  }
}));

const validationSchema = Yup.object().shape({
  bidPrice: Yup.number()
    .integer()
    .required('Rate is required')
});

export const Rate = ({
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
          direction === 'back' ? prevStep() : nextStep();
        }}
        validationSchema={validationSchema}
      >
        <Form className={classes.form}>
          <div className={classes.details}>
            <div className={classes.detailsTitle}>
              JOURNEY DETAILS
            </div>
            <div className={classes.detailsContent}>
              <div>
                {formData.source} - {formData.destination}
                <br />
                {formData.numPassengers} Persons, {formData.vehicleType}
              </div>
              <div>
                <button
                  type='submit'
                  onClick={() => setDirection('back')}
                  className={classes.editButton}
                >
                  <EditIcon />
                  Edit
                </button>  
              </div>       
            </div>
          </div>
          <label className={classes.labelTag}>
            ₹
            <RateField className={classes.rateField} name="bidPrice" label="Rate(₹)" placeholder="0"/>
          </label>
          <label>
            <Field type="checkbox" name='rateNegotiable' label="Rate Negotiable" />
            Rate Negotiable
          </label>
          <div>
            <Button
              type='submit'
              variant='contained'
              color='primary'
              onClick={() => setDirection('forward')}
              className={classes.button}
            >
              Next
            </Button>
          </div>
        </Form>
      </Formik>
    </>
  );
};
