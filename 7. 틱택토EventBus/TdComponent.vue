<template>
    <td @click="onClickTd">{{ cellData }}</td>
</template>


<script>

    import EventBus from './EventBus';

    export default {
        props: {
            cellData: String,
            cellIndex: Number,
            rowIndex: Number,
        },
        methods: {
            onClickTd() {
                /* 
                    뷰에서는 메서드 (array.push같은)를 사용하면 바뀌지만
                    객체의 key값으로 접근해서 data를 변경하거나
                    배열의 내부를 index로 접근해서 바꾸면 
                    값은 바뀌지만 실제로 화면에 반영이 안된다
                    따라서, this.$set으로 변경해야한다 
                    ex) this.$set(data, index, newValue);
                */

                if(this.cellData) {
                    alert('이미 선택된 칸입니다!');
                    return;
                }

                EventBus.$emit('clickTd', this.rowIndex, this.cellIndex);
                
            }
        }
    };

</script>