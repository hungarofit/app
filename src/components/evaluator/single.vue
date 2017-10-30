<template>
    <div class="app-evaluator-single columns is-centered">
        <div class="column is-10-tablet is-8-desktop">

            <div class="columns">
                <div class="column">
                    <translate tag="label" class="label">
                        Person
                    </translate>
                    <div class="field has-addons">
                        <div class="control">
                            <div class="select">
                                <select v-model="gender">
                                    <option hidden disabled value=""
                                            v-html="$gettext('Gender')">
                                    </option>
                                    <option value="f"
                                            v-html="$gettext('Female')">
                                    </option>
                                    <option value="m"
                                            v-html="$gettext('Male')">
                                    </option>
                                </select>
                            </div>
                        </div>
                        <input-number v-model="age"
                                      :min="4"
                                      :unit="$gettext('unit-age')">
                        </input-number>
                    </div>
                </div>
                <div class="column">
                    <translate tag="label" class="label">
                        Challenge
                    </translate>
                    <div v-if="!$store.state.master.isFetching"
                         class="field has-addons">
                        <div class="control">
                            <div class="select">
                                <select v-model="challenge">
                                    <option hidden disabled value=""
                                            v-html="$gettext('Challenge')">
                                    </option>
                                    <option v-for="(text,key) in $store.state.master.challenges"
                                            :value="key"
                                            v-html="$gettext('challenge-'+key)">
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div class="control"
                             v-if="challenge">
                            <div class="select">
                                <select v-model="aerob">
                                    <option hidden disabled value=""
                                            v-html="$gettext('Aerob')">
                                    </option>
                                    <option v-for="key in $store.state.master.challenges[challenge].aerob"
                                            :value="key"
                                            v-html="$gettext(key)">
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div v-else
                         class="field">
                        <div class="button is-fullwidth is-loading"></div>
                    </div>
                </div>
            </div>

            <div class="columns" v-if="showExercises">
                <div class="column is-8">
                    <translate tag="label" class="label">
                        Results
                    </translate>
                    <div class="field has-addons"
                         v-for="x in exercises">
                        <div class="control"
                             v-show="challenge">
                            <div class="button is-static"
                                 v-html="$gettext(x.key)">
                            </div>
                        </div>
                        <div class="control is-expanded">
                            <input-number v-model="results[x.name]"
                                          :expanded="true"
                                          :min="0"
                                          :max="10000"
                                          :unit="$gettext('unit-'+x.unit.result)"
                                          :step="x.unit.result === 'min' || x.unit.result === 'm'?0.1:1"
                                          :decimals="x.unit.result === 'min' || x.unit.result === 'm'?2:0">
                            </input-number>
                        </div>
                    </div>
                    <div v-if="sumResults"
                         class="field">
                        <div class="control">
                            <div class="button is-primary is-pulled-right is-large"
                                 :class="{'is-loading':isWorking}"
                                 @click="evaluate">
                                <translate>Evaluate</translate>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="sumResults"
                     class="column is-4">
                    <translate tag="label" class="label">
                        Rating
                    </translate>
                    <div class="field" v-for="(point, name) in points">
                        <div class="control">
                            <div class="button is-fullwidth is-static has-text-right">
                                {{ point }}
                            </div>
                        </div>
                    </div>
                    <div class="field">
                        <div class="control">
                            <div class="button is-static is-fullwidth is-large"
                                 :class="{'is-loading':isWorking}">
                                0
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<style lang="scss">
    .app-evaluator-single {

    }
</style>

<script>

  import InputNumber from '../input/number.vue';

  export default {
    name: 'app-evaluator-single',
    components: {
      InputNumber,
    },
    data() {
      return {
        isWorking: false,
        gender: '',
        age: 20,
        challenge: '',
        aerob: '',
        exercises: {},
        results: {},
        points: {},
      };
    },
    computed: {
      showExercises() {
        return this.age>0 && this.gender.length>0 && this.challenge.length>0 && this.aerob.length>0;
      },
      sumResults() {
        return Object.values(this.results).reduce((a,b)=>a+b, 0);
      },
      sumPoints() {
        return Object.values(this.points).reduce((a,b)=>a+b, 0);
      },
    },
    watch: {
      gender() {
        this.update();
      },
      age() {
        this.update();
      },
      challenge() {
        this.aerob = '';
        this.exercises = {};
        this.update();
      },
      aerob(aerob) {
        if(aerob) {
          this.update();
        }
      },
    },
    methods: {
      empty() {
        for(let i in this.exercises) {
          if(this.exercises.hasOwnProperty(i)) {
            this.results[i] = 0;
            this.points[i] = 0;
          }
        }
      },
      update() {
        if (this.aerob && !this.$store.state.master.isFetching) {
          let exercises = {};
          let results = {};
          const motors = this.$store.state.master.challenges[this.challenge].motor;
          results[this.aerob] = 0;
          exercises[this.aerob] = this.$store.state.master.exercises[this.aerob];
          this.points[this.aerob] = 0;
          for (let i in motors) {
            if (motors.hasOwnProperty(i)) {
              const k = 'motor' + this.challenge + '-' + motors[i];
              results[k] = 0;
              exercises[k] = this.$store.state.master.exercises[k];
              this.points[k] = 0;
            }
          }
          this.results = results;
          this.exercises = exercises;
        }
      },
      evaluate() {
        if(this.isWorking) {
          return;
        }
        this.isWorking = true;
        this.$http.post(this.$apiUrl('/evaluate'), {
          results: this.results,
        }).then(
          r => {
            console.log(r);
            const points = r.body.response;
            for(let i in points) {
              if(points.hasOwnProperty(i)) {
                this.points[i] = points[i];
              }
            }
          },
          console.error
        ).finally(() => {
          this.isWorking = false;
        });
      },
    },
    created() {

    }
  }
</script>
