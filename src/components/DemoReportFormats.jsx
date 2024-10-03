import { useGetDemoReportFormats } from '../hooks/useGetDemoReportFormats';
import FormWrapper from './FormWrapper';
import Spinner from './Spinner';

export default function DemoReportFormats({ reportFormat, updateFields }) {
  const { formats, loading, error } = useGetDemoReportFormats();

  return loading ? (
    <Spinner loading={loading} />
  ) : (
    <FormWrapper title='Export Format'>
      <label htmlFor='format-select'>Choose a file format:</label>
      <select
        id='format-select'
        value={reportFormat}
        onChange={(e) => updateFields({ reportFormat: e.target.value })}
      >
        {formats.map((format, index) => (
          <option key={index} value={format.name}>
            {format.localizedName}
          </option>
        ))}
      </select>

      {Error && <div className='error'>{error}</div>}
    </FormWrapper>
  );
}
