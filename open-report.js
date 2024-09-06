const open = require('open');
const path = require('path');

const reportPath = path.resolve(__dirname, 'cucumber-report.html');

open(reportPath).then(() => {
  console.log('Cucumber report opened in the default browser');
}).catch((err) => {
  console.error('Failed to open the report:', err);
});