
<template>
    <div class="app-input-number field has-addons">
        <div class="control"
             :class="{'is-expanded':expanded}">
            <input class="input has-text-right"
                   :class="{'is-fullwidth':expanded}"
                   type="number"
                   v-model.lazy="number" />
        </div>
        <div class="control"
             v-if="unit">
            <div class="button is-static is-lowercase"
                 v-html="unit">
            </div>
        </div>
        <div class="control">
            <div class="button"
                 @mousedown.prevent="start(true)">
                <i class="fa fa-sm fa-plus"></i>
            </div>
        </div>
        <div class="control">
            <div class="button"
                 @mousedown.prevent="start(false)">
                <i class="fa fa-minus"></i>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    .app-input-number {

        input[type="number"]::-webkit-outer-spin-button,
        input[type="number"]::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }
        input[type="number"] {
            -moz-appearance: textfield;
        }

        .fa {
            font-size: 12px;
        }

    }
</style>

<script>
    // @todo mobile pressed spin
  const _timeout = 600;
  const _interval = 200;
  export default {
    name: 'app-input-number',
    props: {
      value: {
        required: true,
        type: Number,
        default: undefined,
      },
      step: {
        type: Number,
        default: 1,
      },
      decimals: {
        type: Number,
        default: 0,
      },
      min: {
        type: [Boolean, Number],
        default: false,
      },
      max: {
        type: [Boolean, Number],
        default: false,
      },
      unit: {
        type: String,
        default: '',
      },
      icon: {
        type: String,
        default: '',
      },
      expanded: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        number: '',
        spin: {
          delta: 0,
          start: null,
          timer: null,
        },
      };
    },
    computed: {
      _decimals() {
        if(this.decimals > 0) {
          return this.decimals;
        }
        let s = parseFloat(this.step).toString().split('.');
        if(s.length > 1) {
          let d = parseInt(s[1]);
          if(d > 0) {
            return s[1].length;
          }
        }
        return 0;
      },
    },
    watch: {
      value(value) {
        if(value === undefined) {
          this.number = '';
        }
        else {
          this.number = value.toFixed(this._decimals);
        }
      },
      number(value) {
        if(value === '') {
          this.$emit('input', undefined);
        }
        else {
          value = parseFloat(value);
          if (typeof this.min === 'number') {
            value = Math.max(this.min, value);
          }
          if (typeof this.max === 'number') {
            value = Math.min(this.max, value);
          }
          if (value !== this.value) {
            this.$emit('input', value);
          }
        }
      }
    },
    methods: {
      start(decrement) {
        clearInterval(this.spin.timer);
        this.spin.delta = (decrement ? 1 : -1);
        this.spin.start = new Date();
        this.spin.timer = setInterval(this.tick, _timeout);
      },
      tick() {
        const now = new Date();
        const dt = now - this.spin.start;
        const f = this.step * (Math.floor(dt / 1000) + 1);
        this.$emit('input', this.value + (this.spin.delta * f));
        if(dt >= _timeout) {
          clearInterval(this.spin.timer);
          this.spin.timer = setInterval(this.tick, _interval);
        }
      },
      stop() {
        const now = new Date();
        const dt = now - this.spin.start;
        if(this.spin.timer) {
          if(dt < _timeout) {
            this.tick();
          }
          clearInterval(this.spin.timer);
          this.spin.timer = null;
        }
      },
    },
    created() {
      if(typeof this.value === 'number') {
        this.number = this.value.toFixed(this._decimals);
      }
      else {
        this.number = '';
      }
    },
    mounted() {
      document.addEventListener('mouseup', this.stop);
    },
    beforeDestroy() {
      this.stop();
      document.removeEventListener('mouseup', this.stop);
    },
  }
</script>
