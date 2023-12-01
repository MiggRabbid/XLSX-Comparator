import XLSX from 'xlsx';
import fs from 'fs';

const parsXLSX = (path) => {
  const excelData = fs.readFileSync(path);
  const workbook = XLSX.read(excelData, { type: 'buffer' });

  const sheetNames = workbook.SheetNames;

  let allData = [];

  sheetNames.forEach((sheetName) => {
    const worksheet = workbook.Sheets[sheetName];

    const columnNames = Object.keys(worksheet).filter((key) => key !== '!ref').map((cell) => worksheet[cell].v);

    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: columnNames, raw: true });

    allData = allData.concat(jsonData);
  });

  return allData.slice(1);
};

export default parsXLSX;
