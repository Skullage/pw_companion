<template>
    <div class="card">
        <div class="card__header">
            <h2 class="card__title">
                {{items[type][id].title}}
            </h2>
            <base-button class="card__btn" :class="{card__btn__active: items[type][id].isActive}" @click="selectGrade" v-if="id != items[type].length - 1">У меня этот грейд</base-button>
        </div>
        <div class="card__content" v-if="id > grade">
            <div class="card__col">
                <h3 class="card__col-title">Необходимые ресурсы</h3>
                <ul class="card__resList" v-if="id == 1 && items[type][0].isActive">
                    <li class="card__resList-item" v-for="(res, index) in items[type][id].altReqResources" :key="index">
                        <div class="card__resList-item__icon">
                            <img :src="require(`@/assets/images/` + resources[resources.findIndex(item => item.title == res.title)].href)" :alt="res.title">
                        </div>
                        <div class="card__resList-item__info">
                            <h3 class="card__resList-item__title">{{res.title}}</h3>
                            <p class="card__resList-item__value">{{res.value.toLocaleString()}}</p>
                        </div>
                    </li>
                </ul>
                <ul class="card__resList" v-else>
                    <li class="card__resList-item" v-for="(res, index) in items[type][id].reqResources" :key="index">
                        <div class="card__resList-item__icon">
                            <img :src="require(`@/assets/images/` + resources[resources.findIndex(item => item.title == res.title)].href)" :alt="res.title">
                        </div>
                        <div class="card__resList-item__info">
                            <h3 class="card__resList-item__title">{{res.title}}</h3>
                            <p class="card__resList-item__value">{{res.value.toLocaleString()}}</p>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="card__col" v-if="id - grade == 1">
                <h3 class="card__col-title">Осталось нафармить</h3>
                <ul class="card__resList">
                    <li class="card__resList-item" v-for="(res, index) in items[type][id].reqResources" :key="index">
                        <div class="card__resList-item__icon">
                            <img :src="require(`@/assets/images/` + resources[resources.findIndex(item => item.title == res.title)].href)" :alt="res.title">
                        </div>
                        <div class="card__resList-item__info">
                            <h3 class="card__resList-item__title">{{res.title}}</h3> 
                            <p class="card__resList-item__value">
                                {{
                                    leftResources[leftResources.findIndex(item => item.title == res.title)].value.toLocaleString()
                                }}
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="card__col" v-if="id - grade != 1">
                <h3 class="card__col-title">Осталось нафармить с вашего грейда</h3>
                <ul class="card__resList">
                    <li class="card__resList-item" v-for="(res, index) in items[type][id].reqResources" :key="index">
                        <div class="card__resList-item__icon">
                            <img :src="require(`@/assets/images/` + resources[resources.findIndex(item => item.title == res.title)].href)" :alt="res.title">
                        </div>
                        <div class="card__resList-item__info">
                            <h3 class="card__resList-item__title">{{res.title}}</h3> 
                            <p class="card__resList-item__value">
                                {{
                                    totalResources[totalResources.findIndex(item => item.title == res.title)].value.toLocaleString()
                                }}
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import BaseButton from '@/components/UI/BaseButton.vue';

    export default {
        props: {
            id: Number,
            items: Object,
            resources: Object,
            grade: Number,
            type: Number,
        },
        components: {
            BaseButton,
        },
        methods: {
            selectGrade() {
                this.$emit('selectGrade', this.id);
            },
        },
        computed: {
            totalResources: function() {
                this.totalReqRes = [
                    {title: 'Печатка сумерек', value: 0},
                    {title: 'Зола мира грез', value: 0},
                    {title: 'Лезвие демона', value: 0},
                    {title: 'Коварство министра', value: 0},
                    {title: 'Королевская слава', value: 0},
                    {title: 'Поцелуй владычицы', value: 0},
                    {title: 'Смерть древнего демона', value: 0},
                    {title: 'Хрономатериал', value: 0},
                    {title: 'Фрагмент Колеса Судьбы', value: 0},
                    {title: 'Плащ "Королевские крылья"', value: 0},
                    {title: 'Верное сердце Элмсли', value: 0},
                    {title: 'Ложь Владычицы Грез', value: 0},
                    {title: 'Маска Цзи Чжунь', value: 0},
                    {title: 'Горе династии', value: 0},
                    {title: 'Боевой дух Элмсли', value: 0},
                    {title: 'Королевский лук', value: 0},
                    {title: 'Королевский посох', value: 0},
                    {title: 'Свет Хуанлинь', value: 0},
                    {title: 'Фрагмент опала', value: 0},
                    {title: 'Золото', value: 0},
                ];
                for(this.counter = this.grade + 1; this.counter <= this.id; this.counter++) {
                    this.counter == 1 && this.items[this.type][0].isActive ?
                    this.items[this.type][this.counter].altReqResources.forEach(el => {
                            this.totalReqRes[this.totalReqRes.findIndex(item => item.title == el.title)].value += el.value;
                    })
                    :
                    this.items[this.type][this.counter].reqResources.forEach(el => {
                        this.totalReqRes[this.totalReqRes.findIndex(item => item.title == el.title)].value += el.value;
                    })
                }
                this.totalReqRes.forEach(el => {
                    el.value -= this.resources[this.resources.findIndex(item => item.title == el.title)].value;
                    if (el.value < 0) {
                        el.value = 0;
                    }
                })
                return this.totalReqRes;
            },
            leftResources: function() {
                this.leftReqRes = [
                    {title: 'Печатка сумерек', value: 0},
                    {title: 'Зола мира грез', value: 0},
                    {title: 'Лезвие демона', value: 0},
                    {title: 'Коварство министра', value: 0},
                    {title: 'Королевская слава', value: 0},
                    {title: 'Поцелуй владычицы', value: 0},
                    {title: 'Смерть древнего демона', value: 0},
                    {title: 'Хрономатериал', value: 0},
                    {title: 'Фрагмент Колеса Судьбы', value: 0},
                    {title: 'Плащ "Королевские крылья"', value: 0},
                    {title: 'Верное сердце Элмсли', value: 0},
                    {title: 'Ложь Владычицы Грез', value: 0},
                    {title: 'Маска Цзи Чжунь', value: 0},
                    {title: 'Горе династии', value: 0},
                    {title: 'Боевой дух Элмсли', value: 0},
                    {title: 'Королевский лук', value: 0},
                    {title: 'Королевский посох', value: 0},
                    {title: 'Свет Хуанлинь', value: 0},
                    {title: 'Фрагмент опала', value: 0},
                    {title: 'Золото', value: 0},
                ];
                if(this.items[this.type][0].isActive && this.id == 1) {
                    this.items[this.type][this.id].altReqResources.forEach(el => {
                        this.leftReqRes[this.leftReqRes.findIndex(item => item.title == el.title)].value = el.value - this.resources[this.resources.findIndex(item => item.title == el.title)].value;
                    })
                } else {
                    this.items[this.type][this.id].reqResources.forEach(el => {
                        this.leftReqRes[this.leftReqRes.findIndex(item => item.title == el.title)].value = el.value - this.resources[this.resources.findIndex(item => item.title == el.title)].value;
                    })
                }
                this.leftReqRes.forEach(el => {
                    if (el.value < 0) {
                        el.value = 0;
                    }
                })
                return this.leftReqRes;
            },
        },
        watch: {

        },
    }
</script>

<style lang="scss" scoped>
.card {
    padding: 20px 10px;
    border-top: 1px solid #000;
    width: 100%;

    &__header {
        display: flex;
        gap: 5px;
        margin-bottom: 20px;
    }

    &__btn {
        color: #000;
        font-size: 12px;
        border: 1px solid #000;
        border-radius: 5px;
        padding: 5px;

        &__active {
            background-color: #000!important;
            color: #fff!important;
        }
    }

    &__col-title {
        margin-bottom: 10px;
        height: 40px;
    }

    &__content {
        display: flex;
        gap: 20px;
        align-items:flex-start;
    }

    &__resList {
        list-style: none;

        &-item {
            border: 1px solid #000;
            padding: 10px;
            margin-bottom: 5px;
            border-radius: 5px;
            display: flex;
            gap: 10px;
            align-items: center;

            &__icon {
                width: 32px;
                height: 32px;

                img {
                    width: 100%;
                    height: 100%;
                }
            }

            &__info {
                text-align: left;
            }
            &__title {
                font-size: 16px;
                font-weight: 400;
            }
            &__value {
                font-size: 14px;
                font-weight: 400;
            }
        }
    }
}
</style>