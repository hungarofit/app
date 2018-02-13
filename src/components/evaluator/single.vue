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
                            <div class="select"
                                 :class="{'is-danger':gender===''}">
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
                            <div class="select"
                                 :class="{'is-danger':challenge===''}">
                                <select v-model="challenge">
                                    <option hidden disabled value=""
                                            v-html="$gettext('Challenge')">
                                    </option>
                                    <option v-for="(text,key) in $store.state.master.challenges"
                                            :key="key"
                                            :value="key"
                                            v-html="$gettext('challenge-'+key)">
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div class="control is-expanded"
                             v-if="challenge">
                            <div class="select is-fullwidth"
                                 :class="{'is-danger':aerob===''}">
                                <select v-model="aerob">
                                    <option hidden disabled value=""
                                            v-html="$gettext('Aerob')">
                                    </option>
                                    <option value="-"
                                            v-html="$gettext('AerobSkip')">
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
                         v-for="(x, key) in exercises"
                         :key="key">
                        <div class="control"
                             v-show="challenge">
                            <div class="button is-static"
                                 v-html="$gettext(x.name)">
                            </div>
                        </div>
                        <div class="control is-expanded">
                            <input-number v-model="results[x.key]"
                                          :required="true"
                                          :expanded="true"
                                          :min="0"
                                          :max="10000"
                                          :unit="$gettext('unit-'+x.unit.result)"
                                          :step="x.name.substr(0,6) !== 'aerob-' && (x.unit.result === 'min' || x.unit.result === 'm') ? 0.1 : 1"
                                          :decimals="x.name.substr(0,6) !== 'aerob-' && (x.unit.result === 'min' || x.unit.result === 'm') ? 2 : 0">
                            </input-number>
                        </div>
                    </div>
                    <div v-show="sumResults"
                         class="field">
                        <div class="control">
                            <div class="button is-pulled-right is-large"
                                 :class="{'is-loading':isWorking,'is-primary':!rating}"
                                 @click="evaluate">
                                <translate>Evaluate</translate>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="rating > 0"
                     class="column is-4 rating-container">
                    <translate tag="label" class="label">
                        Rating
                    </translate>
                    <div class="field"
                         v-for="(point, name) in points"
                         :key="name">
                        <div class="control">
                            <div class="button is-fullwidth is-static has-text-right has-text-weight-bold">
                                <translate :translate-n="point" :translate-plural="'%{point} points'" :translate-params="{point}">%{point} point</translate>
                            </div>
                        </div>
                    </div>
                    <div class="field">
                        <div class="control">
                            <div class="rating-sum button is-white is-static is-fullwidth is-large"
                                 :class="[{'is-loading':isWorking}, 'rating-'+rating]">
                                <span class="rating-text">{{ $gettext('rating-'+rating) }}</span>
                                <translate class="rating-points" :translate-params="{point: sumPoints}" :translate-n="sumPoints" translate-plural="%{point} points">%{point} point</translate>
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

        .rating-container {

            .button.is-static {
                border: 0;
            }

            .rating-sum {

                &.rating-1 {
                    color: hsl(6, 120, 60);
                }
                &.rating-2 {
                    color: hsl(26, 120, 60);
                }
                &.rating-3 {
                    color: hsl(46, 90, 45);
                }
                &.rating-4 {
                    color: hsl(56, 80, 40);
                }
                &.rating-5 {
                    color: hsl(68, 100, 40);
                }
                &.rating-6 {
                    color: hsl(80, 100, 40);
                }
                &.rating-7 {
                    color: hsl(190, 90, 40);
                }

                .rating-text {
                    font-size: 1.4rem;
                    padding-right: 4px;
                    font-weight: bold;
                }

                .rating-points {
                    font-size: 1.3rem;
                    padding-left: 4px;
                }
            }
        }
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
        rating: 0,
        ratingName: '',
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
      results: {
        handler() {
          this.rating = 0;
        },
        deep: true,
      },
    },
    methods: {
      empty() {
        this.rating = 0;
        this.ratingName = '';
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
          let points = {};
          const motors = this.$store.state.master.challenges[this.challenge].motor;
          if(this.aerob && this.aerob !== '-') {
            results[this.aerob] = this.results.hasOwnProperty(this.aerob) ? this.results[this.aerob] : 0;
            exercises[this.aerob] = this.$store.state.master.exercises[this.aerob];
            points[this.aerob] = 0;
          }
          for (let i in motors) {
            if (motors.hasOwnProperty(i)) {
              const k = motors[i];
              results[k] = this.results.hasOwnProperty(k) ? this.results[k] : 0;
              exercises[k] = this.$store.state.master.exercises[k];
              points[k] = 0;
            }
          }
          this.results = results;
          this.exercises = exercises;
          this.points = points;
          this.rating = 0;
          this.ratingName = '';
        }
      },
      evaluate() {
        if(this.isWorking) {
          return;
        }
        this.isWorking = true;
        this.$http.post(this.$apiUrl('/evaluate'), {
          gender: this.gender,
          age: this.age,
          challenge: this.challenge,
          results: this.results,
        }, {
          emulateJSON: true,
        }).then(
          r => {
            const points = r.body.response.points;
            for(let i in points) {
              if(points.hasOwnProperty(i)) {
                this.points[i] = points[i];
              }
            }
            this.rating = r.body.response.rating;
            this.ratingName = r.body.response.ratingName;
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
