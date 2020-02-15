<template>
    <header class="header">
        <div class="container-fluid header">
            <div class="row">
                <div class="col-2 logo text-center align-self-center">
                    <img src="../static/images/logo.png">
                </div>
                <div class="offset-4 col-6 menu text-right">
                    <ul class="">
                        <li><b-link to="/">Home</b-link></li>
                        <li><b-link to="/rules">Rules</b-link></li>
                        <li><b-link to="/words">Words</b-link></li>
                    </ul>
                </div>
            </div>
        </div>
    </header> 
</template>

<script>
export default {
    
}
</script>

<style scoped>
.header {
    background-image: url('../static/images/header-bg.png');
    height: 71px;
}

.logo img {
    width: 80%;
    height: 40px;
}

.menu {
    padding-right: 200px;
}

ul {
    list-style: none;
    margin-top: 25px;
}

li {
    display: inline;
    margin-right: 30px;
    font-size: 20px;
    color: white;
}
</style>