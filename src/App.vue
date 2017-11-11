<template>
    <div class="app-container" v-cloak>

        <navbar></navbar>

        <section class="section">
            <div class="container">
                <router-view></router-view>
            </div>
        </section>

        <div class="navbar-fixed-placeholder"></div>

    </div>
</template>

<style lang="scss">
    @import './styles/variables';
    @import './../node_modules/bulma/bulma';
    @import './../node_modules/bulma/sass/utilities/mixins';

    html, body {
        padding: 0;
        margin: 0;
        height: 100%;
        min-height: 100%;
    }

    .app-container {

        .navbar-fixed-placeholder {
            display: none;
            height: 54px;
        }

        @include touch {
            .navbar-fixed-placeholder {
                display: block;
            }
        }
    }

    .input,
    .select {
        &.is-danger {
            z-index: 1;
        }
    }

</style>

<script>
  import * as STORE from './store/types'
  import Navbar from './components/navbar.vue';

  export default {
    name: 'app',
    components: {
      Navbar,
    },
    data() {
      return {
        navbarOpen: false,
      };
    },
    created() {
    },
    mounted() {
      this.$store.dispatch(STORE.MASTER_UPDATE);
    },
  }
</script>
