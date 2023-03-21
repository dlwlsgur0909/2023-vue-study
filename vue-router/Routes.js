import Vue, { onMounted } from 'vue';
import VueRouter from 'vue-router';
import NumberBaseBall from '../3. 숫자야구';
import ResponseCheck from '../4. 반응속도체크';
import RockScissorsPaper from '../5. 가위바위보';
import LottoGenerator from '../6. 로또';

Vue.use(VueRouter);

export default new VueRouter  ({

    routes: [
        { path: '/number-baseball', component: NumberBaseBall },
        { path: '/response-check', component: ResponseCheck },
        { path: '/rock-scissors-paper', component: RockScissorsPaper },
        { path: '/lotto-generator', component: LottoGenerator },
    ]
});