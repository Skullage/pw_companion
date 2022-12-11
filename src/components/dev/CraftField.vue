<template>
    <div class="input-group">
        <div class="w-50">
            <v-select label="title" class="h-100 select" v-model="modelValue.resource" :reduce="item => item.title" :options="$store.state.resources">
                <template v-slot:option="option">
                    <img :src="require('@/assets/images/calcs/weapon/' + option.icon)" />
                        {{ option.title }}
                </template>
                <template #no-options="{ search }">
                    Ресурс {{search}} не найден!
                </template>
            </v-select>
        </div>
        <input
        class="form-control w-25"
        type="text"
        placeholder="Значение"
        v-model.number="modelValue.value"
        />
        <button class="btn btn-outline-secondary" @click="remove">Удалить</button>
    </div>
</template>

<script>
    import vSelect from 'vue-select';
    export default {
        props: {
            id: Number,
            modelValue: Object,
        },
        methods: {
            remove() {
                this.$emit('remove', this.id);
            }
        },
        components: {
            vSelect,
        }
    }
</script>
<style lang="scss" scoped>
img {
    width: 32px;
    height: 32px;
}
.select {
    --vs-border-radius: 4px 0px 0px 4px;
}
</style>