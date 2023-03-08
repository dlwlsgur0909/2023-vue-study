<template>
    <td @click="onClickTd">{{ cellData }}</td>
</template>


<script>

    import { CLICK_CELL, SET_WINNER, CHANGE_TURN, NO_WINNER, RESET_GAME } from './store'; // store.js에서 선언한 mutation 변수 import 

    export default {
        props: {
            cellIndex: Number,
            rowIndex: Number,
        },
        computed: { // vuex에 등록한 state값을 사용하기 위해서는 computed에 반드시 연결을 해야한다.
            cellData() { // 부모 component에서 data를 받지 않고 vuex를 통해 바로 data를 하위 component로 전달 가능 
                return this.$store.state.tableData[this.rowIndex][this.cellIndex];
            },
            tableData() {
                return this.$store.state.tableData;
            },
            turn() {
                return this.$store.state.turn;
            },
        },
        methods: {
            onClickTd() {
                /* 
                    뷰에서는 메서드 (array.push같은)를 사용하면 바뀌지만
                    객체의 key값으로 접근해서 data를 변경하거나
                    배열의 내부를 index로 접근해서 바꾸면 
                    값은 바뀌지만 실제로 화면에 반영이 안된다
                    따라서, this.$set으로 변경해야한다 
                    ex) this.$set(data, index, newValue);
                */

                if(this.cellData) {
                    alert('이미 선택된 칸입니다!');
                    return;
                }

                this.$store.commit(CLICK_CELL, {row: this.rowIndex, cell: this.cellIndex}); // store.js에 저장된 mutation중 CLICK_CELL을 commit을 통해 불러온다

                let win = false;
                const turn = this.turn;
                const tableData = this.tableData;
                if(tableData[this.rowIndex][0] === turn && tableData[this.rowIndex][1] === turn && tableData[this.rowIndex][2] === turn) {
                    win = true;
                }
                if(tableData[0][this.cellIndex] === turn && tableData[1][this.cellIndex] === turn && tableData[2][this.cellIndex] === turn) {
                    win = true;
                }
                if(tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn) {
                    win = true;
                }
                if(tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn) {
                    win = true;
                }


                if(win) { // 이긴 경우
                    this.$store.commit(SET_WINNER, this.turn);
                    this.$store.commit(RESET_GAME);
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
                        this.$store.commit(NO_WINNER);
                        this.$store.commit(RESET_GAME);
                    }else {
                        this.$store.commit(CHANGE_TURN);
                    }
                }
            },
        }
    };

</script>