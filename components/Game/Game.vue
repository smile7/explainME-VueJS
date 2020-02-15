<template>
    <div id="game-field">
        <div class="word-holder">{{ words[Math.floor(Math.random() * words.length)] }}</div>
        <button @click="points+=3">Word guessed</button>
        <button @click="points--">Skip word</button>
        <div class="points">{{ points }}</div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      isTeamsReady: false,
      points: 0,
      words: ['alpaka', 'jivotno', 'kiborg', 'pustinqk', 'drum', 'deviaciq', 'mana'],
    }
  },
}
</script>

<style scoped>

</style>