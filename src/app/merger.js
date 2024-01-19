const mergeData = (data1, data2, keyForComparison, keyForAdding) => {
  const mergedData = [];

  data1.forEach((obj1) => {
    const matchingObj2 = data2.find((obj2) => obj1[keyForComparison] === obj2[keyForComparison]);

    if (matchingObj2) {
      obj1[keyForAdding] = matchingObj2[keyForAdding];
    }

    mergedData.push(obj1);
  });

  return mergedData;
};

export default mergeData;
