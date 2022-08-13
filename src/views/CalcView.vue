<template>
<main class="main">
    <div class="container">
        <div class="grid">
            <grid-item v-for="(item, index) in items" :key="index" :item="item" />
        </div>
    </div>
</main>
</template>

<script>
import GridItem from '@/components/GridItem.vue';
    export default {
        components: {
            GridItem,

        },
        data() {
                return {
                items: [
                    {title: "Калькулятор дома", desc: "lorem ipsum", backgroundImage: "house/GridItemBg.jpg", href: 'HouseCalc'},
                    {title: "Калькулятор домопух", desc: "lorem ipsum", backgroundImage: "weapon/GridItemBg.png", href: 'WeaponCalc'},
                    {title: "Калькулятор сумеречной брони", desc: "lorem ipsum", backgroundImage: "armor/GridItemBg.png", href: 'ArmorCalc'},
                    {title: "Калькулятор накидок с императорской битвы", desc: "lorem ipsum", backgroundImage: "cloak/GridItemBg.png", href: 'CloakCalc'},
                    {title: "Калькулятор колец с арены Авроры", desc: "lorem ipsum", backgroundImage: "cloak/GridItemBg.png", href: 'RingCalc'},
                ],
            };
        },
    }
</script>

<style lang="scss" scoped>
.grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
}
</style>