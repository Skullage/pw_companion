<template>
    <div class="border p-3 mb-3 rounded">
        <h4 class="mb-2">Вариант {{id}}</h4>
        <craft-field class="mb-2" v-for="(item, index) in modelValue" :key="index" v-model="modelValue[index]" :id="index" @remove="$emit('removeItem', {'cardId': id, 'itemId': $event})" />
        <button class="btn btn-outline-secondary me-2" @click="modelValue.push({'resource': '', 'value': ''})">Добавить</button>
        <button class="btn btn-outline-danger" @click="$emit('removeCard', id)">Удалить вариант</button>
    </div>
</template>

<script>
    import CraftField from '@/components/dev/CraftField.vue';
    export default {
        props: {
            id: Number,
            modelValue: Object,
        },
        components: {
            CraftField,
        }
    }
</script>