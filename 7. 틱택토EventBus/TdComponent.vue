<template>
    <td @click="onClickTd">{{ cellData }}</td>
</template>


<script>

    export default {
        props: {
            cellData: String,
            cellIndex: Number,
            rowIndex: Number,
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

                const rootData = this.$root.$data;
                this.$set(rootData.tableData[this.rowIndex], [this.cellIndex], rootData.turn);

                let win = false;
                const turn = rootData.turn;
                const tableData = rootData.tableData;
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
                    rootData.winner = turn;
                    rootData.turn = 'O';
                    rootData.tableData = [
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
                        rootData.turn = 'O';
                        rootData.winner = '';
                        rootData.tableData = [
                            ['', '', ''],
                            ['', '', ''],
                            ['', '', '']
                        ];

                    }else {
                        rootData.turn = rootData.turn === 'O' ? 'X' : 'O';
                    }
                }
            }
        }
    };

</script>