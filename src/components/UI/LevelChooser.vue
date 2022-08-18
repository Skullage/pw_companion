<template>
    <div class="form__input">
      <label class="form__input-label" v-if="label">{{label}}</label>
      <div class="form__input-group">
        <base-button @click="decreaseValue" class="form__input-btn">-</base-button>
        <span class="form__input-text">{{value}}</span>
        <base-button @click="increaseValue" class="form__input-btn">+</base-button>
        
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

.form__input {
    margin-bottom: 20px;

    &-group {
        display: flex;
        justify-content: center;
        gap: 5px;
    }

    &-label {
        display: block;
        font-weight: 700;
        padding: 5px;
        border-radius: 5px;
        margin-bottom: 10px;
        color: #fff;
        text-align: center;
    }

    &-text {
        width: 35px;
        height: 25px;
        border: 0;
        background-color: transparent;
        text-align: center;
        color: #fff;
        font-size: 20px;
        cursor: default;
    }

    &-btn {
        width: 25px;
        height: 25px;
    }
}
</style>