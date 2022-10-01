<template>
    <div class="input-group">
        <select name="boostStat" id="boostStat" class="form-select" v-model="modelValue.title">
            <option value="Сила">Сила</option>
            <option value="Ловкость">Ловкость</option>
        </select>
        <input
        class="form-control w-50"
        type="text"
        placeholder="Буст"
        v-model="modelValue.desc"
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
        data() {
            return {
            }
        },
        methods: {
            removeFromArray() {
                this.$emit('remove', this.id);
            }
        }
    }
</script>