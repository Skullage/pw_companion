<template>
    <div class="d-flex flex-column">
        <div class="input-group mb-2">
            <label class="input-group-text">Уровень</label>
            <input
                class="form-control"
                type="text"
                placeholder="Уровень"
                v-model.number="modelValue.reqLevel"
            />
        </div>
        <div class="input-group mb-2">
            <label class="input-group-text">Дальность</label>
            <input
                class="form-control"
                type="text"
                placeholder="Дальность"
                v-model.number="modelValue.range"
            />
        </div>
        <div class="input-group mb-2">
            <label class="input-group-text">Энергия</label>
            <input
                class="form-control"
                type="text"
                placeholder="Энергия"
                v-model="modelValue.energy"
            />
        </div>
        <div class="input-group mb-2">
            <label class="input-group-text">Стамина</label>
            <input
                class="form-control"
                type="text"
                placeholder="Стамина"
                v-model="modelValue.stamina"
            />
        </div>
        <div class="input-group mb-2">
            <label class="input-group-text">Кд</label>
            <input
                class="form-control"
                type="text"
                placeholder="Кд"
                v-model.number="modelValue.cd"
            />
        </div>
        <div class="d-flex mb-2 gap-2 justify-content-center">
            <label class="text-warning">МТ
                <select class="form-select mt-1" name="MT" id="MT" v-model.number="modelValue.reqElements.MT">
                    <option value="0">0</option>
                    <option v-for="item in 8" :key="item" :value=item>{{item}}</option>
                </select>
            </label>
            <label class="text-success">WD
                <select class="form-select mt-1" name="WD" id="WD" v-model.number="modelValue.reqElements.WD">
                    <option value="0">0</option>
                    <option v-for="item in 8" :key="item" :value=item>{{item}}</option>
                </select>
            </label>
            <label class="text-brown">ER
                <select class="form-select mt-1" name="ER" id="ER" v-model.number="modelValue.reqElements.ER">
                    <option value="0">0</option>
                    <option v-for="item in 8" :key="item" :value=item>{{item}}</option>
                </select>
            </label>
            <label class="text-info">WT
                <select class="form-select mt-1" name="WT" id="WT" v-model.number="modelValue.reqElements.WT">
                    <option value="0">0</option>
                    <option v-for="item in 8" :key="item" :value=item>{{item}}</option>
                </select>
            </label>
            <label class="text-danger">FR
                <select class="form-select mt-1" name="FR" id="FR" v-model.number="modelValue.reqElements.FR">
                    <option value="0">0</option>
                    <option v-for="item in 8" :key="item" :value=item>{{item}}</option>
                </select>
            </label>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            modelValue: Object,
        },
        data() {
            return {
            }
        },
    }
</script>