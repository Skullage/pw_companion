<template>
    <div class="card">
        <div class="card__content">
            <div class="card__img" v-if="resource.href != undefined">
                <img :src="require(`@/assets/images/` + resource.href)" :alt="resource.title">
            </div>
            <div class="card__info">
                <h3 class="card__title">{{resource.title}}</h3>
                <p class="card__value">{{resource.value.toLocaleString()}}</p>
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
    padding: 10px;
    border: 1px solid #000;
    margin-bottom: 5px;
    border-radius: 5px;

    &__content {
        display: flex;
        align-items: center;
        gap: 20px;
    }

    &__img {
        width: 32px;
        height: 32px;

        img {
            width: 100%;
            height: auto;
        }
    }

    &__title {
        font-size: 16px;
        font-weight: 400;
        margin-bottom: 5px;
    }
    &__value {
        font-size: 14px;
        font-weight: 400;
    }

}
</style>