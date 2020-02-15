<template>
    <div class="wrapper">
        <Header></Header>
        <div class="content container">
            <AddWords></AddWords>
            <Footer></Footer>
        </div>
    </div>
</template>

<script>
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer'
import AddWords from '~/components/Game/AddWords.vue'

export default {
    data() {
        return {
        }
    },
    methods: {
    },
    components: {
        Header,
        Footer,
        AddWords
    }
}
</script>

<style scoped>

</style>