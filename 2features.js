import {
  dataApi, getData,

  pageApi, getPrevPageData, getNextPageData,

  getEpisode,dataEpisode, pageEpisode,

  getCharacterDetail, promisesCharacters, objCharacterDetail,

  getSearchCharacters, characterSearch,

  objEpisodeDetail, promisesEpisodes, getEpisodeDetail,
  filterStatus,
  getStatusCharacters,

  getGenderCharacters,
  filterGender,
  
} from "./1features.js";


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


/* --------🎲🎲🎲🎲🎲 HTML ELEMENT VARIABLES 🎲🎲🎲🎲🎲-------- */
const $inputSelectType = $("#input-select-type");
const $selectStatus = $("#select-status");
const $selectGender = $("#select-gender");

const $componentFilterStatus = $("#component-filter-status");
const $componentFilterGender = $("#component-filter-gender");

/* ________ component Images / Details ________ */
const $componentImages = $("#component-images");
const $componentEpisodes = $("#component-episodes");

const $componentCharacterDetail = $("#component-character-detail");
const $wrapperCharacterDetail = $("#wrapper-character-detail");
const $buttonBackCharacter = $(".button-back-character");

const $componentEpisodeDetail = $("#component-episode-detail");
const $wrapperEpisodeDetail = $("#wrapper-episode-detail");
const $componentSearchImages = $("#component-search-images");


/* ________ component button Search ________ */
const $buttonSearch = $("#button-search");
const $inputTextSearch = $("#text-search");

/* ________ component button pagination ________ */
const $buttonPrev = $("#button-prev");
const $buttonNext = $("#button-next");


let dataApi = []
let episodes = []
let pageInitial = 1
let pageMax = 0




async function getCharacters () {
try {
  console.log("getCharacters")
  const {data} = await axios(`https://rickandmortyapi.com/api/character?page=${pageInitial}`)
  pageMax = data.info.pages
  dataApi = data.results
  // console.log(data)
} catch (error) {
  console.log(error)
  
}

}


async function getEpisode () {
  try {
    console.log("EPISODIOS")
    const {data} = await axios(`https://rickandmortyapi.com/api/episode?page=${pageInitial}`)
    pageMax = data.info.pages
    dataApi = data.results
    // console.log(data)
  } catch (error) {
    console.log(error)
    
  }
  
  }
/* 💚💚💚💚💚💚💚💚💚💚💚💚 PREV PAGE💚💚💚💚💚💚💚💚💚💚💚💚 */
async function getPrevPage() {
  
  if(pageInitial != 1) {
    pageInitial -= 1
  }
  await getCharacters(pageInitial)

  // if(pageEpisode != 1) {
  //   pageEpisode -= 1
  // }
  // await getEpisode(pageEpisode)
  
  console.log(pageInitial)

}

/* 💚💚💚💚💚💚💚💚💚💚💚💚 NEXT PAGE 💚💚💚💚💚💚💚💚💚💚💚💚 */
async function getNextPage() {
  
  if(pageInitial < pageMax && pageInitial >= 1 ) {
    pageInitial += 1
  }
  
  // if(pageEpisode < pageMaxEpisode && pageEpisode >= 1 ) {
  //   pageEpisode += 1
  // }
  // await getEpisode(pageEpisode)

  await getCharacters(pageInitial)
  console.log(pageInitial)
}


/* ******************************** COMPONENTS FILTERS TYPE ******************************** */
// function selectType () {}
$inputSelectType.addEventListener("input", async (e)=> {
  $componentEpisodes.innerHTML = ""
  $componentEpisodes.innerHTML = $inputSelectType.value
  if(e.target.value === "episode" ) {
   await getEpisode(pageEpisode)


    displayEpisode(dataEpisode)
    hideElement([$componentImages, $wrapperCharacterDetail]);
    showElement([$componentEpisodes]);

  } 
  
   else if(e.target.value === "character") {


    await getData(pageApi)
    hideElement([$componentEpisodes, $buttonBackCharacter]);
    showElement([$componentImages]);
    displayData(dataApi)
  }


})


/* 🧡🧡🧡🧡🧡🧡🧡🧡🧡🧡🧡🧡🧡  FILTER STATUS 🧡🧡🧡🧡🧡🧡🧡🧡🧡🧡🧡🧡🧡 */

function selectFilterStatus () {
  $selectStatus.addEventListener("input", async () => {
  $componentFilterStatus.innerHTML = $selectStatus.value
  
  await getStatusCharacters($selectStatus.value);
  displayFilterStatusCharacters (filterStatus);

  })
}

function displayFilterStatusCharacters (filtersCharaters){
  $componentFilterStatus.innerHTML = ""
  for(const filterCharacter of filtersCharaters) {
    $componentFilterStatus.innerHTML += `

    <div class=" wrapper-info-character w-[110%] min-h-[20rem] m-4 rounded-2xl bg-[#3a183e]
      shadow-[1px_20px_16px_1px_rgb(0,0,0,0.3)] text-white flex flex-col
      md:w-[44%] lg:w-[20%] lg:min-h-[18rem] " >
        <img src="${filterCharacter.image}" alt="imágenes de personajes por estado;vivo, muerto, etc"
        class ="w-[90%] m-auto mt-6 rounded-full border  shadow-[1px_20px_16px_1px_rgb(0,0,0,0.3)]">
        <p>${filterCharacter.status}</p>

    </div>
    `
  }
}

export {
  /* ____ variables ____ */
  pageInitial,
  dataApi,

  /* ____ functions ____ */
  getCharacters,
  getPrevPage,
  getNextPage,

    
}