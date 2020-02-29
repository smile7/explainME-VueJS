<template>
  <div class="wrapper">
    <Header></Header>
    <div class="content container">
      <TeamInput v-if="!isTeamsReady"></TeamInput>
      <AddWords v-else-if="isTeamsReady && !isWordsReady"></AddWords>
      <Game v-else></Game>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import Header from '~/components/Header.vue'
import Footer from '~/components/Footer'
import TeamInput from '~/components/Game/PreGame/TeamInput.vue'
import AddWords from '~/components/Game/PreGame/AddWords.vue'
import Game from '~/components/Game/DuringGame/Game.vue'

export default {
  components: {
    Header,
    Footer,
    TeamInput,
    AddWords,
    Game,
  },
  computed: {
    ...mapState([
      'isTeamsReady',
      'isWordsReady'
    ])
  }
}
</script>

<style lang="scss" scoped>
</style>
