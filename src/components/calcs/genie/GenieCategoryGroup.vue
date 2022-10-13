<template>
    <div class="d-flex mb-2">
        <h6 class="col-3 mb-0 text-center">Уровень {{category}}</h6>
        <div class="col-9 d-flex gap-2 justify-content-center">
            <skill-cell v-for="(item, index) in skills" :key="index" :itemRowId="index" :skill="item" />
        </div>
    </div>
</template>

<script>
import SkillCell from '@/components/calcs/genie/SkillCell.vue';
    export default {
        components: {
            SkillCell,
        },
        props: {
            category: Number,
            skills: Array,
        },
        data() {
            return {
                data: [],
            }
        },
    }
</script>