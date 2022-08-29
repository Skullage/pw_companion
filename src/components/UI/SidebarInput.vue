<template>
    <label v-if="!$store.state.blacklist.includes(resource.title)" class="input-block bg-white d-flex align-items-center border border-2 mb-2 rounded pe-2">
        <div class="input-block__icon me-2 flex-shrink-0">
            <img :src="getImg" :alt="resource.title" class="img-fluid rounded">
        </div>
        <div class="input-block__info">
            <h3 class="input-block__title text-secondary text-uppercase">{{resource.title}}</h3>
            <pattern-input class="input-block__input border-0 w-100 p-0"
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
    height: 4.25rem;

    &:focus-within {
        border: 2px solid red!important;
    }

    &__icon {
        width: 4rem;
    }

    &__title {
        font-size: 14px;
    }

    &__input {
        outline: none;
    }
}
</style>