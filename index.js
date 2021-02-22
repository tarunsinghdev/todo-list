const rootEl = document.getElementById('root');
const taskInputField = document.querySelector('input');
const list = document.getElementById('list');
const addBtn = document.querySelector('button');

let listItems = [];

const addTasks = (e) => {
  e.preventDefault();
  if (taskInputField.value.trim() !== '') {
    listItems.push(taskInputField.value);
    showTasks(listItems);
  }
};

const showTasks = (listItems) => {
  list.innerHTML = '';
  if (!listItems) return;
  for (const listItem of listItems) {
    const item = document.createElement('li');
    const deleteBtn = document.createElement('button');
    const checkbox = document.createElement('input');

    checkbox.type = 'checkbox';

    item.textContent = listItem;
    item.style.listStyle = 'none';
    item.name = listItem;

    item.insertAdjacentElement('afterbegin', checkbox);
    checkbox.onclick = () => styleItem(item);

    deleteBtn.name = listItem;
    deleteBtn.onclick = (e) => deleteTask(e.target.name);
    deleteBtn.innerText = 'X';

    item.insertAdjacentElement('beforeend', deleteBtn);
    list.append(item);
  }
  console.log('Stored items are', listItems);
  taskInputField.value = '';
  taskInputField.focus();
};

const styleItem = (task) => {
  task.classList.toggle('done');
};

const deleteTask = (itemName) => {
  listItems.splice(listItems.indexOf(itemName), 1);
  showTasks(listItems);
};

const deleteAllTasks = () => {
  listItems = [];
  showTasks();
};

const deleteAllBtn = document.createElement('button');
deleteAllBtn.textContent = 'Delete All';
deleteAllBtn.style.marginTop = '100px';
rootEl.append(deleteAllBtn);

deleteAllBtn.onclick = () => deleteAllTasks();
addBtn.addEventListener('click', (e) => addTasks(e));
