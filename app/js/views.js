import {toggleHiddenClassListener} from './listeners.js'

//Tabs
const headerAddButton = document.querySelector(".js-headerAddButton");
const headerSearchButton = document.querySelector(".js-headerSearchButton");
const addTab = document.querySelector("#addTab");
const searchTab = document.querySelector("#searchTab");
const headerButtonsClose = document.querySelectorAll('.js-headerBtnClose');

const toggleAdd = () => {
  searchTab.classList.add("hidden");
  addTab.classList.remove("hidden");
  headerAddButton.classList.add('wrap__header-item-add--active');
  headerSearchButton.classList.remove('wrap__header-item-search--active');
};

const toggleSearch = () => {
  addTab.classList.add("hidden");
  searchTab.classList.remove("hidden");
  headerSearchButton.classList.add('wrap__header-item-search--active');
  headerAddButton.classList.remove('wrap__header-item-add--active');
};

headerButtonsClose.forEach(item => {
  item.addEventListener('click', () => {
    addTab.classList.add("hidden");
    searchTab.classList.add("hidden");
    headerAddButton.classList.remove('wrap__header-item-add--active');
    headerSearchButton.classList.remove('wrap__header-item-search--active');
  })
});

headerAddButton.addEventListener("click", toggleAdd);
headerSearchButton.addEventListener("click", toggleSearch);

//Actions
const actionsButton = document.querySelector('.js-actionsButton');
const sortButton = document.querySelector('.js-sortButton');
const actionsList = document.querySelector('.js-actionsList');
const sortsList = document.querySelector('.js-sortsList');

actionsButton.addEventListener('click', () => {
  toggleHiddenClassListener(actionsList);
  sortsList.classList.add('hidden');
});

sortButton.addEventListener('click', () => {
  toggleHiddenClassListener(sortsList);
  actionsList.classList.add('hidden');
});

//Search Button
const showAllToDoButton = document.querySelector('.js-contentShow');

const enableShowAllToDoButton = () => {
  showAllToDoButton.classList.remove('hidden');
}

const disableShowAllToDoButton = () => {
  showAllToDoButton.classList.add('hidden');
}
  

//ToDoView
const toDoEditView = (toDoObject, toDoEditListeners) => {
  const toDo = document.createElement("div");
  toDo.className = "wrap__task";
  toDo.id = `toDo-${toDoObject.id}`;
  toDo.innerHTML = `
      <div class="wrap__task-header wrap__task-header--edit">
        <h2 class="wrap__task-suptitle">
          Title
        </h2>
        <div class="wrap__task-status wrap__task-status-text" id="toDoStatus-${toDoObject.id}">
          ${toDoObject.status}
        </div>
      </div>
      <input 
        class="wrap__task-text wrap__add-input js-inputTitle" 
        value="${toDoObject.title}"
      />
      <h2 class="wrap__task-suptitle">
        Description
      </h2>
      
      <input 
        class="wrap__task-text wrap__add-input js-inputDescription" 
        value="${toDoObject.description}" 
      />
  
      <div class="wrap__task-btn--edit">
        <button 
          class="wrap__btn wrap__btn--success" 
          id="toDoSave-${toDoObject.id}"
        >
          Save
        </button>
  
        <button 
          class="wrap__btn wrap__btn--danger wrap__btn--edit"
          id="toDoCancel-${toDoObject.id}"
        >
          Cancel
        </button>
      </div>`;
  toDo
    .querySelector(`#toDoCancel-${toDoObject.id}`)
    .addEventListener("click", () => {
      toDoEditListeners.onCancelListener(toDoObject);
    });
  toDo
    .querySelector(`#toDoSave-${toDoObject.id}`)
    .addEventListener("click", () => {
      const valueTitle = toDo.querySelector(".js-inputTitle").value;
      const valueDescription = toDo.querySelector(".js-inputDescription").value;
      toDoEditListeners.onSaveListener(
        toDoObject,
        valueTitle,
        valueDescription
      );
    });
  return toDo;
};

const toDoView = (toDoObject, toDoListeners) => {
  const toDo = document.createElement("div");
  toDo.className = "wrap__task";
  toDo.id = `toDo-${toDoObject.id}`;
  toDo.innerHTML = `
    <div class="wrap__task-header">
        <h2 class="wrap__task-suptitle">
            Title
        </h2>
        <div class="wrap__task-status wrap__task-status-text" id="toDoStatus-${toDoObject.id}">
            ${toDoObject.status}
        </div>
    </div>
    <div class="wrap__task-main">
        <p class="wrap__task-text">
            ${toDoObject.title}
        </p>
        <h2 class="wrap__task-suptitle">
            Description
        </h2>
        <p class="wrap__task-text">
            ${toDoObject.description}
        </p>
    </div>
    <div class="wrap__task-btn">
        <button class="wrap__btn wrap__btn--primary" 
            id="toDoEdit-${toDoObject.id}">
            Edit
        </button>
        <button class="wrap__btn wrap__btn--secondary"  
            id="toDoHold-${toDoObject.id}">
            Hold
        </button>
        <button class="wrap__btn wrap__btn--success" 
            id="toDoDone-${toDoObject.id}">
            Done
        </button>
        <button class="wrap__btn wrap__btn--danger" 
            id="toDoDelete-${toDoObject.id}">
            Delete
        </button>
    </div>`;
  attachListenersToToDoView(toDo, toDoObject, toDoListeners);
  return toDo;
};

const attachListenersToToDoView = (toDoView, toDoObject, toDoListeners) => {
  toDoView
    .querySelector(`#toDoDelete-${toDoObject.id}`)
    .addEventListener("click", () => {
      toDoListeners.onDeleteListener(toDoObject);
    });
  toDoView
    .querySelector(`#toDoDone-${toDoObject.id}`)
    .addEventListener("click", () => {
      toDoListeners.onDoneListener(toDoObject, toDoView);
    });
  toDoView
    .querySelector(`#toDoHold-${toDoObject.id}`)
    .addEventListener("click", () => {
      toDoListeners.onHoldListener(toDoObject, toDoView);
    });
  toDoView
    .querySelector(`#toDoEdit-${toDoObject.id}`)
    .addEventListener("click", () => {
      toDoListeners.onEditListener(toDoObject);
    });
};

const loaderView = () => {
  return `<div class="loader">Loading...</div>`;
}

const getToDoViewById = (parent, id) => {
  return parent.querySelector(`#toDo-${id}`);
}

export { 
  toDoEditView, 
  toDoView, 
  getToDoViewById, 
  enableShowAllToDoButton, 
  disableShowAllToDoButton, 
  attachListenersToToDoView,
  loaderView,
  actionsList,
  sortsList
};
