import { useCreateDemoReport } from '../hooks/useCreateDemoReport';
import FormWrapper from './FormWrapper';
import Spinner from './Spinner';

export default function GetReport({ reportName, reportFormat }) {
  const { downloadReport, error, loading } = useCreateDemoReport(
    reportName,
    reportFormat
  );

  return loading ? (
    <Spinner loading={loading} />
  ) : (
    <FormWrapper title='Result'>
      <button className='download' onClick={downloadReport}>
        Download
      </button>

      {error && <div className='error'>{error}</div>}
    </FormWrapper>
  );
}
