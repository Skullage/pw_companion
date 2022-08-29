<template>
    <div class="card p-2 border mb-1 rounded">
        <div class="card__content d-flex align-items-center gap-2">
            <div class="card__img" v-if="resource.href != undefined">
                <img class="img-fluid w-100" :src="require(`@/assets/images/` + resource.href)" :alt="resource.title">
            </div>
            <div class="card__info">
                <h3 class="card__title mb-1 text-black fw-normal text-muted fs-6 text-uppercase">{{resource.title}}</h3>
                <p class="card__value text-black mb-0">{{resource.value.toLocaleString()}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            resource: Object,
        },
    }
</script>

<style lang="scss" scoped>
.card {
    &__img {
        width: 50px;
        height: auto;
    }
    &__value {
        font-size: 14px;
    }
}
</style>