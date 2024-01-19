import parserXLSX from './parser.js';
import watcher from './view.js';

export default async () => {
  const state = {
    dataState: {
      firstData: [],
      secondData: [],
    },
    uiState: {
      menuКeys: [],
      selectedKey: null,
    },
  };

  const inputFirst = document.querySelector('input[id="formFile_1"]');
  const inputSecond = document.querySelector('input[id="formFile_2"]');
  const parsButton = document.querySelector('button[id="parser"]');

  const watchedState = watcher(state);

  const handlerParsButton = async () => {
    console.log('------     handlerParsButton');
    try {
      let data1 = state.dataState.firstData;
      let data2 = state.dataState.secondData;
      if (inputFirst.files.length !== 0) {
        data1 = { firstData: await parserXLSX(inputFirst.files[0]) };
      }
      if (inputSecond.files.length !== 0) {
        data2 = { secondData: await parserXLSX(inputSecond.files[0]) };
      }
      watchedState.dataState = { ...data1, ...data2 };

      const matchedKeys = state.dataState.secondData[0];
      watchedState.uiState.menuКeys = matchedKeys;
      console.log(matchedKeys);
    } catch (error) {
      console.error('Ошибка при обработке XLSX-файлов:', error.message);
    }
  };

  parsButton.addEventListener('click', handlerParsButton);
};
