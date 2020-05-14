
import {onAddListener, onSearchListener, onSearchCanselListener, onLoaderViewListener} from './listeners.js';


//Add Tasks

const addButton = document.querySelector(".js-addButton");
const titleInput = document.querySelector(".js-titleInput");
const descriptionInput = document.querySelector(".js-descriptionInput");
const searchButton = document.querySelector(".js-searchButton");
const searchInput = document.querySelector(".js-searchInput");
const showAllButton = document.querySelector(".js-showAllButton");
const searchCanselIcon = document.querySelector('.js-searchCanselIcon');


showAllButton.addEventListener('click', () => {
  onSearchCanselListener();
  searchInput.value = '';
})

searchButton.addEventListener('click', () => {
  onLoaderViewListener();
  setTimeout(() => {
    onSearchListener(searchInput.value);
    searchInput.value = '';
  }, 500)
})

searchCanselIcon.addEventListener('click', () => {
  searchInput.value = '';  
})

addButton.addEventListener("click", () => {
  onLoaderViewListener();
  setTimeout(() => {
    onAddListener(titleInput, descriptionInput)
  }, 500 ) 
});