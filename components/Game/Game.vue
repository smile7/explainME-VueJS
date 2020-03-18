<template>
  <div>
    <div v-if="!isGameFinished" class="row">
      <div class="col-12 text-center">
        <div class="heading">
          <div>Рунд {{ round }}</div>
          <div>{{ teams[currentTeam].player1 }} и {{ teams[currentTeam].player2 }} са на ход</div>
        </div>
      </div>
      <div class="col-lg-6 col-12" id="game-field">
        <div
          id="word"
          class="word-holder"
          v-touch:tap="touchHandler"
          v-touch:swipe="swipeHandler"
        >
          <span v-if="isTimeRunning & !isPaused">{{ randomWord }}</span>
          <span v-else-if="isTimeRunning & isPaused">- - - - - - - -</span>
          <span v-else>- - - - - - - -</span>
        </div>
        <div class="timer text-center mt-5" id="timer">
          <circular-count-down-timer
            v-if="isTimeRunning"
            :initial-value="timer"
            :stroke-width="7"
            :seconds-stroke-color="'#f00'"
            :underneath-stroke-color="'lightgrey'"
            :seconds-fill-color="'rgba(224, 244, 253, 0.5)'"
            :size="200"
            :padding="4"
            :second-label="''"
            :show-second="true"
            :show-minute="false"
            :show-hour="false"
            :show-negatives="false"
            :paused="isPaused"
            :notify-every="'none'"
            @finish="finished"
          >
          </circular-count-down-timer>
        </div>
        <div class="buttons">
          <button v-if="!isTimeRunning" class="btn btn-big mb-5" @click="startTimer">Старт</button>
          <button v-else class="btn mb-5" @click="isPaused = !isPaused">Пауза / Продължи</button>
        </div>
      </div>
      <div class="offset-xl-2 col-xl-4 col-lg-6 col-12">
        <TablePlayers></TablePlayers>
        <button class="btn new-game" @click="showModal">Нова игра</button>
        <v-dialog />
      </div>
    </div>
    <div v-else class="row">
      <div class="col-xl-4 col-lg-6 col-md-8 col-12 m-auto">
        <Standing></Standing>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Standing from "~/components/Game/Standing.vue";
import TablePlayers from "~/components/Game/TablePlayers.vue";

export default {
  components: {
    Standing,
    TablePlayers
  },
  data() {
    return {
      timer: 30,
      isTimeRunning: false,
      isPaused: true,
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
    finished() {
      this.isTimeRunning = false;
      this.switchTurns();
      this.timer = 30;
    },
    showModal() {
      this.$modal.show("dialog", {
        title: "Сигурни ли сте, че искате да започнете нова игра?",
        buttons: [
          {
            title: "Да",
            handler: () => {
              this.$store.commit("clearAllData");
            }
          },
          { title: "Не" }
        ]
      });
    },
    wordGuessed(teamNumber) {
      // check if game is running -> teams can receive points
      if (!this.isPaused && this.isTimeRunning) {
        console.log('executed')
        this.$store.commit("wordGuessed", teamNumber);
        this.notGuessedWords.splice(this.notGuessedWords.indexOf(this.randomWord), 1);
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
    startTimer() {
      this.isPaused = false;
      this.isTimeRunning = true;
      this.generateNotGuessedWord();
    },
    startNewRound() {
      this.isTimeRunning = false;
      let currentFinishedRound = this.$store.state.round;
      let nextRound = currentFinishedRound + 1;

      if (currentFinishedRound < 3) {
        this.$modal.show("dialog", {
          text: "Рунд " + currentFinishedRound + " завърши!",
          buttons: [{ title: "OK" }]
        });
        this.$store.commit("updateRound", nextRound);
        this.switchTurns();
        // fill in the array with all words
        this.notGuessedWords = this.allWords.slice();
      } else if (currentFinishedRound == 3) {
        this.$modal.show("dialog", {
          text: "Играта приключи!",
          buttons: [
            {
              title: "OK",
              handler: () => {
                this.$store.commit("updateIsGameFinished", true);
                this.$store.commit("calcWinners");
              }
            }
          ]
        });
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
    touchHandler() {
      this.wordGuessed(this.currentTeam);
    },
    swipeHandler() {
      this.wordSkipped(this.currentTeam);
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
}

#word {
  font-family: "Amatic SC", cursive;
  width: 100%;
  height: 350px;
  background: $light-blue-opacity-50;
  border: 2px double $dark-blue;
  font-size: $font-size-words;
  padding: 20px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.buttons {
  text-align: center;

  .btn {
    margin: 0 20px;
    width: 300px;
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
  margin-top: 150px;
  margin-bottom: 30px;
  float: right;
}

@media screen and (max-width: 576px) {
  .buttons .btn {
    margin: 0;
  }
  #word {
    font-size: 40px;
  }
  .new-game {
    display: block;
    float: none;
    margin: 0 auto;
    margin-top: 100px;
    margin-bottom: 30px;
  }
}
</style>