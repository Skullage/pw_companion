<template>
    <div class="error w-100 position-absolute top-0 right-0 d-flex align-items-center justify-content-center text-dark bg-danger px-1 py-2 gap-1">
        <div class="flex-fill">
            <p class="mb-1 text-md-center" v-for="(text, index) in $store.state.error.errorText" :key="index" :value="text">
                <span class="text-uppercase fw-bold">Ошибка!</span> {{text}}
            </p>
        </div>
        <button type="button" @click="close" class="btn-close" aria-label="Close"></button>
    </div>
</template>

<script>
    export default {
        name: 'ErrorMessage',
        methods: {
            close() {
                this.$store.commit('error/clearErrorText');
            }
        }
    }
</script>

<style lang="scss" scoped>
.error {
    min-height: 50px;
    z-index: 99999;
}
</style>