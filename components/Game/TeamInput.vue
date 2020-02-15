<template>
    <div>
        <div class="row">
            <h1 class="col-12">Enter players</h1>
            <div class="col-6" v-for="player in players" :key="player.id">
                <input type="text" v-model="player.value">                
            </div>
            <div class="btn col-12">
                <button @click="addPlayer">Add new player</button>
                <button @click="submit">Submit</button>
            </div>
        </div>
        <!-- add info box if odd number, someone will be placed twice -->
        <div v-if="isTeamsReady" class="row">
            Teams are:
            <template v-for="(player, i) in players">
                {{i}}: {{ player.value }}
            </template>
        </div>
    </div>
</template>

<script>
/* PASS TEAMS TO VUEX STORE */
export default {
    data() {
        return {
            isTeamsReady: false,
            players: []
        }
    },
    methods: {
        addPlayer() {
            this.players.push({value: ''})
        },
        submit() {
            this.isTeamsReady = true
            this.$emit('teamsReady', this.isTeamsReady)
            this.$emit('playersList', this.players)
        }
    }
}
</script>

<style scoped>
    button {
        margin-left: 30px;
    }
    input {
        width: 100%;
    }
</style>