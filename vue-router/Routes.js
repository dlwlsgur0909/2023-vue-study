import Vue from 'vue';
import VueRouter from 'vue-router';
import NumberBaseBall from '../3. 숫자야구/NumberBaseball';
import ResponseCheck from '../4. 반응속도체크/ResponseCheck';
import RockScissorsPaper from '../5. 가위바위보/RockScissorsPaper';
import LottoGenerator from '../6. 로또/LottoGenerator';

Vue.use(VueRouter);

export default new VueRouter  ({
    // default mode는 hash router (새로고침 가능, 검색엔진에 잘 걸리지 않는 불이익이 있음)
    // history mode는 새로고침하면 에러 발생, 새로고침은 서버에 요청을 보내지만 서버에서는
    // 해당 path를 알지 못하기에 발생하는 에러.
    // 해결 방법으로는 서버에 해당 path들을 등록해주면 된다. 
    mode: 'history', 
    routes: [
        // 컴포넌트가 늘어날 떄마다 routes에 추가를 해주는건 비효율적이므로 
        // 동적(dynamic) route 매칭을 사용한다.
        { path: '/number-baseball', component: NumberBaseBall },
        { path: '/response-check', component: ResponseCheck },
        { path: '/rock-scissors-paper', component: RockScissorsPaper },
        { path: '/lotto-generator', component: LottoGenerator },
        { path: '/game/:name', },
    ]
});