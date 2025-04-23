import {
  dataCharacter, 
  getCharacters,
  pageApi,

  getEpisodes,
  dataEpisode,

  getGenderCharacters,
  filterGender,

  getStatusCharacters,
  filterStatus,
  
  characterSearch,
  getSearchCharacters,
  pageEpisode,
  
  // episodeSearch,
  // getSearchEpisode,
  getPrevPageData,
  getNextPageData

} from "./2features.js";

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

/* ________ variables filters ________ */
const $inputSelectType = $("#input-select-type");
const $selectStatus = $("#select-status");
const $selectGender = $("#select-gender");

/* ________ variables comoponents filters ________ */
const $componentFilterStatus = $("#component-filter-status");
const $componentFilterGender = $("#component-filter-gender");
		
/* ________ component Images characters ________ */
const $componentImages = $("#component-images");
const $componentSearchImages = $("#component-search-images");


/* ________ component detail character ________ */
const $componentCharacterDetail = $("#component-character-detail");
const $wrapperCharacterDetail = $("#wrapper-character-detail");
const $buttonBackCharacter = $(".button-back-character");

/* ________ component episodes ________ */
const $componentEpisodes = $("#component-episodes");


/* ________ component detail episodes ________ */
const $componentEpisodeDetail = $("#component-episode-detail");
const $wrapperEpisodeDetail = $("#wrapper-episode-detail");
const $buttonBackEpisode = $("#wrapper-episode-detail");

/* ________ component button Search ________ */
const $buttonSearch = $("#button-search");
const $inputTextSearch = $("#text-search");

/* ________ component buttons pagination ________ */
const $buttonPrev = $("#button-prev");
const $buttonNext = $("#button-next");



/* ********************************* 1 COMPONENT CHARACTERS ********************************* */

/* 😎😎😎😎😎😎😎 ALL CHARACTERS 😎😎😎😎😎😎😎 */

function displayCharacters(allCharacters){
  $componentImages.innerHTML = ""
  for(const {image, id, name, status, species} of allCharacters) {
  console.log("mostrar personajes")

   $componentImages.innerHTML +=
   `<div id="${id}" class="wrapper-info-character w-[110%] min-h-[20rem] rounded-2xl bg-[#1b2353] shadow-[1px_20px_16px_1px_rgb(0,0,0,0.3)] text-white flex flex-col md:w-[44%] lg:w-[20%] lg:min-h-[18rem] ">

    <img src="${image}" class="w-[90%] m-auto mt-6 rounded-full border border-black shadow-[1px_20px_16px_1px_rgb(0,0,0,0.3)]">

      <div>
       <p class="text-3xl">${name}</p>
       <p class=""><i class="fa-solid fa-circle" style="color: #68e845;"></i>${status}-${species}</p>
      </div>

      <button class="text-2xl m-auto w-10 h-10 rounded-full bg-red-700">+</button>
    </div>`

  };

  // displayDetailCharacter()

};

/* ********************************* 2 COMPONENT EPISODES ********************************* */ 
function displayEpisodes (arrayEpisode) {
  console.log("mostrar episodios")

  $componentEpisodes.innerHTML = ""
  for (const {air_date, created, episode, id, name} of arrayEpisode) {
   $componentEpisodes.innerHTML += `
    <div class="mt-7 w-full min-h-[12rem] rounded-2xl bg-[#1b2353] shadow-[1px_20px_16px_1px_rgb(0,0,0,0.3)] text-white flex flex-col gap-4 m-4 md:w-[45%] md:h-[30rem] lg:w-[35%] lg:min-h-[18rem] ">

      <div id="${id}" class="luz w-full md:text-white md:text-2xl m-2">
        <p>Nombre: ${name}</p>
        <p>Fecha de emisión: ${air_date}</p>
        <p>Creado: ${created}</p>
        <p>Episodio: ${episode}</p>
        <p>${id}</p>
      </div>

    </div>`

  };

// displayDetailEpisode()
};


// /* --------📚📚📚📚📚📚 PAGINATION 📚📚📚📚📚📚-------- */

/* _________________________ Next _________________________ */
$buttonNext.addEventListener("click", async() => {
  $componentImages.innerHTML = `<div bg-red-700 class="w-[70%] h-[100px] loader"></div>`

  await getNextPageData(pageApi);
  await getEpisodes(pageEpisode)

  $componentImages.innerHTML = ""
  displayCharacters(dataCharacter);
  displayEpisodes(dataEpisode)

});

/* _________________________ Prev _________________________ */

$buttonPrev.addEventListener("click", async () => {
  $componentImages.innerHTML = `<div class="loader"></div>`

  await getPrevPageData(pageApi);
  await getEpisodes(pageEpisode)
  $componentImages.innerHTML = ""

  displayCharacters(dataCharacter);
  displayEpisodes(dataEpisode)

});


