import onChange from 'on-change';

const renderFeedback = () => {
  const container = document.querySelector('#button');
  const feedback = document.createElement('p');
  feedback.classList.add('feedback', 'col', 'col-md-3', 'align-middle', 'text-danger', 'm-0', 'small');
  feedback.textContent = 'Выберите второй файл';
  container.append(feedback);
};

const getMenu = (value) => {
  const select = document.createElement('select');
  select.classList.add('form-select');
  select.setAttribute('aria-label', 'Default', 'select', 'example');

  const firstOption = document.createElement('option');
  firstOption.text = 'Выберите нужный ключ для добавления';
  firstOption.selected = true;
  select.append(firstOption);

  value.forEach((key) => {
    const otherOption = document.createElement('option');
    otherOption.text = key;
    otherOption.selected = false;
    select.append(otherOption);
  });
  return select;
};

const renderMenus = (value) => {
  const oldFeedback = document.querySelector('.feedback');
  if (oldFeedback) oldFeedback.remove();

  if (Object.keys(value).length < 2) {
    renderFeedback();
    return;
  }

  const container = document.querySelector('#menus');
  container.classList.add('container-md', 'rounded', 'shadow-sm', 'mt-4', 'pt-1', 'pb-3', 'bg-light-subtle');

  const menu = getMenu(value);

  container.append(menu);
};

const render = () => (path, value) => {
  console.log('------     render');
  console.log('path -', path);
  switch (path) {
    case 'uiState.menuКeys':
      renderMenus(value);
      break;
    default:
      break;
  }
};

export default (state) => onChange(state, render());
