<template>
  <div>
    <div v-if="!isGameFinished" class="row">
      <div class="col-12 text-center">
        <div class="heading">
          Рунд <span class="round">{{ round }}</span>
        </div>
      </div>
      <div class="col-6" id="game-field">
        <div class="players-turn text-center">
          <p>{{ teams[currentTeam].player1 }} и {{ teams[currentTeam].player2 }} са на ход</p>
        </div>
        <div id="word" class="word-holder">
          <span v-if="isTimeRunning">{{ randomWord }}</span>
          <span v-else>- - - - - - - -</span>
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
        <TablePlayers></TablePlayers>
        <button class="btn new-game" @click="newGame">Нова игра</button>
        <!-- add modal "Are you sure you want to start new game?" -->
      </div>
    </div>
    <div v-else class="row">
      <div class="col-4 m-auto">
        <Standing></Standing>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Standing from "~/components/Game/Standing.vue";
import TablePlayers from "~/components/Game/TablePlayers.vue"

export default {
  components: {
    Standing,
    TablePlayers
  },
  data() {
    return {
      timer: 5,
      isTimeRunning: false,
      isPaused: false,
      randomWord: "",
      allWords: JSON.parse(JSON.stringify(this.$store.state.words)),
      notGuessedWords: JSON.parse(JSON.stringify(this.$store.state.words))
    };
  },
  computed: {
    ...mapState([
      "words",
      "players",
      "teams",
      "round",
      "currentTeam",
      "isGameFinished"
    ])
  },
  methods: {
    wordGuessed(teamNumber) {
      // check if game is running -> teams can receive points
      if (!this.isPaused && this.isTimeRunning) {
        this.$store.commit("wordGuessed", teamNumber);
        this.notGuessedWords.splice(
          this.notGuessedWords.indexOf(this.randomWord),
          1
        );
        this.generateNotGuessedWord();
      }
    },
    wordSkipped(teamNumber) {
      if (!this.isPaused && this.isTimeRunning) {
        this.$store.commit("wordSkipped", teamNumber);
        this.generateNotGuessedWord();
      }
    },
    switchTurns() {
      if (this.$store.state.currentTeam == this.$store.state.teams.length - 1) {
        this.$store.commit("updateCurrentTeam", 0);
      } else {
        let currTeamNum = this.$store.state.currentTeam;
        currTeamNum += 1;
        this.$store.commit("updateCurrentTeam", currTeamNum);
      }
    },
    countDown(timer) {
      let sinterval = setInterval(() => {
        if (!this.isPaused) {
          if (timer <= 0 || !this.isTimeRunning) {
            this.isTimeRunning = false;
            this.switchTurns();
            clearInterval(sinterval);
          } else {
            document.getElementById("timer-inside").innerHTML = timer;
          }
          timer--;
        }
      }, 1000);
    },
    startTimer() {
      this.generateNotGuessedWord();
      this.isTimeRunning = true;
      this.countDown(this.timer);
    },
    startNewRound() {
      this.isTimeRunning = false;
      let currentFinishedRound = this.$store.state.round;
      let nextRound = currentFinishedRound + 1;

      if (currentFinishedRound < 3) {
        alert("Рунд " + currentFinishedRound + " завърши!");
        this.$store.commit("updateRound", nextRound);
        // fill in the array with all words
        this.notGuessedWords = this.allWords.slice();
      } else if (currentFinishedRound == 3) {
        alert("Играта приключи!");
        this.$store.commit("updateIsGameFinished", true);
        this.$store.commit("calcWinners");
      }
    },
    generateNotGuessedWord() {
      // check if all words are guessed -> new round
      if (this.notGuessedWords.length == 0) {
        this.startNewRound();
      } else {
        this.randomWord = this.notGuessedWords[
          Math.floor(Math.random() * this.notGuessedWords.length)
        ];
      }
    },
    newGame() {
      this.$store.commit("clearAllData");
    }
  },
  // handle points when SPACE and ESC are clicked
  mounted() {
    let self = this;
    window.addEventListener("keyup", e => {
      e.preventDefault();
      // key: space
      if (e.keyCode == 32) {
        self.wordGuessed(self.currentTeam);
      }
      // key: escape
      if (e.keyCode == 27) {
        self.wordSkipped(self.currentTeam);
      }
    });
  }
};
</script>

<style lang="scss" scoped>
.heading {
  font-size: $font-size-big;
  border-bottom: 2px solid $black;
  margin-bottom: 50px;
  display: inline-block;

  .round {
    font-size: $font-size-biggest;
  }
}

.players-turn {
  font-size: $font-size-big;
  margin-bottom: 20px;
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
    background: $light-blue;
    border-radius: 50%;
    width: 140px;
    height: 140px;
    display: inline-block;
    line-height: 140px;
    border: 5px solid;
  }
}

.players {
  max-height: 510px;
  overflow-y: auto;
  text-align: center;
  background-color: $light-blue;
  border: 2px double $dark-blue;

  .players-names {
    font-size: $font-size-big;
    margin-bottom: 40px;

    span {
      display: inline-block;
      border-bottom: 2px solid $dark-blue;
    }
  }
}

.new-game {
  margin-top: 170px;
  float: right;
}
</style>