<template>
    <div class="card mb-1 p-3">
        <div class="card__header d-flex mb-2 gap-2 align-items-center">
            <h2 class="card__title">
                {{items[id].title}}
            </h2>
            <grade-button :class="{grade__btn_active: items[id].isActive}" @click="selectGrade" v-if="id != items.length - 1" />
        </div>
        <div class="card__content row align-items-end" v-if="id > grade">
            <card-col :resources="resources" :object="{'blockName': 'Необходимые ресурсы', 'list': items[id].reqResources, 'value': items[id].reqResources}" />
            <card-col v-if="id - grade == 1" :resources="resources" :object="{'blockName': 'Осталось нафармить', 'list': leftResources, 'value': leftResources}" />
            <card-col v-if="id - grade != 1" :resources="resources" :object="{'blockName': 'Осталось нафармить с вашего грейда', 'list': totalResources, 'value': totalResources}" />
        </div>
    </div>
</template>

<script>
import CardCol from '@/components/CardCol.vue';
import GradeButton from '@/components/UI/GradeButton.vue';

    export default {
        props: {
            id: Number,
            items: Object,
            resources: Object,
            grade: Number,
        },
        components: {
            GradeButton,
            CardCol
        },
        methods: {
            selectGrade() {
                this.$emit('selectGrade', this.id);
            },
        },
        computed: {
            totalResources() {
                this.totalReqRes = [
                    {title: 'Медаль Авроры', value: 0},
                    {title: 'Звездный кварц', value: 0},
                    {title: 'Звездный изумруд', value: 0},
                    {title: 'Звездный рубин', value: 0},
                    {title: 'Звездный топаз', value: 0},
                ];
                this.money = [
                    {title: 'Медаль Авроры', value: 0},
                ]
                for(this.counter = this.grade + 1; this.counter <= this.id; this.counter++) {
                    this.items[this.counter].reqResources.forEach(el => {
                        if(el.title != 'Серебро') {
                            this.totalReqRes.find(item => item.title == el.title).value += el.value;
                        }
                    })
                }
                this.totalReqRes.forEach(el => {
                    el.value = el.value - this.resources.find(item => item.title == el.title).value > 0 ? el.value - this.resources.find(item => item.title == el.title).value : 0;
                    if(this.resources.find(item => item.title == el.title).price != undefined) {
                        this.money[0].value += el.value * this.resources.find(item => item.title == el.title).price;
                    }
                })
                if(this.grade != -1) {
                    this.money[0].value -= this.resources.find(item => item.title == 'Медаль Авроры').value;

                    if(this.money[0].value < 0) {
                        this.money[0].value = 0;
                    }
                }
                return this.money;
            },
            leftResources() {
                this.leftReqRes = [
                    {title: 'Медаль Авроры', value: 0},
                    {title: 'Звездный кварц', value: 0},
                    {title: 'Звездный изумруд', value: 0},
                    {title: 'Звездный рубин', value: 0},
                    {title: 'Звездный топаз', value: 0},
                ];
                this.money = [
                    {title: 'Медаль Авроры', value: 0},
                ]
                this.items[this.id].reqResources.forEach(el => {
                    if(el.title != 'Серебро') {
                        this.leftReqRes.find(item => item.title == el.title).value = el.value - this.resources.find(item => item.title == el.title).value > 0 ? el.value - this.resources.find(item => item.title == el.title).value : 0;
                    }
                })
                this.leftReqRes.forEach(el => {
                    if(this.resources.find(item => item.title == el.title).price != undefined) {
                        this.money[0].value += el.value * this.resources.find(item => item.title == el.title).price;
                    }
                })
                if(this.grade != -1) {
                    this.money[0].value -= this.resources.find(item => item.title == 'Медаль Авроры').value;

                    if(this.money[0].value < 0) {
                        this.money[0].value = 0;
                    }
                }

                return this.money;
            }
        },
    }
</script>