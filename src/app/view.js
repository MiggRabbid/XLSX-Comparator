import onChange from 'on-change';

const getTab = (state, type) => {
  const tab = document.createElement('li');
  tab.classList.add('nav-item');
  const a = document.createElement('a');
  a.classList.add('nav-link');
  a.setAttribute('id', type);
  if (state.dataState[type].length !== 0) {
    tab.classList.add('enable');
    a.setAttribute('aria-current', 'page');
    a.setAttribute('href', '#');
  } else {
    a.setAttribute('aria-disable', 'true');
    a.classList.add('disabled');
  }
  const text = (type === 'firstTab' ? 'Файл 1' : 'Файл 2');
  a.innerText = text;

  tab.append(a);
  return tab;
};

const getTable = (state, type) => {
  const table = document.createElement('table');
  if (state.dataState[type].length !== 0) {
    table.classList.add('table', 'pb-5');
    table.id = type;

    const dataArray = state.dataState[type];

    dataArray.forEach((element, index) => {
      if (index === 0) {
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        element.forEach((text) => {
          const th = document.createElement('th');
          th.textContent = text;
          headerRow.append(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);
      } else {
        const tbody = document.createElement('tbody');
        const bodyRow = document.createElement('tr');
        element.forEach((text) => {
          const td = document.createElement('td');
          td.textContent = text;
          bodyRow.appendChild(td);
        });
        tbody.appendChild(bodyRow);
        table.appendChild(tbody);
      }
    });
  }
  return table;
};

const renderTabs = (state) => {
  const tabs = document.querySelector('div[id="tabs"]');
  const ul = document.createElement('ul');
  ul.classList.add('nav', 'nav-tabs', 'mt-2');

  const firstTab = getTab(state, 'firstTab');
  const firstSheet = getTable(state, 'firstTab');
  const secondTab = getTab(state, 'secondTab');
  const secondSheet = getTable(state, 'secondTab');

  if (firstTab.classList.contains('enable')) {
    firstTab.querySelector('a[id="firstTab"]').classList.add('active');
    secondSheet.classList.add('d-none');
  } else if (secondTab.classList.contains('enable')) {
    secondTab.querySelector('a[id="secondTab"]').classList.add('active');
    firstSheet.classList.add('d-none');
  }

  ul.append(firstTab);
  ul.append(secondTab);

  tabs.append(firstSheet);
  tabs.append(secondSheet);
  tabs.prepend(ul);
};

const renderActiveTab = (value) => {
  console.log('------     renderActiveTab');
  console.log(value);
  const firstTab = document.querySelector('a[id="firstTab"]');
  const firstSheet = document.querySelector('table[id="firstTab"]');
  const secondTab = document.querySelector('a[id="secondTab"]');
  const secondSheet = document.querySelector('table[id="secondTab"]');
  if (value === 'firstTab') {
    firstTab.classList.add('active');
    firstSheet.classList.remove('d-none');
    secondTab.classList.remove('active');
    secondSheet.classList.add('d-none');
  }
  if (value === 'secondTab') {
    firstTab.classList.remove('active');
    firstSheet.classList.add('d-none');
    secondTab.classList.add('active');
    secondSheet.classList.remove('d-none');
  }
};

const render = (state) => (path, value) => {
  console.log('------     render');
  console.log(path);
  switch (path) {
    case 'uiState.tabs':
      renderTabs(state);
      break;
    case 'uiState.activeTab':
      renderActiveTab(value);
      break;
    default:
      break;
  }
};

export default (state, i18next, elements) => onChange(state, render(state, i18next, elements));
