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
                <label class="sidebar__input-block" v-for="(res, index) in resources" :key="index">
                    <div class="sidebar__input-block-icon">
                        <img :src="require(`@/assets/images/` + resources[resources.findIndex(function getId(el) { return el.title == res.title})].href)" :alt="res.title">
                    </div>
                    <div class="sidebar__input-block-info">
                        <h3 class="sidebar__input-block-title">{{res.title}}</h3>
                        <input class="sidebar__input" type="number" @input="remember" v-model="resources[resources.findIndex(function getId(el) { return el.title == res.title})].value" placeholder="0">
                    </div>
                </label>
            </aside>
        </div>
    </div>
</div>
</template>

<script>
import RingCard from '@/components/calcs/ring/RingCard.vue';

export default {
    data() {
        return {
            resources: localStorage.getItem('ringResources') != undefined ? 
            JSON.parse(localStorage.getItem('ringResources'))
            :
            [
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
        error(event) {
            this.$emit('error', event);
        },
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
    components: {
        RingCard,
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

    &__input-block {
        width: 100%;
        margin-bottom: 10px;
        display: flex;
        gap: 10px;
        background-color: #fff;
        align-items: center;
        height: 50px;
        border: 1px solid black;
        border-radius: 5px;

        &:focus-within {
            border: 1px solid red!important;
        }

        &-icon {
            width: 50px;
            height: 100%;
            flex-shrink: 0;
            display: block;

            img {
                width: 50px;
                height: 100%;
            }
        }

        &-info {
            text-align: left;
        }

        &-title {
            font-size: 14px;
            font-weight: 400;
            color: #000;
            margin-left: 5px;
        }
    }

    &__title {
        color: #000;
        margin-bottom: 10px;
    }

    &__input {
        padding: 5px;
        margin-right: 10px;
        appearance: none;
        -moz-appearance: textfield;
        outline: none;

        &:hover, &:focus {
            appearance: none;
            -moz-appearance: number-input;
        }
        
        

        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
            -webkit-appearance: none;
        }
    }

    @media (max-width: 830px) {
        width: 100%;
    }
}

.btns-wrapper {
    display: flex;
    gap: 10px;
    justify-content: center;
    padding: 10px;
    margin-bottom: 10px;
}

.btn {
    width: 32px;
    height: 32px;
    border: 1px solid transparent;

    img {
        height: 100%;
        width: 100%;
        object-fit: cover;
    }

    &_active {
        border: 1px solid red;
    }
}
</style>