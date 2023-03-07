<template>
    <div>
        <div id="screen" v-bind:class="state" @click="">{{ message }}</div>
        <div>
            <div>평균시간: {{  }}</div>
            <button @click="onReset">리셋</button>
        </div>
    </div>
</template>

<script>
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

            },
        },
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

