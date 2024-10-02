import { useState, useEffect } from 'react';
import axios from 'axios';
import * as cheerio from 'cheerio';

export const useGetDemoReportTitles = () => {
  const [titles, setTitles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      const url = 'https://demos.telerik.com/reporting';

      try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        const demoReportTitles = [];

        $('div.accordion-preview img').each((_, el) => {
          const altText = $(el).attr('alt');
          if (altText) {
            demoReportTitles.push(altText);
          }
        });

        demoReportTitles.shift();
        setTitles(demoReportTitles);
      } catch (error) {
        setError('Failed to fetch Demo report titles');
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { titles, loading, error };
};
