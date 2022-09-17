<template>
    <div class="d-flex justify-content-center gap-5">
        <div> 
            <div class="field mb-3">
            <label class="label mb-1">Название</label>
            <div class="control">
                <input class="input w-100" type="text" placeholder="Название" v-model="title" />
            </div>
            </div>
            <div class="field mb-3">
                <label class="label mb-1">Описание</label>
                <div class="control text-center">
                    <ckeditor :editor="editor" v-model="desc" :config="editorConfig"></ckeditor>
                </div>
            </div>
            <div class="field mb-3">
                <label class="label mb-1">Иконка</label>
                <div class="control">
                    <input class="input w-100" type="text" placeholder="Иконка" v-model="icon" />
                </div>
            </div>
            <div class="text-center mb-3">
                <h3 class="label mb-1">Бусты</h3>
                <boost-field class="mb-2" v-for="(item, index) in genieBoosts" :key="index" :id="index" @update="updateBoostArray" @remove="removeBoostFromArray" />
                <button @click="addBoostField">Добавить</button>
            </div>
        </div>
        <div>
            <div class="text-center mb-3">
                <h3 class="label mb-1">Инфо</h3>
                <div class="d-flex">
                    <info-field @update="updateInfoArray" />
                </div>
            </div>

            <div class="field mb-3 text-center">
                <label class="label mb-1">Ограничения по классам(Разрешенные)</label>
                <div class="control">
                    <select name="classes" id="classes" class="d-block w-100 mb-2" v-model="blockedClasses" multiple>
                        <option value=NULL></option>
                        <option v-for="item in classes" :key="item.id" :value="item.title">{{item.title}}</option>
                    </select>
                </div>
            </div>

            <div class="field mb-3 text-center">
                <label class="label mb-1">Ограничения по поверхности</label>
                <div class="control">
                    <select name="terrains" id="terrains" class="d-block w-100 mb-2" v-model="blockedTerrain" multiple>
                        <option value=NULL></option>
                        <option value='Земля'>Земля</option>
                        <option value='Вода'>Вода</option>
                        <option value='Воздух'>Воздух</option>
                    </select>
                </div>
            </div>

            <div class="field mb-3 text-center">
                <label class="label mb-1">Категория</label>
                <div class="control">
                    <select name="category" id="category" class="d-block w-100 mb-2" v-model="category">
                        <option v-for="(item, index) in 14" :key="index" :value='item'>{{item}}</option>
                    </select>
                </div>
            </div>

            <div class="control">
                <button class="button is-success" @click="saveSkill">SAVE</button>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import BoostField from '@/components/dev/BoostField.vue';
    import InfoField from '@/components/dev/InfoField.vue';
    import CKEditor from '@ckeditor/ckeditor5-vue';
    import Editor from 'ckeditor5-custom-build/build/ckeditor';

    export default {
        components: { 
            BoostField, 
            InfoField, 
            ckeditor: CKEditor.component,
        },
        name: 'AddGenieSkill',
        data() {
            return {
                title: '',
                desc: '',
                icon: '',
                genieBoosts: ['', ''],
                classes: [],
                selectedClass: '',
                selectedTerrain: '',
                blockedClasses: [],
                blockedTerrain: [],
                genieInfo: {},
                category: 1,
                editor: Editor,
                editorConfig: {
                    placeholder: 'Введите описание скилла'
                }
            };
        },
        created() {
            this.getClasses();
        },
        methods: {
            updateBoostArray(event) {
                this.genieBoosts[event.index] = {"title": event.stat, "desc": event.desc};
            },
            removeBoostFromArray(event) {
                this.genieBoosts.splice(event, 1);
            },
            updateInfoArray(event) {
                this.genieInfo = {"cd": event.cd, "energy": event.energy, "stamina": event.stamina, "reqLevel": event.lvl, "range": event.range, "reqElements": event.reqElements};
            },
            addBoostField() {
                this.genieBoosts.push('');
            },
            async saveSkill() {
                try {
                    await axios.post('http://localhost:5000/genie_skills', {
                        Title: this.title,
                        Desc: this.desc,
                        Boosts: this.genieBoosts.length > 0 ? JSON.stringify(this.genieBoosts) : null,
                        Info: JSON.stringify(this.genieInfo),
                        Icon: this.icon,
                        blockedClasses: this.blockedClasses.length > 0 ? JSON.stringify(this.getBlockedClasses) : null,
                        blockedTerrain: this.blockedTerrain.length > 0 ? JSON.stringify(this.blockedTerrain) : null,
                        category: this.category,
                    });
                    this.title = '';
                    this.desc = '';
                    this.icon = '';
                    this.genieBoosts = ['', ''];
                    this.genieInfo = {};
                    this.selectedClass = '';
                    this.selectedTerrain = '';
                } catch (err) {
                    console.log(err);
                }
            },
            async getClasses() {
                try {
                    const response = await axios.get("http://localhost:5000/classes");
                    this.classes = response.data;
                } catch (err) {
                    console.log(err);
                }
            }
        },
        computed: {
            getBlockedClasses() {
                classes = [];
                this.classes.forEach(el => {
                    if(!this.blockedClasses.includes(el.title)) {
                        this.classes.push(el.title);
                    }
                })
                return this.classes;
            }
        }
    }
</script>
<style lang="scss" scoped>
#classes {
    min-height: 200px;
}
</style>