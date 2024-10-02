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

  return (
    <form onSubmit={onSubmit}>
      <div>
        {currentStepIndex + 1} / {steps.length}
      </div>
      {step}

      <div>
        {!isFirstStep && (
          <button onClick={back} type='button'>
            Back
          </button>
        )}
        {!isLastStep && <button type='submit'>Next</button>}
      </div>
    </form>
  );
}
