<template>
    <div class="input-group">
        <select class="form-select w-50" v-model="modelValue.resource">
            <option v-for="item in $store.state.resources" :key="item.id" :value="item.title"><img :src="require('@/assets/images/calcs/weapon/' + item.icon)" class="img-fluid" alt="">{{item.title}}</option>
        </select>
        <input
        class="form-control w-25"
        type="text"
        placeholder="Значение"
        v-model="modelValue.value"
        />
        <button class="btn btn-outline-secondary" @click="removeFromArray">Удалить</button>
    </div>
</template>

<script>
    export default {
        props: {
            id: Number,
            modelValue: Object,
        },
        methods: {
            removeFromArray() {
                this.$emit('remove', this.id);
            }
        }
    }
</script>
<style>
img {
    width: 32px;
    height: 32px;
}
</style>