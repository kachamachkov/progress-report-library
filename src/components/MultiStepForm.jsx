import { useState } from 'react';
import useMultiStepForm from '../hooks/useMultiStepForm';
import DemoReportTitles from './DemoReportTitles';
import DemoReportFormats from './DemoReportFormats';
import GetReport from './GetReport';

const INITIAL_DATA = {
  reportName: '',
  reportFormat: 'PDF',
};

export default function MultiStepForm() {
  const [data, setData] = useState(INITIAL_DATA);

  const { step, steps, currentStepIndex, isFirstStep, isLastStep, back, next } =
    useMultiStepForm([
      <DemoReportTitles {...data} updateFields={updateFields} />,
      <DemoReportFormats {...data} updateFields={updateFields} />,
      <GetReport {...data} />,
    ]);

  function updateFields(fields) {
    setData((prevData) => ({ ...prevData, ...fields }));
  }

  function onSubmit(e) {
    e.preventDefault();
    if (!isLastStep) return next();
  }

  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  return (
    <form onSubmit={onSubmit}>
      <header className='header'>
        <a href='https://www.progress.com/'>
          <img
            src='/progress-logo.png'
            alt='Progress Logo'
            className='progress-logo'
          />
        </a>
      </header>
      <div className='progress-bar'>
        <div
          className='progress-bar-filled'
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {step}

      <div className='controls'>
        {!isFirstStep && (
          <button onClick={back} type='button' className='back-btn'>
            Back
          </button>
        )}
        {!isLastStep && (
          <button type='submit' className='next-btn'>
            Next
          </button>
        )}
      </div>
    </form>
  );
}
