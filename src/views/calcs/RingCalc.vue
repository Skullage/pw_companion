<template>
<div class="container">
    <div class="row">
        <main class="main">
            <offcanvas-button @click.prevent="$store.commit('toggleMenu')" />
            <ring-card v-for="(item, index) in items" @selectGrade="selectGrade" :items="items" :resources="resources" :key="index" :id="index" :grade="grade" />
        </main>
        <aside class="border-start offcanvas offcanvas-end" :class="$store.state.showMenu ? 'show' : ''" :style="{ visibility: $store.state.showMenu ? 'visible' : 'hidden' }" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
            <div class="offcanvas-header">
                <h4 class="sidebar__title mb-0" id="offcanvasScrollingLabel">
                    Кольцо с арены
                </h4>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" @click.prevent="$store.commit('toggleMenu')"></button>
            </div>
            <div class="offcanvas-body">
                <h5 class="sidebar__title text-center">
                    Ресурсы в наличии
                </h5>
                <sidebar-input v-for="(res, index) in resources" @remember="remember" :resource="res" :key="index" />
            </div>
        </aside>
    </div>
</div>
</template>

<script>
import RingCard from '@/components/calcs/ring/RingCard.vue';
import SidebarInput from '@/components/UI/SidebarInput.vue';
import OffcanvasButton from '@/components/UI/OffcanvasButton.vue';


export default {
    data() {
        return {
            resources: [
                {title: 'Медаль Авроры', value: '', price: 1, href: 'calcs/ring/medal.png'},
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
        },
    },
    mounted() {
        if(localStorage.ringResources) {
            this.resources = JSON.parse(localStorage.getItem('ringResources'));
        }
    },
    components: {
        RingCard,
        SidebarInput,
        OffcanvasButton,
    }
}
</script>