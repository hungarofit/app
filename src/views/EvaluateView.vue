<template>
  <div class="mt-4">
    <form @submit.prevent="submitForm">
      <div class="row g-3">
        <div class="col-md-2 col-sm-6">
          <label class="form-label" for="jump">{{ $t('age') }}</label>
          <input class="form-control" type="number" v-model="age" id="age" />
        </div>
        <div class="col-md-3 col-sm-6">
          <label class="form-label" for="gender">{{ $t('gender') }}</label>
          <select class="form-control" v-model.number="gender" id="gender">
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
          <select class="form-control" v-model="aerobActivity" id="aerobActivity">
            <option v-for="(_, v) in aerobExercises" :key="v" :value="v">{{ $t(v) }}</option>
          </select>
        </div>
      </div>

      <div class="row g-3 mt-4">
        <EvaluateScoreBar
          id="aerob"
          :title="$t(aerobActivity)"
          :exercise="aerobActivity"
          v-model="aerob"
          :data="response"
        />
        <EvaluateScoreBar
          id="jump"
          :title="$t('jump')"
          :exercise="motorType + '-jump'"
          v-model="jump"
          :data="response"
        />
        <EvaluateScoreBar
          id="situp"
          :title="$t('situp')"
          :exercise="motorType + '-situp'"
          v-model="situp"
          :data="response"
        />
        <EvaluateScoreBar
          id="torso"
          :title="$t('torso')"
          :exercise="motorType + '-torso'"
          v-model="torso"
          :data="response"
        />
        <EvaluateScoreBar
          id="pushup"
          :title="$t('pushup')"
          :exercise="motorType + '-pushup'"
          v-model="pushup"
          :data="response"
        />
        <EvaluateScoreBar
          v-if="motorType == 'motor6'"
          id="throwdouble"
          title="Single handed throw"
          :exercise="motorType + '-throwdouble'"
          v-model="throwDouble"
          :data="response"
        />
        <EvaluateScoreBar
          v-if="motorType == 'motor6'"
          id="throwsouble"
          title="Double handed throw"
          :exercise="motorType + '-throwsingle'"
          v-model="throwSingle"
          :data="response"
        />
      </div>
    </form>

    <div class="chart-container text-end" v-if="scoreTotal">
      <h4>{{ $t('total') }}: {{ scoreTotal }}</h4>
    </div>

    <!--    <div v-if="response">-->
    <!--      <h3>Response Data:</h3>-->
    <!--      <pre>{{ JSON.stringify(response, undefined, "  ") }}</pre>-->
    <!--    </div>-->
  </div>
</template>

<script setup lang="ts">
import {ref, computed, watch, onMounted} from 'vue'
import EvaluateScoreBar from '@/components/EvaluateScoreBar.vue'

const aerobExercises = ref({
  'aerob-bike-12min': 'm',
  'aerob-run-1mile': 'min',
  'aerob-run-1mile5': 'min',
  'aerob-run-2km': 'min',
  'aerob-run-2mile': 'min',
  'aerob-run-3km': 'min',
  'aerob-run-6min': 'm',
  'aerob-run-12min': 'm',
  'aerob-swim-12min': 'm',
  'aerob-swim-500m': 'min'
})
const age = ref(25)
const gender = ref(2)
const motorType = ref('motor4')
const aerobActivity = ref('aerob-run-12min')
const aerob = ref(2400)
const jump = ref(1.9)
const situp = ref(84)
const torso = ref(64)
const pushup = ref(18)
const throwDouble = ref(8.4)
const throwSingle = ref(7.6)
const response = ref(null)

const evaluate = async () => {
  response.value = null
  if (gender.value < 1 || age.value < 6) {
    return
  }
  const results = {
    jump: jump.value,
    situp: situp.value,
    torso: torso.value,
    pushup: pushup.value,
    [aerobActivity.value]: aerob.value
  }
  if (motorType.value === 'motor6') {
    results.throwdouble = throwDouble.value
    results.throwsingle = throwSingle.value
  }
  response.value = await Hungarofit.evaluate(motorType.value, gender.value, age.value, results)
}

watch(
  [motorType, gender, age, jump, situp, torso, pushup, throwDouble, throwSingle, aerob],
  async () => {
    try {
      await evaluate()
    } catch (e) {
      console.error(e)
    }
  }
)

onMounted(async () => {
  if ('Hungarofit' in window) {
    await evaluate()
  }
  window.addEventListener('hungarofit.wasm_ready', evaluate)
})

const scoreTotal = computed(() => {
  if (!response.value) {
    return 0
  }
  return response.value.total
})
</script>

<style>
.chart-container {
  margin-top: 20px;
}
</style>
