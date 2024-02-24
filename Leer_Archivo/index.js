import fs  from 'fs';
import csv  from 'csv-parser';
import moment from 'moment';

const inputFile = 'datos_ventas.txt';
const startDate = '2024-01-01'; 
const endDate = '2024-02-01';   

let totalSales = 0;
let salesCount = 0;

fs.createReadStream(inputFile)
  .pipe(csv({quote : "'"}))
  .on('data', (row) => {
    const currentDate = moment(row.date, 'YYYY-MM-DD');
    
    if (currentDate.isBetween(startDate, endDate, null, '[]')) {
      totalSales += parseFloat(row.sales);
      salesCount++;
    }
  })
  .on('end', () => {
    if (salesCount > 0) {
      const averageSales = totalSales / salesCount;
      console.log(`Average Sales for ${startDate} to ${endDate}: ${averageSales.toFixed(2)}`);
    } else {
      console.log('No sales data found for the specified interval.');
    }
  });
