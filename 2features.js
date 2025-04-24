
/* 💙💙💙💙💙💙💙💙💙💙 DATA SEARCH BY NAME CHARACTER 💙💙💙💙💙💙💙💙💙💙 */
let characterSearch = {}

async function getSearchCharacters (name) {
  try {
    const {data} = await axios(`https://rickandmortyapi.com/api/character/?name=${name}`);
    characterSearch = data.results
    console.log(characterSearch);

  } catch (error) {
    console.log(error)
    
  };

}

/* 💙💙💙💙💙💙💙💙💙💙 DATA SEARCH BY NAME EPISODE 💙💙💙💙💙💙💙💙💙💙 */

// let episodeSearch = {}

// async function getSearchEpisode (page) {
//   try {
//     const {data} = await axios(`https://rickandmortyapi.com/api/episode/?page=${page}`);
//     console.log(data)
//     episodeSearch = data.info.pages
    
//     console.log(episodeSearch);

//   } catch (error) {
//     console.log(error)
    
//   };

// }
// getSearchEpisode(episodeSearch)


/* 🧡🧡🧡🧡🧡🧡🧡🧡🧡🧡🧡🧡🧡  FILTER STATUS 🧡🧡🧡🧡🧡🧡🧡🧡🧡🧡🧡🧡🧡 */
let filterStatus = []

async function getStatusCharacters (status) {
  try {
   const {data} = await axios(`https://rickandmortyapi.com/api/character/?status=${status}`)
   filterStatus = data.results
   console.log(filterStatus)

  } catch (error) {
    console.log(error)
  }
}

/* 🧡🧡🧡🧡🧡🧡🧡🧡🧡🧡🧡🧡🧡  FILTER GENDER 🧡🧡🧡🧡🧡🧡🧡🧡🧡🧡🧡🧡🧡 */
let filterGender = []

async function getGenderCharacters (gender) {
  try {
   const {data} = await axios(`https://rickandmortyapi.com/api/character/?gender=${gender}`)
   filterGender = data.results
   console.log(filterGender)

  } catch (error) {
    console.log(error)
  }
}

/* ************************ MAIN DATA CHARACTERS ************************ */

/* 💛💛💛💛💛💛💛💛💛💛💛💛 GET CHARACTERS 💛💛💛💛💛💛💛💛💛💛💛 */
let dataCharacter = []
let pageApi = 1
let pageMaxApi = 0

async function getCharacters (page) {

  try {
   const {data} = await axios(`https://rickandmortyapi.com/api/character?page=${page}`)
   dataCharacter = data.results 
   pageMaxApi = data.info.pages
   console.log(pageMaxApi)

  } catch (error) {
    console.log(error)
  }
}



/* 💛💛💛💛💛💛💛💛💛💛💛💛 GET EPISODIES 💛💛💛💛💛💛💛💛💛💛💛 */
let dataEpisode = []
let pageEpisode = 1
let pageMaxEpisode = 0

async function getEpisodes (page) {

  try {
   const {data} = await axios(`https://rickandmortyapi.com/api/episode?page=${page}`)
    dataEpisode = data.results
    pageMaxEpisode = data.info.pages

    // console.log(pageMaxEpisode)
    // console.log(dataEpisode)

  } catch (error) {
    console.log(error)
  }
}
// getEpisode(dataEpisode)

/* ******************* DATA DETAILS RELATIONSHIP CHARACTERS / EPISODES ******************* */

/* 🤍🤍🤍🤍🤍🤍🤍🤍🤍🤍🤍 GET CHARACTER DETAIL 🤍🤍🤍🤍🤍🤍🤍🤍🤍🤍🤍 */

let promisesCharacters = []
let objCharacterDetail = {}

async function getCharacterDetail (id) {

  try {
    const { data } = await axios(`https://rickandmortyapi.com/api/character/${id}`)
    objCharacterDetail = data
    const arrayPromises = data.episode.map(elem => axios(elem))
    // console.log(arrayPromises)
    const response = await Promise.all(arrayPromises)
    const arraydetailEpisode = response.map(elem => elem.data)
    promisesCharacters = response
    arraydetailEpisode
    console.log(promisesCharacters)
    
    // console.log(arraydetailEpisode)
    // console.log(objCharacterDetail)

  } catch (error) {
    console.log(error) 
  }
}




/* 🤍🤍🤍🤍🤍🤍🤍🤍🤍🤍🤍 GET EPISODE DETAIL 🤍🤍🤍🤍🤍🤍🤍🤍🤍🤍🤍 */
let promisesEpisodes = []
let objEpisodeDetail = {}

async function getEpisodeDetail (id) {

  try {
    const { data } = await axios(`https://rickandmortyapi.com/api/episode/${id}`)
    promisesEpisodes = data

    const arrayPromises = data.characters.map(elem => axios(elem))
    console.log(data)
    const response = await Promise.all(arrayPromises)
    const arraydetailEpisode = response.map(elem => elem.data)
    promisesEpisodes = response
    // console.log(promisesEpisodes)
    arraydetailEpisode
    // console.log(arraydetailEpisode)
    // console.log(objEpisodeDetail)

  } catch (error) {
    console.log(error) 
  }
}

/* 💚💚💚💚💚💚💚💚💚💚💚  PAGINATION DATA PREV PAGE 💚💚💚💚💚💚💚💚💚 */
async function getPrevPageData() {
  
  if(pageApi != 1) {
    pageApi -= 1
  }
  await getCharacters(pageApi)

  if(pageEpisode != 1) {
    pageEpisode -= 1
  }
  await getEpisodes(pageEpisode)
  
  console.log(pageApi)

}


/* 💚💚💚💚💚💚💚💚💚💚  PAGINATION DATA  NEXT PAGE  💚💚💚💚💚💚💚💚💚💚 */
async function getNextPageData() {
  
  if(pageApi < pageMaxApi && pageApi >= 1 ) {
    pageApi += 1
  }
  
  if(pageEpisode < pageMaxEpisode && pageEpisode >= 1 ) {
    pageEpisode += 1
  }

  await getCharacters(pageApi)
  await getEpisodes(pageEpisode)
  console.log(pageApi)
}




/* ******************* EXPORT DATA  ******************* */
export {
  /* _______ characters data  _______ */
   dataCharacter,
   getCharacters,

   
 
  /* _______ episodes data  ______ */
   getEpisodes,
   dataEpisode,
 
  /* _______ pages characters data  _______ */
   pageApi,
   pageMaxApi,
 
   /* _______ pages episodes data  _______ */
   pageMaxEpisode,
   pageEpisode,
 
   /* ______ status filters  _______ */
   filterStatus,
   getStatusCharacters,

   /* ______ gender filters  _______ */
   filterGender,
   getGenderCharacters,
   
   /* ______ get search character  _______ */
   characterSearch,
   getSearchCharacters,

   /* _____ characters details data  _____ */
   getCharacterDetail,
   promisesCharacters,
   objCharacterDetail,


   /* _____ characters details data  _____ */
   getEpisodeDetail,
   promisesEpisodes,
   objEpisodeDetail,

   /* ______ get search episode  _______ */
  //  episodeSearch,
  //  getSearchEpisode,

   /* ______ get search episode  _______ */
   getPrevPageData,
   getNextPageData,
  
 }
