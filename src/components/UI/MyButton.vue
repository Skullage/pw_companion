<template>
    <button class="btn">
        <slot></slot>
    </button>
</template>

<script>
    export default {
        name: "MyButton",
    }
</script>

<style lang="scss" scoped>
.btn {
    font-size: 20px;
    border: 1px solid #fff;
    color: #fff;
    background-color: transparent;
    cursor: pointer;
    transition: .5s;

    &:hover {
        background-color: #fff;
        color: #000;
        transition: .5s;
    }
}
</style>