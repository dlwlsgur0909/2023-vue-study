<template>
    <div>
        <h1>{{result}}</h1>
        <form @submit.prevent="onSubmitForm">
            <input ref="answer" minlength="4" maxlength="4" v-model="input">
            <button type="submit">입력</button>
        </form>
        <div>시도: {{ tries.length }}</div>
        <ul>
            <li v-for="t in tries">
                <div>{{ t.try }}</div>
                <div>{{ t.result }}</div>
            </li>
        </ul>
    </div>
</template>

<script>

    // 4자리 난수 생성
    const getNumbers = () => {
        const candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
        const randomArray = [];
        for(let i=0; i<4; i++) {
            const chosen = candidates.splice(Math.floor(Math.random() * (10-i)), 1)[0];
            randomArray.push(chosen);
        }
        return randomArray;
    };

    export default {
        data() {
            return {
                answer: getNumbers(), // ex) [1, 3, 5 ,4]
                tries: [], // 시도 내역
                input: '', // 입력 값
                result: '', // 결과
            }
        },
        methods: {
            onSubmitForm() {
                if(this.input === this.answer.join('')) {
                    this.tries.push({
                        try: this.input,
                        result: '홈런',
                    });
                    this.result = '홈런입니다~';
                    alert('홈런! 게임을 다시 실행합니다!');
                    this.tries = [];
                    this.answer = getNumbers();
                }else {
                    if(this.tries.length >= 9 ) { // 10번째 시도
                        this.result = `10번 넘게 틀려서 실패입니다. 정답은 ${this.answer.join('')}입니다...`
                        this.tries = [];
                        this.answer = getNumbers();
                    }else {
                        let strike = 0;
                        let ball = 0;
                        const answerArray = this.input.split('').map(v => parseInt(v));
                        for(let i=0; i<4; i++) {
                            if(answerArray[i] === this.answer[i]) { // 숫자 자릿수 모두 정답 strike
                                strike++;
                            }else if(this.answer.includes(answerArray[i])) { // 숫자만 정답
                                ball++;
                            }
                        }
                        this.tries.push({
                            try: this.input,
                            result: `${strike}스트라이크, ${ball}볼 입니다!`,
                        });
                    }
                }
           
                this.input = '';
                this.$refs.answer.focus();
            }
        },
    };
</script>

<style>

</style>

