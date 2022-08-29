<template>
    <div class="mb-3">
      <label class="p-2 mb-2 text-center fw-bold text-white" v-if="label">{{label}}</label>
      <div class="d-flex gap-2 justify-content-center align-items-center">
        <base-button @click="decreaseValue">-</base-button>
        <span class="value text-white">{{value}}</span>
        <base-button @click="increaseValue">+</base-button>
      </div>
    </div>
</template>

<script>
import BaseButton from '@/components/UI/BaseButton.vue';
    export default {
        components: { BaseButton },
        name: 'LevelChooser',
        props: {
            label: {
                type: String,
            },
            min: {
                type: Number,
                default: 0,
            },
            max: {
                type: Number,
                default: 10,
            },
            value: {
                type: Number,
                default: 0,
            },
            name:  {
                type: String,
                require: true,
            },
        },
        methods: {
            decreaseValue(event) {
                event.preventDefault()
                if(this.value > this.min) {
                    this.$emit('decreaseValue');
                }
            },
            increaseValue(event) {
                event.preventDefault()
                if(this.value < this.max) {
                    this.$emit('increaseValue');
                }
            },
        },
    }
</script>

<style lang="scss" scoped>
.value {
    font-size: 20px;
}
</style>