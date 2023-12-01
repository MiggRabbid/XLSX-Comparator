const matchingItems = (data1, data2, KeyToCheck) => {
  const result = [];

  data1.forEach((item1) => {
    const matchingItem = data2.find((item2) => item1['Номенклатура'] === item2['Номенклатура']);

    if (matchingItem) {
      const mergedItem = {
        'Артикул продавца': item1['Артикул продавца'],
        Номенклатура: item1['Номенклатура'],
        Название: item1['Название'],
        Предмет: item1['Предмет'],
        Бренд: item1['Бренд'],
        'Заказали, шт': item1['Заказали, шт'],
        'Выкупили, шт': item1['Выкупили, шт'],
        'Отменили, шт': item1['Отменили, шт'],
        'Заказали на сумму, руб': item1['Заказали на сумму, руб'],
        'Выкупили на сумму, руб': item1['Выкупили на сумму, руб'],
        'Отменили на сумму, руб': item1['Отменили на сумму, руб'],
        'Средняя цена, руб': item1['Средняя цена, руб'],
        [KeyToCheck]: matchingItem[KeyToCheck],
        моржа: '=ЕСЛИ(RC[-2]>0;RC[-2]-RC[-1];0)',
        'общ моржа': '=RC[-1]*RC[-8]',
      };

      result.push(mergedItem);
    }
  });

  return result;
};

export default matchingItems;
