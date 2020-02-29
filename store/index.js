export const state = () => ({
  isTeamsReady: false,
  isWordsReady: false,
  player: '',
  players: [],
  teams: [
    //{ player1: 'Сиси', player2: 'Kирчо', points: 0},
    //{ player1: 'Джадай', player2: 'Жаба', points: 0}
  ],
  word: '',
  predefinedPlaces: ['Рим', 'Китайската стена', 'Луната', 'Малдивите', 'Лондон', 'Ню Йорк'],
  predefinedCelebrities: ['Леонардо ДиКаприо', 'Бойко Борисов', 'Доналд Тръмп', 'Васил Левски', 'Христо Ботев', 'Баба Тонка'],
  predefinedWords: ['копито', 'дограма', 'стая', 'кобила', 'саксофон', 'девица', 'кокошка', 'къртица', 'сарма', 'одеяло', 'синигер', 'джари'],
  words: [],
  round: 1
})

export const mutations = {
  updateTeamsReady(state, isTeamsReady) {
    state.isTeamsReady = isTeamsReady
  },
  updateWordsReady(state, isWordsReady) {
    state.isWordsReady = isWordsReady
  },
  removeAllPlayers(state) {
    state.players = []
  },
  removeAllTeams(state) {
    state.teams = []
  },
  removeAllWords(state) {
    state.words = []
  },
  shufflePlayers(state) {
    state.players.sort(() => 0.5 - Math.random())
  },
  usePredefinedWords(state) {
    // get exactly 3 words for each player and 1 celebrity and place
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
  updatePlayer(state, player) {
    state.player = player
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
  updateWord(state, word) {
    state.word = word
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
    let pointsDown = 0
    if (state.round == 1) {
      pointsDown = 3
    } else if (state.round == 2) {
      pointsDown = 2
    } else if (state.round == 3) {
      pointsDown = 1
    }
    state.teams[teamNum].points -= 1
  },
  updateRound(state, round) {
    state.round = round
  },
  finalStanding(state) {
    state.teams.sort((a,b) => { return b.points - a.points })
  }
}