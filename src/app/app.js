import watcher from './view.js';
import parserXLSX from './parser.js';
import mergeData from './merger.js';
import createXLSX from './creator.js';

const resetData = () => {
  const resetButtons = document.querySelector('#reset');
  resetButtons.addEventListener('click', () => {
    window.location.reload(true);
  });
};

const saveData = (watchedState) => {
  const { resultData } = watchedState.dataState;
  const saveButtons = document.querySelector('#save');

  saveButtons.addEventListener('click', async () => {
    await createXLSX(resultData);
    watchedState.uiState.readiness = true;
    resetData();
  });
};

const getMatchingKeys = (data1, data2) => {
  const keysData1 = data1.length > 0 ? Object.keys(data1[0]) : [];
  const keysData2 = data2.length > 0 ? Object.keys(data2[0]) : [];
  const кeysForComparison = keysData1.filter((value) => keysData2.includes(value));
  return кeysForComparison;
};

const selectAndMerge = (watchedState) => {
  const firstMenu = document.querySelector('.firstMenu');
  const secondMenu = document.querySelector('.secondMenu');
  const mergButton = document.querySelector('button[id="merger"]');

  const handlerMenu = (event) => {
    const dataMenu = event.target.getAttribute('data-menu');
    const currentValue = event.target.value;
    if (dataMenu === 'first') {
      watchedState.uiState.keyForComparison = currentValue;
    }
    if (dataMenu === 'second') {
      watchedState.uiState.keyForAdding = currentValue;
    }
  };

  const handlerMergeButton = () => {
    const { firstData, secondData } = watchedState.dataState;
    const { keyForComparison, keyForAdding } = watchedState.uiState;
    const resultData = mergeData(firstData, secondData, keyForComparison, keyForAdding);
    watchedState.dataState.resultData = resultData;
    saveData(watchedState);
  };

  firstMenu.addEventListener('change', handlerMenu);
  secondMenu.addEventListener('change', handlerMenu);
  mergButton.addEventListener('click', handlerMergeButton);
};

export default async () => {
  const state = {
    dataState: {
      firstData: [],
      secondData: [],
      resultData: [],
    },
    uiState: {
      кeysForComparison: [],
      кeysForAdding: [],
      keyForComparison: null,
      keyForAdding: null,
      readiness: false,
    },
  };

  const inputFirst = document.querySelector('input[id="formFile_1"]');
  const inputSecond = document.querySelector('input[id="formFile_2"]');
  const parsButton = document.querySelector('button[id="parser"]');

  const watchedState = watcher(state);

  const handlerParsButton = async () => {
    try {
      let data1 = state.dataState.firstData;
      let data2 = state.dataState.secondData;
      if (inputFirst.files.length !== 0) {
        data1 = await parserXLSX(inputFirst.files[0]);
      }
      if (inputSecond.files.length !== 0) {
        data2 = await parserXLSX(inputSecond.files[0]);
      }
      const кeysForCompar = getMatchingKeys(data1, data2);
      const кeysForAdd = data2.length > 0 ? Object.keys(data2[0]) : [];

      watchedState.dataState = { firstData: data1, secondData: data2 };
      watchedState.uiState.кeysForComparison = кeysForCompar;
      watchedState.uiState.кeysForAdding = кeysForAdd;
      selectAndMerge(watchedState);
    } catch (error) {
      console.error('Ошибка при обработке XLSX-файлов:', error.message);
    }
  };

  parsButton.addEventListener('click', handlerParsButton);
};
