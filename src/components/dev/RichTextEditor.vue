<template>
    <ckeditor class="editor" :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
</template>
  
<script>
import CKEditor from '@ckeditor/ckeditor5-vue';
import Editor from 'ckeditor5-custom-build/build/ckeditor';

export default {
    name: 'app',
    components: {
      ckeditor: CKEditor.component
    },
    data() {
        return {
            editor: Editor,
            editorData: '<p>Content of the editor.</p>',
            editorConfig: {
                // The configuration of the editor.
                placeholder: 'Введите описание скилла'
            }
        };
    }
}
</script>
<style lang="scss" scoped>

</style>