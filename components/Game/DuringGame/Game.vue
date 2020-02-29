<template>
  <div>
    <div class="row" v-if="!gameFinished">
      <div class="col-6" id="game-field">
        <div class="players-turn text-center">
          <p>Round {{ round }}</p>
          <p>{{ teams[currentTeam].player1 }} и {{ teams[currentTeam].player2 }} са на ход</p>
        </div>
        <div id="word" class="word-holder">
          <span v-if="isTimeRunning">
            {{ randomWord }}
          </span>
          <span v-else>
            - - - - - - - -
          </span>
        </div>
        <div class="timer text-center" id="timer">
          <span v-if="isTimeRunning" id="timer-inside" class="circle">{{ timer }}</span>
          <span v-else></span>
        </div>
        <div class="buttons">
          <button v-if="!isTimeRunning" class="btn btn-big" @click="startTimer">Старт</button>
          <button v-else class="btn" @click="isPaused = !isPaused">Пауза / Продължи</button>
        </div>
      </div>
      <div class="offset-2 col-4">
        <div class="row players-names" v-for="team in teams" :key="team.id">
            {{ team.player1 }} и {{ team.player2 }} = {{ team.points }} точки
        </div>
        <button class="btn" @click="newGame">New game</button>
      </div>
    </div>
    <div v-else class="row">
      <div class="offset-2 col-4">
        <div class="players-names" v-for="team in standing" :key="team.id">
            {{ team.player1 }} и {{ team.player2 }} = {{ team.points }} точки
        </div>
        <div>
          <button class="btn" @click="newGame">New game</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      points: 0,
      timer: 5,
      isTimeRunning: false,
      isPaused: false,
      // update currentTeam from store!
      currentTeam: 0,
      randomWord: '',
      allWords: JSON.parse(JSON.stringify(this.$store.state.words)),
      notGuessedWords: JSON.parse(JSON.stringify(this.$store.state.words)),
      gameFinished: false,
      standing: []
    }
  },
  computed: {
    ...mapState([
      'words',
      'players',
      'teams',
      'round'
    ]),
  },
  methods: {
    wordGuessed(teamNumber) {
      if (!this.isPaused && this.isTimeRunning) {
        this.$store.commit('wordGuessed', teamNumber)
        for (let i = 0; i < this.notGuessedWords.length; i++) { 
          if (this.notGuessedWords[i] == this.randomWord) {
            this.notGuessedWords.splice(i, 1)
          }
        }
        this.generateNotGuessedWord()
      }
    },
    wordSkipped(teamNumber) {
      if (!this.isPaused && this.isTimeRunning) {
        this.$store.commit('wordSkipped', teamNumber)
        this.generateNotGuessedWord() 
      }
    },
    switchTurns() {
      if (this.currentTeam == this.$store.state.teams.length-1) {
        this.currentTeam = 0
      } else {
        this.currentTeam++
      }
    },
    countDown(timer) {
      let sinterval = setInterval(() => {
        if (!this.isPaused) {
          if (timer <= 0 || !this.isTimeRunning) {
            this.isTimeRunning = false
            this.switchTurns()
            clearInterval(sinterval)
          } else {
            document.getElementById("timer-inside").innerHTML = timer
          }
          timer--
        }
      }, 1000)
    },
    startTimer() {
      this.generateNotGuessedWord()
      this.isTimeRunning = true
      this.countDown(this.timer)
    },
    generateNotGuessedWord() {
      if(this.notGuessedWords.length == 0) {
        // all words are guessed -> new round
        this.isTimeRunning = false
        let currentFinishedRound = this.$store.state.round
        let nextRound = currentFinishedRound + 1

        if (currentFinishedRound < 3) {
          alert('Рунд ' + currentFinishedRound + ' завърши!')
          this.$store.commit('updateRound', nextRound)
          this.notGuessedWords = this.allWords.slice()
        } else if (currentFinishedRound == 3) {
          alert('Играта приключи!')
          this.gameFinished = true
          let winnerPoints = 0
          let winnerTeamNum = 0
          let teams = this.$store.state.teams
          for (let i = 0; i < teams.length; i++) {
            if (winnerPoints < teams[i].points) {
              winnerPoints = teams[i].points
              winnerTeamNum = i
            }
          }
          this.calcWinners()
          alert('Честито на ' + this.$store.state.teams[winnerTeamNum].player1 + ' и ' + this.$store.state.teams[winnerTeamNum].player2)
        }
      } else {
        this.randomWord = this.notGuessedWords[Math.floor(Math.random() * this.notGuessedWords.length)]
      }
    },
    calcWinners() {
      this.standing = this.$store.state.teams.slice()
      this.standing.sort((a,b) => (a.points > b.points) ? -1 : ((b.points > a.points) ? 1 : 0))
    },
    newGame() {
      this.$store.commit('updateTeamsReady', false)
      this.$store.commit('updateWordsReady', false)
      this.$store.commit('updateRound', 1)
      this.$store.commit('removeAllPlayers')
      this.$store.commit('removeAllTeams')
      this.$store.commit('removeAllWords')
    }
  },
  mounted() {
    let self = this
    window.addEventListener("keyup", (e) => {
      e.preventDefault()
      // key: space
      if(e.keyCode == 32) {
        self.wordGuessed(self.currentTeam)
      }
      // key: escape
      if(e.keyCode == 27) {
        self.wordSkipped(self.currentTeam)
      }
    })
  }
}

</script>

<style lang="scss" scoped>
.players-turn {
  font-size: $font-size-big;
  margin-bottom: 20px;
}

.hidden {
  background: red;
}

#word {
  width: 100%;
  height: 350px;
  border: 1px solid $dark-blue;
  font-size: $font-size-words;
  padding: 20px;
  text-align: center;
  line-height: 280px;
}

.buttons {
    text-align: center;
    margin: 60px 0;

    .btn {
      margin: 0 20px;
      width: 300px;
    }
}

.timer {
  font-size: $font-size-words;
  margin: 40px;

  .circle {
    background:aquamarine;
    border-radius: 50%;
    width: 140px;
    height: 140px;
    display: inline-block;
    line-height: 140px;
    border: 5px solid;
  }
}

</style>