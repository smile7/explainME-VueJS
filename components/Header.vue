<template>
  <header class="header">
    <div class="container">
      <div class="row">
        <div class="col-12 col-lg-2 logo align-self-center">
          <b-link to="/">
            <img src="../static/images/logo.png" />
          </b-link>
        </div>
        <div class="offset-lg-4 col-lg-6 col-12 menu text-right">
          <nav class="navbar navbar-expand navbar-light">
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav ml-lg-auto">
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
  /* background-image: url("../static/images/header-bg.png"); */
  background: rgb(48,46,75);
  background: linear-gradient(90deg, rgba(48,46,75,1) 0%, rgba(89,149,158,1) 0%, rgba(34,68,133,1) 0%, rgba(89,149,158,1) 100%);
  height: 70px;
}

.logo img {
  width: 80%;
  height: 40px;
}

.navbar-light .navbar-nav .nav-link {
  margin-right: 30px;
  color: $white;
}
.nav-item:last-of-type .nav-link {
  margin-right: 0;
}

.navbar, .nav-item:last-of-type .nav-link { padding-right: 0; }

@media screen and (max-width: 1200px) {
  .logo img { width: 100%; }
}

@media screen and (max-width: 992px) {
  .header { height: 120px; }

  .navbar, .nav-item:last-of-type .nav-link { padding-right: 15px; }

  .logo img {
    display: block;
    margin: 0 auto;
    text-align: center;
    width: 230px;
    margin-top: 20px;
  }

  ul.navbar-nav { margin: auto; }
}
</style>