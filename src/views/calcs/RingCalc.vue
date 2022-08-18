<template>
<div class="content-wrap">
    <div class="container">
        <div class="content-wrap__inner">
            <main class="main">
                <ring-card v-for="(item, index) in items" @selectGrade="selectGrade" :items="items" :resources="resources" :key="index" :id="index" :grade="grade" />
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
import RingCard from '@/components/calcs/ring/RingCard.vue';
import SidebarInput from '@/components/UI/SidebarInput.vue';


export default {
    data() {
        return {
            resources: [
                {title: 'Медаль Авроры', value: '', href: 'calcs/ring/medal.png'},
                {title: 'Звездный кварц', value: '', price: 20, href: 'calcs/ring/quartz.png'},
                {title: 'Звездный изумруд', value: '', price: 150, href: 'calcs/ring/emerald.png'},
                {title: 'Звездный рубин', value: '', price: 1000, href: 'calcs/ring/ruby.png'},
                {title: 'Звездный топаз', value: '', price: 5000, href: 'calcs/ring/topaz.png'},
                {title: 'Серебро', value: '', href: 'calcs/house/silver.png'},
            ],
            grade: -1,
            items: [
                {
                    title: 'Базовый',
                    reqResources: [
                        {title: 'Медаль Авроры', value: 100},
                        {title: 'Серебро', value: 5000000},
                    ],
                    isActive: false,
                },
                {
                    title: 'Первый грейд (ПА)',
                    reqResources: [
                        {title: 'Звездный кварц', value: 25},
                        {title: 'Серебро', value: 10000000},
                    ],
                    isActive: false,
                },
                {
                    title: 'Второй грейд (ПА&ПЗ)',
                    reqResources: [
                        {title: 'Звездный кварц', value: 375},
                        {title: 'Звездный изумруд', value: 50},
                        {title: 'Серебро', value: 20000000},
                    ],
                    isActive: false,
                },
                {
                    title: 'Третий грейд (БД)',
                    reqResources: [
                        {title: 'Звездный кварц', value: 750},
                        {title: 'Звездный изумруд', value: 100},
                        {title: 'Звездный рубин', value: 15},
                        {title: 'Серебро', value: 50000000},
                    ],
                    isActive: false,
                },
                {
                    title: 'Третий грейд (БД)',
                    reqResources: [
                        {title: 'Звездный кварц', value: 1125},
                        {title: 'Звездный изумруд', value: 150},
                        {title: 'Звездный рубин', value: 25},
                        {title: 'Звездный топаз', value: 6},
                        {title: 'Серебро', value: 80000000},
                    ],
                    isActive: false,
                },
            ],
        };
    },
    methods: {
        remember() {
            localStorage.setItem('ringResources', JSON.stringify(this.resources));
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
        if(localStorage.ringResources) {
            this.resources = JSON.parse(localStorage.getItem('ringResources'));
        }
    },
    components: {
        RingCard,
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