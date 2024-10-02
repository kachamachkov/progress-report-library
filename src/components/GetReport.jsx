import { useCreateDemoReport } from '../hooks/useCreateDemoReport';
import FormWrapper from './FormWrapper';

export default function GetReport({ reportName, reportFormat }) {
  const { downloadReport, error, loading } = useCreateDemoReport(
    reportName,
    reportFormat
  );

  if (loading) {
    return <p>Loading...</p>;
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
