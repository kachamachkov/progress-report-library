export const mapReportName = (reportName) => {
  switch (reportName) {
    case 'Swiss QR Bill Report':
      return 'SwissQRBill';
    case 'Crypto Currency Info':
      return 'CryptoCurrencyInfo';
    case 'Crypto Currencies':
      return 'CryptoCurrencies';
    case 'List Bound Report':
      return 'ListBoundReport';
    case 'Population Density':
      return 'PopulationDensity';
    case 'Crypto Dashboard':
      return 'Crypto Report';
    case 'Olympic Medals Map':
      return 'OlympicMedalsByNationalTeams';
    case 'Report Book':
      return 'ReportBook';
    case 'Sales Dashboard':
      return 'SalesByRegionDashboard';
    default:
      return reportName;
  }
};
