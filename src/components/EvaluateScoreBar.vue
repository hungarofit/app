<script setup lang="ts">
import { computed } from 'vue'

defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: {
    type: Number,
    required: true
  },
  id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  exercise: {
    type: String,
    required: true
  },
  data: {
    type: Object
  },
  unit: {
    type: String,
    default: 'db',
  }
})

const step = computed(() => {
  if (/((throw(double|single)|jump)$)|(aerob-.*?(m|km|mile)\d?$)/.test(props.exercise)) {
    return 0.01
  }
  return 1
})
</script>

<template>
  <label class="form-label" for="aerob">
    {{ props.title }}
  </label>
  <div class="col-lg-3 col-md-4 col-sm-6">
    <div class="input-group">
      <input
        class="form-control"
        type="number"
        :step="step"
        :id="id"
        :value="modelValue"
        @input="$emit('update:modelValue', parseFloat($event.target.value))"
      />
      <span class="input-group-text">{{ props.unit }}</span>
    </div>
  </div>
  <div class="col-lg-9 col-md-8 col-sm-6">
    <b-progress
      style="height: 38px;"
      v-if="props.data"
      variant="secondary"
      :max="props.data?.results[exercise]?.score_max"
      :value="props.data?.results[exercise]?.score"
      :show-value="true">
    </b-progress>
  </div>
</template>
