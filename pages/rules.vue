<template>
    <div class="wrapper">
        <Header></Header>
        <div class="content container">
            <div class="row">
              <div class="col-12 col-md-8 m-auto text-center">
                <h1>Правила</h1>
                <p>Играта е известна като <span class="colorblue">листчета</span> (асоциации).</p>
                <div>
                  <div class="step">Стъпка I - Въведете участниците</div>
                  Те трябва да са четен брой (ако не - изберете някой от вас, 
                  който ще играе в 2 отбора едновременно). Ако предварително сте избрали кой с кого
                  ще бъде в отбор, въведете играчите последователно. Ако нямате претенции, въведете всички участници и натиснете 
                  <span class="colorblue">"Разбъркване на отборите"</span>, за да получите случайна конфигурация.
                </div>
                <div>
                  <div class="step">Стъпка II - Въведете думи</div>
                  За всеки играч по 5 - 1 известна личност, 1 място и 3 думи. Ако предпочитате, можете да 
                  пропуснете тази стъпка и сложен алгоритъм автоматично ще избере случайни думи за вашата игра.
                </div>
                <div>
                  <div class="step">Цел</div>
                  Всеки отбор има <span class="colorblue">30</span> секунди, за да познае възможно 
                  най-много думи. Печели този отбор, който събере най-много точки.
                </div>
                <div>
                  <div class="step">1-ви кръг - Oбяснение с думи</div>
                  Използвате колкото искате думи, за да обясните думата, която виждате. Не трябва да използвате нейн корен или 
                  да казвате думата на друг език. За позната дума, печелите <span class="colorblue">3</span> точки.
                </div>
                <div>
                  <div class="step">2-ри кръг - Oбяснение с 1 дума</div>
                  Използвате една единствена дума като обяснение. За позната дума, печелите <span class="colorblue">4</span> точки.
                </div>
                <div>
                  <div class="step">3-ти кръг - Oбяснение с жестове</div>
                  Използвате единствено жестове, всякакво говорене е забранено. За позната дума, печелите <span class="colorblue">5</span> точки.
                </div>
                <div>
                  <div class="step">Друго</div>
                  <p>Ако някоя дума ви затруднява, можете да я пропуснете. За всяка пропусната дума, губите <span class="colorblue">1</span> точка.</p>
                  <p>За да отбележите позната дума, натиснете <span class="colorblue">SPACE</span>.<br>
                  За да пропуснете дума, натиснете <span class="colorblue">ESCAPE.</span></p>
                  <h4 class="colorblue">ТОВА Е! ЗАБАВАЛЯВАЙТЕ СЕ :) </h4>
                </div>
                <img src="../static/images/joey.jpg">
              </div>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer'

export default {
  components: {
    Header,
    Footer
  }
}
/*
Methods / Buttons:
V1.0:
 d- StartGame
 d- WordGuessed - btn AND space hit +1pt
 d- WordSkipped - btn AND esc hit -1pt
 - QuitGame - btn below right
V1.1:
 d- Rounds

View:
V1.0:
 d- All Teams
 d- Points live changed for teams
 d- Timer
V1.1:
 d- Add words
V1.2:
 - Action log
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

<style lang="scss" scoped>
h1 { margin-bottom: 40px; }
h4 { margin: 70px 0; }
img {
  width: 700px;
  height: 800px;
  margin-bottom: 70px;
}

.step {
  font-size: $font-size-big;
  margin: 30px 0 10px;
  text-decoration: underline;
}

</style>

