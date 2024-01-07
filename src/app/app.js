import parserXLSX from './parser.js';
import watcher from './view.js';

export default async () => {
  const state = {
    uiState: {
      tabs: null,
      activeTab: null,
    },
    dataState: {
      firstTab: [],
      secondTab: [],
    },
  };

  const inputFirst = document.querySelector('input[id="formFile_1"]');
  const inputSecond = document.querySelector('input[id="formFile_2"]');
  const parsButton = document.querySelector('button[id="parser"]');
  const tads = document.querySelector('div[id="tabs"]');
  const watchedState = watcher(state);

  const handlerParsButton = async () => {
    console.log('------     handlerParsButton');
    try {
      let data1;
      let data2;
      if (inputFirst.files.length !== 0) {
        data1 = await parserXLSX(inputFirst.files[0]);
        watchedState.dataState.firstTab = data1;
      }
      if (inputSecond.files.length !== 0) {
        data2 = await parserXLSX(inputSecond.files[0]);
        watchedState.dataState.secondTab = data2;
      }
      watchedState.uiState.tabs = 'enable';
    } catch (error) {
      console.error('Ошибка при обработке XLSX-файлов:', error.message);
    }
  };

  const handlerTabClick = (event) => {
    console.log('------     handlerTabClick');
    const targetId = event.target.id;
    const tag = event.target.tagName;
    console.log(event.target);
    console.log(tag, typeof tag, '/', targetId);
    if (tag === 'A') {
      watchedState.uiState.activeTab = targetId;
    }
  };

  parsButton.addEventListener('click', handlerParsButton);
  tads.addEventListener('click', handlerTabClick);
};
