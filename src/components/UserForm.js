import React, { useState } from 'react';
import { JourneyDetails } from './JourneyDetails';
import { PersonalDetails } from './PersonalDetails';
import { Rate } from './Rate';
import { OTP } from '../OTP';
import { Summary } from './Summary';

export const UserForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    source: '',
    destination: '',
    numPassengers: '',
    vehicleType: '',
    name: '',
    bidPrice: '',
    rateNegotiable: false,
    otp: '',
    number: '',
    getUpdates: false,
  });
  const nextStep = () => setStep(prev => prev + 1);
  const firstStep = () => setStep(1);
  const prevStep = () => setStep(prev => prev - 1);

  switch (step) {
    case 1:
      return (
        <JourneyDetails
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
        />
      );
    case 2:
      return (
        <Rate
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
        />
      );
    default:
      return <div>Submission Complete</div>;
  }
};