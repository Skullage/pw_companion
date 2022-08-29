<template>
    <button class="btn btn-outline-light d-flex justify-content-center align-items-center">
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
    width: 25px;
    height: 25px;
    --bs-btn-line-height: 1.25rem; 
    --bs-btn-font-size: 1.25rem;
    --bs-btn-hover-color: #fff;
    --bs-btn-hover-bg: transparent;
    --bs-btn-hover-border-color: #fff;
    --bs-btn-focus-shadow-rgb: none;
    transition: .5s;

    &:hover {
        background-color: #fff;
        color: #000;
        transition: .5s;
    }
}
</style>