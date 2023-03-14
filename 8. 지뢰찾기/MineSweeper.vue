<template>
    <div>
        <mine-form />
        <div>{{  timer }}</div>
        <table-component />
        <div>{{ result }}</div>
    </div>
</template>

<script>

    import { mapState } from 'vuex';

    import store, { INCREMENT_TIMER } from './store';
    import TableComponent from './TableComponent.vue';
    import MineForm from './MineForm.vue';
    
    let interval;

    export default {
        store,
        components: {
            TableComponent,
            MineForm,
        },
        computed: {
            ...mapState(['timer', 'result', 'halted']),
        },
        methods: {

        },
        watch: {
            halted(newValue, oldValue) {
                if(newValue === false) { // 게임 시작
                    interval = setInterval(() => {
                        this.$store.commit(INCREMENT_TIMER);
                    }, 1000); // 자바스크립트의 timer는 정확하지 않을 수 있다.
                }else {
                    clearInterval(interval); // 게임 중단 
                }
            }
        }
    }



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

