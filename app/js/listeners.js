import {
    deleteModel,
    createModel,
    insertModel,
    searchToDoByTitle,
    getAllToDos, 
    deleteAllToDos
} from './model.js';

import { 
    validationInput, 
    disableButton, 
    enableButton, 
    showErrorValidation,
    validationSearchInput
} from './common.js';

import {
    toDoEditView,
    toDoView, 
    getToDoViewById,
    enableShowAllToDoButton, 
    disableShowAllToDoButton,
    attachListenersToToDoView,
    actionsList,
    sortsList,
    loaderView
} from './views.js';

const wrapToDos = document.querySelector(".js-wrapTasks");
const wrapLoader = document.querySelector(".js-wrapLoader");

const allDoneButton = document.querySelector('.js-allDoneButton');
const allHoldButton = document.querySelector('.js-allHoldButton');
const allDeleteButton = document.querySelector('.js-allDeleteButton');

const sortByTitleButton = document.querySelector('.js-sortByTitleButton');
const sortByStatusButton = document.querySelector('.js-sortByStatusButton');

let toDoId = 0;

const toggleHiddenClassListener = (DOMElement) => {
    DOMElement.classList.toggle('hidden');
}

const onLoaderViewListener = () => {
    wrapToDos.classList.add('hidden');
    wrapLoader.innerHTML = loaderView();
    setTimeout(() => {
        wrapLoader.innerHTML = '';
        wrapToDos.classList.remove('hidden');
    } , 500);
}

const onDeleteListener = (toDoObject) => {
    deleteModel(toDoObject);
    document.getElementById(`toDo-${toDoObject.id}`).remove();
};

const onDoneListener = (toDoObject, toDoDOMElemnet) => {
    const toDoHoldBtn = toDoDOMElemnet.querySelector(
        `#toDoHold-${toDoObject.id}`
    );
    const toDoEditBtn = toDoDOMElemnet.querySelector(
        `#toDoEdit-${toDoObject.id}`
    );
    const toDoDoneBtn = toDoDOMElemnet.querySelector(
        `#toDoDone-${toDoObject.id}`
    );
    toDoObject.status = "Done";
    const toDoStatus = toDoDOMElemnet.querySelector(
        `#toDoStatus-${toDoObject.id}`
    );
    toDoStatus.textContent = "Done";
    toDoStatus.classList.add("wrap__task-status--success");
    disableButton(toDoHoldBtn);
    disableButton(toDoEditBtn);
    disableButton(toDoDoneBtn);
};

const onHoldListener = (toDoObject, toDoDOMElemnet) => {
    const toDoStatus = toDoDOMElemnet.querySelector(
        `#toDoStatus-${toDoObject.id}`
    );
    const toDoHoldBtn = toDoDOMElemnet.querySelector(
        `#toDoHold-${toDoObject.id}`
    );
    const toDoDoneBtn = toDoDOMElemnet.querySelector(
        `#toDoDone-${toDoObject.id}`
    );
    const toDoEditBtn = toDoDOMElemnet.querySelector(
        `#toDoEdit-${toDoObject.id}`
    );
    const toDoDeleteBtn = toDoDOMElemnet.querySelector(
        `#toDoDelete-${toDoObject.id}`
    );
    if (toDoObject.status !== "Hold") {
        toDoObject.status = "Hold";
        toDoHoldBtn.textContent = "Unhold";
        toDoStatus.classList.remove("wrap__task-status--primary");
        toDoStatus.classList.add("wrap__task-status--secondary");

        disableButton(toDoDoneBtn);
        disableButton(toDoEditBtn);
        disableButton(toDoDeleteBtn);
    } else {
        toDoObject.status = "Pending";
        toDoStatus.classList.remove("wrap__task-status--secondary");
        toDoStatus.classList.add("wrap__task-status--primary");
        toDoHoldBtn.textContent = "Hold";

        enableButton(toDoDoneBtn);
        enableButton(toDoEditBtn);
        enableButton(toDoDeleteBtn);
    }
    toDoStatus.textContent = toDoObject.status;
};

const onEditListener = (toDoObject) => {
    const toDoEditListeners = {
        onCancelListener,
        onSaveListener,
    };
    const editView = toDoEditView(toDoObject, toDoEditListeners);
    changeView(wrapToDos, editView, toDoObject.id);
};

//Edit

const changeView = (viewParent, view, id) => {
    viewParent.querySelector(`#toDo-${id}`).replaceWith(view);
};

const onCancelListener = (toDoObject) => {
    const view = toDoView(toDoObject, toDoListeners);
    changeView(wrapToDos, view, toDoObject.id);
};

