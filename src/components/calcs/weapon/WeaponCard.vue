<template>
    <div class="card">
        <div class="card__header">
            <h2 class="card__title">
                {{items[id].title}}
            </h2>
            <base-button class="card__btn" :class="{card__btn__active: items[id].isActive}" @click="selectGrade" v-if="id != items.length - 1">У меня этот грейд</base-button>
        </div>
        <div class="card__content" v-if="id > grade">
            <div class="card__col">
                <h3 class="card__col-title">Необходимые ресурсы</h3>
                <ul class="card__resList">
                    <li class="card__resList-item" v-for="(res, index) in items[id].reqResources" :key="index">
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
                    <li class="card__resList-item" v-for="(res, index) in items[id].reqResources" :key="index">
                        <div class="card__resList-item__icon">
                            <img :src="require(`@/assets/images/` + resources[resources.findIndex(item => item.title == res.title)].href)" :alt="res.title">
                        </div>
                        <div class="card__resList-item__info">
                            <h3 class="card__resList-item__title">{{res.title}}</h3> 
                            <p class="card__resList-item__value">{{res.value - resources[resources.findIndex(item => item.title == res.title)].value > 0 ? (res.value - resources[resources.findIndex(item => item.title == res.title)].value).toLocaleString() : 0}}</p>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="card__col" v-if="id - grade != 1">
                <h3 class="card__col-title">Осталось нафармить с вашего грейда</h3>
                <ul class="card__resList">
                    <li class="card__resList-item" v-for="(res, index) in items[id].reqResources" :key="index">
                        <div class="card__resList-item__icon">
                            <img :src="require(`@/assets/images/` + resources[resources.findIndex(item => item.title == res.title)].href)" :alt="res.title">
                        </div>
                        <div class="card__resList-item__info">
                            <h3 class="card__resList-item__title">{{res.title}}</h3> 
                            <p class="card__resList-item__value">
                                {{
                                    (totalResources[totalResources.findIndex(item => item.title == res.title)].value - resources[resources.findIndex(item => item.title == res.title)].value).toLocaleString()
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
                    {title: 'Кровавый камень', value: 0},
                    {title: 'Огненный камень', value: 0},
                    {title: 'Небесная яшма', value: 0},
                    {title: 'Темные кости Линсю', value: 0},
                    {title: 'Эссенция власти Линсю', value: 0},
                    {title: 'Дерево еретика Линсю', value: 0},
                    {title: 'Серебро', value: 0},
                ];
                for(this.counter = this.grade + 1; this.counter <= this.id; this.counter++) {
                    this.items[this.counter].reqResources.forEach(el => {
                        this.totalReqRes[this.totalReqRes.findIndex(item => item.title == el.title)].value += el.value;
                    })
                }
                return this.totalReqRes;
            }
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
    }

    &__content {
        display: flex;
        gap: 20px;
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