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
                  За всеки играч по 5 - <strong>1 известна личност, 1 място и 3 думи</strong>. Ако предпочитате, можете да 
                  пропуснете тази стъпка и сложен алгоритъм автоматично ще избере случайни думи за вашата игра.
                </div>
                <div>
                  <div class="step">Цел</div>
                  Всеки отбор има <strong><span class="colorblue">30</span> секунди</strong>, за да познае възможно 
                  най-много думи. Печели този отбор, който събере най-много точки.
                </div>
                <div>
                  <div class="step">1-ви кръг - Oбяснение с думи</div>
                  Използвате колкото искате думи, за да обясните думата, която виждате. Не трябва да използвате нейн корен или 
                  да казвате думата на друг език. <strong>За позната дума, печелите <span class="colorblue">3</span> точки.</strong>
                </div>
                <div>
                  <div class="step">2-ри кръг - Oбяснение с 1 дума</div>
                  Използвате една единствена дума като обяснение. <strong>За позната дума, печелите <span class="colorblue">4</span> точки.</strong>
                </div>
                <div>
                  <div class="step">3-ти кръг - Oбяснение с жестове</div>
                  Използвате единствено жестове, всякакво говорене е забранено. <strong>За позната дума, печелите <span class="colorblue">5</span> точки.</strong>
                </div>
                <div>
                  <div class="step">Друго</div>
                  <p>Ако някоя дума ви затруднява, можете да я пропуснете. <strong>За всяка пропусната дума, губите <span class="colorblue">1</span> точка.</strong></p>
                  <strong>
                    <p>За да отбележите позната дума, натиснете <span class="colorblue">SPACE</span>.<br>
                    За да пропуснете дума, натиснете <span class="colorblue">ESCAPE.</span></p>
                  </strong>
                <div>
                  <div class="step">Телефон</div>
                  <p>Възможно е играта да се играе и на телефон, но най-удобно ще ви бъде през компютър. За да отбележите позната 
                    дума на телефон, натиснете с пръст върху думата. За да пропуснете дума, плъзнете с цял пръст наляво или надясно отново върху нея. </p>
                </div>
                <h4 class="colorblue">ТОВА Е! ЗАБАВАЛЯВАЙТЕ СЕ :) </h4>
                </div>
                <img src="../static/images/joey.jpg">
                <div class="iframe">
                  <iframe src="https://www.youtube.com/embed/DpRfq7xHstg" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
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
</script>

<style lang="scss" scoped>
h1 { margin-bottom: 40px; }
h4 { margin: 70px 0; }
img {
  width: 700px;
  height: 800px;
  margin-bottom: 70px;
}
iframe {
   width: 560px;
   height: 315px;
}

.step {
  font-size: $font-size-big;
  margin: 30px 0 10px;
  text-decoration: underline;
}

.iframe { margin-bottom: 50px; }

@media screen and (max-width: 992px) {
  img, iframe {
    width: 100%;
  }
}
@media screen and (max-width: 568px) {
  img {
    height: 550px;
  }
}
@media screen and (max-width: 440px) {
  img {
    height: 400px;
  }
}

</style>

