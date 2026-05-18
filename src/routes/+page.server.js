import csvData from '../lib/data/combined_analysis3.csv?raw';

// Page settings NEEDS TO BE UPDATED FOR NEW COMPONENTS
export function load() {
  const csv = csvData;

  // Parse CSV into array of objects
  const lines = csv.split('\n').slice(1); // Skip header
  const dataByYear = {};

  lines.forEach((line) => {
    if (!line.trim()) return;
    const [
      date,
      cpiAwayFood,
      medIncHouse,
      avgChipotle,
      avgCava,
      avgSweetgreen,
      cpiZeroIndex,
      houseZeroIndex,
      chiptoleZeroIndex,
      cavaZeroIndex,
      sweetgreenZeroIndex,
    ] = line.split(',');
    const year = parseInt(date.split('/')[2]) + 2000;

    dataByYear[year] = {
      year,
      date,
      cpiAwayFood: parseFloat(cpiAwayFood),
      medIncHouse: parseFloat(medIncHouse),
      avgChipotle: parseFloat(avgChipotle),
      avgCava: parseFloat(avgCava),
      avgSweetgreen: parseFloat(avgSweetgreen),
      cpiZeroIndex: parseFloat(cpiZeroIndex),
      houseZeroIndex: parseFloat(houseZeroIndex),
      chiptoleZeroIndex: parseFloat(chiptoleZeroIndex),
      cavaZeroIndex: parseFloat(cavaZeroIndex),
      sweetgreenZeroIndex: parseFloat(sweetgreenZeroIndex),
    };
  });

  const years = Object.values(dataByYear).sort((a, b) => a.year - b.year);

  return {
    showHeader: true,
    showFooter: true,
    dataByYear: years,
  };
}
