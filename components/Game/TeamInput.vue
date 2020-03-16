<template>
  <div class="row">
    <div class="col-md-6 col-12 text-center">
      <div class="add-players-box">
        <v-dialog ref="dialog" />
        <h2>Добавяне на играчи</h2>
        <input
          type="text"
          ref="playerInput"
          v-on:keyup.enter="triggerAdd"
          class="form-control"
          id="playerInput"
          v-model="player"
        />
        <div class="col-12">
          <button class="btn" ref="addPl" @click="addPlayer(player)">Добави</button>
        </div>
      </div>
      <div class="shuffle-btn">
        <button class="btn" @click="shuffleTeams">Разбъркай отборите</button>
      </div>
      <div class="shuffle-btn">
        <button class="btn bigger-btn mb-5" @click="submit">Готово</button>
      </div>
    </div>
    <div class="offset-xl-2 col-xl-4 col-md-6 col-12 players">
      <div class="row">
        <div class="col-6" v-for="player in players" :key="player.id">
          <div class="col-12 player-name">
            {{ player }}
            <span class="close" @click="deletePlayer(player)">x</span>
          </div>
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
      if (player != "") {
        this.$store.commit("addPlayers", player);
        this.player = "";
        this.$refs.playerInput.focus();
      } else {
        this.$modal.show("dialog", {
          text: "Моля въведете име!",
          buttons: [{ title: "OK" }]
        });
      }
    },
    triggerAdd() {
      this.$refs.addPl.click();
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
          this.$modal.show("dialog", {
            text:
              "Нужни са четен брой играчи. Ако сте нечетен брой, напишете някого 2 пъти!",
            buttons: [{ title: "OK" }]
          });
        } else {
          this.$store.commit("updateTeamsReady", true);
          this.$store.commit("createTeams");
        }
      } else if (this.$store.state.players.length < 4) {
        this.$modal.show("dialog", {
          text: "Моля напишете поне 4-ма играчи!",
          buttons: [{ title: "OK" }]
        });
      }
    }
  },
  mounted() {
    this.$refs.dialog.onKeyUp = () => {};
  }
};
</script>

<style lang="scss" scoped>
h2 {
  margin-bottom: 50px;
}
button {
  margin-left: 30px;
}
button:first-of-type {
  margin-left: 0;
}
input {
  width: 80%;
  margin: 0 auto;
  margin-bottom: 50px;
}

.add-players-box {
  /* background-color: $light-blue; */
  background: transparent;
  border: 2px outset $dark-blue;
  border-radius: $border-radius;
  padding: 30px;
  width: 550px;
  -webkit-box-shadow: 0px 0px 20px 0px $dark-blue;
  -moz-box-shadow: 0px 0px 20px 0px $dark-blue;
  box-shadow: 0px 0px 20px 0px $dark-blue;
}

.shuffle-btn {
  width: 550px;
  margin-top: 70px;
}

.player-name {
  /* background-color: $light-blue; */
  background: transparent;
  border: 1px solid $dark-blue;
  border-radius: $border-radius;
  overflow: hidden;
  margin-bottom: 30px;
  text-align: center;
  padding: 10px;
  -webkit-box-shadow: 0px 0px 4px 0px $dark-blue;
  -moz-box-shadow: 0px 0px 4px 0px $dark-blue;
  box-shadow: 0px 0px 4px 0px $dark-blue;
}

@media screen and (max-width: 1200px) {
  .add-players-box,
  .shuffle-btn {
    width: 100%;
  }
}

@media screen and (max-width: 768px) {
  .shuffle-btn {
    margin-top: 50px;
  }
  .players {
    margin: auto;
    margin-top: 50px;
  }
}
</style>