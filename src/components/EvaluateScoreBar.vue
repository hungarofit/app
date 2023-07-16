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
  <div class="col-lg-2 col-md-4 col-sm-6">
    <label class="form-label" for="aerob">
      {{ props.title }}
    </label>
    <input
      class="form-control"
      type="number"
      :step="step"
      :id="id"
      :value="modelValue"
      @input="$emit('update:modelValue', parseFloat($event.target.value))"
    />
  </div>
  <div class="col-lg-10 col-md-8 col-sm-6">
    <b-progress
      v-if="props.data"
      :max="props.data.results[exercise].score_max"
      :value="props.data.results[exercise].score"
      :show-value="true"
    />
  </div>
</template>
