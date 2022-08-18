<template>
    <label class="input-block">
        <div class="input-block__icon">
            <img :src="getImg" :alt="resource.title">
        </div>
        <div class="input-block__info">
            <h3 class="input-block__title">{{resource.title}}</h3>
            <pattern-input class="input-block__input"
               :regExp="/^[0\D]*|\D*/g"
               :replacement="''"
               v-model.number="resource.value"
               @update:modelValue="remember"
               placeholder="0"></pattern-input>
        </div>
    </label>
</template>

<script>
import PatternInput from '@/components/UI/PatternInput.vue';
    export default {
        props: {
            resource: Object,
        },
        computed: {
            getImg() {
                return require(`@/assets/images/${this.resource.href}`);
            }
        },
        methods: {
            remember() {
                this.$emit('remember');
            }
        },
        components: {
            PatternInput,
        }
    }
</script>

<style lang="scss" scoped>
.input-block {
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

    &__icon {
        width: 50px;
        height: 100%;
        flex-shrink: 0;
        display: block;

        img {
            width: 50px;
            height: 100%;
        }
    }

    &__title {
        font-size: 14px;
        font-weight: 400;
        color: #000;
        margin-left: 5px;
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
}
</style>