import * as XLSX from 'xlsx';

const parserXLSX = (file) => {
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onload = (e) => {
      try {
        const arrayBuffer = e.target.result;
        const data = new Uint8Array(arrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });

        const jsonDataArray = [];

        workbook.SheetNames.forEach((sheetName) => {
          const sheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

          const headers = jsonData[0];

          const sheetData = jsonData.slice(1).map((row) => {
            const rowData = {};
            headers.forEach((header, index) => {
              rowData[header.trim().toLowerCase()] = row[index] !== undefined ? row[index] : null;
            });
            return rowData;
          });

          jsonDataArray.push(...sheetData);
        });

        resolve(jsonDataArray);
      } catch (error) {
        console.error('Ошибка при чтении XLSX-файла:', error.message);
        reject(error);
      }
    };

    reader.onerror = () => {
      reject(new Error('Ошибка чтения файла'));
    };

    reader.readAsArrayBuffer(file.slice(0, file.size));
  });
};

export default parserXLSX;
