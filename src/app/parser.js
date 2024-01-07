import * as XLSX from 'xlsx';

const parserXLSX = (file) => {
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onload = (e) => {
      try {
        const arrayBuffer = e.target.result;
        const data = new Uint8Array(arrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        resolve(jsonData);
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
