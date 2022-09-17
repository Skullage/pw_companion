<template>
    <div class="control d-flex flex-column">
        <div class="field row mb-2">
            <label class="label col-4">Кд</label>
            <input
                class="input col-8"
                type="text"
                placeholder="Кд"
                v-model="cd"
                @input="updateArray"
            />
        </div>
        <div class="field row mb-2">
            <label class="label col-4">Энергия</label>
            <input
                class="input col-8"
                type="text"
                placeholder="Энергия"
                v-model="energy"
                @input="updateArray"
            />
        </div>
        <div class="field row mb-2">
            <label class="label col-4">Стамина</label>
            <input
                class="input col-8"
                type="text"
                placeholder="Стамина"
                v-model="stamina"
                @input="updateArray"
            />
        </div>
        <div class="field row mb-2">
            <label class="label col-4">Уровень</label>
            <input
                class="input col-8"
                type="text"
                placeholder="Уровень"
                v-model="lvl"
                @input="updateArray"
            />
        </div>
        <div class="field row mb-2">
            <label class="label col-4">Дальность</label>
            <input
                class="input col-8"
                type="text"
                placeholder="Дальность"
                v-model="range"
                @input="updateArray"
            />
        </div>
        <div class="reqElems d-flex mb-2 gap-2">
            <label class="d-flex flex-grow-1 flex-column text-warning">МТ
                <select name="MT" id="MT" v-model="reqElements.MT" @change="updateArray">
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                </select>
            </label>
            <label class="d-flex flex-grow-1 flex-column text-success">WD
                <select name="WD" id="WD" v-model="reqElements.WD" @change="updateArray">
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                </select>
            </label>
            <label class="d-flex flex-grow-1 flex-column text-brown">ER
                <select name="ER" id="ER" v-model="reqElements.ER" @change="updateArray">
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                </select>
            </label>
            <label class="d-flex flex-grow-1 flex-column text-info">WT
                <select name="WT" id="WT" v-model="reqElements.WT" @change="updateArray">
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                </select>
            </label>
            <label class="d-flex flex-grow-1 flex-column text-danger">FR
                <select name="FR" id="FR" v-model="reqElements.FR" @change="updateArray">
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                </select>
            </label>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                cd: '',
                energy: '',
                stamina: '',
                lvl: '',
                range: '',
                reqElements: {"MT": 0, "WD": 0, "ER": 0, "WT": 0, "FR": 0},
            }
        },
        methods: {
            updateArray() {
                this.$emit('update', {"cd": this.cd, "energy": this.energy, "stamina": this.stamina, "lvl": this.lvl, "range": this.range, "reqElements": this.reqElements});
            }
        }
    }
</script>