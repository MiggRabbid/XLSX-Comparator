const mergeData = (data1, data2, keyForComparison, keyForAdding) => {
  const mergedData = [];
  try {
    data1.forEach((obj1) => {
      const matchingObj2 = data2.find((obj2) => obj1[keyForComparison] === obj2[keyForComparison]);
      if (matchingObj2) {
        obj1[keyForAdding] = matchingObj2[keyForAdding];
      } else {
        obj1[keyForAdding] = null;
      }

      mergedData.push(obj1);
    });
  } catch (error) {
    console.error('Ошибка при объединении  XLSX-файлов:', error.message);
  }

  return mergedData;
};

export default mergeData;
