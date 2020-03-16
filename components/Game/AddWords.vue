<template>
  <div class="container">
    <div class="row">
      <v-dialog ref="dialog" />
      <h1 class="col-12 text-center">Добавяне на думи</h1>
      <div v-if="!isCustomWords" class="col-12 text-center">
        <p>Искате ли да използвате готови думи за цялата игра и да избегнете писането?</p>
        <button class="btn mr-sm-5 mb-sm-0 mt-sm-3 mb-4 mt-5" @click="usePredefinedWords">Готови думи</button>
        <button class="btn mt-sm-3" @click="customWords">Въвеждане</button>
      </div>
      <div v-else class="col-12 text-center">
        <h3 id="turn">Ред е на {{ players[currPlayerNum] }}:</h3>
        <div v-if="!isPlaceAdded">Известно място:</div>
        <div v-else-if="isPlaceAdded && !isPersonAdded">Известна личност:</div>
        <div v-else>Добави дума:</div>
        <input
          type="text"
          class="form-control mx-auto mt-2"
          ref="wordsInput"
          v-on:keyup.enter="triggerAdd"
          v-model="word"
        />
        <button class="btn mt-5" ref="addW" @click="addWords(word)">Добави думата</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState([
      "isCustomWords",
      "currPlayerNum",
      "isPlaceAdded",
      "isPersonAdded",
      "countOfWordsAdded",
      "isWordsReady",
      "players",
      "words"
    ]),
    word: {
      get() {
        return this.$store.state.word;
      },
      set(word) {
        this.$store.commit("updateWord", word);
      }
    }
  },
  methods: {
    customWords() {
      this.$store.commit("updateIsCustomWords", true);
    },
    addWords(word) {
      if (word != "") {
        this.$store.commit("addWords", word);

        // check what type of word should be added
        if (!this.$store.state.isPlaceAdded) {
          this.$store.commit("updateIsPlaceAdded", true);
        } else if (
          !this.$store.state.isPersonAdded &&
          this.$store.state.isPlaceAdded
        ) {
          this.$store.commit("updateIsPersonAdded", true);
        } else if (
          this.$store.state.isPersonAdded &&
          this.$store.state.isPlaceAdded
        ) {
          let wordsCount = this.$store.state.countOfWordsAdded;
          wordsCount++;
          this.$store.commit("updateIs3words", wordsCount);
        }

        // check if the player has entered all of his 3 words
        if (this.$store.state.countOfWordsAdded == 3) {
          // check if there are other players to enter words
          if (
            this.$store.state.currPlayerNum <
            this.$store.state.players.length - 1
          ) {
            let nextPlNum = this.$store.state.currPlayerNum;
            nextPlNum++;
            this.$store.commit("updateCurrPlayerNum", nextPlNum);
            this.$store.commit("updateIsPlaceAdded", false);
            this.$store.commit("updateIsPersonAdded", false);
            this.$store.commit("updateIs3words", 0);
          } else {
            // all players have entered their words
            this.$store.commit("updateWordsReady", true);
          }
        }
      } else {
        this.$modal.show("dialog", {
          text: "Моля въведете дума!",
          buttons: [{ title: "OK" }]
        });
      }

      this.word = "";
      this.$refs.wordsInput.focus();
    },
    triggerAdd() {
      this.$refs.addW.click();
    },
    usePredefinedWords() {
      this.$store.commit("usePredefinedWords");
      this.$store.commit("updateWordsReady", true);
    }
  },
  mounted() {
    this.$refs.dialog.onKeyUp = () => {}
  }
};
</script>

<style lang="scss" scoped>
#turn { margin-bottom: 50px; }
.form-control { width: 25%; }

@media screen and (max-width: 992px) {
  .form-control { width: 40%; }
}

@media screen and (max-width: 576px) {
  .form-control { width: 60%; }
  .btn {
    display: block;
    margin: auto;
  }
}
</style>