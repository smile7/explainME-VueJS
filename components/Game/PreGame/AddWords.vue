<template>
  <div class="container">
    <div class="row">
      <h2 class="col-12 text-center">Добавяне на думи</h2>
      <div v-if="!isCustomWords">
        <p>Искате ли да използвате готови думи за цялата игра и да избегнете писането?</p>
        <button class="btn" @click="usePredefinedWords">Готови думи</button>
        <button class="btn" @click="isCustomWords = true">Въвеждане</button>
      </div>
      <div v-else>
        <div v-if="!isWordsReady">
          <h3 id="turn">Ред е на {{ players[currPlayerNum] }}:</h3>
          <div v-if="!isPlaceAdded">Известно място:</div>
          <div v-else-if="isPlaceAdded && !isPersonAdded">Известна личност:</div>
          <div v-else>Добави дума:</div>
          <input class="inp" type="text" v-model="word" />
          <button class="btn" @click="addWords(word)">Добави думата</button>
          <button class="btn" v-if="is3wordsAdded==3" @click="playerReady">Готово</button>
        </div>
        <div v-else>
          <h3 class="text-center">Готово!</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import mapState and use it
// DO NOT NEED isWordsReady at all probably
export default {
  data() {
    return {
      // currPlNum and isCustomWords to go in store
      currPlayerNum: 0,
      isCustomWords: false,
      isPlaceAdded: false,
      isPersonAdded: false,
      is3wordsAdded: 0
    };
  },
  computed: {
    isWordsReady() {
      return this.$store.state.isWordsReady;
    },
    players() {
      return this.$store.state.players;
    },
    word: {
      get() {
        return this.$store.state.word;
      },
      set(word) {
        this.$store.commit("updateWord", word);
      }
    },
    words() {
      return this.$store.state.words;
    }
  },
  methods: {
    addWords(word) {
      this.$store.commit("addWords", word);
      this.word = "";

      if (!this.isPlaceAdded) {
        this.isPlaceAdded = true;
      } else if (!this.isPersonAdded && this.isPlaceAdded) {
        this.isPersonAdded = true;
      } else if (this.isPersonAdded && this.isPlaceAdded) {
        this.is3wordsAdded++;
      }
    },
    playerReady() {
      if (this.currPlayerNum < this.$store.state.players.length - 1) {
        this.currPlayerNum++;
        this.isPlaceAdded = false;
        this.isPersonAdded = false;
        this.is3wordsAdded = 0;
      } else {
        this.$store.commit("updateWordsReady", true);
      }
    },
    usePredefinedWords() {
      this.$store.commit("usePredefinedWords");
      this.$store.commit("updateWordsReady", true);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>