import { 
  dataCharacters,
  getCharacters,
  pageInitial,
  getPrevPage,
  getNextPage,
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

/* ________ component Images / Details ________ */
const $componentImages = $("#component-images");
const $componentEpisodes = $("#component-episodes");

/* --------😎😎😎😎😎😎😎 CHARACTERS 😎😎😎😎😎😎😎-------- */

/* ______________________ all characters ______________________ */

function displayCharacters(allCharacters){
  console.log("mostrar personajes")
  $componentImages.innerHTML = ""
  for (const {image, id, name, status, species} of allCharacters) {
   $componentImages.innerHTML += 
   `<div id="" class="m-auto w-[90%] h-[400px] rounded-2xl bg-[#1b2353]
      shadow-[1px_20px_16px_1px_rgb(0,0,0,0.3)] text-white
      md:w-[44%] lg:w-[20%] lg:min-h-[18rem] ">

      <img src="${image}" id="${id}" class="img w-[80%] m-auto mt-8 rounded-full border border-black
      shadow-[1px_20px_16px_1px_rgb(0,0,0,0.3)]">

      <div class="ml-8 mt-9 p-2 m-auto">
       <p class="text-2xl ">${name}</p>
       <p class="text-lg mt-2"><i class=" text-[#68e845] fa-solid fa-circle mr-2" ></i>${status}-${species}</p>
      </div>
    
    </div>`
    
  };
  
}

const $buttonNextPage = $("#button-next-page")
const $buttonPrevPage = $("#button-prev-page")

// const $loader = $(".loader")

/* _________________________ Prev _________________________ */
$buttonPrevPage.addEventListener("click", async() => {
  $componentImages.innerHTML = `<div class"loader"></div>`
 
  
  await get(pageInitial);
  // await getEpisode(pageEpisode)
  
  $componentImages.innerHTML = ""
  displayCharacters(dataCharacters);
  // displayEpisode(dataEpisode)

});

/* _________________________ Next _________________________ */
$buttonNextPage.addEventListener("click", async() => {
  
  await getNextPage(pageInitial);
  $componentImages.innerHTML = ""
  // await getEpisode(pageEpisode)
  
  $componentImages.innerHTML = `<div bg-red-700 class="w-[70%] h-[100px] loader">LODING</div>`
  displayCharacters(dataCharacters);
  // displayEpisode(dataEpisode)

});


window.onload = async () => {
  console.log("aaaaaaa")


  await getCharacters(dataCharacters);
  // console.log(await getCharacters())
  displayCharacters(dataCharacters);



}