/* 🧡🧡🧡🧡🧡🧡🧡🧡🧡🧡🧡🧡🧡  SELECT TYPE 🧡🧡🧡🧡🧡🧡🧡🧡🧡🧡🧡🧡🧡 */

 function selectType () {
   $inputSelectType.addEventListener("input", async (e)=> {
     $componentEpisodes.innerHTML = ""
     $componentEpisodes.innerHTML = $inputSelectType.value
     if(e.target.value === "episode" ) {
      console.log("episodio")
       
      await getEpisodes(pageEpisode)
      displayEpisodes(dataEpisode)
       // hideElement([$componentImages, $wrapperCharacterDetail]);
       // showElement([$componentEpisodes]);
       
      } 
      
      else if(e.target.value === "character") {
        console.log("personaje")
        await getCharacters(pageApi)
        // hideElement([$componentEpisodes, $buttonBackCharacter]);
        // showElement([$componentImages]);
        displayCharacters(dataCharacter)
      }
      
    })
  }
   selectType() 
/* 🧡🧡🧡🧡🧡🧡🧡🧡🧡🧡🧡🧡🧡  FILTER STATUS 🧡🧡🧡🧡🧡🧡🧡🧡🧡🧡🧡🧡🧡 */

function selectFilterStatus () {
  // console.log("mostrar status")

  $selectStatus.addEventListener("input", async () => {
  $componentFilterStatus.innerHTML = $selectStatus.value
  
  await getStatusCharacters($selectStatus.value);
  displayFilterStatusCharacters (filterStatus);

  })
}

function displayFilterStatusCharacters (filtersCharaters){
  
  $componentFilterStatus.innerHTML = ""
  for(const filterCharacter of filtersCharaters) {
    console.log("mostrar status")
    $componentFilterStatus.innerHTML += `
    
    <div class="wrapper-info-character w-[110%] min-h-[23rem] rounded-2xl bg-[#22861e] shadow-[1px_20px_16px_1px_rgb(0,0,0,0.3)] text-white flex flex-col md:w-[44%] lg:w-[20%] lg:min-h-[18rem]">
    <img src="${filterCharacter.image}" alt="imágenes de personajes por estado;vivo, muerto, etc" class ="w-[90%] mx-3 mt-6 rounded-full border border-black shadow-[1px_20px_16px_1px_rgb(0,0,0,0.3)]">
    
    <p class="text-1xl ml-4 mt-7">${filterCharacter.name}</p>
       <p class="text-2xl ml-4 mt-2"><i class="fa-solid fa-circle text-1xl text-[#68e845]"></i>${filterCharacter.status}</p>

    </div>`

  }
}
selectFilterStatus()

/* 🧡🧡🧡🧡🧡🧡🧡🧡🧡🧡🧡🧡🧡  FILTER GENDER 🧡🧡🧡🧡🧡🧡🧡🧡🧡🧡🧡🧡🧡 */
function selectFilterGender () {

  $selectGender.addEventListener("input", async () => {
  $componentFilterGender.innerHTML = $selectGender.value

  await getGenderCharacters($selectGender.value);
  displayFilterGenderCharacters (filterGender);

  // hideElement([$componentImages]);
  // showElement([$componentFilterGender])

  })
}

function displayFilterGenderCharacters (filtersCharaters){
  $componentFilterGender.innerHTML = ""
  console.log("mostrar género")
  for(const filterCharacter of filtersCharaters) {
  $componentFilterGender.innerHTML += `

  <div id="${filterCharacter.id}" class= "wrapper-filter-character-gender w-[110%] min-h-[23rem] rounded-2xl bg-[#6b0878] shadow-[1px_20px_16px_1px_rgb(0,0,0,0.3)] text-white flex flex-col md:w-[44%] lg:w-[20%] lg:min-h-[18rem]" >
    <img src="${filterCharacter.image}" alt="imágenes de personajes por género"  class="w-[90%] mx-3 mt-6 rounded-full border border-black shadow-[1px_20px_16px_1px_rgb(0,0,0,0.3)]">
    <p class="text-1xl ml-4 mt-7">${filterCharacter.name}</p>
    <p class="text-2xl ml-4 mt-2"><i class="fa-solid fa-circle text-1xl text-[#68e845]"></i>${filterCharacter.gender}</p>
  </div>`
     // <p>${filterCharacter.gender}</p>

// w-[90%] m-auto mt-6 rounded-full border border-black
//       shadow-[1px_20px_16px_1px_rgb(0,0,0,0.3)]
  }
}
selectFilterGender()



/* ******************* BUSQUUEDA POR NOMBRE ******************* */
$buttonSearch.addEventListener("click", async ()=> {
  $componentSearchImages.innerHTML = `<div class=" loader">AAAAAAAA</div>`
  const search = $inputTextSearch.value
  $inputTextSearch.value = ""
  if($inputTextSearch.value = "") {
    alert("EEEEY")
    
  }

  await getSearchCharacters(search)
  $componentSearchImages.innerHTML = ""
  displayCharacters(characterSearch)

  // showElement([$componentImages, $buttonPrev, $buttonNext]);
  // hideElement([$wrapperCharacterDetail, $componentCharacterDetail, $componentEpisodes])

})





  window.onload = async () => {
    await getCharacters(pageApi);
    await getEpisodes(pageApi);

    displayCharacters(dataCharacter);
    displayEpisodes(dataEpisode);

   };

