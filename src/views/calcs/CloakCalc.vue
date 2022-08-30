<template>
<div class="container">
    <div class="row">
        <main class="main">
            <offcanvas-button @click.prevent="showOffcanvasMenu(true)" />
            <cloak-card v-for="(item, index) in items" @selectGrade="selectGrade" :items="items" :resources="resources" :key="index" :id="index" :grade="grade" />
        </main>
        <aside class="border-start offcanvas offcanvas-end" :class="showMenu ? 'show' : ''" :style="{ visibility: showMenu ? 'visible' : 'hidden' }" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
        <div class="offcanvas-header">
            <h4 class="sidebar__title mb-0" id="offcanvasScrollingLabel">
                Плащ с ИБ
            </h4>
            <button type="button" class="btn-close" @click="isShowSidebar = false" data-bs-dismiss="offcanvas" aria-label="Close" @click.prevent="showOffcanvasMenu(false)"></button>
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
import CloakCard from '@/components/calcs/cloak/CloakCard.vue';
import SidebarInput from '@/components/UI/SidebarInput.vue';
import OffcanvasButton from '@/components/UI/OffcanvasButton.vue';

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
            showMenu: true,
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
        },
        showOffcanvasMenu(bool){
            this.showMenu = bool;
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
        OffcanvasButton,
    }
}
</script>