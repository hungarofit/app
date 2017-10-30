<template>
    <div class="app-index-page">
        <!--
        <div class="container">
            <h1 class="title">
                HUNGAROFIT
            </h1>
            <translate is="p"
                       class="subtitle">
                Single evaluator
            </translate>
        </div>
        -->
        <evaluator-single></evaluator-single>
    </div>
</template>

<style lang="scss">
    .app-index-page {

    }
</style>

<script>
  import EvaluatorSingle from '../components/evaluator/single.vue';

  export default {
    components: {
      EvaluatorSingle,
    },
    mixins: [],
    data() {
      return {};
    },
    computed: {},
    created() {
    },
  }
</script>