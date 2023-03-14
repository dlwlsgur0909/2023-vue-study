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

    }, // vue의 data와 비슷
    getters: {

    }, // vue의 computed와 비슷
    mutations: {
        [START_GAME](state, {row, cell, mine}) {
            // 주의! data객체 안의 속성을 직접 접근해서 바꾸면 화면에 반영이 안될 수 있다 
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
        },
        [OPEN_CELL](state) {

        },
        [CLICK_MINE](state) {

        },
        [FLAG_CELL](state) {

        },
        [QUESTION_CELL](state) {

        },
        [NORMARLIZE_CELL](state) {

        },
        [INCREMENT_TIMER](state) {
            state.timer += 1;
        },
    }, // state를 수정할 때 사용 (동기적)
    actions: {

    }, // 비동기 혹은 여러 mutation을 연달아 실행할 때 사용
});