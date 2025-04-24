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

  getCharacterDetail,
  promisesCharacters,
  objCharacterDetail,
  
  // episodeSearch,
  // getSearchEpisode,
  getPrevPageData,
  getNextPageData,
  promisesEpisodes,
  getEpisodeDetail,
  objEpisodeDetail

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
const $viewCharacterDetail = $("#view-character-detail");
const $buttonBackCharacter = $(".button-back-character");

/* ________ component episodes ________ */
/* ________ component detail episodes ________ */
const $componentEpisodeDetail = $("#component-episode-detail");
const $componentEpisodes = $("#component-episodes");
const $wrapperEpisodeDetail = $("#wrapper-episode-detail");
const $viewEpisodeDetail = $("#view-episode-detail");
const $buttonBackEpisode = $("#button-episode-detail");
const $buttonMas = $("#button-mas")


/* ________ component button Search ________ */
const $buttonSearch = $("#button-search");
const $inputTextSearch = $("#text-search");

/* ________ component buttons pagination ________ */
const $buttonPrev = $("#button-prev");
const $buttonNext = $("#button-next");
// const  = $(".")
const $buttonEpisodeBack  = $(".button-back-episode");

$buttonEpisodeBack.addEventListener("click", ()=> {
  showElement([$componentImages, $buttonSearch, $wrapperSelecStatus, $wrapperSelectGender])
  hideElement([$componentEpisodeDetail, $wrapperEpisodeDetail, $viewEpisodeDetail])

})


$buttonSearch.addEventListener("click", ()=> {
  
  showElement([$componentImages, $buttonSearch, $inputSelectType, selectFilterGender,selectFilterStatus])
  hideElement([$wrapperEpisodeDetail, $componentEpisodeDetail, $buttonBackCharacter, $viewEpisodeDetailFilterGender, $componentFilterStatus])

})

/* ********* 🕵️‍♂️🕵️‍♂️🕵️‍♂️🕵️‍♂️🕵️‍♂️🕵️‍♂️🕵️‍♂️ BUSQUEDA POR NOMBRE 🕵️‍♂️🕵️‍♂️🕵️‍♂️🕵️‍♂️🕵️‍♂️🕵️‍♂️🕵️‍♂️ ********* */

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

  showElement([$componentImages, $buttonPrev, $buttonNext, $buttonSearch,$componentCharacterDetail]);
  hideElement([$wrapperCharacterDetail, $componentCharacterDetail, $componentEpisodes,$componentEpisodeDetail, $componentFilterGender, $componentFilterStatus])

})

/******************************* COMPONENTS FILTERS ********************************/

