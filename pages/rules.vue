<template>
    <div class="wrapper">
        <Header></Header>
        <div class="content container">
            Pravilata sa qsni.
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer'

export default {
  data() {
    return {
    }
  },
  components: {
    Header,
    Footer
  }
}
/*
Methods / Buttons:
V1.0:
 - StartGame
 - WordGuessed - btn AND space hit +1pt
 - WordSkipped - btn AND esc hit -1pt
 - QuitGame - btn below right
V1.1:
 - Rounds

View:
V1.0:
 - All Teams
 - Points live changed for teams
 - Timer
V1.1:
 - Add words
V1.2:
 - Action log
V1.3:
 - Preview words
V3.0 Account:
 - Best score all time


DB:
V1:
 - Keep words
V1.3:
 - Delete words
V3.0 Account:
 - Keep best results - team names and scores
*/

</script>

<style>
</style>

