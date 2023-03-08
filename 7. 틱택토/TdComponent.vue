<template>
    <td @click="onClickTd">{{ cellData }}</td>
</template>


<script>

    export default {
        props: {
            cellData: String,
            cellIndex: Number,
            rowIndex: Number,
        },
        methods: {
            onClickTd() {
                console.log(this.$root.$data);
                console.log(this.$parent.$data);
                this.$root.$data.turn = this.$root.$data.turn === 'O' ? 'X' : 'O';
            }
        }
    };

</script>