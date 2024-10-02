import { useGetDemoReportTitles } from '../hooks/useGetDemoReportTitles';
import FormWrapper from './FormWrapper';

export default function DemoReportTitles({ reportName, updateFields }) {
  const { titles, loading, error } = useGetDemoReportTitles();

  if (loading) {
    return <p>Loading</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <FormWrapper title='Reports'>
      <label htmlFor='title-select'>Choose a Report:</label>
      <select
        id='title-select'
        value={reportName}
        onChange={(e) => updateFields({ reportName: e.target.value })}
        required
      >
        <option value='' disabled>
          -- Select a Report --
        </option>

        {titles.map((title, index) => (
          <option key={index} value={title}>
            {title}
          </option>
        ))}
      </select>
    </FormWrapper>
  );
}
