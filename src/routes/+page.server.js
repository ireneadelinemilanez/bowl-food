import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Page settings
// These values are passed to the layout to control what appears on the page.
export function load() {
  // Load and parse the CSV data from file system
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const csvPath = join(__dirname, '../lib/data/combined_analysis.csv');
  const csv = readFileSync(csvPath, 'utf-8');

  // Parse CSV into array of objects grouped by year
  const lines = csv.split('\n').slice(1); // Skip header
  const dataByYear = {};

  lines.forEach((line) => {
    if (!line.trim()) return;
    const [date, , , , cpiZeroIndex, houseZeroIndex, chiptoleZeroIndex] = line.split(',');
    const year = parseInt(date.split('/')[2]) + 2000; // Convert "18" to 2018

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

  // Convert to array and sort by year
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
    // Set to false to hide the NYCity News Service header
    showHeader: false,
    // Set to false to hide the site footer
    showFooter: false,
    // Year data for the metrics dashboard
    dataByYear: years,
  };
}
