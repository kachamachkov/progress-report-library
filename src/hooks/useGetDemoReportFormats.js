import axios from 'axios';
import { useState, useEffect } from 'react';

export const useGetDemoReportFormats = () => {
  const [formats, setFormats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      const url = 'https://demos.telerik.com/reporting/api/reports/formats';

      try {
        const data = await axios.get(url);

        setFormats(data.data);
      } catch (error) {
        setError(error);
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { formats, loading, error };
};
