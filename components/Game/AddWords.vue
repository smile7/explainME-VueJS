<template>
    <div class="container">
        <div class="row">
            <h2 class="col-12 text-center">Enter word and hit enter</h2>
            <input type="text" v-model="word">
            <button @click="addWord(word)">Add word</button>
        </div>
        <div class="row">
            <div class="col-12" v-for="word in words" :key=word.id>
                {{ word }}
            </div>
        </div>
    </div>
</template>

<script>
/* PASS WORDS TO VUEX STORE */
export default {
    data() {
        return {
            word: '',
            words: []
        }
    },
    methods: {
        addWord(word) {
            this.words.push(word)
        }
    },
}
</script>

<style scoped>

</style>