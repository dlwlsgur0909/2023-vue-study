<template>
    <div>
        <div>{{ turn }}님의 차례입니다.</div>   
        <table-component :table-data="tableData"></table-component>
        <div v-if="winner">{{ winner }}님의 승리!</div>   
    </div>
</template>

<script>
    import Vue from 'vue';
    import TableComponent from './TableComponent.vue'; 

    export default {

        components: {
            TableComponent,
        },
        data() {
            return {
               tableData: [
                ['', '', ''], 
                ['', '', ''], 
                ['', '', ''],
               ],
               turn: 'O',
               winner: '',
            }
        },
        methods: {
           onChangeData() {
            // this.tableData[1][0] = 'X'; 화면에 적용되지 않음
            
            // Vue를 import해서 Vue.set을 사용하면 화면에 적용된다
            // import 하지않고 this.$set()으로도 가능하다
            Vue.set(this.tableData[1], 0, 'X');

           }
        },
        computed: {
          
           
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

