import XLSX from 'xlsx';
import fs from 'fs';
import settingsApp from './settingApp.js';
import parsXLSX from './parser.js';
import matchingItems from './matcher.js';

const writeFile = (name, data, resultPath) => {
  const jsonData = JSON.stringify(data, null, 2);
  const filePath = `./${resultPath}${name}.json`;

  fs.writeFileSync(filePath, jsonData, 'utf8');
  console.log(`-- Данные сохранены в ${filePath} --`);
};

const exportToXLSX = (name, data, resultPath) => {
  const ws = XLSX.utils.json_to_sheet(data);

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  const filePath = `./${resultPath}${name}.xlsx`;
  XLSX.writeFile(wb, filePath);

  console.log(`-- Данные экспортированы в ${filePath} --`);
  console.log(`Строк XLSX в файле ${name} обработано -`, data.length);
};

export default () => {
  const {
    firstPath, secondPath, resultPath, KeyToCheck,
  } = settingsApp;
  console.log(firstPath);
  console.log(secondPath);
  console.log(resultPath);

  const first = parsXLSX(firstPath);
  const second = parsXLSX(secondPath);

  writeFile('first', first, resultPath);
  console.log('Строк XLSX в файле first обработано -', first.length);

  writeFile('second', second, resultPath);
  console.log('Строк XLSX в файле second обработано -', first.length);

  const result = matchingItems(first, second, KeyToCheck);

  writeFile('result', result, resultPath);

  exportToXLSX('result', result, resultPath);
};
