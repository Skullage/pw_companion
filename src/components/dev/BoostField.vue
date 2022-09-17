<template>
    <div class="control d-flex gap-2 justify-content-center">
        <select name="boostStat" id="boostStat" @change="updateArray" v-model="boostStat">
            <option value="Сила">Сила</option>
            <option value="Ловкость">Ловкость</option>
        </select>
        <input
        class="input"
        type="text"
        @input="updateArray"
        placeholder="Буст"
        v-model="boostDesc"
        />
        <button @click="removeFromArray">Удалить</button>
    </div>
</template>

<script>
    export default {
        props: {
            id: Number,
        },
        data() {
            return {
                boostStat: 'Сила',
                boostDesc: '',
            }
        },
        methods: {
            updateArray() {
                this.$emit('update', {stat: this.boostStat, desc: this.boostDesc, index: this.id});
            },
            removeFromArray() {
                this.$emit('remove', this.id);
            }
        }
    }
</script>