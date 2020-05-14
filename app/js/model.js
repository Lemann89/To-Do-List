const toDoArray = [];

const createModel = (title, description, id) => {
  let toDoObject = {
    title: title.value,
    description: description.value,
    status: "Pending",
    id,
  };
  return toDoObject;
};

const searchToDoByTitle = (title) => {
  return toDoArray.filter(item => item.title.match(title));
}

const insertModel = (toDoObject) => {
  toDoArray.push(toDoObject);
};

const deleteModel = (toDoObject) => {
  let index = toDoArray.indexOf(toDoObject);
  toDoArray.splice(index, 1);
};

const getAllToDos = () => {
  return toDoArray;
}

const deleteAllToDos = () => {
  toDoArray.splice(0, toDoArray.length);
}

export { createModel, insertModel, deleteModel, searchToDoByTitle, getAllToDos, deleteAllToDos};
