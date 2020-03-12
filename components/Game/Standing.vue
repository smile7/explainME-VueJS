<template>
  <div>
    <h1 class="text-center">Финално класиране</h1>
    <TablePlayers></TablePlayers>
    <div class="col-12 text-center">
      <button class="btn" @click="newGame">Нова игра</button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"
import TablePlayers from "~/components/Game/TablePlayers.vue"

export default {
  components: {
    TablePlayers
  },
  computed: {
    ...mapState(["teams"])
  },
  methods: {
    newGame() {
      this.$store.commit('clearAllData')
    }
  }
}
</script>

<style lang="scss" scoped>
.btn { margin-top: 80px; }
</style>