<template>
    <div>
        <h1>{{result}}</h1>
        <form @submit.prevent="onSubmitForm">
            <input ref="answer" minlength="4" v-oncemaxlength="4" v-model="input">
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
    export default {
        data() {
            return {
                tries: [],
                input: '',
                result: '',
            }
        },
        methods: {
            onSubmitForm() {
                this.tries.push({
                    try: this.input,
                    result: '홈런',
                });
                this.input = '';
                this.$refs.answer.focus();
            }
        },
    };
</script>

<style>

</style>