const onSaveListener = (toDoObject, valueTitle, valueDescription) => {
    toDoObject.title = valueTitle;
    toDoObject.description = valueDescription;
    const view = toDoView(toDoObject, toDoListeners);
    changeView(wrapToDos, view, toDoObject.id);
};

const onAddListener = (titleInput, descriptionInput) => {
    if (validationInput(titleInput, descriptionInput)) {
        let toDoModel = createModel(titleInput, descriptionInput, toDoId);
        toDoId++;
        insertModel(toDoModel);
        wrapToDos.append(toDoView(toDoModel, toDoListeners));
        titleInput.value = '';
        descriptionInput.value = '';
    } else {
        showErrorValidation();
    }
};

const onSearchListener = (title) => {
    if(!validationSearchInput(title)) {
        showErrorValidation();
    } else {
        const searchArray = searchToDoByTitle(title);
        showToDoObjects(searchArray);
        if (searchArray.length !== getAllToDos().length) {
            enableShowAllToDoButton();
        } else {
            disableShowAllToDoButton();
        }
    }
};

const showToDoObjects = (toDoArray) => {
    wrapToDos.innerHTML = '';
    toDoArray.forEach(item => {
        wrapToDos.append(toDoView(item, toDoListeners));
    });
};

const onSearchCanselListener = () => {
    showToDoObjects(getAllToDos());
    disableShowAllToDoButton();
};

const onAllDoneListener = (toDoArray) => {
    toDoArray.forEach(item => {
        if (item.status !== 'Hold') {
            onDoneListener(item, getToDoViewById(wrapToDos, item.id));
        }
    });
};

const onAllHoldListener = (toDoArray) => {
    toDoArray.forEach(item => {      
        if (item.status !== 'Done') {
            onHoldListener(item, getToDoViewById(wrapToDos, item.id));
        }
    });
}

const onAllDeleteListener = (toDoArray) => {
    toDoArray.forEach(item => {
        if (item.status !== 'Hold') {
            deleteAllToDos();
            showToDoObjects(getAllToDos());
        }
    });
};

allDoneButton.addEventListener('click', () => {
    onLoaderViewListener();
    setTimeout(() => {
        onAllDoneListener(getAllToDos());
        toggleHiddenClassListener(actionsList);
    }, 500);
});

allHoldButton.addEventListener('click', () => {
    onLoaderViewListener();
    setTimeout(() => {
        onAllHoldListener(getAllToDos());
        toggleHiddenClassListener(actionsList);
    }, 500);
})

allDeleteButton.addEventListener('click', () => {
    onLoaderViewListener();
    setTimeout(() => {
        onAllDeleteListener(getAllToDos());
        toggleHiddenClassListener(actionsList);
    }, 500);
})


const showSortedToDoObjects = (toDoArray) => {
    const toDoSorted = wrapToDos.cloneNode(true);
    wrapToDos.innerHTML = '';
    toDoArray.forEach(item => {
        const view = getToDoViewById(toDoSorted, item.id);
        wrapToDos.append(view);
        attachListenersToToDoView(view, item, toDoListeners);
    });
}

const sortToDosByTitle = (toDoArray) => {
    let toDoSortedArrayByTitle = toDoArray.sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()));
    showSortedToDoObjects(toDoSortedArrayByTitle);
}

const sortToDosByStatus = (toDoArray) => {
    let toDoSortedArrayByStatus = toDoArray.sort((a, b) => {
        if (a.status < b.status) {
            return 1;
        }
        if (a.status > b.status) {
        return -1;
        }
        return 0;
    });
    console.log(toDoSortedArrayByStatus);

    showSortedToDoObjects(toDoSortedArrayByStatus);
}

sortByTitleButton.addEventListener('click', () => {
    onLoaderViewListener();
    setTimeout(() => {
        sortToDosByTitle(getAllToDos());
        toggleHiddenClassListener(sortsList);
    }, 500);
});

sortByStatusButton.addEventListener('click', () => {
    onLoaderViewListener();
    setTimeout(() => {
        sortToDosByStatus(getAllToDos());
        toggleHiddenClassListener(sortsList); 
    }, 500);
});

const toDoListeners = {
    onDeleteListener,
    onDoneListener,
    onHoldListener,
    onEditListener,
};

export {
    onDeleteListener,
    onDoneListener,
    onHoldListener,
    onEditListener,
    changeView,
    onCancelListener,
    onSaveListener,
    onAddListener,
    onSearchListener,
    onSearchCanselListener,
    onAllDoneListener,
    toggleHiddenClassListener,
    onLoaderViewListener,
    toDoListeners
};