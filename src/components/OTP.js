import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import Header from './Header';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import * as Yup from 'yup';
import OTPfield from './FormsUI/OTPField';

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
    margin: theme.spacing(1)
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
  },
  otpField: {
    padding: '10px 10px 10px 10px',
    margin: '10px 10px 10px 10px',
    height: 20
  }
}));

const validationSchema = Yup.object({
  otp: Yup
    .string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(4, 'Must be exactly 4 digits')
    .max(4, 'Must be exactly 4 digits')
});
export const OTP = ({
  formData,
  setFormData,
  nextStep,
  prevStep,
  firstStep
}) => {
  const [direction, setDirection] = useState('forward');
  const classes = useStyles();
  const [otp, setOtp] = useState('');
  return (
    <>
      <Header title='Verify OTP (3/4 step)' />
      <Formik
        initialValues={formData}
        onSubmit={values => {
          values['otp'] = otp;
          setFormData(values);
          console.log();
          if (direction==='first') {
            firstStep();
          }
          else if (direction==='back') {
            prevStep()
          }
          else {
            nextStep();
          }
        }}
        validationSchema={direction==='front'?validationSchema:''}
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
                  onClick={() => setDirection('first')}
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
          <div className={classes.field}>
            We have sent an OTP to your mobile number. Please enter it below to submit your bid.
            {formData.number}
            <button
              type='submit'
              onClick={() => setDirection('back')}
              className={classes.editButton}
            >
              <EditIcon />
              Edit
            </button>
          </div>
          <OTPfield className={classes.otpField} name="otp" label="OTP" setOtp={setOtp}/>
        </Form>
      </Formik>
    </>
  );
};

