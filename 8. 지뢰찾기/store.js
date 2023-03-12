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

export default new Vuex.Store({ // import store(아무 이름) from './store'; 구문을 통해 사용 가능
    state: {
        tableData: [],
        data: {
            row: 0,
            cell: 0,
            mine: 0,
        },
        timer: 0,
        result: '',

    }, // vue의 data와 비슷
    getters: {

    }, // vue의 computed와 비슷
    mutations: {
        [START_GAME](state, {row, cell, mine}) {

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

        },
    }, // state를 수정할 때 사용 (동기적)
    actions: {

    }, // 비동기 혹은 여러 mutation을 연달아 실행할 때 사용
});