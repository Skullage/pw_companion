<template>
  <input v-model="val" @input="updateValue($event.target.value)" />
</template>

<script>
export default {
  name: 'PatternInput',
  props: {
    modelValue: {
      required: true,
      type: [Number, String]
    },
    // Using for: String.prototype.replace(regexp, replacement)
    regExp: {
      type: RegExp,
      default: null
    },
    // Using for: String.prototype.replace(regexp, replacement)
    replacement: {
      type: String,
      default: ''
    },
    min: {
      type: Number,
    },
    max: {
      type: Number,
    }
  },
  emits: ['update:modelValue'],
  data () {
    return {
      val: ''
    }
  },
  methods: {
    // format the value of input
    formatValue (val) {
      const formattedValue = val.toString().replace(this.regExp, this.replacement)

      return formattedValue
    },

    // update the value of input
    updateValue (val) {
      if (val > this.max) {
        val = this.max;
      }

      if (val < this.min) {
        val = this.min;
      }

      const formattedValue = this.formatValue(val)

      this.val = formattedValue
      this.emitInput(formattedValue)
    },

    // emit input event
    emitInput (val) {
      this.$emit('update:modelValue', val)
    }
  },
  watch: {
    // watch value prop
    modelValue: {
      handler (val = '') {
        if (val !== this.val) {
          this.updateValue(val)
        }
      },
      immediate: true
    }
  }
}
</script>