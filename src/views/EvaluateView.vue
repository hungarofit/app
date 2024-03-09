<template>
  <div class="mt-4">
    <div class="row g-3">
      <div class="col-md-2 col-sm-6">
        <label class="form-label" for="jump">{{ $t('age') }}</label>
        <input class="form-control" type="number" v-model="age" :min="minAge" id="age" />
      </div>
      <div class="col-md-3 col-sm-6">
        <label class="form-label" for="sex">{{ $t('sex') }}</label>
        <select class="form-control" v-model.number="sex" id="sex">
          <option value="2">{{ $t('female') }}</option>
          <option value="1">{{ $t('male') }}</option>
        </select>
      </div>
      <div class="col-md-3 col-sm-6">
        <label class="form-label" for="motorType">{{ $t('challenge') }}</label>
        <select class="form-control" v-model="motorType" id="motorType">
          <option value="motor4">{{ $t('motor4') }}</option>
          <option value="motor6">{{ $t('motor6') }}</option>
        </select>
      </div>
      <div class="col-md-4 col-sm-6">
        <label class="form-label" for="aerobActivity">{{ $t('aerob') }}</label>
        <select class="form-control" v-model="aerobType" id="aerobActivity">
          <option v-for="(_, v) in aerobExercises" :key="v" :value="v">{{ $t(v) }}</option>
        </select>
      </div>
    </div>
  
    <div class="mt-2 alert alert-danger" v-if="isHeaderFilled && age < minAge">{{ $t('feedback.underage') }}</div>

    <div class="row g-3 mt-4" v-if="showExerciseInputs">
      <EvaluateScoreBar id="aerob" :title="$t(aerobType)" :unit="aerobUnit" :exercise="aerobType" v-model="aerob"
        :data="response" />
      <EvaluateScoreBar id="jump" :title="$t('jump')" unit="m" :exercise="motorType + '-jump'" v-model="jump"
        :data="response" />
      <EvaluateScoreBar id="situp" :title="$t('situp')" :exercise="motorType + '-situp'" v-model="situp"
        :data="response" />
      <EvaluateScoreBar id="torso" :title="$t('torso')" :exercise="motorType + '-torso'" v-model="torso"
        :data="response" />
      <EvaluateScoreBar id="pushup" :title="$t('pushup')" :exercise="motorType + '-pushup'" v-model="pushup"
        :data="response" />
      <EvaluateScoreBar v-if="motorType == 'motor6'" id="throwdouble" unit="m" :title="$t('throwdouble')"
        :exercise="motorType + '-throwdouble'" v-model="throwDouble" :data="response" />
      <EvaluateScoreBar v-if="motorType == 'motor6'" id="throwdouble" unit="m" :title="$t('throwsingle')"
        :exercise="motorType + '-throwsingle'" v-model="throwSingle" :data="response" />
    </div>

    <div class="row g-3 mt-4" v-if="showFinalScore">
      <!--
      <div class="col-lg-2 col-md-4 col-sm-6">
        <h4>{{ $t('evaluation_score') }}</h4>
      </div>
      -->
      <div class="text-center">
        <h1>
          <b-badge :variant="scoreVariant">{{ $t('evaluation_text.' + scoreText ) }}</b-badge>
        </h1>
        <h4>{{ scoreTotal }} {{ $t('points') }}</h4>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import EvaluateScoreBar from '@/components/EvaluateScoreBar.vue'

const aerobExercises = {
  // 'aerob-bike-12min': 'm',
  'aerob-run-1mile': 'min',
  'aerob-run-1mile5': 'min',
  'aerob-run-2km': 'min',
  'aerob-run-2mile': 'min',
  'aerob-run-3km': 'min',
  'aerob-run-6min': 'm',
  'aerob-run-12min': 'm',
  'aerob-swim-12min': 'm',
  'aerob-swim-500m': 'min'
}


class EvaluationText {
  static scores = [
    [120.5, "excellent", "success"],
    [100.5, "great", "success"],
    [80.5, "good", "success"],
    [60.5, "mediocre", "warning"],
    [40.5, "bad", "warning"],
    [20.5, "awful", "danger"],
    [0, "terrible", "danger"],
  ]
  text(scoreTotal) {
    for (const [key, value] of EvaluationText.scores) {
      if (scoreTotal >= key) {
        return value
      }
    }
    return "unknown"
  }
  color(scoreTotal) {
    for (const [key, _, color] of EvaluationText.scores) {
      if (scoreTotal >= key) {
        return color
      }
    }
    return "unknown"
  }
}

const evaluationText = new EvaluationText()

const age = ref(0)
const sex = ref('')
const motorType = ref('')
const aerobType = ref('')
const aerob = ref(0)
const jump = ref(0)
const situp = ref(0)
const torso = ref(0)
const pushup = ref(0)
const throwDouble = ref(0)
const throwSingle = ref(0)
const response = ref(null)

const aerobUnit = computed(() => {
  return aerobExercises[aerobType.value]
})

if (process.env.NODE_ENV !== 'production') {
  age.value = 24
  sex.value = 2
  motorType.value = 'motor4'
  aerobType.value = 'aerob-swim-12min'
  aerob.value = 500
  jump.value = 2.1
  situp.value = 80
  torso.value = 80
  pushup.value = 20
}

const evaluate = async () => {
  response.value = null
  if (!showExerciseInputs.value) {
    return
  }
  const results = {
    jump: jump.value,
    situp: situp.value,
    torso: torso.value,
    pushup: pushup.value,
    [aerobType.value]: aerob.value
  }
  if (motorType.value === 'motor6') {
    results.throwdouble = throwDouble.value
    results.throwsingle = throwSingle.value
  }
  response.value = await Hungarofit.evaluate(motorType.value, sex.value, age.value, results)
}

watch(
  [motorType, aerobType, sex, age, jump, situp, torso, pushup, throwDouble, throwSingle, aerob],
  async () => {
    try {
      await evaluate()
    } catch (e) {
      console.warn(e)
    }
  }
)

onMounted(async () => {
  if ('Hungarofit' in window) {
    await evaluate()
  }
  window.addEventListener('hungarofit.wasm_ready', evaluate)
})

const isHeaderFilled = computed(() => {
  return age.value > 0 &&
    sex.value > 0 &&
    motorType.value.length > 0 &&
    aerobType.value.length > 0
})

const showExerciseInputs = computed(() => {
  return isHeaderFilled.value && age.value >= minAge.value
})

const showFinalScore = computed(() => {
  return showExerciseInputs.value && scoreTotal.value >= 0
})

const minAge = computed(() => {
  switch(motorType.value) {
    case 'motor4':
      return 4
    case 'motor6':
      return 7
    default:
      return 0
  }
})

const scoreTotal = computed(() => {
  if (!response.value) {
    return 0
  }
  return response.value.total
})

const scoreText = computed(() => {
  if (scoreTotal.value > 0) {
    return evaluationText.text(scoreTotal.value)
  }
  return ''
})

const scoreVariant = computed(() => {
  if (scoreTotal.value > 0) {
    return evaluationText.color(scoreTotal.value)
  }
  return 'light'
})
</script>

<style>
.chart-container {
  margin-top: 20px;
}
</style>
