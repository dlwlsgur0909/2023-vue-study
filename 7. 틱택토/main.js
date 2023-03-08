import Vue from 'vue'; // package.json에 설치된 vue를 import 해옴
import LottoGenerator from './LottoGenerator.vue'; // webpack.config.js 파일에서 extensions에 .vue 추가시 .vue 생략 가능

new Vue(LottoGenerator).$mount('#root');