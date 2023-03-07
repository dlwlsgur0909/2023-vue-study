<template>
    <div>
        <div>당첨숫자</div>
        <div id="result-area">
            <lotto-ball v-for="ball in winballs" number="5"></lotto-ball>
        </div>
        <div>보너스!</div>
        <lotto-ball v-if="bonus"></lotto-ball>
        <button v-if="redo">한번 더!</button>
    </div>
    
</template>

<script>
    import LottoBall from './LottoBall.vue'

    function getWinNumbers() {

        const candidate = Array(45).fill().map((v, i) => i+1);
        const shuffle = [];
        while(candidate.length > 0) {
            shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
        }
        const bonusNumber = shuffle[shuffle.length - 1];
        const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
        return [...winNumbers, bonusNumber]
    }

    export default {
        components: {
            'lotto-ball': LottoBall, // PascalCase는 vue에서 자동으로 kebab-case로 변환 가능하므로 그냥 LottoBall만 적어도 된다.
        },
        data() {
            return {
                winNumbers: getWinNumbers(),
                winBalls: [],
                bonus: null,
                redo: false,
            }
        },
        methods: {
           
        },
        
        computed: {
          
           
        },
        mounted() {

        },
        beforeDestroy() {

        },
        watch: {

        }
    };
</script>

<style scoped>
  
</style>

