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

  if (error) {
    return <p>Error: {String(error)}</p>;
  }

  return (
    <FormWrapper title='Result'>
      <button onClick={downloadReport}>Download</button>
    </FormWrapper>
  );
}
