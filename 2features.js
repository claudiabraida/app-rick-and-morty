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

export {
  /* ____ variables ____ */
  pageInitial,
  dataApi,

  /* ____ functions ____ */
  getCharacters,
  getPrevPage,
  getNextPage,

    
}