<template>
    <house-card v-for="(res, index) in resources" :key="index" :resource="res"/>
</template>

<script>
    import HouseCard from '@/components/calcs/house/HouseCard.vue';
    export default {
        props: {
            resources: Object,
        },
        components: {
            HouseCard,
        }
    }
</script>