import { useState, useEffect } from 'react';
import axios from 'axios';
import { mapReportName } from '../utils/helpers';

export const useCreateDemoReport = (reportName, reportFormat) => {
  const [clientId, setClientId] = useState(null);
  const [clientSessionTimeout, setClientSessionTimeout] = useState(null);
  const [reportParams, setReportParams] = useState(null);
  const [instanceId, setInstanceId] = useState(null);
  const [documentId, setDocumentId] = useState(null);
  const [documentInfo, setDocumentInfo] = useState(null);
  const [formatDocumentId, setFormatDocumentId] = useState(null);
  const [formatDocumentInfo, setFormatDocumentInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        const timestamp = Date.now();
        const registerClientResponse = await axios.post(
          'https://demos.telerik.com/reporting/api/reports/clients',
          { timeStamp: timestamp }
        );
        const { clientId } = registerClientResponse.data;
        setClientId(clientId);

        const getSessionTimeoutResponse = await axios.get(
          'https://demos.telerik.com/reporting/api/reports/clients/sessionTimeout'
        );

        const { clientSessionTimeout } = getSessionTimeoutResponse.data;
        setClientSessionTimeout(clientSessionTimeout);

        const mappedReportName = mapReportName(reportName);

        const paramsResponse = await axios.post(
          `https://demos.telerik.com/reporting/api/reports/clients/${clientId}/parameters`,
          {
            report: `${mappedReportName}.trdx`,
            parameterValues: {},
          }
        );
        setReportParams(paramsResponse.data)

        const instanceResponse = await axios.post(
          `https://demos.telerik.com/reporting/api/reports/clients/${clientId}/instances`,
          {
            report: `${mappedReportName}.trdx`,
            parameterValues: {},
          }
        );

        const { instanceId } = instanceResponse.data;
        setInstanceId(instanceId);

        const documentResponse = await axios.post(
          `https://demos.telerik.com/reporting/api/reports/clients/${clientId}/instances/${instanceId}/documents`,
          {
            format: 'HTML5Interactive',
            deviceInfo: {
              enableSearch: true,
              ContentOnly: true,
              UseSVG: true,
              BasePath: '/reporting/api/reports',
            },
            useCache: true,
          }
        );

        const { documentId } = documentResponse.data;
        setDocumentId(documentId);

        const documentInfoResponse = await axios.get(
          `https://demos.telerik.com/reporting/api/reports/clients/${clientId}/instances/${instanceId}/documents/${documentId}/info`
        );
        setDocumentInfo(documentInfoResponse.data);

        const formatDocumentResponse = await axios.post(
          `https://demos.telerik.com/reporting/api/reports/clients/${clientId}/instances/${instanceId}/documents`,
          {
            format: reportFormat,
            deviceInfo: {
              enableSearch: true,
              BasePath: '/reporting/api/reports',
            },
            useCache: true,
            baseDocumentID: documentId,
          }
        );

        const { documentId: formatDocumentId } = formatDocumentResponse.data;
        setFormatDocumentId(formatDocumentId);

        const formatDocumentInfoResponse = await axios.get(
          `https://demos.telerik.com/reporting/api/reports/clients/${clientId}/instances/${instanceId}/documents/${formatDocumentId}/info`
        );
        setFormatDocumentInfo(formatDocumentInfoResponse.data);

        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    })();
  }, [reportName, reportFormat]);

  const downloadReport = async () => {
    if (!formatDocumentId || !instanceId || !clientId) {
      console.error('Missing required parameters to download the document.');
      console.log(formatDocumentId, instanceId, clientId)
      return;
    }

    try {
      const blobResponse = await axios.get(
        `https://demos.telerik.com/reporting/api/reports/clients/${clientId}/instances/${instanceId}/documents/${formatDocumentId}`,
        {
          responseType: 'blob',
        }
      );

      const url = window.URL.createObjectURL(new Blob([blobResponse.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute(
        'download',
        `${reportName}.${reportFormat.toLowerCase()}`
      );
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error downloading the document:', error);
    }
  };

  // console.log(error)

  return {
    downloadReport,
    loading,
    error,
  };
};
