<template>
    <div class="error">
        <div class="error__group">
            <p class="error__text" v-for="(text, index) in texts" :key="index" :value="text">
                <span class="error__title">ОШИБКА!</span> {{text}}
            </p>
        </div>
        <button @click="close" class="error__btn">&#10006;</button>
    </div>
</template>

<script>
    export default {
        name: 'ErrorMessage',
        props: {
            texts: Array,
        },
        methods: {
            close() {
                this.$emit('close');
            }
        }
    }
</script>

<style lang="scss" scoped>
.error {
    width: 100%;
    position: absolute;
    top: 0;
    right: 0;
    color: #000;
    background-color: #ff0000;
    min-height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 20px;
    z-index: 10;

    &__group {
        flex: 1;
    }

    &__text {
        margin-bottom: 5px;
    }

    &__title {
        text-transform: uppercase;
        font-weight: 700;
    }

    &__btn {
        background-color: transparent;
        border: none;
        font-size: 20px;
        cursor: pointer;
    }
}
</style>