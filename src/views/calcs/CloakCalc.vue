<template>
<div class="content-wrap">
    <div class="container">
        <div class="content-wrap__inner">
            <main class="main">
                <cloak-card v-for="(item, index) in items" @selectGrade="selectGrade" :items="items" :resources="resources" :key="index" :id="index" :grade="grade" />
            </main>
            <aside class="sidebar">
                <h2 class="sidebar__title">
                    Ресурсы в наличии
                </h2>
                <sidebar-input v-for="(res, index) in resources" @remember="remember" :resource="res" :key="index" />
            </aside>
        </div>
    </div>
</div>
</template>

<script>
import CloakCard from '@/components/calcs/cloak/CloakCard.vue';
import SidebarInput from '@/components/UI/SidebarInput.vue';

export default {
    data() {
        return {
            resources: [
                {title: 'Облачная пряжа', value: '', price: {sandClock: 1, sunClock: 0}, href: 'calcs/cloak/cloud.png'},
                {title: 'Небесная пряжа', value: '', price: {sandClock: 10, sunClock: 0}, href: 'calcs/cloak/sky.png'},
                {title: 'Солнечная пряжа', value: '', price: {sandClock: 75, sunClock: 0}, href: 'calcs/cloak/sun.png'},
                {title: 'Лунная пряжа', value: '', price: {sandClock: 500, sunClock: 5}, href: 'calcs/cloak/moon.png'},
                {title: 'Звездная пряжа', value: '', price: {sandClock: 2500, sunClock: 20}, href: 'calcs/cloak/star.png'},
                {title: 'Песочные часы', value: '', price: {sandClock: 1, sunClock: 0}, href: 'calcs/cloak/sand.png'},
                {title: 'Солнечные часы', value: '', price: {sandClock: 0, sunClock: 1}, href: 'calcs/cloak/sunClock.png'},
                {title: 'Серебро', value: '', href: 'calcs/house/silver.png'},
            ],
            grade: -1,
            items: [
                {
                    title: 'Базовый',
                    reqResources: [
                        {title: 'Облачная пряжа', value: 100},
                        {title: 'Серебро', value: 5000000},
                    ],
                    isActive: false,
                },
                {
                    title: 'Первый грейд (ПЗ)',
                    reqResources: [
                        {title: 'Облачная пряжа', value: 500},
                        {title: 'Небесная пряжа', value: 150},
                        {title: 'Серебро', value: 10000000},
                    ],
                    isActive: false,
                },
                {
                    title: 'Второй грейд (ПА&ПЗ)',
                    reqResources: [
                        {title: 'Облачная пряжа', value: 1000},
                        {title: 'Небесная пряжа', value: 275},
                        {title: 'Солнечная пряжа', value: 50},
                        {title: 'Серебро', value: 20000000},
                    ],
                    isActive: false,
                },
                {
                    title: 'Третий грейд (Аспид/Пение)',
                    reqResources: [
                        {title: 'Облачная пряжа', value: 2000},
                        {title: 'Небесная пряжа', value: 450},
                        {title: 'Солнечная пряжа', value: 80},
                        {title: 'Лунная пряжа', value: 15},
                        {title: 'Серебро', value: 50000000},
                    ],
                    isActive: false,
                },
                {
                    title: 'Третий грейд (БД)',
                    reqResources: [
                        {title: 'Облачная пряжа', value: 4500},
                        {title: 'Небесная пряжа', value: 675},
                        {title: 'Солнечная пряжа', value: 150},
                        {title: 'Лунная пряжа', value: 25},
                        {title: 'Звездная пряжа', value: 6},
                        {title: 'Серебро', value: 80000000},
                    ],
                    isActive: false,
                },
            ],
        };
    },
    methods: {
        remember() {
            localStorage.setItem('cloakResources', JSON.stringify(this.resources));
        },
        selectGrade(event) {
            if(this.items[event].isActive) {
                this.items.forEach(el => {
                    el.isActive = false;
                })
                this.grade = -1;
            } else {
                this.items.forEach(el => {
                    el.isActive = false;
                })
                this.items[event].isActive = true;
                this.grade = event;
            }
        }
    },
    mounted() {
        if(localStorage.cloakResources) {
            this.resources = JSON.parse(localStorage.getItem('cloakResources'));
        }
    },
    components: {
        CloakCard,
        SidebarInput,
    }
}
</script>
<style lang="scss" scoped>
.content-wrap {
    flex: 1 1 auto;

    &__inner {
        display: flex;
        gap: 50px;

        @media (max-width: 830px) {
            flex-wrap: wrap;
        }
    }
}

.main {
    flex: 1 1 75%;
    padding: 40px 20px;
    color: #000;
}

.sidebar {
    padding: 10px 20px;
    border-left: 1px solid #000;

    &__title {
        color: #000;
        margin-bottom: 10px;
    }


    @media (max-width: 830px) {
        width: 100%;
    }
}
</style>