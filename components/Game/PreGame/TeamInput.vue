<template>
  <div>
    <div class="row">
      <div class="col-6 text-center">
        <div class="add-players-box">
          <h1>Добавяне на играчи</h1>
          <input type="text" id="playerInput" v-model="player" />
          <div class="col-12">
            <button class="btn" @click="addPlayer(player)">Добави</button>
            <button class="btn" @click="submit">Готово</button>
          </div>
        </div>
      </div>
      <div class="offset-2 col-4">
        <div class="row">
          <span class="col-6 players-names" v-for="player in players" :key="player.id">
            {{ player }}
            <span @click="deletePlayer(player)">x</span>
          </span>
        </div>
        <div>
          <button class="btn" @click="shuffleTeams">Разбъркай отборите</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    player: {
      get() {
        return this.$store.state.player;
      },
      set(player) {
        this.$store.commit("updatePlayer", player);
      }
    },
    players() {
      return this.$store.state.players;
    }
  },
  methods: {
    addPlayer(player) {
      this.$store.commit("addPlayers", player);
      this.player = "";
    },
    shuffleTeams() {
      this.$store.commit("shufflePlayers");
    },
    deletePlayer(player) {
      this.$store.commit("deletePlayer", player);
    },
    submit() {
      if (this.$store.state.players.length >= 4) {
        if (this.$store.state.players.length % 2 == 1) {
          alert("Нужни са четен брой играчи. Ако сте нечетен брой, напишете някого 2 пъти.");
        } else {
          this.$store.commit("updateTeamsReady", true);
          this.$store.commit("createTeams");
        }
      } else if (this.$store.state.players.length < 4) {
        alert("Моля напишете поне 4 играчи");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
button {
  margin-left: 30px;
}
button:first-of-type {
  margin-left: 0;
}
input {
  margin: 50px 0;
}
h1 {
  margin-bottom: 0;
}
</style>