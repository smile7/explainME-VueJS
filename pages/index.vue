<template>
  <div class="wrapper">
    <Header></Header>
    <div class="content container">
      <TeamInput
        @teamsReady="isTeamsReady = $event"
        @playersList="players = $event"
        v-if="!isTeamsReady"
      ></TeamInput>
      <Game v-else></Game>
      <div v-for="(player, i) in players" :key="player.id">
        {{i}}: {{ player.value }}
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer'
import TeamInput from '~/components/Game/TeamInput.vue'
import Game from '~/components/Game/Game.vue'

export default {
  data() {
    return {
      isTeamsReady: false,
      players: []
    }
  },
  components: {
    Header,
    Footer,
    TeamInput,
    Game,
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
