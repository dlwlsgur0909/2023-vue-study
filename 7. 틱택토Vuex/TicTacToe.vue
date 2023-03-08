<template>
    <div>
        <div>{{ turn }}님의 차례입니다.</div>   
        <table-component :table-data="tableData"></table-component>
        <div v-if="winner">{{ winner }}님의 승리!</div>   
    </div>
</template>

<script>
    import TableComponent from './TableComponent.vue'; 
    import EventBus from './EventBus.js';

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

           },
           onClickTd(rowIndex, cellIndex) {
                this.$set(this.tableData[rowIndex], [cellIndex], this.turn);

                let win = false;
                const turn = this.turn;
                const tableData = this.tableData;
                if(tableData[rowIndex][0] === turn && tableData[rowIndex][1] === turn && tableData[rowIndex][2] === turn) {
                    win = true;
                }
                if(tableData[0][cellIndex] === turn && tableData[1][cellIndex] === turn && tableData[2][cellIndex] === turn) {
                    win = true;
                }
                if(tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn) {
                    win = true;
                }
                if(tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn) {
                    win = true;
                }


                if(win) { // 이긴 경우
                    this.winner = turn;
                    this.turn = 'O';
                    this.tableData = [
                        ['', '', ''],
                        ['', '', ''],
                        ['', '', '']
                    ];
                }else { // 아직 승자가 없는 경우

                    let draw = true;
                    
                    // 무승부 검사
                    tableData.forEach((row) => {
                        row.forEach((cell) => {
                            if(!cell) {
                                draw = false;
                            }
                        });
                    });

                    if(draw) { // 무승부
                        this.turn = 'O';
                        this.winner = '';
                        this.tableData = [
                            ['', '', ''],
                            ['', '', ''],
                            ['', '', '']
                        ];

                    }else {
                        this.turn = this.turn === 'O' ? 'X' : 'O';
                    }
                }
           },
        },
        created() {
            EventBus.$on('clickTd', this.onClickTd);
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

