import {
    
} from "./2features.js"

/* ----------📌📌📌📌📌 GENERAL SELECTORS 📌📌📌📌📌---------- */
const $ = element => document.querySelector(element);
const $$ = element => document.querySelectorAll(element);

const hideElement = (selectors) => {
  for (const selector of selectors) {
    selector.classList.add("hidden");
  }
};

const showElement = (selectors) => {
  for (const selector of selectors) {
    selector.classList.remove("hidden");
  }
};

const showAndHideElement = (selectors) => {
  for (const selector of selectors) {
    selector.classList.toggle("hidden");
  }
};


window.onload = async () => {

}