/* 🧡🧡🧡🧡🧡🧡🧡🧡🧡🧡🧡🧡🧡  SELECT TYPE 🧡🧡🧡🧡🧡🧡🧡🧡🧡🧡🧡🧡🧡 */
const $wrapperSelectGender = $("#wrapper-select-gender")
const $wrapperSelecStatus = $("#wrapper-select-status")
function selectType () {
  $inputSelectType.addEventListener("input", async (e)=> {
    $componentEpisodes.innerHTML = ""
    $componentEpisodes.innerHTML = $inputSelectType.value
    if(e.target.value === "episode" ) {
     console.log("episodio")
      
     await getEpisodes(pageEpisode)
     
     showElement([$componentEpisodes, $buttonSearch]);
     hideElement([$componentImages,$wrapperSelectGender, $wrapperSelecStatus, $componentFilterGender]);
     
     displayEpisodes(dataEpisode)
     } 
     
     else if(e.target.value === "character") {
       console.log("personaje")
       await getCharacters(pageApi)

       hideElement([$buttonBackCharacter]);
       showElement([$componentImages, $componentEpisodes,$buttonSearch]);

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

 hideElement([$componentImages, $buttonBackCharacter, $viewCharacterDetail, $wrapperCharacterDetail]);
 showElement([$componentFilterStatus, $buttonSearch])

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

 hideElement([$componentFilterStatus, $componentImages, $viewCharacterDetail, $wrapperCharacterDetail]);
 showElement([$componentFilterGender, $buttonBackCharacter])

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

/********************************************************************************/


/* ********** 😎😎😎😎😎😎😎 1 COMPONENT DISPLAY CHARACTERS 😎😎😎😎😎😎😎 ********** */
function displayCharacters(allCharacters){
  $componentImages.innerHTML = ""
  for(const {image, id, name, status, species} of allCharacters) {
  console.log("mostrar personajes")

   $componentImages.innerHTML +=
   `<div id="${id}" class="wrapper-info-character w-[110%] h-[28rem] rounded-2xl bg-[#1b2353] shadow-[1px_20px_16px_1px_rgb(0,0,0,0.3)] text-white flex flex-col md:w-[44%] lg:w-[20%] lg:min-h-[18rem] ">

    <img src="${image}" class="w-[90%] m-auto mt-6 rounded-full border border-black shadow-[1px_20px_16px_1px_rgb(0,0,0,0.3)]">

      <div class= -mt-20>
       <p class="text-3xl ml-5">${name}</p>
       <p class="ml-5"><i class="fa-solid fa-circle" style="color: #68e845;"></i>${status}-${species}</p>
       <button class="text-2xl ml-[80%] mt-[10px] w-10 h-10 rounded-full bg-red-700">+</button>
      </div>

    </div>`

  };

  displayDetailCharacter()

};
/* ********* 🔍🔍🔍🔍🔍🔍🔍 4 COMPONENT DETAIL CHARACTER  🔍🔍🔍🔍🔍🔍🔍 ********** */

$buttonBackCharacter.addEventListener("click", ()=>{
  showElement([$componentImages, $buttonPrev, $buttonNext])
  hideElement([$viewCharacterDetail, $wrapperCharacterDetail, $buttonBackCharacter])
})
function displayDetailCharacter () {
  const infocCharacterDetail = $$(".wrapper-info-character");
  // conecta con 1 COMPONENT CHARACTERS

  for (const elem of infocCharacterDetail) {
    elem.addEventListener("click", async () => {
    $wrapperCharacterDetail.innerHTML = ""

    await getCharacterDetail (elem.id)
    
    
    hideElement([$componentImages, $buttonPrev, $buttonNext, $componentEpisodes]);
    showElement([$viewCharacterDetail, $wrapperCharacterDetail,$buttonSearch, $buttonBackCharacter]);
    promisesCharactersDetail(promisesCharacters)
    // imagen e info

    $wrapperCharacterDetail.innerHTML =
     `<div >
        <img src="${objCharacterDetail.image}" alt="imagen e información del personaje" class ="w-[60%] m-auto min-h[30rem] rounded-full">
        <h3 class="text-white text-3xl">${objCharacterDetail.name}</h3>
        <span class="text-white"><i class="w-20 h-20 bg-[#68e845]"></i>${objCharacterDetail.status}-${objCharacterDetail.species}</span>

      </div>`

    })

  }

}


// (cuadro de episodio que acompaña la imagen displayCharacters)
function promisesCharactersDetail(promisesArray) {
  $viewCharacterDetail.innerHTML = ""
  for (const promise of promisesArray) {
 
  $viewCharacterDetail.innerHTML +=
   `<div class="pepe mt-7 w-full min-h-[12rem] rounded-2xl bg-[#22861e]
       shadow-[1px_20px_16px_1px_rgb(0,0,0,0.3)] text-white flex flex-col md:flex md:flex-col m-auto
       md:w-[44%] lg:w-[20%] lg:min-h-[18rem]">
       
       <p class="text-white text-2xl text-center m-auto m-2 mt-6">Nombre: ${promise.data.name}</p>
       <p class="text-white text-2xl text-center m-auto m-2 mt-3">Episodio: ${promise.data.episode}</p>
   </div>`
 
 // <p class="text-white text-2xl text-center m-2">${promise.data.id}</p>
 }
 
 }
 

/* ************ 📚📚📚📚📚📚📚 3 COMPONENT PAGINATION 📚📚📚📚📚 ************ */ 

/* _________________________ Page Prev _________________________ */

$buttonPrev.addEventListener("click", async () => {
  // $componentImages.innerHTML = `<div class="loader"></div>`
  
  await getPrevPageData(pageApi);
  await getEpisodes(pageEpisode)
  $componentImages.innerHTML = ""
  
  displayCharacters(dataCharacter);
  displayEpisodes(dataEpisode)
  
});

/* _________________________ Page Next _________________________ */
$buttonNext.addEventListener("click", async() => {
  $componentImages.innerHTML = `<div bg-red-700 class="w-[70%] h-[100px] loader"></div>`
  
  await getNextPageData(pageApi);
  await getEpisodes(pageEpisode)
  
  $componentImages.innerHTML = ""
  displayCharacters(dataCharacter);
  displayEpisodes(dataEpisode)
  
});





/* ********** 🎬🎬🎬🎬🎬🎬🎬 2 COMPONENT EPISODES 🎬🎬🎬🎬🎬🎬🎬 ********** */ 
function displayEpisodes (arrayEpisode) {
  console.log("mostrar episodios")

  $componentEpisodes.innerHTML = ""
  for (const {air_date, created, episode, id, name} of arrayEpisode) {
   $componentEpisodes.innerHTML += `
    <div id="${id}" class="wrapper-info-episode mt-7 w-full min-h-[12rem] rounded-2xl bg-[#1b2353] shadow-[1px_20px_16px_1px_rgb(0,0,0,0.3)] text-white m-4 md:w-[45%] md:h-[20rem] lg:w-[35%] lg:min-h-[18rem] ">

      <div  class="luz w-full md:text-white md:text-2xl m-2 p-2">
        <p class="text-1xl">Nombre:</p><span class="text-[#9cfd81]">${name}</span>
        <p class="text-1xl">Fecha:</p><span class="text-[#9cfd81]">${air_date}</span>
        <p class="text-1xl">Creado:</p><span class="text-[#9cfd81]">${created}</span>
        <p class="text-1xl">Episodio:</p><span class="text-[#9cfd81]">${episode}</span>
        <p>${id}</p>
      </div>

    </div>`

  };

displayDetailEpisode()
};

/* ********** 🔎🔺🔎🔺🔎🔺🔎 5 COMPONENT DETAIL EPISODE 🔎🔺🔎🔺🔎🔺🔎 *********** */

function displayDetailEpisode () {
  
  const infoEpisodeDetail = $$ (".wrapper-info-episode");
  
  for (const elem of infoEpisodeDetail) {
    
    elem.addEventListener("click", async () => {
      
      $wrapperCharacterDetail.innerHTML = ""
      await getEpisodeDetail (elem.id)
      await getCharacterDetail(elem.data)

      
      episodespromisesDetail(promisesEpisodes)
      hideElement([$componentImages, $buttonPrev, $buttonNext, $buttonSearch, $componentEpisodes]);
      showElement([$wrapperEpisodeDetail, $componentEpisodeDetail, $buttonBackCharacter, $viewEpisodeDetail]);
      
      $wrapperEpisodeDetail.innerHTML = `
      <div class="mt-7 w-full min-h-[12rem] rounded-2xl bg-[#1b2353]
      shadow-[1px_20px_16px_1px_rgb(0,0,0,0.3)] text-white flex flex-col
      md:w-[44%] lg:w-[20%] lg:min-h-[18rem]">

      <div id="${objEpisodeDetail.id}" class=" w-full">
      <p>DISPLAY EPISODE DETAIL</p>
        <p class="text-white text-1xl text-center m-2">Nombre: ${objEpisodeDetail.name}</p>
        <p class="text-white text-1xl text-center m-2">Fecha de emisión: ${objEpisodeDetail.air_date}</p>
        <p class="text-white text-1xl text-center m-2">Creado: ${objEpisodeDetail.created}</p>
        <p class="text-white text-1xl text-center m-2">Episodio: ${objEpisodeDetail.episode}</p>
        <p class="text-white text-1xl text-center m-2">${objEpisodeDetail.id}</p>
      </div>

    </div>
    `
    })
  }
}

function episodespromisesDetail(promisesArray) {
  $viewEpisodeDetail.innerHTML = ""
  for (const promise of promisesArray) {
 
  $viewEpisodeDetail.innerHTML +=
  `<div  class="characters-episodes mt-7 w-full min-h-[12rem] rounded-2xl bg-[#22861e] shadow-[1px_20px_16px_1px_rgb(0,0,0,0.3)] text-white flex flex-col md:flex md:flex-col m-auto md:w-[44%] lg:w-[20%] lg:min-h-[18rem]">   
  <img src="${promise.data.image}" alt="imagen de personaje en el episodio">
  <p class="text-white text-2xl text-center m-2">Nombre: ${promise.data.name}HOLA ESTOY AQUÍ</p>
    </div>`
 }
 
 functionCharcatersEpisodes()
 }


 function functionCharcatersEpisodes() {
  
  const charcatersEpisodes = $$ (".characters-episodes");
  
  $wrapperCharacterDetail.innerHTML = ""
  for (const elem of charcatersEpisodes) {
    
    elem.addEventListener("click", async () => {
      console.log("YYYYYYY")
      
      await getCharacterDetail(elem.id)
      hideElement([$componentImages, $buttonPrev, $buttonNext, $buttonSearch, $componentEpisodes]);
      showElement([$componentEpisodeDetail, $viewEpisodeDetail, $wrapperCharacterDetail, $buttonBackCharacter]);
      promisesCharactersDetail(promisesCharacters)
      
      displayDetailCharacter()
      displayDetailEpisode()

     
    })
  }
}




  window.onload = async () => {
    await getCharacters(pageApi);
    await getEpisodes(pageApi);

    displayCharacters(dataCharacter);
    displayEpisodes(dataEpisode);

   };

