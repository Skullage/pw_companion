<template>
    <button class="form d-flex justify-content-center align-items-center rounded border-0" @click="$emit('addForm')"></button>
</template>
<style lang="scss" scoped>
.form {
    background-color: rgba(0, 0, 0, .7);
    min-height: 300px;
    cursor: pointer;

    &:before {
        content: "+";
        width: 100px;
        height: 100px;
        border-radius: 100%;
        font-size: 70px;
        background-color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>