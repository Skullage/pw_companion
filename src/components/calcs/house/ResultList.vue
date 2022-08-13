<template>
    <div class="result">
        <h2 class="result__title" v-if="title != undefined">{{title}}</h2>
        <house-card v-for="(res, index) in resources" :key="index" :resource="res"/>
    </div>
</template>

<script>
    import HouseCard from '@/components/calcs/house/HouseCard.vue';
    export default {
        props: {
            title: String,
            resources: Object,
        },
        components: {
            HouseCard,
        }
    }
</script>

<style lang="scss" scoped>
.result {
    &__title {
        color: #000;
        margin-bottom: 10px;
    }

    &__text {
        margin-bottom: 10px;
    }
}
</style>