<template>
    <div>
        <div id="screen" v-bind:class="state" @click="onClickScreen">{{ message }}</div>
        <!-- 
            v-show안의 구문이 true일 경우만 보여진다 
            v-show는 태그가 있고 display none 처리
            v-if는 false일 경우 태그 자체가 존재하지 않는다
        -->
        <div v-show="result.length"> 
            <div>평균시간: {{ average }}ms</div>
            <button @click="onReset">리셋</button>
        </div>
    </div>
</template>

<script>

    let startTime = 0;
    let endTime = 0;
    let timeout = null;

    export default {
        data() {
            return {
                result: [],
                state: 'waiting',
                message: '클릭해서 시작하세요',
            }
        },
        methods: {
            onReset() {
                this.result = [];
            },
            onClickScreen() {
                if(this.state === 'waiting') {
                    this.state = 'ready';
                    this.message = '초록색이 되면 클릭하세요';
                    timeout = setTimeout(()=>{
                        this.state = 'now'
                        this.message = '클릭하세요!';
                        startTime = new Date();
                    }, Math.floor(Math.random()*1000) + 2000); // 2~3초
                }else if(this.state === 'ready') {
                    this.state = 'waiting';
                    this.message = '너무 성급하시군요! \n 다시 클릭해서 시도해보세요';
                    clearTimeout(timeout);
                }else if(this.state === 'now') {
                    endTime = new Date();
                    this.state = 'waiting';
                    this.message = '클릭해서 시작하세요';
                    this.result.push(endTime - startTime); 
                }
            },
        },
        computed: {
            average() {
                
                return this.result.reduce((a, c) => a + c, 0) / this.result.length || 0;
            }
        }
    };
</script>
<!-- scoped를 적용하면 다른 component에서는 해당 css가 적용되지 않는다 -->
<style scoped>
    #screen {
        width: 300px;
        height: 200px;
        text-align: center;
        user-select: none;
    }
    
    #screen.waiting {
        background-color: aqua;
    }

    #screen.ready {
        background-color: red;
        color: white;
    }

    #screen.now {
        background-color: greenyellow;
    }
</style>

