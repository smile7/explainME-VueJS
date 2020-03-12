<template>
  <table class="table custom-table">
    <thead>
      <tr>
        <th scope="col">Играч</th>
        <th scope="col">Играч</th>
        <th scope="col">Точки</th>
      </tr>
    </thead>
    <tbody>
      <template v-for="team in teams">
        <tr :key="team.id">
          <td>{{ team.player1 }}</td>
          <td>{{ team.player2 }}</td>
          <td>{{ team.points }}</td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<script>
import { mapState } from 'vuex'

export default {
    computed: {
        ...mapState(['teams'])
    }
};
</script>

<style lang="scss" scoped>
.custom-table {
  text-align: center;
  max-height: 510px;
  overflow-y: auto;
  background-color: rgba(224, 244, 253, 0.5);
  border: 2px double $dark-blue;
  padding: 30px;

  thead th {
    border-bottom: 2px solid #e0f4fd;
  }

  td,
  th {
    border-top: 1px solid $light-blue;
    font-size: 19px;
  }

  tbody tr:nth-of-type(2n + 1) {
    background-color: rgba(224, 244, 253, 0.5);
  }
}
</style>