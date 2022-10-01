<template>
    <div class="container">
        <div class="row pb-3">
            <div class="text-center col-12 col-lg-6"> 
                <div class="mb-3">
                    <label class="label mb-2">Название</label>
                    <input class="form-control w-100" type="text" placeholder="Название" v-model="title" />
                </div>
                <div class="mb-3">
                    <label class="label mb-1">Описание</label>
                    <ckeditor class="form-control w-100" :editor="editor" v-model="desc" :config="editorConfig"></ckeditor>
                </div>
                <div class="mb-3">
                    <label class="label mb-1">Иконка</label>
                    <input class="form-control w-100" type="text" placeholder="Иконка" v-model.number="icon" />
                </div>
                <div class="mb-3">
                    <h3 class="label mb-1">Бусты</h3>
                    <boost-field class="mb-2" v-for="(item, index) in genieBoosts" :key="index" :id="index" v-model="genieBoosts[index]" @remove="removeBoostFromArray" />
                    <button class="btn btn-outline-secondary" @click="addBoostField">Добавить</button>
                </div>
            </div>
            <div class="col-12 col-lg-6">
                <div class="text-center mb-3">
                    <h3 class="label mb-1">Инфо</h3>
                    <info-field v-model="genieInfo" />
                </div>

                <div class="mb-3 text-center">
                    <label class="label mb-1">Разрешенные классы</label>
                    <select name="classes" id="classes" class="form-select" v-model="allowedClasses" multiple>
                        <option value=NULL></option>
                        <option v-for="item in $store.state.classes" :key="item.id" :value="item.title">{{item.title}}</option>
                    </select>
                </div>

                <div class="mb-3 text-center">
                    <label class="label mb-1">Разрешенные поверхности</label>
                    <select name="terrains" id="terrains" class="form-select" v-model="allowedTerrain" multiple>
                        <option value=NULL></option>
                        <option value='Земля'>Земля</option>
                        <option value='Вода'>Вода</option>
                        <option value='Воздух'>Воздух</option>
                    </select>
                </div>

                <div class="mb-3 text-center">
                    <label class="label mb-1">Категория</label>
                    <select name="category" id="category" class="form-select" v-model="category">
                        <option v-for="item in 14" :key="item" :value='item'>{{item}}</option>
                    </select>
                </div>

                <div class="text-center">
                    <button class="btn btn-success" @click="updateSkill">SAVE</button>
                </div>
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
                genieBoosts: [{"title": 'Сила', "desc": ''}, {"title": 'Сила', "desc": ''}],
                allowedClasses: [],
                allowedTerrain: [],
                genieInfo: {"cd": '', "energy": '', "stamina": '', "reqLevel": '', "range": '', "reqElements": {"MT": 0, "WD": 0, "ER": 0, "WT": 0, "FR": 0}},
                category: 1,
                editor: Editor,
                editorConfig: {
                    placeholder: 'Введите описание скилла'
                }
            };
        },
        created() {
            this.getSkillById(this.$route.params.id);
        },
        methods: {
            removeBoostFromArray(event) {
                this.genieBoosts.splice(event, 1);
            },
            addBoostField() {
                this.genieBoosts.push({"title": 'Сила', "desc": ''});
            },
            async getSkillById(id) {
                try {
                    const response = await axios.get(`${this.$store.state.baseServerUrl}genie_skills/id=${id}`);
                    this.title = response.data.title;
                    this.desc = response.data.descr;
                    this.icon = response.data.icon;
                    this.genieBoosts = response.data.boosts;
                    this.genieInfo = response.data.info;
                    this.category = response.data.category;

                    if(response.data.blockedClasses.length > 0) {
                        this.$store.state.classes.forEach(el => {
                            if(!response.data.blockedClasses.includes(el.title)) {
                                this.allowedClasses.push(el.title);
                            }
                        })
                    }

                    if(response.data.blockedTerrain.length > 0) {
                        ['Земля', 'Вода', 'Воздух'].forEach(el => {
                            if(!response.data.blockedTerrain.includes(el)) {
                                this.allowedTerrain.push(el);
                            }
                        })
                    }
                } catch (err) {
                    console.log(err);
                }
            },
            async updateSkill() {
                try {
                    await axios.put(`${this.$store.state.baseServerUrl}genie_skills/${this.$route.params.id}`, {
                        title: this.title,
                        desc: this.desc,
                        boosts: this.genieBoosts != null && this.genieBoosts.length > 0 ? JSON.stringify(this.genieBoosts) : null,
                        info: JSON.stringify(this.genieInfo),
                        icon: this.icon,
                        blockedClasses: this.allowedClasses.length > 0 ? JSON.stringify(this.getBlockedClasses) : JSON.stringify([]),
                        blockedTerrain: this.allowedTerrain.length > 0 ? JSON.stringify(this.getBlockedTerrain) : JSON.stringify([]),
                        category: this.category,
                    });
                    this.$router.push('/admin');
                } catch (err) {
                    console.log(err);
                }
            },
        },
        computed: {
            getBlockedClasses() {
                const blockedClasses = [];
                this.$store.state.classes.forEach(el => {
                    if(!this.allowedClasses.includes(el.title)) {
                        blockedClasses.push(el.title);
                    }
                })
                return blockedClasses;
            },
            getBlockedTerrain() {
                const blockedTerrain = [];
                ['Земля', 'Вода', 'Воздух'].forEach(el => {
                    if(!this.allowedTerrain.includes(el)) {
                        blockedTerrain.push(el);
                    }
                })
                return blockedTerrain;
            }
        }
    }
</script>
<style lang="scss" scoped>
#classes {
    min-height: 200px;
}
</style>