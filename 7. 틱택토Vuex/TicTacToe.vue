<template>
    <div>
        <div>{{ turn }}님의 차례입니다.</div>   
        <table-component></table-component>
        <div v-if="winner">{{ winner }}님의 승리!</div>   
    </div>
</template>

<script>
    import store from './store'; // vuex와 최상위 부모 component(TicTacToe.vue)를 연결 
    import TableComponent from './TableComponent.vue'; 

    export default {
        store,
        components: {
            TableComponent,
        },
        computed: {
            winner() {
                return this.$store.state.winner;
            }, 
            turn() {
                return this.$store.state.turn;
            },
        },
    };
</script>

<style>
  
    table {
        border-collapse: collapse;
    }

    td{
        border: 1px solid black;
        width: 40px;
        height: 40px;
        text-align: center;
    }


</style>

