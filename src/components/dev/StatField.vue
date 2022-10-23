<template>
    <div class="input-group">
        <select name="boostStat" id="boostStat" class="form-select" v-model="modelValue.stat">
            <option v-for="item in $store.state.stats" :key="item.id" :value="item.title">{{item.title}}</option>
        </select>
        <input
        class="form-control w-50"
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