<template>
    <button class="grade__btn btn btn-outline-dark">
        У меня этот грейд
    </button>
</template>

<script>
    export default {
        name: "GradeButton",
    }
</script>

<style lang="scss" scoped>
.grade__btn {
    --bs-btn-padding-x: .5rem; 
    --bs-btn-line-height: .75rem; 
    --bs-btn-font-size: .75rem;
    --bs-btn-box-shadow: none;
    --bs-btn-focus-box-shadow: none;
    background-color: transparent;
    color: #000;

    &_active {
        background-color: #000!important;
        color: #fff!important;
    }
}
</style>