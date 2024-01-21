import onChange from 'on-change';

const renderFeedback = () => {
  const container = document.querySelector('#button');
  const feedback = document.createElement('p');
  feedback.classList.add('feedback', 'col', 'col-md-3', 'align-middle', 'text-danger', 'm-0', 'small');
  feedback.textContent = 'Выберите второй файл';
  container.append(feedback);
};

const getMenu = (path, value) => {
  const select = document.createElement('select');
  select.classList.add('form-select', 'col', 'ms-2', 'me-2');
  select.setAttribute('aria-label', 'Default', 'select', 'example');

  const firstOption = document.createElement('option');
  firstOption.selected = true;

  if (path === 'uiState.кeysForComparison') {
    select.classList.add('firstMenu');
    select.setAttribute('data-menu', 'first');
    firstOption.text = 'Выберите нужный ключ для сравнения';
  }
  if (path === 'uiState.кeysForAdding') {
    select.classList.add('secondMenu');
    select.setAttribute('data-menu', 'second');
    firstOption.text = 'Выберите нужный ключ для добавления';
  }

  select.append(firstOption);
  value.forEach((key) => {
    const otherOption = document.createElement('option');
    otherOption.text = key;
    otherOption.selected = false;
    select.append(otherOption);
  });
  return select;
};

const getButton = () => {
  const div = document.createElement('div');
  div.classList.add('row', 'd-flex', 'align-items-center', 'pt-3');
  div.id = 'button';
  div.innerHTML = `
  <button type="button" class="btn col col-md-4 ms-3 btn-outline-dark" id="merger">Объеденить выбранное</button>`;
  return div;
};

const renderMenus = (path, value) => {
  const oldFeedback = document.querySelector('.feedback');
  if (oldFeedback) oldFeedback.remove();

  if (Object.keys(value).length < 1) {
    renderFeedback();
    return;
  }

  const containerMenu = document.querySelector('#menus');
  let containerRow;
  if (containerMenu.querySelector('.row')) {
    const divButton = getButton();
    containerMenu.append(divButton);
    containerRow = containerMenu.querySelector('.row');
  } else {
    containerRow = document.createElement('div');
    containerRow.classList.add('row', 'pt-3', 'pb-3');
  }

  const menu = getMenu(path, value);
  containerRow.append(menu);
  containerMenu.append(containerRow);
};

const renderButtonSave = () => {
  const div = document.querySelector('#saver');
  div.innerHTML = `
  <div class="row d-flex align-items-center justify-content-between">
    <p class="feedback col col-auto mt-3 mb-3 align-middle text-success m-0small">
      XLSX файл успешно сформирован
    </p>
    <button type="submit" class="btn col col-auto me-3 mt-3 mb-3 btn-outline-dark" id="save">Сохранить файл</button>
  </div>`;
};

const renderButtonReset = () => {
  const saveButtons = document.querySelector('#save');
  if (saveButtons) saveButtons.parentElement.remove();

  const div = document.querySelector('#restarter');
  div.innerHTML = `
  <div class="row d-flex align-items-center justify-content-between">
    <p class="feedback col col-auto mt-3 mb-3 align-middle text-success m-0small">
      XLSX файл успешно сохранён
    </p>
    <button type="submit" class="btn col col-auto me-3 mt-3 mb-3 btn-outline-dark" id="reset">Сбросить данные</button>
  </div>`;
};

const render = () => (path, value) => {
  console.log(path);
  switch (path) {
    case 'uiState.кeysForComparison':
    case 'uiState.кeysForAdding':
      renderMenus(path, value);
      break;
    case 'dataState.resultData':
      renderButtonSave();
      break;
    case 'uiState.readiness':
      renderButtonReset();
      break;
    default:
      break;
  }
};

export default (state) => onChange(state, render());
