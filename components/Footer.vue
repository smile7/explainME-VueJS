<template>
    <footer class="footer">
        <div class="container">
            <div class="row">
                <div class="col-12 text-center">
                    Made by <a href="https://sts-bg.eu/" target="_blank"><u>SenaTechs</u></a>. All rights reserved.
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.footer {
    /* background-image: url('../static/images/header-bg.png'); */
    background: rgb(11,52,131);
    background: linear-gradient(90deg, rgba(11,52,131,1) 0%, rgba(40,169,189,1) 50%, rgba(11,52,131,1) 100%);
    color: white;
    font-size: $font-size-small;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 30px;
    line-height: 30px;
}
</style>