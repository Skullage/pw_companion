<template>
    <div class="d-flex align-items-center justify-content-center mb-2">
        <h6 class="col-4 mb-0 text-center">Уровень {{category}}</h6>
        <div class="col-8 d-flex gap-2 justify-content-center">
            <skill-cell v-for="(item, index) in data" :key="index" :skill="item" />
        </div>
    </div>
</template>

<script>
import axios from "axios";
import SkillCell from '@/components/calcs/genie/SkillCell.vue';
    export default {
        components: {
            SkillCell,
        },
        props: {
            category: Number,
        },
        data() {
            return {
                data: [],
            }
        },
        methods: {
            async getSkillbyCategory() {
                try {
                    const response = await axios.get(
                        `http://localhost:5000/genie_skills/cat/${this.category}`
                    );
                    this.data = response.data;
                } catch (err) {
                    console.log(err);
                }
            },
        },
        mounted() {
            this.getSkillbyCategory();
        },
    }
</script>