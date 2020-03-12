export const state = () => ({
  isTeamsReady: false,
  isCustomWords: false,
  currPlayerNum: 0,
  isPlaceAdded: false,
  isPersonAdded: false,
  countOfWordsAdded: 0,
  isWordsReady: false,
  currentTeam: 0,
  player: '',
  players: [],
  teams: [],
  word: '',
  predefinedPlaces: ['Рим', 'Китайската стена', 'Луната', 'Малдивите', 'Лондон', 'Ню Йорк', 'Мелник', 'Връх Шипка', 'Петрич', 'Левуново', 'Могадишу', 'Хавай', 'Гърция', 'Кавала', 'Пирин'],
  predefinedCelebrities: ['Леонардо ДиКаприо', 'Бойко Борисов', 'Доналд Тръмп', 'Васил Левски', 'Христо Ботев', 'Баба Тонка', 'Слави Трифонов', 'Алис Купър', 'Шелдън Купър', 'Матю Пери', 'Дженифър Анистън', 'Ананд'],
  predefinedWords: ['копито', 'дограма', 'стая', 'кобила', 'саксофон', 'девица', 'кокошка', 'къртица', 'сарма', 'одеяло', 'синигер', 'стетоскоп', 'малина', 'ягода', 'вентилатор', 'щори', 'лампион', 'сенник', 'сенатор', 'кекс', 'икона', 'карикатура', 'склад', 'месарница', 'шадраван', 'колоквиум', 'филантроп', 'витамин', 'пикник', 'самарянин', 'ританки'],
  words: [],
  round: 1,
  isGameFinished: false
})

export const mutations = {
  updateTeamsReady(state, isTeamsReady) {
    state.isTeamsReady = isTeamsReady
  },
  updateIsCustomWords(state, isCustomWords) {
    state.isCustomWords = isCustomWords
  },
  updateCurrPlayerNum(state, num) {
    state.currPlayerNum = num
  },
  updateIsPlaceAdded(state, isPlaceAdded) {
    state.isPlaceAdded = isPlaceAdded
  },
  updateIsPersonAdded(state, isPersonAdded) {
    state.isPersonAdded = isPersonAdded
  },
  updateIs3words(state, wordsCount) {
    state.countOfWordsAdded = wordsCount
  },
  updateWordsReady(state, isWordsReady) {
    state.isWordsReady = isWordsReady
  },
  updateCurrentTeam(state, currTeamNum) {
    state.currentTeam = currTeamNum
  },
  updateIsGameFinished(state, isGameFinished) {
    state.isGameFinished = isGameFinished
  },
  updateWord(state, word) {
    state.word = word
  },
  updateRound(state, round) {
    state.round = round
  },
  updatePlayer(state, player) {
    state.player = player
  },
  shufflePlayers(state) {
    state.players.sort(() => 0.5 - Math.random())
  },
  deletePlayer(state, player) {
    let index = state.players.indexOf(player)
    state.players.splice(index, 1)
  },
  addPlayers(state, player) {
    state.players.push(player)
  },
  createTeams(state) {
    for (let i = 0; i < state.players.length; i+=2) {
      state.teams.push({"player1": state.players[i], "player2": state.players[i+1], "points": 0})
    }
  },
  usePredefinedWords(state) {
    // should get exactly 3 words for each player and 1 celebrity and place
    let playersCount = state.players.length
    // shuffle and slice predefined words
    let shuffledWords = state.predefinedWords.sort(() => 0.5 - Math.random())
    let shuffledPlaces = state.predefinedPlaces.sort(() => 0.5 - Math.random()).slice(0, playersCount)
    let shuffledCelebrities = state.predefinedCelebrities.sort(() => 0.5 - Math.random()).slice(0, playersCount)
    // assign the words
    state.words = shuffledWords.slice(0, playersCount*3)
    state.words.push(...shuffledPlaces)
    state.words.push(...shuffledCelebrities)
  },
  addWords(state, words) {
    state.words.push(words)
  },
  wordGuessed(state, teamNum) {
    let pointsUp = 0
    if (state.round == 1) {
      pointsUp = 3
    } else if (state.round == 2) {
      pointsUp = 4
    } else if (state.round == 3) {
      pointsUp = 5
    }
    state.teams[teamNum].points += pointsUp
  },
  wordSkipped(state, teamNum) {
    state.teams[teamNum].points -= 1
  },
  calcWinners(state) {
    state.teams.sort((a,b) => (a.points > b.points) ? -1 : ((b.points > a.points) ? 1 : 0))
  },
  clearAllData(state) {
    state.isTeamsReady = false
    state.isWordsReady = false
    state.isCustomWords = false
    state.isPlaceAdded = false
    state.isPersonAdded = false
    state.isGameFinished = false
    state.currentTeam = 0
    state.countOfWordsAdded = 0
    state.round = 1
    state.currPlayerNum = 0
    state.players = []
    state.teams = []
    state.words = []
  }
}