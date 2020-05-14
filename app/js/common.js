const validationInput = (title, description) => {
  return title.value.trim() !== "" && description.value.trim() !== "";
};

const disableButton = (button) => {
  button.classList.add("wrap__btn--disabled");
  button.disabled = true;
};

const enableButton = (button) => {
  button.classList.remove("wrap__btn--disabled");
  button.disabled = false;
};

const showErrorValidation = () => {
  Swal.fire({
    icon: 'error',
    title: 'Error!',
    text: 'Enter something!',
  })
};


const validationSearchInput = (title) => {
  return title.trim() !== '';
}

export {
  validationInput, 
  disableButton, 
  enableButton, 
  showErrorValidation,
  validationSearchInput
};

