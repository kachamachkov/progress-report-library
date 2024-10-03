import { useCreateDemoReport } from '../hooks/useCreateDemoReport';
import FormWrapper from './FormWrapper';
import Spinner from './Spinner';

export default function GetReport({ reportName, reportFormat }) {
  const { downloadReport, error, loading } = useCreateDemoReport(
    reportName,
    reportFormat
  );

  if (loading) {
    return <Spinner loading={loading} />;
  }

  return (
    <FormWrapper title='Result'>
      <button onClick={downloadReport}>Download</button>

      {Error && <div className='error'>{error}</div>}
    </FormWrapper>
  );
}
