<template>
    <button class="form" @click="addForm">
    </button>
</template>

<script>

export default {
    methods: {
        addForm() {
            this.$emit('addForm');
        }
    }
}
</script>
<style lang="scss" scoped>
.form {
    min-width: 200px;
    min-height: 250px;
    background-color: rgba(0, 0, 0, .7);
    padding: 20px;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &:before {
        content: "+";
        width: 100px;
        height: 100px;
        border-radius: 100%;
        font-size: 70px;
        background-color: #fff;
        vertical-align: middle;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>