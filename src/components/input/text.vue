
<template>
    <div class="app-input-text label">
        <label class="label"
               v-html="label"
               v-if="label.length>0">
        </label>
        <div class="control has-icons-right"
             :class="{'has-icons-left':icon.length>0}">
            <input class="input"
                   :class="{'is-success':isValid, 'is-danger':isNotValid}"
                   type="text"
                   :value="value"
                   :placeholder="placeholderText"
                   @change.lazy="$emit('input', $event.target.value)">
            <span class="icon is-small is-left"
                  v-if="icon.length>0">
                <i :class="icon"></i>
            </span>
            <span class="icon is-small is-right"
                  :class="{'has-text-success':isValid, 'has-text-danger':isNotValid}">
                <i class="fa"
                   :class="{'fa-check':isValid, 'fa-times':isNotValid}">
                </i>
            </span>
        </div>
        <p class="help"
           :class="{'is-success':isValid, 'is-danger':isNotValid}"
           v-show="message.length>0"
           v-html="message">
        </p>
    </div>
</template>

<style lang="scss">
    .app-input-text {
    }
</style>

<script>
  export default {
    name: 'app-input-text',
    props: {
      value: {
        required: true,
        type: String,
        default: '',
      },
      required: {
        type: Boolean,
        default: false,
      },
      icon: {
        type: String,
        default: '',
      },
      label: {
        type: String,
        default: '',
      },
      placeholder: {
        type: [Boolean, String],
        default: true,
      },
      /*
      message: {
        type: String,
        default: '',
      },
      */
      validate: {
        type: Function,
        default(vnode, value) {
          if(vnode.required && value.length < 1) {
            throw 'Please fill out this field';
          }
        }
      },
    },
    data() {
      return {
        isValid: null,
        message: '',
      };
    },
    computed: {
      isNotValid() {
        return this.isValid === false;
      },
      placeholderText() {
        if(this.placeholder) {
          if (this.placeholder === true) {
            return this.label.toString();
          }
          return this.placeholder.toString();
        }
      }
    },
    watch: {
      value(newVal) {
        this.isValid = false;
        let valid = true;
        try {
          this.validate(this, newVal);
        }
        catch(e) {
          this.message = e.toString();
          valid = false;
        }
        this.isValid = valid;
      }
    },
  }
</script>
