import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import csvData from '../lib/data/combined_analysis.csv?raw';

// Page settings
export function load() {
  const csv = csvData;
  
  // Parse CSV into array of objects grouped by year
  const lines = csv.split('\n').slice(1); // Skip header
  const dataByYear = {};

  lines.forEach((line) => {
    if (!line.trim()) return;
    const [date, , , , cpiZeroIndex, houseZeroIndex, chiptoleZeroIndex] = line.split(',');
    const year = parseInt(date.split('/')[2]) + 2000;

    if (!dataByYear[year]) {
      dataByYear[year] = [];
    }

    dataByYear[year].push({
      date,
      cpiZeroIndex: parseFloat(cpiZeroIndex),
      houseZeroIndex: parseFloat(houseZeroIndex),
      chiptoleZeroIndex: parseFloat(chiptoleZeroIndex),
    });
  });

  const years = Object.keys(dataByYear)
    .map((year) => ({
      year: parseInt(year),
      entries: dataByYear[year],
      cpiZeroIndex: parseFloat(dataByYear[year][0].cpiZeroIndex),
      houseZeroIndex: parseFloat(dataByYear[year][0].houseZeroIndex),
      chiptoleZeroIndex: parseFloat(dataByYear[year][0].chiptoleZeroIndex),
    }))
    .sort((a, b) => a.year - b.year);

  return {
    showHeader: false,
    showFooter: false,
    dataByYear: years,
  };
}