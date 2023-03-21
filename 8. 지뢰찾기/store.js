import Vue from 'vue';
import Vuex from 'vuex';


Vue.use(Vuex); // vue와 vuex를 연결

// object dynamic property (mutation을 변수로 빼준다, []사용)
// 저장된 mutation들을 component에서 사용할 때 오타를 방지하기 위해 변수로 선언
export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMARLIZE_CELL = 'NORMARLIZE_CELL';
export const INCREMENT_TIMER = 'INCREMENT_TIMER';

export const CODE = {
    MINE: -7,
    NORMAL: -1,
    QUESTION: -2,
    FLAG: -3,
    QUESTION_MINE: -4,
    FLAG_MINE: -5,
    CLICKED_MINE: -6,
    OPENED: 0
};

// 지뢰 심는 함수 
const plantMine = (row, cell, mine) => {
    const candidate = Array(row * cell).fill().map((arr, i) => {
        return i;
    });

    const shuffle = [];
    while(candidate.length > row * cell - mine) {
        const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
        shuffle.push(chosen);
    }

    const data = [];
    for(let i=0; i<row; i++) {
        const rowData = [];
        data.push(rowData);
        for(let j=0; j<cell; j++) {
            rowData.push(CODE.NORMAL);
        }
    }

    for(let k=0; k<shuffle.length; k++) {
        const ver = Math.floor(shuffle[k] / cell); 
        const hor = shuffle[k] % cell;
        data[ver][hor] = CODE.MINE;
    }

    return data;
};


export default new Vuex.Store({ // import store(아무 이름) from './store'; 구문을 통해 사용 가능
    state: {
        tableData: [],
        data: {
            row: 0,
            cell: 0,
            mine: 0,
        },
        timer: 0,
        halted: true, // 게임 중단 여부
        result: '',
        openedCount: 0,

    }, // vue의 data와 비슷
    getters: {

    }, // vue의 computed와 비슷
    mutations: {
        [START_GAME](state, {row, cell, mine}) {
            // 주의! data객체 안의 속성을 직접 접근해서 바꾸면 화면에 반영이 안될 수 있다  (배열, 객체)
            // ex) state.data.row = row  화면 반영 X
            // ex) Vue.set(state.data, 'row', row); 화면 반영 O
            state.data = { 
                row,
                cell,
                mine
            };
            state.tableData = plantMine(row, cell, mine);
            state.timer = 0;
            state.halted = false;
            state.result = '';
            state.openedCount = 0;
        },
        [OPEN_CELL](state, {row, cell}) {

            let openedCount = 0;

            const checked = [];
            
            function checkAround(row, cell) { // 주변 8칸에 지뢰가 몇개 검색
                
                const checkRowOrCellIsUndefined =  row < 0 || row >= state.tableData.length || cell < 0 || cell >= state.tableData[0].length;
                if(checkRowOrCellIsUndefined) {
                    return;
                }

                if([CODE.OPENED, CODE.FLAG, CODE.FLAG_MINE, CODE.QUESTION, CODE.QUESTION_MINE].includes(state.tableData[row][cell])) {
                    return;
                }
                
                if(checked.includes(row + '/' + cell)) { // 이미 열린 칸인지 검사 
                    return; 
                }else {
                    checked.push(row + '/' + cell); // 열린 칸 기록
                }

                let around = [];

                if(state.tableData[row - 1]) {
                    around = around.concat([
                        state.tableData[row - 1][cell - 1], state.tableData[row - 1][cell], state.tableData[row - 1][cell + 1]
                    ]);
                }
                
                around = around.concat([
                    state.tableData[row][cell - 1], state.tableData[row][cell + 1],
                ]);

                if(state.tableData[row + 1]) {
                    around = around.concat([
                        state.tableData[row + 1][cell - 1], state.tableData[row + 1][cell], state.tableData[row + 1][cell + 1]
                    ]);
                }

                const counted = around.filter(function(v) {
                    return [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v);
                });

                if(counted.length === 0 && row > -1) { // 주변칸에 지뢰가 하나도 없으면 
                    const near = [];
                    if(row - 1 > -1) {
                        near.push([row - 1, cell - 1]);
                        near.push([row - 1, cell]);
                        near.push([row - 1, cell + 1]);
                    }
                    near.push([row, cell - 1]);
                    near.push([row, cell + 1]);
                    if(row + 1 < state.tableData.length) {
                        near.push([row + 1, cell - 1]);
                        near.push([row + 1, cell]);
                        near.push([row + 1, cell + 1]);
                    }
                    near.forEach((n) => {
                        if(state.tableData[n[0]][n[1]] !== CODE.OPENED) {
                            checkAround(n[0], n[1]);
                        }
                    });
                }
                // 열린칸 개수 저장
                if(state.tableData[row][cell] === CODE.NORMAL) {
                    openedCount += 1;
                }
                Vue.set(state.tableData[row], cell, counted.length);
            }
            checkAround(row, cell);

            let halted = false;
            let result = '';
            if(state.data.row * state.data.cell - state.data.mine === state.openedCount + openedCount) {
                halted = true;
                result = `${state.timer}초만에 승리하셨습니다.`
            }
            state.openedCount += openedCount;
            state.halted = halted;
            state.result = result;
        },
        [CLICK_MINE](state, {row, cell}) {
            state.halted = true;
            Vue.set(state.tableData[row], cell, CODE.CLICKED_MINE);
        },
        [FLAG_CELL](state, {row, cell}) {
            if(state.tableData[row][cell] === CODE.MINE) {
                Vue.set(state.tableData[row], cell, CODE.FLAG_MINE);
            }else {
                Vue.set(state.tableData[row], cell, CODE.FLAG);
            }
        },
        [QUESTION_CELL](state, {row, cell}) {
            if(state.tableData[row][cell] === CODE.FLAG_MINE) {
                Vue.set(state.tableData[row], cell, CODE.QUESTION_MINE);
            }else {
                Vue.set(state.tableData[row], cell, CODE.QUESTION);
            }

        },
        [NORMARLIZE_CELL](state, {row, cell}) {
            if(state.tableData[row][cell] === CODE.QUESTION_MINE) {
                Vue.set(state.tableData[row], cell, CODE.MINE);
            }else {
                Vue.set(state.tableData[row], cell, CODE.NORMAL);
            }

        },
        [INCREMENT_TIMER](state) {
            state.timer += 1;
        },
    }, // state를 수정할 때 사용 (동기적)
    actions: {

    }, // 비동기 혹은 여러 mutation을 연달아 실행할 때 사용
});