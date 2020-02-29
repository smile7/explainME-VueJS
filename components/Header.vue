<template>
  <header class="header">
    <div class="container">
      <div class="row">
        <div class="col-2 logo align-self-center">
          <b-link to="/">
            <img src="../static/images/logo.png" />
          </b-link>
        </div>
        <div class="offset-4 col-6 menu text-right">
          <nav class="navbar navbar-expand-lg navbar-light">
            <button
              class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                  <b-link class="nav-link" to="/">Начало</b-link>
                </li>
                <li class="nav-item">
                  <b-link class="nav-link" to="/rules">Правила</b-link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.header {
  background-image: url("../static/images/header-bg.png");
  height: 60px;
}

.logo img {
  width: 80%;
  height: 40px;
}

.navbar-light .navbar-nav .nav-link {
  margin-right: 30px;
  font-size: 18px;
  color: $white;
}
.nav-item:last-of-type .nav-link {
  margin-right: 0;
}
</style>