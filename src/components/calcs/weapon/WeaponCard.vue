<template>
    <div class="card mb-1 p-3">
        <div class="card__header d-flex mb-2 gap-2 align-items-center">
            <h2 class="card__title">
                {{items[id].title}}
            </h2>
            <grade-button :class="{grade__btn_active: items[id].isActive}" @click="selectGrade" v-if="id != items.length - 1" />
        </div>
        <div class="card__content row align-items-start" v-if="id > grade">
            <card-col :resources="resources" :object="{'blockName': 'Необходимые ресурсы', 'list': items[id].reqResources, 'value': items[id].reqResources}" />
            <card-col v-if="id - grade == 1" :resources="resources" :object="{'blockName': 'Осталось нафармить', 'list': totalResources, 'value': totalResources}" />
            <card-col v-if="id - grade != 1" :resources="resources" :object="{'blockName': 'Осталось нафармить', 'list': totalResources, 'value': totalResources}" />
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
            CardCol,
            GradeButton,
        },
        methods: {
            selectGrade() {
                this.$emit('selectGrade', this.id);
            },
        },
        computed: {
            totalResources() {
                this.totalReqRes = [];
                for(this.counter = this.grade + 1; this.counter <= this.id; this.counter++) {
                    this.items[this.counter].reqResources.forEach(el => {
                        if(!this.$store.state.blacklist.includes(el.title)) {
                            if(this.totalReqRes.find(item => item.title == el.title) == undefined) {
                                this.totalReqRes.push({title: el.title, value: el.value});
                            } else {
                                this.totalReqRes.find(item => item.title == el.title).value += el.value;
                            }
                        }
                    })
                }
                this.totalReqRes.forEach(el => {
                    el.value -= this.resources.find(item => item.title == el.title).value;
                    if (el.value < 0) {
                        el.value = 0;
                    }
                })
                return this.totalReqRes;
            },
        },
    }
</script>