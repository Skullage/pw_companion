<template>
<div class="content-wrap">
    <div class="container">
        <div class="content-wrap__inner">
            <main class="main">
                <weapon-card v-for="(item, index) in items" @selectGrade="selectGrade" :items="items" :resources="resources" :key="index" :id="index" :grade="grade" />
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
import WeaponCard from '@/components/calcs/weapon/WeaponCard.vue';
import SidebarInput from '@/components/UI/SidebarInput.vue';

export default {
    data() {
        return {
            resources: [
                {title: 'Кровавый камень', value: '', href: 'calcs/weapon/bloodstone.png'},
                {title: 'Огненный камень', value: '', href: 'calcs/weapon/firestone.png'},
                {title: 'Небесная яшма', value: '', href: 'calcs/weapon/jasper.png'},
                {title: 'Темные кости Линсю', value: '', href: 'calcs/weapon/bone.png'},
                {title: 'Эссенция власти Линсю', value: '', href: 'calcs/weapon/essence.png'},
                {title: 'Дерево еретика Линсю', value: '', href: 'calcs/weapon/wood.png'},
                {title: 'Серебро', value: '', href: 'calcs/house/silver.png'},
            ],
            grade: 0,
            items: [
                {
                    id: 0,
                    title: 'Базовый',
                    isActive: true,
                },
                {
                    id: 1,
                    title: 'Первый грейд (30 па)',
                    reqResources: [
                        {title: 'Кровавый камень', value: 400},
                        {title: 'Огненный камень', value: 240},
                        {title: 'Небесная яшма', value: 120},
                        {title: 'Серебро', value: 20000000},
                    ],
                    isActive: false,
                },
                {
                    id: 2,
                    title: 'Второй грейд (40 па)',
                    reqResources: [
                        {title: 'Кровавый камень', value: 1600},
                        {title: 'Огненный камень', value: 960},
                        {title: 'Небесная яшма', value: 200},
                        {title: 'Дерево еретика Линсю', value: 70},
                        {title: 'Серебро', value: 50000000},
                    ],
                    isActive: false,
                },
                {
                    id: 3,
                    title: 'Третий грейд (70 па)',
                    reqResources: [
                        {title: 'Кровавый камень', value: 1800},
                        {title: 'Огненный камень', value: 1080},
                        {title: 'Небесная яшма', value: 333},
                        {title: 'Дерево еретика Линсю', value: 108},
                        {title: 'Темные кости Линсю', value: 25},
                        {title: 'Серебро', value: 90000000},
                    ],
                    isActive: false,
                },
                {
                    id: 4,
                    title: 'Четвертый грейд (80 па)',
                    reqResources: [
                        {title: 'Кровавый камень', value: 2200},
                        {title: 'Огненный камень', value: 1320},
                        {title: 'Небесная яшма', value: 392},
                        {title: 'Дерево еретика Линсю', value: 122},
                        {title: 'Темные кости Линсю', value: 36},
                        {title: 'Эссенция власти Линсю', value: 13},
                        {title: 'Серебро', value: 160000000},
                    ],
                    isActive: false,
                },
            ]
        };
    },
    methods: {
        remember() {
            localStorage.setItem('weaponResources', JSON.stringify(this.resources));
        },
        selectGrade(event) {
            this.grade = event;
            this.items.forEach(el => {
                el.isActive = false;
            })
            this.items[event].isActive = true;
        }
    },
    mounted() {
        if(localStorage.weaponResources) {
            this.resources = JSON.parse(localStorage.getItem('weaponResources'));
        }
    },
    components: {
        WeaponCard,
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