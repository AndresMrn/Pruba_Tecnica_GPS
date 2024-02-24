import fs  from 'fs';
import moment from 'moment';

const inputFile = 'datos_ventas.txt';
const startDate = '2024-01-01'; 
const endDate = '2024-02-01';   

let totalSales = 0;
let salesCount = 0;

fs.readFile(inputFile, 'utf-8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const rows = data.split('\n');

  rows.forEach(row => {
    const [dateString, product] = row.split(' - ');
    const currentDate = moment(dateString, 'YYYY-MM-DD');

    if (currentDate.isBetween(startDate, endDate, null, '[]')) {
      console.log(`Sale found in the interval: ${dateString} - ${product}`);
      totalSales += parseFloat(product);
      salesCount++;
    } else {
      console.log(`Sale outside the interval: ${dateString} - ${product}`);
    }
  });

  if (salesCount > 0) {
    const averageSales = totalSales / salesCount;
    console.log(`Average Sales for ${startDate} to ${endDate}: ${averageSales.toFixed(2)}`);
  } else {
    console.log('No sales data found for the specified interval.');
  }
});
