import Vue from 'vue';
import Vuex from 'vuex';


Vue.use(Vuex); // vue와 vuex를 연결

// object dynamic property (mutation을 변수로)
// 저장된 mutation들을 component에서 사용할 때 오타를 방지하기 위해 변수로 선언
export const SET_WINNER = 'SET_WINNER';  // import { SET_WINNER } from './store'; 구문을 통해 사용 가능
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME';
export const NO_WINNER = 'NO_WINNER';

export default new Vuex.Store({ // import store(아무 이름) from './store'; 구문을 통해 사용 가능
    state: {
        tableData: [
            ['', '', ''], 
            ['', '', ''],
            ['', '', ''],
           ],
           turn: 'O',
           winner: '',
    }, // vue의 data와 비슷
    getters: {

    }, // vue의 computed와 비슷
    mutations: {
        [SET_WINNER](state, winner) {
            state.winner = winner;
        },
        [CLICK_CELL](state, {row, cell}) {
            Vue.set(state.tableData[row], cell, state.turn);
        },
        [CHANGE_TURN](state) {
            state.turn = state.turn === 'O' ? 'X' : 'O';
            console.log(state.turn);
        },
        [RESET_GAME](state) {
            state.turn = 'O';
            state.tableData = [
                ['', '', ''],
                ['', '', ''],
                ['', '', '']
            ];
        },
        [NO_WINNER](state) {
            state.winner = '';
        }
    }, // state를 수정할 때 사용 (동기적)
    actions: {

    }, // 비동기 혹은 여러 mutation을 연달아 실행할 때 사용
});