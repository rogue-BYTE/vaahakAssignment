import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import Header from './Header';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles(theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Trebuchet MS',
  },
  field: {
    margin: theme.spacing(1),
    width: 300
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
    height: 50,
    fontSize: 30,
    textAlign: 'center',
    border: 'none'
  },
  details: {
    borderBottom: '0.1px solid grey',
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

export const Summary = ({
  formData,
  setFormData,
  nextStep,
  prevStep
}) => {
  const [direction, setDirection] = useState('forward');
  const classes = useStyles();
  return (
    <>
      <Header title='Summary and Submit Bid (4/4 step)' />
      <Formik
        initialValues={formData}
        onSubmit={values => {
          setFormData(values);
          console.log()
          direction === 'back' ? prevStep() : nextStep();
        }}
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
          <div className={classes.details}>
            <div className={classes.detailsTitle}>
                BIDDING DETAILS
            </div>
              <div className={classes.detailsContent}>
                <div>
                  {formData.number}
                  <br />
                  {formData.name}
                  <br />
                  {formData.remarks}
                </div>
                <div className={classes.rateField}>
                  ₹{formData.bidPrice}
                </div>       
              </div>
            </div>
            <div>
            <Button
              type='submit'
              variant='contained'
              color='primary'
              onClick={() => setDirection('forward')}
              className={classes.button}
            >
              Submit Bid
            </Button>
          </div>
        </Form>
      </Formik>
    </>
  );
};

